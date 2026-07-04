"use client";

import { useRef, useState } from "react";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Watch,
  Headphones,
  Wifi,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

// ─── Device stages ────────────────────────────────────────────────────────────

const stages = [
  {
    id: "story-phone",
    num: "01",
    label: "Smartphone",
    heading: "Your World, In Your Hand",
    body: 'CyberNova 16 Pro — a 6.9″ ProMotion 120Hz display powered by the Nova Silicon X2. The command center of your NovaOS life.',
    accent: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500/15 via-indigo-400/8 to-transparent",
    iconBg: "bg-violet-100 dark:bg-violet-950",
    Icon: Smartphone,
    stat: "6.9″",
    unit: "ProMotion 120Hz",
  },
  {
    id: "story-watch",
    num: "02",
    label: "Smartwatch",
    heading: "Intelligence on Your Wrist",
    body: "NovaWatch Ultra tracks your health, handles calls, and mirrors every notification — all on a titanium canvas lighter than a coin.",
    accent: "text-sky-600 dark:text-sky-400",
    gradient: "from-sky-500/15 via-cyan-400/8 to-transparent",
    iconBg: "bg-sky-100 dark:bg-sky-950",
    Icon: Watch,
    stat: "18d",
    unit: "Battery Life",
  },
  {
    id: "story-buds",
    num: "03",
    label: "Earbuds",
    heading: "Silence the World, Hear What Matters",
    body: "NovaBuds Pro delivers studio-grade audio with 42dB hybrid ANC. Context-aware modes detect your environment and adapt automatically.",
    accent: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/15 via-teal-400/8 to-transparent",
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    Icon: Headphones,
    stat: "42dB",
    unit: "Noise Cancellation",
  },
] as const;

// Spacer height (vh) — 3 stages × ~90vh each + small hero slot
const SPACER_VH = 350;
// Hero exits after this fraction of total scrollYProgress (≈18vh of real scroll)
const HERO_THRESHOLD = 0.07;

// ─── Animation presets ────────────────────────────────────────────────────────

const panelEnter = {
  initial: { opacity: 0, y: 32, scale: 0.98 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0, y: -24, scale: 0.97,
    transition: { duration: 0.3, ease: "easeIn" as const },
  },
};

// ─── Hero panel ───────────────────────────────────────────────────────────────

function HeroPanel() {
  return (
    <motion.div
      key="hero"
      {...panelEnter}
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      {/* Ambient blobs (static in sticky viewport) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-violet-500/10 blur-3xl dark:bg-violet-700/15" />
      </div>
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-3xl dark:bg-indigo-700/15" />

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.05, duration: 0.45 } }}
        className="relative z-10 mb-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3.5 py-1 dark:border-violet-800/50 dark:bg-violet-950/50"
      >
        <Sparkles className="h-3.5 w-3.5 text-violet-600 dark:text-violet-400" />
        <span className="text-xs font-semibold uppercase tracking-widest text-violet-700 dark:text-violet-400">
          Introducing NovaOS 2.0
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.12, duration: 0.6 } }}
        className="relative z-10 mx-auto max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight text-zinc-900 dark:text-white md:text-[3.5rem]"
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

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.22, duration: 0.55 } }}
        className="relative z-10 mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400"
      >
        One unified ecosystem. Your smartphone, smartwatch, and earbuds — all
        working in perfect harmony so you can do more, effortlessly.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.32, duration: 0.5 } }}
        className="relative z-10 mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <motion.a
          id="hero-shop-cta"
          href="#ecosystem"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-violet-500/50"
        >
          Shop Ecosystem
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </motion.a>
        <motion.a
          id="hero-specs-link"
          href="#specs"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          View Specs
        </motion.a>
      </motion.div>

      {/* Stat pills */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.42, duration: 0.5 } }}
        className="relative z-10 mt-4 flex flex-wrap items-center justify-center gap-2"
      >
        {[
          { v: "50K+", l: "Adopters" },
          { v: "4.9★", l: "Rating" },
          { v: "3 Devices", l: "Ecosystem" },
          { v: "< 1s", l: "Sync Speed" },
        ].map(({ v, l }) => (
          <div
            key={l}
            className="flex flex-col items-center rounded-xl border border-zinc-200/60 bg-white/70 px-4 py-2 shadow-sm backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-900/70"
          >
            <span className="text-sm font-extrabold text-zinc-900 dark:text-white">{v}</span>
            <span className="text-[10px] font-medium uppercase tracking-widest text-zinc-400">{l}</span>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.8 } }}
        className="relative z-10 mt-4 flex flex-col items-center gap-1 text-zinc-400"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1"
        >
          <div className="flex h-8 w-5 items-start justify-center rounded-full border-2 border-zinc-300 pt-1.5 dark:border-zinc-700">
            <div className="h-2 w-0.5 rounded-full bg-zinc-400" />
          </div>
          <span className="text-[10px] uppercase tracking-widest">Scroll to explore</span>
        </motion.div>

        {/* Device mini-icons hinting at what's coming */}
        <div className="mt-3 flex items-center gap-2">
          {stages.map((s, i) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex h-7 w-7 items-center justify-center rounded-xl ${s.iconBg} shadow-sm`}>
                <s.Icon className={`h-3.5 w-3.5 ${s.accent}`} strokeWidth={1.5} />
              </div>
              {i < stages.length - 1 && (
                <div className="flex items-center gap-0.5">
                  <div className="h-px w-3 bg-zinc-300 dark:bg-zinc-700" />
                  <Wifi className="h-2.5 w-2.5 text-violet-400" />
                  <div className="h-px w-3 bg-zinc-300 dark:bg-zinc-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Device stage panel ───────────────────────────────────────────────────────

function DevicePanel({ stage }: { stage: (typeof stages)[number] }) {
  const Icon = stage.Icon;
  return (
    <motion.div
      key={stage.id}
      {...panelEnter}
      className={`flex h-full flex-col items-center justify-center px-8 text-center bg-gradient-to-br ${stage.gradient}`}
    >
      {/* Floating icon */}
      <motion.div
        className={`mb-7 flex h-28 w-28 items-center justify-center rounded-[2rem] ${stage.iconBg} shadow-2xl`}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon className={`h-14 w-14 ${stage.accent}`} strokeWidth={1.4} />
      </motion.div>

      {/* Stat */}
      <motion.div
        className="mb-4 flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.15, duration: 0.45 } }}
      >
        <span className={`text-5xl font-extrabold tabular-nums ${stage.accent}`}>
          {stage.stat}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {stage.unit}
        </span>
      </motion.div>

      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${stage.accent}`}>
        {stage.num} · {stage.label}
      </p>

      <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
        {stage.heading}
      </h3>

      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {stage.body}
      </p>
    </motion.div>
  );
}

// ─── Progress dots (right sidebar) ───────────────────────────────────────────

function ProgressDots({ active }: { active: number }) {
  return (
    <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
      {stages.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{ scale: active === i ? 1.5 : 0.8, opacity: active === i ? 1 : 0.25 }}
          transition={{ duration: 0.3 }}
          className={`h-2 w-2 rounded-full ${
            active === i
              ? s.accent.replace("text-", "bg-").split(" ")[0]
              : "bg-zinc-400 dark:bg-zinc-600"
          }`}
        />
      ))}
    </div>
  );
}

// ─── Stage numbers (left sidebar) ────────────────────────────────────────────

function StageNumbers({ active }: { active: number }) {
  return (
    <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-6 lg:flex">
      {stages.map((s, i) => (
        <motion.span
          key={s.id}
          animate={{ opacity: active === i ? 1 : 0.2 }}
          transition={{ duration: 0.3 }}
          className={`text-xs font-bold uppercase tracking-[0.18em] ${s.accent}`}
        >
          {s.num}
        </motion.span>
      ))}
    </div>
  );
}

// ─── Combined Hero + Scrollytelling ──────────────────────────────────────────

export default function HeroScrollytelling() {
  const spacerRef = useRef<HTMLDivElement>(null);
  // -1 = hero panel, 0–2 = device stages
  const [active, setActive] = useState<number>(-1);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < HERO_THRESHOLD) {
      setActive(-1);
    } else {
      // Divide remaining scroll [HERO_THRESHOLD, 1] equally among 3 stages
      const withinStages = (p - HERO_THRESHOLD) / (1 - HERO_THRESHOLD);
      const idx = Math.min(Math.floor(withinStages * stages.length), stages.length - 1);
      setActive(idx);
    }
  });

  return (
    <section
      id="hero-story"
      className="relative bg-white dark:bg-zinc-950"
    >
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Spacer — drives scroll height */}
      <div ref={spacerRef} style={{ height: `${SPACER_VH}vh` }}>
        {/* Sticky viewport — always exactly one screen */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Sidebars — only during device stages */}
          <AnimatePresence>
            {active >= 0 && (
              <>
                <motion.div
                  key="sidebar-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StageNumbers active={active} />
                </motion.div>
                <motion.div
                  key="sidebar-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ProgressDots active={active} />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Main content — one panel at a time */}
          <AnimatePresence mode="wait">
            {active === -1 ? (
              <HeroPanel key="hero" />
            ) : (
              <DevicePanel key={stages[active].id} stage={stages[active]} />
            )}
          </AnimatePresence>

          {/* Bottom fade into next section */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-zinc-950"
          />
        </div>
      </div>
    </section>
  );
}
