"use client";

// ─── Skeleton card shown during the simulated loading state ───────────────────

export default function SkeletonCard() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {/* Placeholder image area */}
      <div className="h-64 w-full animate-pulse bg-zinc-200 dark:bg-zinc-800" />

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-3 p-6">
        {/* Category label */}
        <div className="h-3 w-20 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        {/* Title */}
        <div className="h-5 w-40 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        {/* Star row */}
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="h-3 w-3 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700"
            />
          ))}
          <div className="ml-1 h-3 w-16 animate-pulse rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>

        {/* Divider */}
        <div className="mt-2 border-t border-zinc-100 dark:border-zinc-800" />

        {/* Price + button row */}
        <div className="flex items-center justify-between pt-1">
          <div className="h-7 w-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex gap-2">
            <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-10 w-20 animate-pulse rounded-xl bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
