import { NextRequest, NextResponse } from "next/server";

// ─── Email validation ─────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
}

// ─── Simulated webhook dispatch ───────────────────────────────────────────────

async function dispatchToWebhook(email: string): Promise<void> {
  /**
   * In production, replace this with a real webhook call, e.g.:
   *
   *   await fetch("https://webhook.site/<your-id>", {
   *     method: "POST",
   *     headers: { "Content-Type": "application/json" },
   *     body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
   *   });
   *
   * For demo purposes we simulate a 900ms network round-trip.
   */
  await new Promise<void>((resolve) => setTimeout(resolve, 900));

  // Uncomment below to test with a real webhook.site URL:
  const webhookUrl = process.env.WEBHOOK_URL ?? "";
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, subscribedAt: new Date().toISOString() }),
    });
  }

  console.log(`[subscribe] Dispatched to webhook: ${email}`);
}

// ─── POST /api/subscribe ──────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  // 1. Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  // 2. Validate email
  const email = (body as Record<string, unknown>)?.email;
  if (!isValidEmail(email)) {
    return NextResponse.json(
      { success: false, message: "Invalid email address." },
      { status: 400 }
    );
  }

  // 3. Dispatch to external webhook
  try {
    await dispatchToWebhook(email.trim());
  } catch (err) {
    console.error("[subscribe] Webhook dispatch failed:", err);
    return NextResponse.json(
      { success: false, message: "Failed to register. Please try again." },
      { status: 502 }
    );
  }

  // 4. Success
  return NextResponse.json(
    {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
    },
    { status: 200 }
  );
}

// Reject all non-POST methods cleanly
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
