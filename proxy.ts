import { type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

// Next.js 16: middleware.ts is renamed to proxy.ts
// See: https://nextjs.org/docs/messages/middleware-to-proxy

export async function proxy(request: NextRequest) {
  return createClient(request);
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
