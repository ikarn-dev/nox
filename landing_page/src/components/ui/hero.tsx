"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HeroGradient } from "./hero-gradient";
import { EarlyAccessForm } from "./early-access-form";
import { HERO_GRAIN_STYLE } from "@/lib/constants";

/* ── Hoisted styles — prevent per-render allocation ── */
const headingGradient: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.65) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const headingSpanGradient: React.CSSProperties = {
  background:
    "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

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
            duration: 0.4,
            delay: 0.05,
            ease: [0.25, 0.4, 0.25, 1],
          }}
          className="relative w-full max-w-[550px] aspect-[2.5/1] mb-2 mix-blend-lighten"
        >
          <Image
            src="/hero_image/hero_text.webp"
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
              transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight whitespace-nowrap"
              style={headingGradient}
            >
              Snipe Before{" "}
              <span
                className="font-serif italic font-normal"
                style={headingSpanGradient}
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
              transition={{ duration: 0.35, delay: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
              className="text-sm md:text-base text-white/50 max-w-lg mx-auto mt-3 leading-relaxed"
            >
              The fastest memecoin sniper on Solana.
              <br />
              Front‑run KOL calls before anyone&nbsp;else.
            </motion.p>
          </div>
        </div>

        {/* CTA Form */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto mx-auto"
        >
          <EarlyAccessForm />
        </motion.div>
      </div>

      {/* Bottom bar — Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="relative shrink-0 border-t border-white/[0.04] px-2 sm:px-6 md:px-12 py-3 md:py-6"
      >
        <div className="flex items-center justify-between w-full">
          {[
            "Sub-50ms Execution",
            "Silent KOL Detection",
            "MEV-Free Swaps",
            "Auto-Exit Clusters",
            "85%+ Win Rate",
          ].map((label, i) => (
            <div key={label} className="flex items-center">
              {i > 0 && (
                <div className="w-px h-3 md:h-4 bg-white/10 shrink-0 mr-1.5 sm:mr-3 md:mr-4" />
              )}
              <div className="flex items-center gap-1 sm:gap-2 text-white/50 cursor-default">
                <span className="text-[7px] sm:text-[10px] md:text-xs">✦</span>
                <span className="text-[7px] sm:text-[10px] md:text-sm font-sans font-bold tracking-tight uppercase whitespace-nowrap">
                  {label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
