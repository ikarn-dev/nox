"use client";

import { motion } from "framer-motion";
import { BADGE_BG_STYLE } from "@/lib/constants";

export function FeaturesSectionHeader() {
  return (
    <div className="w-full px-4 md:px-8 mb-12 md:mb-14 text-center">
      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25 }}
        className="flex justify-center mb-5"
      >
        <span
          className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 px-4 py-1.5"
          style={BADGE_BG_STYLE}
        >
          Core Features
        </span>
      </motion.div>

      {/* Heading */}
      <div className="overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-4"
        >
          What Nox Does Best
        </motion.h2>
      </div>

      {/* Subtitle */}
      <div className="overflow-hidden">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="font-sans text-white/45 max-w-lg mx-auto text-[14px] leading-relaxed"
        >
          A dual-interface Solana trading system — Telegram bot + web
          dashboard — built for speed, intelligence, and protection.
        </motion.p>
      </div>
    </div>
  );
}
