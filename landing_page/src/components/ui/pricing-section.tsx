"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import {
  GRAIN_OVERLAY_STYLE_LIGHT,
  GRAIN_OVERLAY_STYLE_BUTTON,
  BADGE_BG_STYLE,
} from "@/lib/constants";

/* ─── Hoisted styles ─── */

const grainOverlayPricing: React.CSSProperties = {
  ...GRAIN_OVERLAY_STYLE_LIGHT,
  opacity: 0.1,
};

const filledCtaStyle: React.CSSProperties = {
  background: "linear-gradient(180deg, #ffffff 0%, #d8d8d8 100%)",
  border: "1px solid rgba(255,255,255,0.3)",
};

const outlineCtaStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.15)",
};

const dividerStyle: React.CSSProperties = {
  background:
    "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
};



/* ─── Data ─── */

interface PricingTier {
  name: string;
  tag: string;
  tagSecondary?: string;
  price: string;
  priceLabel: string;
  description: string;
  cta: string;
  ctaStyle: "outline" | "filled";
  popular?: boolean;
  benefits: string[];
}

const tiers: PricingTier[] = [
  {
    name: "Shadow",
    tag: "Free",
    price: "0.4%",
    priceLabel: "Per trade",
    description: "Half the industry standard. No signup fee, no commitment.",
    cta: "Start Free",
    ctaStyle: "outline",
    benefits: [
      "0.4% per trade — competitors charge 1%",
      "Standard execution speed",
      "Basic token scoring",
      "Community KOL feed (Tier B only)",
      "Manual buy & sell",
      "RugCheck integration",
      "1 active snipe position",
      "Streak rewards up to 25% fee rebate",
    ],
  },
  {
    name: "Phantom",
    tag: "Pro",
    tagSecondary: "Monthly",
    price: "$49",
    priceLabel: "Per month",
    description: "Zero trading fees. Priority execution. Built for volume.",
    cta: "Get Phantom",
    ctaStyle: "filled",
    popular: true,
    benefits: [
      "0% trading fee — unlimited trades",
      "Priority execution queue",
      "Advanced token scoring + ML signals",
      "Tier A & B KOL tracking",
      "Auto-exit on KOL sell signals",
      "Honeypot & LP lock analysis",
      "5 active snipe positions",
      "MEV-protected swaps via Jito",
      "Telegram alerts & notifications",
    ],
  },
  {
    name: "Eclipse",
    tag: "Whale",
    tagSecondary: "Monthly",
    price: "$99",
    priceLabel: "Per month",
    description: "Sub-50ms execution. Full KOL intelligence. No limits.",
    cta: "Go Eclipse",
    ctaStyle: "filled",
    benefits: [
      "0% trading fee — unlimited trades",
      "Sub-50ms priority execution engine",
      "Full KOL intelligence (Tier S/A/B)",
      "Cluster convergence auto-snipe",
      "Auto-exit with Jito bundles",
      "AES-256 encrypted keys + kill switch",
      "Unlimited active snipe positions",
      "MEV-free Jito Block Engine (5 regions)",
      "Volume spike & pre-shill detection",
      "Dedicated support channel",
    ],
  },
];

/* ─── Component ─── */

export function PricingSection() {
  return (
    <section className="w-full relative py-20 md:py-32 bg-black" id="pricing">
      {/* Section Header */}
      <div className="w-full px-4 md:px-8 lg:px-16 mb-12 md:mb-20 text-center">
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
            Pricing
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: 0.1,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-6"
          >
            Choose Your Edge
          </motion.h2>
        </div>

        <div className="overflow-hidden pb-1">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: 0.2,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="font-sans text-white/50 max-w-xl mx-auto text-[15px] leading-relaxed"
          >
            Lower fees than every competitor. Pick a plan, start sniping.
            Upgrade or downgrade anytime.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-0 max-w-[1200px] mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: 0.3 + i * 0.12,
                ease: [0.25, 0.4, 0.25, 1],
              }}
              className={`relative flex flex-col overflow-hidden ${
                tier.popular ? "md:-mt-4 md:-mb-4 md:z-10" : ""
              }`}
              style={{
                border: tier.popular
                  ? "1px solid rgba(255,255,255,0.2)"
                  : "1px solid rgba(255,255,255,0.08)",
                background: tier.popular
                  ? "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.95) 100%)"
                  : "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.9) 100%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                style={grainOverlayPricing}
              />

              <div className="relative z-10 flex flex-col h-full p-5 md:p-6">
                {/* Header: Name + Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <h3 className="text-white text-lg font-medium tracking-tight">
                      {tier.name}
                    </h3>
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest text-white/50 px-2 py-0.5"
                      style={{
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {tier.tag}
                    </span>
                  </div>
                  {tier.popular && (
                    <span
                      className="text-[10px] font-mono uppercase tracking-widest text-white/90 px-2.5 py-1"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      Popular
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-white text-4xl md:text-5xl font-bold tracking-tighter leading-none">
                    {tier.price}
                  </span>
                  <span className="text-white/30 text-sm ml-2 font-mono">
                    {tier.priceLabel}
                  </span>
                </div>

                {/* CTA Button — full width */}
                <button
                  className={`relative w-full text-[13px] font-semibold tracking-wide py-3 overflow-hidden transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] ${
                    tier.ctaStyle === "filled"
                      ? "text-black"
                      : "text-white/90"
                  }`}
                  style={
                    tier.ctaStyle === "filled" ? filledCtaStyle : outlineCtaStyle
                  }
                >
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={GRAIN_OVERLAY_STYLE_BUTTON}
                  />
                  <span className="relative z-10">{tier.cta}</span>
                </button>

                {/* Divider */}
                <div
                  className="w-full h-px my-5"
                  style={dividerStyle}
                />

                {/* Benefits */}
                <div className="flex flex-col gap-2.5">
                  <p className="text-white/40 text-[13px] leading-relaxed mb-1">
                    {tier.description}
                  </p>
                  {tier.benefits.map((benefit, j) => (
                    <div key={j} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        className={`mt-0.5 shrink-0 ${
                          tier.popular ? "text-white/70" : "text-white/30"
                        }`}
                        strokeWidth={2}
                      />
                      <span className="text-white/55 text-[13px] leading-snug">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
