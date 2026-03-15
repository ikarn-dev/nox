"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
  Cell,
} from "recharts";

/* ─── Data ─── */

const latencyData = [
  { name: "Nox", latency: 35, isNox: true },
  { name: "Axiom", latency: 85, isNox: false },
  { name: "Trojan", latency: 120, isNox: false },
  { name: "BONKbot", latency: 95, isNox: false },
  { name: "BullX NEO", latency: 110, isNox: false },
  { name: "GMGN AI", latency: 180, isNox: false },
];

const radarData = [
  { metric: "Speed", nox: 95, competitors: 55 },
  { metric: "Low Fees", nox: 92, competitors: 40 },
  { metric: "Security", nox: 98, competitors: 50 },
  { metric: "KOL Intel", nox: 90, competitors: 35 },
  { metric: "Transparency", nox: 95, competitors: 45 },
];

const competitors = [
  {
    name: "Nox",
    latency: "~35ms p50",
    fee: "Flat 0.4%",
    security: "AES-256 + Kill Switch",
    kol: "Tier S/A/B Scoring",
    highlight: true,
  },
  {
    name: "Axiom Trade",
    latency: "~85ms",
    fee: "0.75–0.95%",
    security: "Partial",
    kol: "Public Tracking",
    highlight: false,
  },
  {
    name: "Trojan",
    latency: "~120ms",
    fee: "1.0% + Priority",
    security: "Partial",
    kol: "None",
    highlight: false,
  },
  {
    name: "BONKbot",
    latency: "~95ms",
    fee: "0.85–1.0%",
    security: "Partial",
    kol: "None",
    highlight: false,
  },
  {
    name: "BullX NEO",
    latency: "~110ms",
    fee: "0.9–1.0%",
    security: "Partial",
    kol: "None",
    highlight: false,
  },
  {
    name: "GMGN AI",
    latency: "~180ms",
    fee: "~1.0% + Tips",
    security: "Questionable",
    kol: "Public Tracking",
    highlight: false,
  },
];

/* ─── Custom Tooltip ─── */

function LatencyTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 text-xs font-mono"
      style={{
        background: "rgba(0,0,0,0.9)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      <p className="text-white/70 mb-0.5">{label}</p>
      <p className="text-white font-medium">{payload[0].value}ms</p>
    </div>
  );
}

function RadarTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="px-3 py-2 text-xs font-mono"
      style={{
        background: "rgba(0,0,0,0.9)",
        border: "1px solid rgba(255,255,255,0.15)",
        backdropFilter: "blur(8px)",
      }}
    >
      {payload.map((entry, i) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {entry.value}
        </p>
      ))}
    </div>
  );
}

/* ─── Grain BG ─── */

const grainBg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ─── Component ─── */

export function ComparisonSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <section className="w-full relative py-20 md:py-32 bg-black" id="comparison">
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
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Benchmark Targets
          </span>
        </motion.div>

        <div className="overflow-hidden">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-3xl md:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1] mb-6"
          >
            Nox vs. The Field
          </motion.h2>
        </div>

        <div className="overflow-hidden pb-1">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="font-sans text-white/50 max-w-xl mx-auto text-[15px] leading-relaxed"
          >
            Engineering targets for our proprietary execution engine. Lower latency,
            lower fees, and zero-trust architecture — benchmarked against every major
            Solana sniper bot in 2026.
          </motion.p>
        </div>
      </div>

      {/* Charts & Table Container */}
      <div className="w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.12)",
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.8) 100%)",
          }}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: grainBg,
              backgroundSize: "150px 150px",
              opacity: 0.12,
              mixBlendMode: "overlay",
              zIndex: 0,
            }}
          />

          <div className="relative z-10 flex flex-col w-full">
            {/* ─── Charts Row ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0">
              {/* Bar Chart — Latency */}
              <div
                className="p-6 md:p-8"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderRight: "none",
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white text-lg font-medium tracking-tight">
                      Execution Latency
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      p50 latency targets · lower is better
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest text-white/30 px-2 py-1"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    Target
                  </span>
                </div>

                <div className="w-full h-[260px] md:h-[300px]">
                  {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={latencyData}
                      margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
                      barCategoryGap="20%"
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgba(255,255,255,0.06)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "monospace" }}
                        axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11, fontFamily: "monospace" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `${v}ms`}
                      />
                      <Tooltip
                        content={<LatencyTooltip />}
                        cursor={{ fill: "rgba(255,255,255,0.03)" }}
                      />
                      <Bar dataKey="latency" radius={[3, 3, 0, 0]} maxBarSize={48}>
                        {latencyData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.isNox ? "#ffffff" : "rgba(255,255,255,0.15)"}
                            stroke={entry.isNox ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.08)"}
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* Radar Chart — Multi-Metric */}
              <div
                className="p-6 md:p-8"
                style={{
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  borderLeft: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-white text-lg font-medium tracking-tight">
                      Capability Matrix
                    </h3>
                    <p className="text-white/40 text-sm mt-1">
                      Multi-metric comparison · higher is better
                    </p>
                  </div>
                  <span
                    className="text-[10px] font-mono uppercase tracking-widest text-white/30 px-2 py-1"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    Target
                  </span>
                </div>

                <div className="w-full h-[260px] md:h-[300px]">
                  {mounted && (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                      <PolarGrid stroke="rgba(255,255,255,0.08)" />
                      <PolarAngleAxis
                        dataKey="metric"
                        tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11, fontFamily: "monospace" }}
                      />
                      <Radar
                        name="Nox"
                        dataKey="nox"
                        stroke="#ffffff"
                        fill="rgba(255,255,255,0.12)"
                        fillOpacity={1}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Avg Competitor"
                        dataKey="competitors"
                        stroke="rgba(255,255,255,0.3)"
                        fill="rgba(255,255,255,0.03)"
                        fillOpacity={1}
                        strokeWidth={1}
                        strokeDasharray="4 4"
                      />
                      <Tooltip content={<RadarTooltip />} />
                      <Legend
                        wrapperStyle={{
                          fontSize: "11px",
                          fontFamily: "monospace",
                          color: "rgba(255,255,255,0.5)",
                        }}
                        iconType="line"
                        formatter={(value: string) => (
                          <span style={{ color: "rgba(255,255,255,0.5)" }}>{value}</span>
                        )}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Comparison Table ─── */}
            <div className="w-full overflow-x-auto">
              <div className="min-w-[800px] w-full px-6 md:px-8 py-6">
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 py-3 text-[11px] font-mono tracking-wider text-white/35 uppercase mb-2">
                  <div className="col-span-1 pl-4">Platform</div>
                  <div className="col-span-1">Latency</div>
                  <div className="col-span-1">Fee Structure</div>
                  <div className="col-span-1">KOL Tracking</div>
                  <div className="col-span-1">Security</div>
                </div>

                {/* Table Rows */}
                <div className="flex flex-col gap-1.5">
                  {competitors.map((comp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                      className="grid grid-cols-5 gap-4 py-3.5 items-center transition-colors"
                      style={{
                        background: comp.highlight
                          ? "linear-gradient(90deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)"
                          : "rgba(255,255,255,0.015)",
                        border: comp.highlight
                          ? "1px solid rgba(255,255,255,0.2)"
                          : "1px solid rgba(255,255,255,0.04)",
                      }}
                    >
                      <div className="col-span-1 pl-4 flex items-center gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            comp.highlight
                              ? "bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]"
                              : "bg-white/20"
                          }`}
                        />
                        <span
                          className={`font-medium text-sm ${
                            comp.highlight ? "text-white" : "text-white/60"
                          }`}
                        >
                          {comp.name}
                        </span>
                        {comp.highlight && (
                          <span
                            className="text-[9px] font-mono uppercase tracking-widest text-white/40 px-1.5 py-0.5 ml-1"
                            style={{ border: "1px solid rgba(255,255,255,0.12)" }}
                          >
                            Target
                          </span>
                        )}
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`text-[13px] ${
                            comp.highlight ? "text-white font-medium" : "text-white/50"
                          }`}
                        >
                          {comp.latency}
                        </span>
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`text-[13px] ${
                            comp.highlight ? "text-white" : "text-white/50"
                          }`}
                        >
                          {comp.fee}
                        </span>
                      </div>

                      <div className="col-span-1">
                        <span
                          className={`text-[13px] ${
                            comp.highlight ? "text-white/80" : "text-white/50"
                          }`}
                        >
                          {comp.kol}
                        </span>
                      </div>

                      <div className="col-span-1 pr-4">
                        <span
                          className={`text-[13px] ${
                            comp.highlight ? "text-white/80" : "text-white/50"
                          }`}
                        >
                          {comp.security}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
