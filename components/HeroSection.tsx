"use client";

import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white py-28 dark:bg-zinc-950 md:py-36">
      {/* Ambient background blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-700/15" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-700/15" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 dark:border-violet-800/50 dark:bg-violet-950/50">
          <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-400">
            Introducing NovaOS 2.0
          </span>
        </div>

        {/* Headline */}
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-7xl">
          Connected{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Intelligence.
          </span>
          <br />
          Seamless{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
            Power.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400">
          One unified ecosystem. Your smartphone, smartwatch, and earbuds — all
          working in perfect harmony so you can do more, effortlessly.
        </p>

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            id="hero-shop-cta"
            href="#ecosystem"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.03] hover:shadow-violet-500/50 active:scale-[0.98]"
          >
            Shop Ecosystem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            id="hero-specs-link"
            href="#specs"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-8 py-4 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            View Specs
          </a>
        </div>

        {/* Social proof */}
        <p className="mt-10 text-xs text-zinc-400 dark:text-zinc-600">
          Trusted by{" "}
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            50,000+
          </span>{" "}
          early adopters worldwide
        </p>
      </div>
    </section>
  );
}
