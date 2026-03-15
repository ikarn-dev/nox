"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroGradient } from "./hero-gradient";

export function Hero() {
  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden">
      {/* Background — matte frosty gradient with grain */}
      <HeroGradient />

      {/* Hero Content — flat, embedded in the background */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-8 md:px-12 min-h-0">
        {/* NOX 3D Image — slide up reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="relative w-full max-w-[550px] aspect-[2.5/1] mb-2 mix-blend-lighten"
        >
          <Image
            src="/hero_image/hero_text.png"
            alt="NOX"
            fill
            priority
            className="object-contain brightness-[1.3] contrast-[1.15]"
            sizes="(max-width: 768px) 85vw, 550px"
          />
        </motion.div>

        {/* Heading — slide up reveal */}
        <div className="text-center max-w-2xl">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.65) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Snipe Before{" "}
              <span
                className="font-serif italic font-normal"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                the Shill.
              </span>
            </motion.h1>
          </div>

          {/* Subtitle — slide up reveal */}
          <div className="overflow-hidden pb-1">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-sm md:text-base text-white/50 max-w-lg mx-auto mt-3 leading-relaxed"
            >
              The fastest memecoin sniper on Solana.
              <br />
              Front‑run KOL calls before anyone&nbsp;else.
            </motion.p>
          </div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto mx-auto"
        >
          {/* Primary CTA (Left) — Light gradient with heavy grain */}
          <a
            href="#features"
            className="relative flex items-center justify-center w-full sm:w-[150px] h-[46px] text-black text-[13.5px] font-sans font-semibold tracking-wide rounded-md overflow-hidden group transition-all duration-300 border border-white/20 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #d8d8d8 100%)",
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                opacity: 0.55,
                mixBlendMode: "overlay",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "256px 256px",
              }}
            />
            <span className="relative z-10 group-hover:opacity-80 transition-opacity">Launch App</span>
          </a>

          {/* Secondary CTA (Right) — Dark frosted gradient with heavy grain */}
          <a
            href="#docs"
            className="relative flex items-center justify-center w-full sm:w-[150px] h-[46px] text-white/90 text-[13.5px] font-sans font-medium tracking-wide rounded-md overflow-hidden group transition-all duration-300 border border-white/10 hover:scale-[1.02] active:scale-[0.98] hover:border-white/20"
            style={{
              background: "linear-gradient(180deg, #484848 0%, #353535 25%, #151515 70%, #050505 100%)",
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none" 
              style={{
                opacity: 0.55,
                mixBlendMode: "overlay",
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "256px 256px",
              }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors">Read Docs</span>
          </a>
        </motion.div>
      </div>

      {/* Bottom bar — Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative shrink-0 border-t border-white/[0.04] px-8 md:px-12 py-6 flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-8"
      >
        <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-default">
          <span className="text-xs">✦</span>
          <span className="text-sm font-sans font-bold tracking-tight uppercase">Sub-50ms Execution</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-default">
          <span className="text-xs">◒</span>
          <span className="text-sm font-sans font-bold tracking-tight uppercase">Silent KOL Detection</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-default">
          <span className="text-xs">✧</span>
          <span className="text-sm font-sans font-bold tracking-tight uppercase">MEV-Free Swaps</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-default">
          <span className="text-xs">✣</span>
          <span className="text-sm font-sans font-bold tracking-tight uppercase">Auto-Exit Clusters</span>
        </div>
        <div className="hidden md:block w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors cursor-default">
          <span className="text-xs">✺</span>
          <span className="text-sm font-sans font-bold tracking-tight uppercase">85%+ Win Rate</span>
        </div>
      </motion.div>
    </section>
  );
}
