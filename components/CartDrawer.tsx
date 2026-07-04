"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Zap,
  ArrowRight,
} from "lucide-react";
import { iconMap } from "@/lib/products";
import {
  useStore,
  selectCartTotal,
} from "@/store/useStore";
import { useCartDrawer } from "@/components/CartDrawerContext";

// ─── Animation variants ───────────────────────────────────────────────────────

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring" as const, stiffness: 320, damping: 34 },
  },
  exit: {
    x: "100%",
    transition: { type: "tween" as const, duration: 0.22, ease: "easeIn" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -24, scale: 0.95, transition: { duration: 0.2 } },
};

// ─── Cart Item Row ────────────────────────────────────────────────────────────

function CartItemRow({ item }: { item: ReturnType<typeof useStore>["cart"][number] }) {
  const removeFromCart = useStore((s) => s.removeFromCart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const Icon = iconMap[item.iconName];

  return (
    <motion.div
      layout
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group flex items-center gap-4 rounded-2xl border border-zinc-100 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      {/* Icon / Thumbnail */}
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
      >
        <Icon className={`h-7 w-7 ${item.accent}`} strokeWidth={1.5} />
      </div>

      {/* Details */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
          {item.name}
        </p>
        <p className="text-xs text-zinc-400">{item.category}</p>
        <p className="text-sm font-bold text-violet-600 dark:text-violet-400">
          ${(item.price * item.quantity).toLocaleString("en-US")}
        </p>
      </div>

      {/* Quantity controls */}
      <div className="flex shrink-0 flex-col items-end gap-2">
        <button
          id={`cart-remove-${item.id}`}
          aria-label={`Remove ${item.name}`}
          onClick={() => removeFromCart(item.id)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 opacity-0 transition-all hover:bg-rose-50 hover:text-rose-500 group-hover:opacity-100 dark:hover:bg-rose-950/40 dark:hover:text-rose-400"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        <div className="flex items-center overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
          <button
            id={`cart-decrease-${item.id}`}
            aria-label="Decrease quantity"
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Minus className="h-3 w-3" />
          </button>
          <span className="flex h-7 w-7 items-center justify-center text-xs font-bold text-zinc-900 dark:text-white">
            {item.quantity}
          </span>
          <button
            id={`cart-increase-${item.id}`}
            aria-label="Increase quantity"
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="flex h-7 w-7 items-center justify-center text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyCart({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1, transition: { duration: 0.35 } }}
      className="flex flex-1 flex-col items-center justify-center gap-6 px-8 py-16 text-center"
    >
      <div className="relative">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-violet-600/20 to-indigo-500/10">
          <ShoppingBag className="h-12 w-12 text-violet-500/50" />
        </div>
        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-xs font-bold text-zinc-500 dark:bg-zinc-700 dark:text-zinc-400">
          0
        </span>
      </div>
      <div>
        <p className="text-lg font-bold text-zinc-900 dark:text-white">
          Giỏ hàng đang trống
        </p>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Thêm sản phẩm vào giỏ để bắt đầu mua sắm!
        </p>
      </div>
      <button
        id="cart-browse-products"
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        Khám phá sản phẩm
        <ArrowRight className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

// ─── Cart Drawer ──────────────────────────────────────────────────────────────

export default function CartDrawer() {
  const { isOpen, close } = useCartDrawer();
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const total = useStore(selectCartTotal);
  const itemCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, close]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="cart-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={close}
            className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
            aria-hidden
          />

          {/* Drawer Panel */}
          <motion.aside
            key="cart-panel"
            role="dialog"
            aria-label="Shopping cart"
            aria-modal="true"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-y-0 right-0 z-[70] flex w-full flex-col bg-zinc-50 shadow-2xl dark:bg-zinc-950 sm:max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/30">
                  <ShoppingCart className="h-4.5 w-4.5 text-white" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900 dark:text-white">
                    Giỏ hàng
                  </h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {itemCount === 0
                      ? "Chưa có sản phẩm"
                      : `${itemCount} sản phẩm`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {cart.length > 0 && (
                  <button
                    id="cart-clear-all"
                    onClick={clearCart}
                    className="text-xs text-zinc-400 transition-colors hover:text-rose-500 dark:hover:text-rose-400"
                  >
                    Xóa tất cả
                  </button>
                )}
                <button
                  id="cart-close-btn"
                  onClick={close}
                  aria-label="Close cart"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <EmptyCart onClose={close} />
                ) : (
                  <motion.div
                    key="cart-items"
                    className="flex flex-col gap-3"
                    initial={false}
                  >
                    {cart.map((item) => (
                      <CartItemRow key={item.id} item={item} />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer / Checkout */}
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.div
                  key="cart-footer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
                  exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
                  className="border-t border-zinc-200 px-6 py-6 dark:border-zinc-800"
                >
                  {/* Order summary */}
                  <div className="mb-5 space-y-2">
                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Tạm tính ({itemCount} sp)</span>
                      <span>${total.toLocaleString("en-US")}</span>
                    </div>
                    <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                      <span>Phí vận chuyển</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                        Miễn phí
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-zinc-100 pt-2 dark:border-zinc-800">
                      <span className="font-bold text-zinc-900 dark:text-white">
                        Tổng cộng
                      </span>
                      <span className="text-xl font-extrabold text-violet-600 dark:text-violet-400">
                        ${total.toLocaleString("en-US")}
                      </span>
                    </div>
                  </div>

                  {/* Checkout button */}
                  <motion.button
                    id="cart-checkout-btn"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-shadow hover:shadow-violet-500/50"
                  >
                    <Zap className="h-4 w-4" />
                    Tiến hành thanh toán
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>

                  <p className="mt-3 text-center text-xs text-zinc-400">
                    🔒 Thanh toán bảo mật · Đổi trả trong 30 ngày
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
