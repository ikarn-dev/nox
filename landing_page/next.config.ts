import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do NOT use output: "export" — it generates a static site and
  // strips out all API routes / server-side functionality.
  // Vercel automatically handles the optimal output mode.
  images: { unoptimized: true },
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
