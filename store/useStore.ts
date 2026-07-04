import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

// ─── Types ───────────────────────────────────────────────────────────────────

export type CartItem = Product & { quantity: number };

type StoreState = {
  // ── State ──────────────────────────────────────────────────────────────────
  cart: CartItem[];
  favorites: string[];        // array of product IDs
  recentlyViewed: Product[];  // max 4 items, most-recent first

  // ── Actions ────────────────────────────────────────────────────────────────
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleFavorite: (id: string) => void;
  addRecentlyViewed: (product: Product) => void;
};

// ─── Derived selectors (use these in components for stable references) ───────

export const selectCartCount = (s: StoreState) =>
  s.cart.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (s: StoreState) =>
  s.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const selectFavoriteCount = (s: StoreState) => s.favorites.length;

export const selectIsFavorite = (id: string) => (s: StoreState) =>
  s.favorites.includes(id);

// ─── Store ───────────────────────────────────────────────────────────────────

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      recentlyViewed: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { ...product, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) =>
                  item.id === id ? { ...item, quantity } : item
                ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((fav) => fav !== id)
            : [...state.favorites, id],
        })),

      addRecentlyViewed: (product) =>
        set((state) => {
          // Remove duplicate then prepend, capped at 4
          const deduped = state.recentlyViewed.filter(
            (item) => item.id !== product.id
          );
          return { recentlyViewed: [product, ...deduped].slice(0, 4) };
        }),
    }),
    {
      name: "nova-store", // localStorage key
      // Only persist the data arrays, not the action functions
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        recentlyViewed: state.recentlyViewed,
      }),
    }
  )
);
