import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ─── SEO: Base URL ─────────────────────────────────────────────────────────────
// TODO: Replace with your production domain before going live, e.g.:
// const BASE_URL = "https://novaos.io";
const BASE_URL = "http://localhost:3000";

// ─── OG Image ─────────────────────────────────────────────────────────────────
// Place a 1200×630 image at /public/og-image.png for social sharing previews.
const OG_IMAGE = `${BASE_URL}/og-image.png`;

// ─── Metadata (Next.js App Router Metadata API) ────────────────────────────────
export const metadata: Metadata = {
  // ── Title ───────────────────────────────────────────────────────────────────
  // 57 chars — trong khung 50-60 ký tự lý tưởng
  title: {
    default: "NovaOS Ecosystem: Tương lai của nền tảng thiết bị thông minh",
    // Trang con sẽ hiển thị: "Tên trang | NovaOS Ecosystem"
    template: "%s | NovaOS Ecosystem",
  },

  // ── Description ─────────────────────────────────────────────────────────────
  // 158 chars — trong khung 150-160 ký tự lý tưởng
  description:
    "Khám phá NovaOS Ecosystem - Tương lai của các thiết bị thông minh được kết nối. Trải nghiệm hệ điều hành tối ưu, đồng bộ mượt mà và bảo mật tuyệt đối.",

  // ── Canonical URL ───────────────────────────────────────────────────────────
  // Tránh duplicate content — chỉ 1 URL chính được index
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, LinkedIn, Zalo, …) ────────────────────────────────
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "NovaOS Ecosystem",
    title: "NovaOS Ecosystem: Tương lai của nền tảng thiết bị thông minh",
    description:
      "Khám phá NovaOS Ecosystem - Tương lai của các thiết bị thông minh được kết nối. Trải nghiệm hệ điều hành tối ưu, đồng bộ mượt mà và bảo mật tuyệt đối.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "NovaOS Ecosystem — Connected Intelligence. Seamless Power.",
      },
    ],
    locale: "vi_VN",
  },

  // ── Twitter / X Card ────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "NovaOS Ecosystem: Tương lai của nền tảng thiết bị thông minh",
    description:
      "Khám phá NovaOS Ecosystem - Tương lai của các thiết bị thông minh được kết nối. Đồng bộ mượt mà, bảo mật tuyệt đối.",
    images: [OG_IMAGE],
    // creator: "@novaos_io",   // uncomment khi có Twitter account
  },

  // ── Robots ──────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Misc ────────────────────────────────────────────────────────────────────
  keywords: [
    "NovaOS",
    "ecosystem",
    "smartphone",
    "smartwatch",
    "earbuds",
    "thiết bị thông minh",
    "hệ điều hành",
    "CyberNova",
    "NovaWatch",
    "NovaBuds",
  ],
  authors: [{ name: "NovaOS Team" }],
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)",  color: "#09090b" },
  ],
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
