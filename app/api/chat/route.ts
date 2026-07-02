import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, GoogleGenerativeAIError } from "@google/generative-ai";

// ─── System persona ───────────────────────────────────────────────────────────

const SYSTEM_INSTRUCTION = `You are NovaBot, the official customer support AI for the NovaOS Ecosystem.
Your ONLY purpose is to answer questions about these three specific products:
1. CyberNova 16 Pro (Flagship Gaming Smartphone, $899, Snapdragon 8 Gen 3, 144Hz, 120W Charge)
2. NovaWatch Ultra (Smartwatch, $299, fitness tracking, seamless pairing)
3. NovaBuds Pro (Earbuds, $149, Active Noise Cancelling)

STRICT RULES:
- You must answer briefly, professionally, and enthusiastically.
- If the user asks about ANYTHING outside of the NovaOS ecosystem (e.g., coding, math, general knowledge, other brands, politics, weather, personal advice), you MUST refuse to answer.
- For out-of-topic questions, use a polite fallback response exactly like this (or similar): 'I am NovaBot, a specialized assistant for the NovaOS Ecosystem. I can only answer questions related to the CyberNova phone, NovaWatch, and NovaBuds. How can I help you with our products today?'
- Do not break character under any circumstances.`;

// Model fallback chain based on actual quota available (AI Studio → Quotas tab)
// gemini-2.5-flash-lite : 10 RPM  ← use first (highest free-tier RPM)
// gemini-2.5-flash       :  5 RPM
// gemini-3-flash          :  5 RPM
const MODEL_CANDIDATES = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3-flash",
];

// ─── Types ────────────────────────────────────────────────────────────────────

type ClientMessage = {
  role: "user" | "assistant";
  content: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function friendlyGeminiError(err: unknown): { message: string; status: number } {
  // GoogleGenerativeAIError exposes a .status and .message
  if (err instanceof GoogleGenerativeAIError) {
    const msg = err.message ?? "";
    if (msg.includes("API_KEY_INVALID") || msg.includes("API key")) {
      return { message: "Invalid Gemini API key. Check GEMINI_API_KEY in .env.local.", status: 401 };
    }
    if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("quota")) {
      return { message: "Gemini quota exceeded. Try again in a moment.", status: 429 };
    }
    if (msg.includes("MODEL_NOT_FOUND") || msg.includes("not found")) {
      return { message: "Gemini model unavailable. Retrying with fallback…", status: 503 };
    }
    return { message: `Gemini error: ${msg}`, status: 502 };
  }
  if (err instanceof Error) {
    return { message: err.message, status: 502 };
  }
  return { message: "Unknown AI error. Please try again.", status: 502 };
}

// ─── POST /api/chat ───────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Check API key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "YOUR-GEMINI-API-KEY-HERE") {
    return NextResponse.json(
      { error: "GEMINI_API_KEY is not configured in .env.local." },
      { status: 500 }
    );
  }

  // 2. Parse body
  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = body.messages;
  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "A non-empty `messages` array is required." },
      { status: 400 }
    );
  }

  // Map client roles to Gemini roles (assistant → model)
  const rawHistory = messages.slice(0, -1).map((msg) => ({
    role: msg.role === "assistant" ? ("model" as const) : ("user" as const),
    parts: [{ text: msg.content }],
  }));

  // Gemini requires history to start with a "user" turn.
  // The welcome bot message (index 0) is role "model", so we drop all
  // leading model entries before passing history to startChat().
  const firstUserIdx = rawHistory.findIndex((m) => m.role === "user");
  const history = firstUserIdx >= 0 ? rawHistory.slice(firstUserIdx) : [];

  const lastMessage = messages[messages.length - 1];

  const genAI = new GoogleGenerativeAI(apiKey);

  // 3. Try each model in the fallback chain
  let lastErr: unknown;
  for (const modelName of MODEL_CANDIDATES) {
    try {
      console.log(`[chat] Trying model: ${modelName}`);
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
      });

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(lastMessage.content);
      const reply = result.response.text();

      console.log(`[chat] Success with model: ${modelName}`);
      return NextResponse.json({ reply, model: modelName }, { status: 200 });
    } catch (err) {
      lastErr = err;
      const { message } = friendlyGeminiError(err);
      console.warn(`[chat] Model ${modelName} failed:`, message);

      // Only continue the loop for model-not-found errors; abort on auth/quota
      const errMsg = err instanceof Error ? err.message : "";
      const isFatal =
        errMsg.includes("API_KEY_INVALID") ||
        errMsg.includes("API key") ||
        errMsg.includes("RESOURCE_EXHAUSTED") ||
        errMsg.includes("quota");
      if (isFatal) break;
    }
  }

  // All models failed — return the most useful error message
  const { message, status } = friendlyGeminiError(lastErr);
  console.error("[chat] All models failed. Last error:", lastErr);
  return NextResponse.json({ error: message }, { status });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
