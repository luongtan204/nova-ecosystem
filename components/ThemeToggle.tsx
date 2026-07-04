"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // Guard against hydration mismatch: next-themes reads the theme
  // only on the client, so the server always renders "nothing" here.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // Render a same-size placeholder so layout doesn't shift on hydration
    return <div className="h-9 w-9" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      id="theme-toggle-btn"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        relative flex h-9 w-9 items-center justify-center rounded-full
        text-zinc-600 transition-all duration-300
        hover:bg-zinc-100 hover:text-zinc-900
        dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white
      "
    >
      {/* Sun — visible in dark mode (click → go light) */}
      <Sun
        className={`
          absolute h-5 w-5 transition-all duration-300
          ${isDark ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}
        `}
      />
      {/* Moon — visible in light mode (click → go dark) */}
      <Moon
        className={`
          absolute h-5 w-5 transition-all duration-300
          ${isDark ? "-rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}
        `}
      />
    </button>
  );
}
