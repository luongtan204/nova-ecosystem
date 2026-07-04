"use client";

import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { trackEvent } from "@/lib/analytics";

// ─── Sections to observe ──────────────────────────────────────────────────────
// Each entry maps a section id to a human-readable label shown in the toast.

const SECTIONS: Array<{ id: string; label: string; emoji: string }> = [
  { id: "hero-story",  label: "Hero",        emoji: "🚀" },
  { id: "ecosystem",   label: "Products",     emoji: "🛍️" },
  { id: "specs",       label: "Features",     emoji: "⚡" },
  { id: "newsletter",  label: "Newsletter",   emoji: "📬" },
];

// ─── Scroll-depth milestones (%) ──────────────────────────────────────────────
const MILESTONES = [25, 50, 75, 100];

// ─── CTA element IDs to monitor for clicks ────────────────────────────────────
const CTA_IDS: Record<string, string> = {
  "hero-shop-cta":    "Shop Ecosystem",
  "hero-specs-link":  "View Specs",
  "chat-toggle-btn":  "Open Chat",
  "newsletter-submit":"Newsletter Subscribe",
};

// ─── Toast helper (shown in dev + prod to demonstrate tracking) ───────────────
function showTrackingToast(message: string) {
  toast(message, {
    icon: "📊",
    duration: 2500,
    style: {
      fontSize: "12px",
      padding: "8px 12px",
      background: "rgba(15,15,20,0.9)",
      color: "#e4e4e7",
      border: "1px solid rgba(109,40,217,0.4)",
      backdropFilter: "blur(8px)",
      borderRadius: "10px",
    },
  });
}

// ─── Main tracker component ───────────────────────────────────────────────────

export default function AnalyticsTracker() {
  const firedMilestones = useRef(new Set<number>());
  const firedSections   = useRef(new Set<string>());

  // ── 1. Page view ────────────────────────────────────────────────────────────
  useEffect(() => {
    trackEvent("page_view", { path: window.location.pathname });
  }, []);

  // ── 2. Scroll depth tracking ─────────────────────────────────────────────────
  useEffect(() => {
    function onScroll() {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;

      const pct = Math.round((scrollTop / docHeight) * 100);

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !firedMilestones.current.has(milestone)) {
          firedMilestones.current.add(milestone);
          trackEvent("scroll_depth", { depth_pct: milestone });
          showTrackingToast(`Scroll ${milestone}% reached`);
        }
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── 3. Section visibility (IntersectionObserver) ─────────────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = SECTIONS.find((s) => s.id === entry.target.id);
          if (!section) continue;
          if (firedSections.current.has(section.id)) continue;

          firedSections.current.add(section.id);
          trackEvent("section_view", { section_id: section.id, section_label: section.label });
          showTrackingToast(`${section.emoji} Section "${section.label}" viewed`);
        }
      },
      { threshold: 0.3 } // fire when 30% of section is visible
    );

    // Observe each section (wait for DOM to be ready)
    const timeoutId = setTimeout(() => {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      }
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  // ── 4. CTA click tracking (event delegation) ─────────────────────────────────
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // Walk up the DOM tree to find a tracked element
      let el = e.target as HTMLElement | null;
      while (el && el !== document.body) {
        const id = el.id;
        if (id && CTA_IDS[id]) {
          const label = CTA_IDS[id];
          trackEvent("cta_click", { element_id: id, label });
          showTrackingToast(`👆 Click: "${label}"`);
          break;
        }
        el = el.parentElement;
      }
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // This component renders nothing — it's a pure side-effect tracker
  return null;
}
