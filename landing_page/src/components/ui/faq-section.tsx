"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { BADGE_BG_STYLE } from "@/lib/constants";

/* ─── FAQ Data ─── */

const faqs = [
  {
    q: "What is Nox?",
    a: "Nox is a dual-interface Solana memecoin trading system — a Telegram bot for fast mobile execution and a web dashboard for analytics. It's built for sub-50ms snipe execution, silent KOL intelligence, and MEV-free trade submission.",
  },
  {
    q: "How does the pricing work?",
    a: "The free Shadow tier charges a flat 0.4% fee per trade — half the 1% industry standard. Paid tiers (Phantom at $49/mo, Eclipse at $99/mo) have zero trading fees with unlimited trades, plus access to advanced features like KOL tracking, auto-exit, and priority execution.",
  },
  {
    q: "What is Silent KOL Intelligence?",
    a: "Nox tracks 1,000+ wallets and scores them into Tier S, A, and B based on behavioral analysis — not social activity. Tier S wallets are silent accumulators who buy hours before any public shill. When 3+ high-tier wallets converge on a token, Nox can auto-snipe.",
  },
  {
    q: "How fast is the execution engine?",
    a: "Our target is sub-50ms p50 latency. The engine uses Yellowstone gRPC streams with pre-built transaction templates, blasting Jito bundles across 5 global regions simultaneously. Competitors typically operate at 250–500ms+.",
  },
  {
    q: "Is my wallet safe?",
    a: "Yes. Nox uses a non-custodial architecture — your private key never leaves your device or bot session. Keys are encrypted with AES-256 in session storage. Trades above 1 SOL require 2FA confirmation. A kill switch lets you revoke all access instantly.",
  },
  {
    q: "What is MEV protection?",
    a: "MEV (Maximal Extractable Value) attacks like sandwich trades can cost you significantly. Nox routes all transactions through Jito Block Engine across 5 regions, guaranteeing zero sandwich attacks on your trades.",
  },
  {
    q: "What does the auto-exit feature do?",
    a: "When 40%+ of the KOL wallets that triggered your entry start selling, Nox auto-liquidates your position via Jito bundle — no manual intervention needed. This protects you from being the last one out.",
  },
  {
    q: "Which blockchain does Nox support?",
    a: "Nox is built exclusively for Solana mainnet. It supports Raydium, Orca, Jupiter, and Pump.fun token launches.",
  },
];

/* ─── Component ─── */

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  }, []);

  return (
    <section className="w-full relative py-20 md:py-32 bg-black" id="faq">
      {/* Header */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-12 md:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-5"
        >
          <span
            className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 px-4 py-1.5"
            style={BADGE_BG_STYLE}
          >
            FAQ
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-6"
        >
          Common Questions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="font-sans text-white/50 max-w-xl mx-auto text-[15px] leading-relaxed"
        >
          Everything you need to know about Nox.
        </motion.p>
      </div>

      {/* FAQ Items */}
      <div className="w-full max-w-[720px] mx-auto px-4 md:px-8">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-5 md:py-6 text-left gap-4"
              >
                <span className="text-white/90 text-[15px] md:text-base font-sans font-medium leading-snug">
                  {faq.q}
                </span>
                <span className="shrink-0 text-white/30">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-white/45 text-[14px] font-sans leading-relaxed pb-5 md:pb-6 pr-8">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
