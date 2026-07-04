import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

// ─── Email validation ─────────────────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && EMAIL_REGEX.test(email.trim());
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

  const normalizedEmail = email.trim().toLowerCase();

  // 3. Insert into Supabase
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("subscribers")
    .insert([{ email: normalizedEmail }])
    .select("id, email, created_at")
    .single();

  if (error) {
    // PostgreSQL unique violation code
    if (error.code === "23505") {
      return NextResponse.json(
        { success: false, message: "This email is already on the waitlist! 🎉" },
        { status: 409 }
      );
    }

    // Log full error details for diagnosis
    console.error("[subscribe] Supabase error:", {
      code: error.code,
      message: error.message,
      details: error.details,
      hint: error.hint,
    });
    return NextResponse.json(
      { success: false, message: error.message ?? "Something went wrong. Please try again." },
      { status: 500 }
    );
  }

  console.log(`[subscribe] New subscriber: ${data.email} (${data.id})`);

  return NextResponse.json(
    {
      success: true,
      message: "You're on the list! We'll be in touch soon.",
      id: data.id,
    },
    { status: 201 }
  );
}

export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
