"use client";

import { useRef, useState } from "react";
import { Smartphone, Watch, Headphones, Wifi, ArrowDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

// ─── Data ─────────────────────────────────────────────────────────────────────

const stages = [
  {
    id: "story-phone",
    num: "01",
    label: "Smartphone",
    heading: "Your World, In Your Hand",
    body: 'CyberNova 16 Pro — a 6.9″ ProMotion 120Hz display powered by the Nova Silicon X2. The command center of your NovaOS life.',
    accent: "text-violet-600 dark:text-violet-400",
    gradient: "from-violet-500/20 via-indigo-400/10 to-transparent",
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
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
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
    body: "NovaBuds Pro delivers studio-grade audio with 42dB hybrid ANC. Context-aware modes adapt to your environment automatically.",
    accent: "text-emerald-600 dark:text-emerald-400",
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    Icon: Headphones,
    stat: "42dB",
    unit: "Noise Cancellation",
  },
] as const;

// ─── TOTAL scroll pages: 1 intro + 3 stages ──────────────────────────────────
const TOTAL = 1 + stages.length; // 4 → 400vh

// ─── Intro screen ─────────────────────────────────────────────────────────────

const introAnim = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.35, ease: "easeIn" } },
};

function IntroScreen() {
  return (
    <motion.div
      key="intro"
      {...introAnim}
      className="flex h-full flex-col items-center justify-center px-8 text-center"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
        The NovaOS Story
      </p>
      <h2 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-6xl">
        Three Devices.{" "}
        <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
          One Vision.
        </span>
      </h2>
      <p className="mx-auto mt-5 max-w-md text-zinc-500 dark:text-zinc-400">
        Scroll to explore how every NovaOS device connects to your world.
      </p>

      {/* Device icons connected */}
      <div className="mt-10 flex items-center gap-3">
        {stages.map((s, i) => (
          <div key={s.id} className="flex items-center gap-3">
            <motion.div
              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${s.iconBg} shadow-md`}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
            >
              <s.Icon className={`h-5 w-5 ${s.accent}`} strokeWidth={1.5} />
            </motion.div>
            {i < stages.length - 1 && (
              <div className="flex items-center gap-1">
                <div className="h-px w-6 bg-zinc-200 dark:bg-zinc-700" />
                <Wifi className="h-3 w-3 text-violet-400" />
                <div className="h-px w-6 bg-zinc-200 dark:bg-zinc-700" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        className="mt-14 flex flex-col items-center gap-2 text-zinc-400"
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <ArrowDown className="h-5 w-5" />
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
      </motion.div>
    </motion.div>
  );
}

// ─── Device stage screen ──────────────────────────────────────────────────────

const stageAnim = {
  initial: { opacity: 0, y: 36, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -24, scale: 0.97, transition: { duration: 0.3, ease: "easeIn" } },
};

function DeviceScreen({ stage }: { stage: (typeof stages)[number] }) {
  const Icon = stage.Icon;
  return (
    <motion.div
      key={stage.id}
      {...stageAnim}
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
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 0.15, duration: 0.45 } }}
      >
        <span className={`text-5xl font-extrabold tabular-nums ${stage.accent}`}>
          {stage.stat}
        </span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {stage.unit}
        </span>
      </motion.div>

      {/* Label */}
      <p className={`mb-2 text-xs font-bold uppercase tracking-[0.18em] ${stage.accent}`}>
        {stage.num} · {stage.label}
      </p>

      {/* Heading */}
      <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white md:text-3xl">
        {stage.heading}
      </h3>

      {/* Body */}
      <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
        {stage.body}
      </p>
    </motion.div>
  );
}

// ─── Progress dots ────────────────────────────────────────────────────────────

function ProgressDots({ active }: { active: number }) {
  // active: -1 = intro, 0-2 = stages
  return (
    <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 lg:flex">
      {stages.map((s, i) => (
        <motion.div
          key={s.id}
          animate={{
            scale: active === i ? 1.4 : 0.8,
            opacity: active === i ? 1 : 0.3,
          }}
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

// ─── Stage numbers (left) ─────────────────────────────────────────────────────

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

// ─── Main export ──────────────────────────────────────────────────────────────

export default function ScrollytellingSection() {
  const spacerRef = useRef<HTMLDivElement>(null);
  // -1 = intro, 0/1/2 = device stage
  const [active, setActive] = useState<number>(-1);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (p < 1 / TOTAL) {
      setActive(-1);
    } else {
      const idx = Math.min(
        Math.floor((p - 1 / TOTAL) / (1 / TOTAL) * stages.length / stages.length * stages.length),
        stages.length - 1
      );
      // Simpler: divide remaining [1/TOTAL, 1] into 3 equal parts
      const remaining = (p - 1 / TOTAL) / (1 - 1 / TOTAL); // 0–1 within stages
      const stageIdx = Math.min(Math.floor(remaining * stages.length), stages.length - 1);
      setActive(stageIdx);
    }
  });

  return (
    <section id="story" className="relative bg-zinc-50 dark:bg-zinc-900/40">
      {/* Spacer drives scroll distance — sticky inside is always 100vh */}
      <div ref={spacerRef} style={{ height: `${TOTAL * 100}vh` }}>
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Ambient background */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(circle, #6d28d9 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Left numbers + right dots */}
          <StageNumbers active={active} />
          <ProgressDots active={active} />

          {/* Content — AnimatePresence guarantees no overlap */}
          <AnimatePresence mode="wait">
            {active === -1 ? (
              <IntroScreen key="intro" />
            ) : (
              <DeviceScreen key={stages[active].id} stage={stages[active]} />
            )}
          </AnimatePresence>

          {/* Bottom fade */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-50 dark:from-zinc-950"
          />
        </div>
      </div>
    </section>
  );
}
