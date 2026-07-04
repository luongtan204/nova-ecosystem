"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { products, iconMap } from "@/lib/products";
import { useStore, selectIsFavorite } from "@/store/useStore";
import SkeletonCard from "@/components/SkeletonCard";

// ─── Animation variants ───────────────────────────────────────────────────────

const gridContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const sectionHeader = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

// ─── Individual product card ──────────────────────────────────────────────────

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleFavorite = useStore((s) => s.toggleFavorite);
  const addRecentlyViewed = useStore((s) => s.addRecentlyViewed);
  const isFavorite = useStore(selectIsFavorite(product.id));

  const Icon = iconMap[product.iconName];

  const handleAddToCart = () => {
    addToCart(product);
    addRecentlyViewed(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    toast.success(
      isFavorite
        ? `${product.name} removed from wishlist.`
        : `${product.name} saved to wishlist.`
    );
  };

  return (
    <motion.article
      id={`product-${product.id}`}
      variants={cardVariant}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: "easeOut" } }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Badge */}
      <span
        className={`absolute left-4 top-4 z-10 rounded-full px-3 py-1 text-xs font-semibold ${product.accent} bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 ring-1 ring-inset ring-current/20`}
      >
        {product.badge}
      </span>

      {/* Placeholder Image */}
      <div
        className={`relative flex h-64 w-full items-center justify-center overflow-hidden bg-gradient-to-br ${product.gradient} bg-zinc-100 dark:bg-zinc-800`}
      >
        <motion.div
          className={`flex h-24 w-24 items-center justify-center rounded-3xl ${product.iconBg} shadow-lg`}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Icon className={`h-12 w-12 ${product.accent}`} strokeWidth={1.5} />
        </motion.div>
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
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-zinc-300 dark:text-zinc-700"
                }`}
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
            <motion.button
              id={`wishlist-${product.id}`}
              aria-label={
                isFavorite
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
              onClick={handleToggleFavorite}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex h-10 w-10 items-center justify-center rounded-xl border transition-colors ${
                isFavorite
                  ? "border-rose-300 bg-rose-50 text-rose-500 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                  : "border-zinc-200 text-zinc-500 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-500 dark:border-zinc-700 dark:hover:border-rose-800 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
              }`}
            >
              <Heart
                className="h-[18px] w-[18px]"
                fill={isFavorite ? "currentColor" : "none"}
              />
            </motion.button>

            <motion.button
              id={`cart-${product.id}`}
              aria-label={`Add ${product.name} to cart`}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-10 items-center gap-1.5 rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductGrid() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="ecosystem" className="bg-zinc-50 py-24 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          variants={sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
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
        </motion.div>

        {/* Grid — skeleton while loading, real cards after */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="skeletons"
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="products"
              className="grid grid-cols-1 gap-8 md:grid-cols-3"
              variants={gridContainer}
              initial="hidden"
              animate="visible"
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
