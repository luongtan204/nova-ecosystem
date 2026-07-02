import { Smartphone, Watch, Headphones, type LucideIcon } from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

export type IconName = "Smartphone" | "Watch" | "Headphones";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  gradient: string;
  accent: string;
  iconBg: string;
  /** Stored as a string so it can be serialised to localStorage by Zustand persist */
  iconName: IconName;
  badge: string;
};

// ─── Icon lookup (not stored in state, only used at render time) ─────────────

export const iconMap: Record<IconName, LucideIcon> = {
  Smartphone,
  Watch,
  Headphones,
};

// ─── Product catalogue ───────────────────────────────────────────────────────

export const products: Product[] = [
  {
    id: "cybernova-16-pro",
    name: "CyberNova 16 Pro",
    category: "Smartphone",
    price: 899,
    rating: 4.9,
    reviews: 2341,
    gradient: "from-violet-600/20 via-indigo-500/10 to-transparent",
    accent: "text-violet-600 dark:text-violet-400",
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconName: "Smartphone",
    badge: "Bestseller",
  },
  {
    id: "novawatch-ultra",
    name: "NovaWatch Ultra",
    category: "Smartwatch",
    price: 299,
    rating: 4.8,
    reviews: 1187,
    gradient: "from-sky-500/20 via-cyan-500/10 to-transparent",
    accent: "text-sky-600 dark:text-sky-400",
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconName: "Watch",
    badge: "New",
  },
  {
    id: "novabuds-pro",
    name: "NovaBuds Pro",
    category: "Earbuds",
    price: 149,
    rating: 4.7,
    reviews: 3502,
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    accent: "text-emerald-600 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconName: "Headphones",
    badge: "Popular",
  },
];
