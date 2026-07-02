"use client";

import { useState } from "react";
import { Send, Loader2, Zap } from "lucide-react";
import toast from "react-hot-toast";

// ─── Subscribe form state machine ─────────────────────────────────────────────

type FormState = "idle" | "loading" | "success";

const footerLinks = {
  Product: ["Ecosystem", "Specs", "Pricing", "Changelog"],
  Company: ["About", "Blog", "Careers", "Press"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
};

// ─── Newsletter form ──────────────────────────────────────────────────────────

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<FormState>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim() || state === "loading") return;

    setState("loading");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data: { success: boolean; message: string } = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message ?? "Something went wrong. Please try again.");
        setState("idle");
        return;
      }

      toast.success(data.message ?? "Joined waitlist successfully!");
      setEmail("");
      setState("success");
    } catch {
      toast.error("Network error. Check your connection and try again.");
      setState("idle");
    }
  };

  return (
    <form
      id="waitlist-form"
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-3 sm:flex-row"
      noValidate
    >
      <label htmlFor="waitlist-email" className="sr-only">
        Email address
      </label>
      <input
        id="waitlist-email"
        type="email"
        required
        disabled={state === "success"}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={
          state === "success" ? "You're on the list ✓" : "you@example.com"
        }
        className="h-12 flex-1 rounded-xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm outline-none transition-all focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white dark:placeholder-zinc-500 dark:focus:border-violet-500"
      />
      <button
        id="waitlist-submit"
        type="submit"
        disabled={state !== "idle"}
        className="inline-flex h-12 min-w-[160px] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02] hover:shadow-violet-500/50 disabled:cursor-not-allowed disabled:opacity-70 active:scale-[0.98]"
      >
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : state === "success" ? (
          <>✓ You&apos;re In</>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Join Waitlist
          </>
        )}
      </button>
    </form>
  );
}

// ─── Full section + footer ────────────────────────────────────────────────────

export default function NewsletterFooter() {
  return (
    <>
      {/* Newsletter Section */}
      <section className="border-t border-zinc-200 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Early Access
          </p>
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-4xl">
            Join the Waitlist
          </h2>
          <p className="mx-auto mt-4 text-zinc-500 dark:text-zinc-400">
            Be the first to know when new devices drop. Zero spam, unsubscribe
            anytime.
          </p>

          <NewsletterForm />

          <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-600">
            By joining, you agree to receive occasional product updates.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <a
                href="#"
                className="flex items-center gap-2 text-lg font-bold text-zinc-900 dark:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
                  <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
                </span>
                NovaOS
              </a>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                The future of connected smart devices. Built with intelligence.
                Designed for you.
              </p>
            </div>

            {/* Link Groups */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-900 dark:text-white">
                  {group}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-zinc-100 pt-8 dark:border-zinc-800 sm:flex-row">
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              © {new Date().getFullYear()} NovaOS Ecosystem. All rights
              reserved.
            </p>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">
              Made with ❤️ for the future
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
