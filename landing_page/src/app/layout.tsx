import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.noxbot.xyz"),
  title: "Nox | Solana Sniper",
  description:
    "The fastest memecoin sniper on Solana. Sub-50ms execution, silent KOL intelligence, and zero MEV attacks.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>",
  },
  openGraph: {
    title: "Nox | Solana Sniper",
    description:
      "The fastest memecoin sniper on Solana. Sub-50ms execution, silent KOL intelligence, and zero MEV attacks.",
    type: "website",
  },
};

import { Navbar } from "@/components/ui/navbar";
import { ToastProvider } from "@/components/ui/toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <head>
        {/* Preload critical fonts to avoid render-blocking requests */}
        <link
          rel="preload"
          href="/fonts/Inter.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/Instrument Serif.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Preload hero image for faster LCP */}
        <link
          rel="preload"
          href="/hero_image/hero_text.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className="antialiased bg-black text-white font-sans">
        <ToastProvider>
          <Navbar />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
