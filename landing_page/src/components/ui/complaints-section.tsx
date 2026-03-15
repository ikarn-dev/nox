"use client";

import { motion } from "framer-motion";

const complaints = [
  {
    quote: "Every second I wait is someone else's profit.",
    trader: "Axiom Power User",
    fix: "gRPC + pre-built TX templates — 35ms p50 latency",
  },
  {
    quote: "The fee isn't 1%. It's 1% plus priority plus bribe plus slippage.",
    trader: "BullX NEO User",
    fix: "Flat 0.4% total fee — no priority tuning needed",
  },
  {
    quote: "I don't need the fastest bot. I need one that doesn't let me get destroyed.",
    trader: "BONKbot User",
    fix: "Honeypot block-by-default — RugCheck pre-cache in <2ms",
  },
  {
    quote: "I'm always buying someone else's exit and I don't even know it.",
    trader: "GMGN Copy Trader",
    fix: "Silent KOL registry — follows wallets that trade, not tweet",
  },
  {
    quote: "Show me your p95 and I'll believe you. Every bot claims to be fastest.",
    trader: "Trojan → BullX Switcher",
    fix: "Public rolling 500-trade latency log — p95 ≤ 120ms verified",
  },
  {
    quote: "Failed transactions and timeouts during volatile periods frustrate users.",
    trader: "Trojan Reviewer",
    fix: "Failed TX p50 ≤ 5% — automatic kill switch on anomalies",
  },
  {
    quote: "I'm doing 25 trades and the fees are eating 3 of them for free.",
    trader: "Trojan High-Freq Trader",
    fix: "Auto-exit at 40% KOL cluster sell — no manual babysitting",
  },
  {
    quote: "Copy trading follows public shillers — they've already exited.",
    trader: "GMGN User",
    fix: "Tier S silent wallets only — no shillers, no public influencers",
  },
];

/* Grain overlay */
const grainBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export function ComplaintsSection() {
  return (
    <section className="w-full relative py-20 md:py-28 bg-black" id="complaints">
      {/* Section Header */}
      <div className="w-full px-4 md:px-8 mb-12 md:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-5"
        >
          <span
            className="inline-block font-mono text-[10px] tracking-[0.2em] uppercase text-white/70 px-4 py-1.5"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Real Problems, Real Fixes
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-4"
          >
            Built from Real Complaints
          </motion.h2>
        </div>

        <div className="overflow-hidden pb-1">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-sans text-white/50 max-w-lg mx-auto text-[14px] leading-relaxed"
          >
            Every feature in Nox traces back to a real frustration
            <br />
            from traders who switched away from Trojan, BullX, GMGN, and BONKbot.
          </motion.p>
        </div>
      </div>

      {/* Grid with separate cards, gaps, and solid white borders */}
      <div className="w-full px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complaints.map((item, i) => (
            <div
              key={i}
              className="relative flex flex-col p-6 cursor-default hover:bg-white/[0.02]"
              style={{
                border: "0.5px solid rgba(255,255,255,0.15)",
                background: "linear-gradient(165deg, rgba(82,82,91,0.2) 0%, rgba(82,82,91,0.08) 50%, rgba(82,82,91,0.02) 100%)",
              }}
            >
              {/* Grain overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: grainBg,
                  backgroundSize: "150px 150px",
                  opacity: 0.15,
                  mixBlendMode: "overlay",
                }}
              />

              <div className="relative z-10 flex flex-col h-full">
                {/* Quote */}
                <div className="flex gap-3 mb-auto">
                  <div className="w-[2px] shrink-0 bg-white" />
                  <div>
                    <p className="font-sans text-[14px] leading-[1.55] text-white/80 font-medium">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <span className="font-mono text-[9px] text-white/60 tracking-[0.1em] uppercase mt-1.5 block">
                      — {item.trader}
                    </span>
                  </div>
                </div>

                {/* Fix */}
                <div className="flex items-start gap-2 mt-5 pt-4 border-t border-white/20">
                  <span className="text-emerald-500 text-[11px] mt-px shrink-0">✓</span>
                  <p className="font-sans text-[12px] leading-[1.5] text-white/50">
                    <span className="text-emerald-400 font-medium">Nox fix:</span>{" "}
                    {item.fix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
