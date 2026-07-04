"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

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

// ─── Floating stat pill ───────────────────────────────────────────────────────

function StatPill({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center rounded-2xl border border-zinc-200/60 bg-white/70 px-5 py-3 shadow-sm backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/70"
    >
      <span className="text-xl font-extrabold text-zinc-900 dark:text-white">
        {value}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">
        {label}
      </span>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax layers — each element moves at a different rate
  const blobY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const subtextY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-28 dark:bg-zinc-950 md:py-36"
    >
      {/* ── Parallax ambient blobs ─────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        style={{ y: blobY, opacity: opacityOut }}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="h-[700px] w-[700px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-700/15" />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ y: blob2Y }}
        className="pointer-events-none absolute right-1/4 top-1/4 h-[350px] w-[350px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-700/15"
      />

      {/* Dot grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ── Hero content ──────────────────────────────────────────────────── */}
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

        {/* Headline — parallax layer */}
        <motion.div style={{ y: headlineY }}>
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
        </motion.div>

        {/* Subheadline — slower parallax */}
        <motion.div style={{ y: subtextY }}>
          <motion.p
            variants={item}
            className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-zinc-500 dark:text-zinc-400"
          >
            One unified ecosystem. Your smartphone, smartwatch, and earbuds — all
            working in perfect harmony so you can do more, effortlessly.
          </motion.p>
        </motion.div>

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

        {/* Floating stat pills */}
        <motion.div
          variants={item}
          className="mt-14 flex flex-wrap items-center justify-center gap-4"
        >
          <StatPill value="50K+" label="Adopters" delay={0.8} />
          <StatPill value="4.9★" label="Rating" delay={0.95} />
          <StatPill value="3 Devices" label="Ecosystem" delay={1.1} />
          <StatPill value="< 1s" label="Sync Speed" delay={1.25} />
        </motion.div>
      </motion.div>

      {/* Bottom fade out */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-zinc-950"
      />
    </section>
  );
}
