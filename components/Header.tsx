"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Zap } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useStore, selectCartCount, selectFavoriteCount } from "@/store/useStore";

const navLinks = ["Ecosystem", "Specs"];

// ─── Badge (client-only to avoid hydration mismatch with persisted state) ────

function Badge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-bold text-white">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export default function Header() {
  const cartCount = useStore(selectCartCount);
  const favoriteCount = useStore(selectFavoriteCount);

  // Defer badge rendering until after client hydration so persisted
  // localStorage state doesn't cause a server/client mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/60 bg-white/80 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-white"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
            <Zap className="h-4 w-4 text-white" strokeWidth={2.5} />
          </span>
          NovaOS
        </a>

        {/* Nav Links */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <ThemeToggle />

          {/* Favorites */}
          <button
            id="header-favorites-btn"
            aria-label={`Favorites (${favoriteCount} items)`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Heart className="h-5 w-5" />
            {mounted && <Badge count={favoriteCount} />}
          </button>

          {/* Cart */}
          <button
            id="header-cart-btn"
            aria-label={`Cart (${cartCount} items)`}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <ShoppingCart className="h-5 w-5" />
            {mounted && <Badge count={cartCount} />}
          </button>
        </div>
      </div>
    </header>
  );
}
