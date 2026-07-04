"use client";

import { useRef } from "react";
import { Bluetooth, RefreshCcw, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    id: "feature-instant-pairing",
    Icon: Bluetooth,
    title: "Instant Pairing",
    description:
      "Switch between your NovaOS devices in under one second. Zero setup, zero friction — just seamless continuity.",
    gradient: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/25",
    // Each card shifts vertically at a different parallax rate
    parallaxY: [60, -20] as [number, number],
  },
  {
    id: "feature-cross-device-sync",
    Icon: RefreshCcw,
    title: "Cross-Device Sync",
    description:
      "Copy on your phone, paste on your watch screen. Notifications, clipboard, and media states are mirrored in real-time.",
    gradient: "from-sky-500 to-cyan-500",
    glow: "shadow-sky-500/25",
    parallaxY: [20, -60] as [number, number],
  },
  {
    id: "feature-unified-security",
    Icon: ShieldCheck,
    title: "Unified Security",
    description:
      "One biometric unlock secures your entire ecosystem. End-to-end encrypted handshake across all paired devices.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/25",
    parallaxY: [80, 0] as [number, number],
  },
];

// ─── Variants ─────────────────────────────────────────────────────────────────

const sectionHeader = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

// ─── Parallax card ─────────────────────────────────────────────────────────────

function ParallaxCard({
  feature,
  index,
  sectionRef,
}: {
  feature: (typeof features)[number];
  index: number;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    feature.parallaxY
  );

  const { Icon } = feature;

  return (
    <motion.div style={{ y }}>
      <motion.div
        id={feature.id}
        custom={index}
        variants={cardVariant}
        whileHover={{ y: -8, transition: { duration: 0.2, ease: "easeOut" } }}
        className="relative overflow-hidden rounded-3xl border border-zinc-100 bg-white p-8 shadow-sm transition-shadow hover:shadow-xl dark:border-zinc-800/60 dark:bg-zinc-900"
      >
        {/* Corner glow */}
        <div
          aria-hidden
          className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-10 blur-2xl`}
        />

        {/* Icon */}
        <motion.div
          className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg ${feature.glow}`}
          whileHover={{ scale: 1.12, rotate: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
        </motion.div>

        <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
          {feature.title}
        </h3>
        <p className="leading-relaxed text-zinc-500 dark:text-zinc-400">
          {feature.description}
        </p>

        {/* Bottom line accent */}
        <motion.div
          className={`absolute bottom-0 left-0 h-[3px] bg-gradient-to-r ${feature.gradient}`}
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="specs"
      ref={sectionRef}
      className="relative bg-white py-32 dark:bg-zinc-950"
    >
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#6d28d9 1px, transparent 1px), linear-gradient(to right, #6d28d9 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-20 text-center"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Why NovaOS
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Built for{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent">
              Synergy
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
            The whole is greater than the sum of its parts. Every device
            amplifies the others.
          </p>
        </motion.div>

        {/* Parallax cards grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {features.map((feature, i) => (
            <ParallaxCard
              key={feature.id}
              feature={feature}
              index={i}
              sectionRef={sectionRef}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
