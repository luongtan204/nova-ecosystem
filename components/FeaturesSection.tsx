"use client";

import { Bluetooth, RefreshCcw, ShieldCheck } from "lucide-react";

const features = [
  {
    id: "feature-instant-pairing",
    Icon: Bluetooth,
    title: "Instant Pairing",
    description:
      "Switch between your NovaOS devices in under one second. Zero setup, zero friction — just seamless continuity.",
    gradient: "from-violet-500 to-indigo-600",
    glow: "shadow-violet-500/20",
  },
  {
    id: "feature-cross-device-sync",
    Icon: RefreshCcw,
    title: "Cross-Device Sync",
    description:
      "Copy on your phone, paste on your watch screen. Notifications, clipboard, and media states are mirrored in real-time.",
    gradient: "from-sky-500 to-cyan-500",
    glow: "shadow-sky-500/20",
  },
  {
    id: "feature-unified-security",
    Icon: ShieldCheck,
    title: "Unified Security",
    description:
      "One biometric unlock secures your entire ecosystem. End-to-end encrypted handshake across all paired devices.",
    gradient: "from-emerald-500 to-teal-500",
    glow: "shadow-emerald-500/20",
  },
];

export default function FeaturesSection() {
  return (
    <section id="specs" className="bg-white py-24 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Why NovaOS
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            Built for Synergy
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
            The whole is greater than the sum of its parts. Every device
            amplifies the others.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map(({ id, Icon, title, description, gradient, glow }) => (
            <div
              key={id}
              id={id}
              className="group relative rounded-2xl border border-zinc-100 bg-zinc-50 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-200 hover:shadow-lg dark:border-zinc-800/60 dark:bg-zinc-900/60 dark:hover:border-zinc-700"
            >
              {/* Icon */}
              <div
                className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg ${glow}`}
              >
                <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
              </div>

              <h3 className="mb-3 text-lg font-bold text-zinc-900 dark:text-white">
                {title}
              </h3>
              <p className="leading-relaxed text-zinc-500 dark:text-zinc-400">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
