"use client";

import { ShoppingCart, Heart, Star, Smartphone, Watch, Headphones } from "lucide-react";
import toast from "react-hot-toast";

const products = [
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
    Icon: Smartphone,
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
    Icon: Watch,
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
    Icon: Headphones,
    badge: "Popular",
  },
];

export default function ProductGrid() {
  const handleAddToCart = (name: string) => {
    toast.success(`${name} added to cart!`);
  };

  const handleWishlist = (name: string) => {
    toast.success(`${name} saved to wishlist.`);
  };

  return (
    <section
      id="ecosystem"
      className="bg-zinc-50 py-24 dark:bg-zinc-900/50"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Flagship Products
          </p>
          <h2 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
            The NovaOS Lineup
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-zinc-500 dark:text-zinc-400">
            Every device is engineered to work as one. Pick any, own the whole
            experience.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              id={`product-${product.id}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
            >
              {/* Badge */}
              <span className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold ${product.accent} bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 ring-1 ring-inset ring-current/20`}>
                {product.badge}
              </span>

              {/* Placeholder Image */}
              <div
                className={`relative flex h-64 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient} bg-zinc-100 dark:bg-zinc-800`}
              >
                <div className={`flex h-24 w-24 items-center justify-center rounded-3xl ${product.iconBg} shadow-lg`}>
                  <product.Icon className={`h-12 w-12 ${product.accent}`} strokeWidth={1.5} />
                </div>
                {/* Subtle grid overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, #71717a20 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {product.category}
                </p>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-700"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {product.rating} ({product.reviews.toLocaleString("en-US")})
                  </span>
                </div>

                {/* Price + Actions */}
                <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-5 dark:border-zinc-800">
                  <span className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                    ${product.price}
                    <span className="ml-1 text-sm font-normal text-zinc-400">USD</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      id={`wishlist-${product.id}`}
                      aria-label={`Add ${product.name} to wishlist`}
                      onClick={() => handleWishlist(product.name)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-all hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 dark:border-zinc-700 dark:hover:border-rose-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
                    >
                      <Heart className="h-4.5 w-4.5 h-[18px] w-[18px]" />
                    </button>
                    <button
                      id={`cart-${product.id}`}
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => handleAddToCart(product.name)}
                      className="flex h-10 items-center gap-1.5 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
