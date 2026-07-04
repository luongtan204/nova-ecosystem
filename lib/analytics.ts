// lib/analytics.ts
// ─── Client-side analytics utility ───────────────────────────────────────────
// Tracks scroll depth, section views, and CTA clicks → POST /api/events

export type EventType = "page_view" | "scroll_depth" | "section_view" | "cta_click";

export interface TrackPayload {
  eventType: EventType;
  eventData?: Record<string, unknown>;
}

// ─── Session ID (per browser tab, resets on new tab) ─────────────────────────

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  const KEY = "nova_sid";
  let id = sessionStorage.getItem(KEY);
  if (!id) {
    id = `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem(KEY, id);
  }
  return id;
}

// ─── Fire-and-forget event sender ─────────────────────────────────────────────

export function trackEvent(
  eventType: EventType,
  eventData: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;

  // Use sendBeacon when available (survives page unload), fallback to fetch
  const body = JSON.stringify({
    session_id: getSessionId(),
    event_type: eventType,
    event_data: eventData,
    user_agent: navigator.userAgent,
  });

  const sent = navigator.sendBeacon?.("/api/events", new Blob([body], { type: "application/json" }));
  if (!sent) {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      // keepalive so it survives navigation
      keepalive: true,
    }).catch(() => {/* silently fail — never break UX */});
  }
}
