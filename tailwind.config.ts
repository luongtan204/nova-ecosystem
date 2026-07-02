import type { Config } from "tailwindcss";

/**
 * Tailwind v4 note:
 * - Color tokens and dark mode are now configured in globals.css via @theme and @custom-variant.
 * - This file is kept for content path auto-detection and plugin compatibility.
 */
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
