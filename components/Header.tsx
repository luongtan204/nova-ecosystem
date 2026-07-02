"use client";

import { ShoppingCart, Heart, Zap } from "lucide-react";

const navLinks = ["Ecosystem", "Specs"];

export default function Header() {
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
          <button
            id="header-favorites-btn"
            aria-label="Favorites"
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            id="header-cart-btn"
            aria-label="Cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 transition-all hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-2 w-2 rounded-full bg-violet-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
