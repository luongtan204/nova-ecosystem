"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/components/ChatWidget";
import CartDrawer from "@/components/CartDrawer";
import { CartDrawerProvider } from "@/components/CartDrawerContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <CartDrawerProvider>
        {children}
        <CartDrawer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "hsl(var(--foreground))",
              color: "hsl(var(--background))",
              borderRadius: "0.75rem",
              fontSize: "0.875rem",
            },
          }}
        />
        <ChatWidget />
      </CartDrawerProvider>
    </ThemeProvider>
  );
}
