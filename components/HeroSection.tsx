"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// ─── Shared animation variants ────────────────────────────────────────────────

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

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

      <motion.div
        className="relative mx-auto max-w-7xl px-6 text-center"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 dark:border-violet-800/50 dark:bg-violet-950/50"
        >
          <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-400">
            Introducing NovaOS 2.0
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-7xl"
        >
          Connected{" "}
          <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
            Intelligence.
          </span>
          <br />
          Seamless{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-sky-500 bg-clip-text text-transparent">
            Power.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
        >
          One unified ecosystem. Your smartphone, smartwatch, and earbuds — all
          working in perfect harmony so you can do more, effortlessly.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            id="hero-shop-cta"
            href="#ecosystem"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-violet-500/50"
          >
            Shop Ecosystem
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.a>

          <motion.a
            id="hero-specs-link"
            href="#specs"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-8 py-4 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
          >
            View Specs
          </motion.a>
        </motion.div>

        {/* Social proof */}
        <motion.p
          variants={item}
          className="mt-10 text-xs text-zinc-400 dark:text-zinc-600"
        >
          Trusted by{" "}
          <span className="font-semibold text-zinc-600 dark:text-zinc-400">
            50,000+
          </span>{" "}
          early adopters worldwide
        </motion.p>
      </motion.div>
    </section>
  );
}
