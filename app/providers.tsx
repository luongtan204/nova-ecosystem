"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import ChatWidget from "@/components/ChatWidget";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
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
    </ThemeProvider>
  );
}
