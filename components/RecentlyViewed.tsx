"use client";

import { useStore } from "@/store/useStore";
import { iconMap } from "@/lib/products";
import { ShoppingCart, Clock } from "lucide-react";
import toast from "react-hot-toast";

export default function RecentlyViewed() {
  const recentlyViewed = useStore((s) => s.recentlyViewed);
  const addToCart = useStore((s) => s.addToCart);

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="bg-white py-16 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-10 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-800">
            <Clock className="h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Recently Viewed
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Pick up where you left off
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {recentlyViewed.map((product) => {
            const Icon = iconMap[product.iconName];
            return (
              <div
                key={product.id}
                id={`recently-viewed-${product.id}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 transition-all hover:-translate-y-0.5 hover:border-zinc-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                {/* Mini icon block */}
                <div
                  className={`flex h-28 items-center justify-center bg-gradient-to-br ${product.gradient}`}
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${product.iconBg} shadow`}
                  >
                    <Icon
                      className={`h-7 w-7 ${product.accent}`}
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                      {product.category}
                    </p>
                    <p className="mt-0.5 text-sm font-bold text-zinc-900 dark:text-white">
                      {product.name}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-base font-extrabold text-zinc-900 dark:text-white">
                      ${product.price}
                    </span>
                    <button
                      id={`rv-cart-${product.id}`}
                      aria-label={`Add ${product.name} to cart`}
                      onClick={() => {
                        addToCart(product);
                        toast.success(`${product.name} added to cart!`);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white transition-all hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
