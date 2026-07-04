import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// ─── POST /api/events ─────────────────────────────────────────────────────────
// Receives analytics events from the client and stores them in Supabase.

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { session_id, event_type, event_data, user_agent } =
    (body as Record<string, unknown>) ?? {};

  // Basic validation
  if (typeof session_id !== "string" || typeof event_type !== "string") {
    return NextResponse.json(
      { error: "session_id and event_type are required strings." },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.from("user_events").insert([
    {
      session_id,
      event_type,
      event_data: event_data ?? {},
      user_agent: typeof user_agent === "string" ? user_agent.slice(0, 300) : null,
    },
  ]);

  if (error) {
    // Don't expose internal errors — just return 200 so client never retries
    console.error("[events] Supabase insert error:", error.message);
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
