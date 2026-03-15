import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nox.vercel.app"),
  title: "Nox — Build Faster. Scale Infinite.",
  description:
    "A highly optimized, Next.js 16 powered landing page with premium design, smooth animations, and Bento Grid layouts.",
  openGraph: {
    title: "Nox — Build Faster. Scale Infinite.",
    description:
      "A highly optimized, Next.js 16 powered landing page with premium design, smooth animations, and Bento Grid layouts.",
    type: "website",
  },
};

import { Navbar } from "@/components/ui/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="antialiased bg-black text-white font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
