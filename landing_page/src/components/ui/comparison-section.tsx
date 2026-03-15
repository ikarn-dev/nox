"use client";

import { motion } from "framer-motion";
import {
  GRAIN_OVERLAY_STYLE_LIGHT,
  BADGE_BG_STYLE,
} from "@/lib/constants";

/* ─── Data ─── */

const latencyData = [
  { name: "Nox", latency: 35, isNox: true },
  { name: "Axiom", latency: 85, isNox: false },
  { name: "BONKbot", latency: 95, isNox: false },
  { name: "BullX NEO", latency: 110, isNox: false },
  { name: "Trojan", latency: 120, isNox: false },
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

/* ─── Pure CSS Bar Chart ─── */

const maxLatency = Math.max(...latencyData.map((d) => d.latency));

function BarChart() {
  return (
    <div className="flex items-end gap-3 md:gap-4 h-[220px] md:h-[260px] w-full px-2">
      {latencyData.map((entry) => {
        const heightPct = (entry.latency / maxLatency) * 100;
        return (
          <div key={entry.name} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
            {/* Value label */}
            <span
              className={`text-[11px] font-mono ${
                entry.isNox ? "text-white font-medium" : "text-white/40"
              }`}
            >
              {entry.latency}ms
            </span>
            {/* Bar */}
            <div
              className="w-full rounded-t-[3px] transition-all duration-700"
              style={{
                height: `${heightPct}%`,
                background: entry.isNox
                  ? "#ffffff"
                  : "rgba(255,255,255,0.15)",
                border: entry.isNox
                  ? "1px solid rgba(255,255,255,0.6)"
                  : "1px solid rgba(255,255,255,0.08)",
                borderBottom: "none",
                minHeight: "8px",
              }}
            />
            {/* Label */}
            <span className="text-[10px] font-mono text-white/50 text-center leading-tight">
              {entry.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Pure SVG Radar Chart ─── */

function RadarChart() {
  const cx = 140;
  const cy = 130;
  const maxR = 90;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];
  const angleStep = (2 * Math.PI) / radarData.length;
  const startAngle = -Math.PI / 2; // start from top

  const polarToCart = (angle: number, radius: number) => ({
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle),
  });

  const makePolygon = (values: number[], max: number) =>
    radarData
      .map((_, i) => {
        const angle = startAngle + i * angleStep;
        const r = (values[i] / max) * maxR;
        const pt = polarToCart(angle, r);
        return `${pt.x},${pt.y}`;
      })
      .join(" ");

  const noxPoints = makePolygon(
    radarData.map((d) => d.nox),
    100
  );
  const compPoints = makePolygon(
    radarData.map((d) => d.competitors),
    100
  );

  return (
    <svg viewBox="0 0 280 280" className="w-full h-[220px] md:h-[260px]">
      {/* Grid levels */}
      {levels.map((l) => (
        <polygon
          key={l}
          points={radarData
            .map((_, i) => {
              const pt = polarToCart(startAngle + i * angleStep, maxR * l);
              return `${pt.x},${pt.y}`;
            })
            .join(" ")}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />
      ))}

      {/* Axis lines */}
      {radarData.map((_, i) => {
        const pt = polarToCart(startAngle + i * angleStep, maxR);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={pt.x}
            y2={pt.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Competitor area */}
      <polygon
        points={compPoints}
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Nox area */}
      <polygon
        points={noxPoints}
        fill="rgba(255,255,255,0.10)"
        stroke="#ffffff"
        strokeWidth="1.5"
      />

      {/* Nox dots */}
      {radarData.map((d, i) => {
        const angle = startAngle + i * angleStep;
        const r = (d.nox / 100) * maxR;
        const pt = polarToCart(angle, r);
        return (
          <circle key={i} cx={pt.x} cy={pt.y} r="2.5" fill="#ffffff" />
        );
      })}

      {/* Axis labels */}
      {radarData.map((d, i) => {
        const angle = startAngle + i * angleStep;
        const pt = polarToCart(angle, maxR + 18);
        return (
          <text
            key={i}
            x={pt.x}
            y={pt.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-white/50 text-[10px] font-mono"
            style={{ fontSize: "10px", fontFamily: "monospace" }}
          >
            {d.metric}
          </text>
        );
      })}

      {/* Legend */}
      <line x1="60" y1="265" x2="75" y2="265" stroke="#ffffff" strokeWidth="1.5" />
      <text x="80" y="265" dominantBaseline="middle" className="fill-white/50" style={{ fontSize: "10px", fontFamily: "monospace" }}>
        Nox
      </text>
      <line x1="130" y1="265" x2="145" y2="265" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4 4" />
      <text x="150" y="265" dominantBaseline="middle" className="fill-white/50" style={{ fontSize: "10px", fontFamily: "monospace" }}>
        Avg Competitor
      </text>
    </svg>
  );
}

/* ─── Hoisted styles ─── */

const containerBgStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.8) 100%)",
};

const chartBorderBottom: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.06)",
};

const chartBorderLeft: React.CSSProperties = {
  borderBottom: "1px solid rgba(255,255,255,0.06)",
  borderLeft: "1px solid rgba(255,255,255,0.06)",
};

const tagBorderStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.08)",
};

/* ─── Component ─── */

export function ComparisonSection() {
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
            style={BADGE_BG_STYLE}
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
          style={containerBgStyle}
        >
          {/* Grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={GRAIN_OVERLAY_STYLE_LIGHT}
          />

          <div className="relative z-10 flex flex-col w-full">
            {/* ─── Charts Row ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Bar Chart — Latency */}
              <div className="p-6 md:p-8" style={chartBorderBottom}>
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
                    style={tagBorderStyle}
                  >
                    Target
                  </span>
                </div>

                <BarChart />
              </div>

              {/* Radar Chart — Multi-Metric */}
              <div className="p-6 md:p-8" style={chartBorderLeft}>
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
                    style={tagBorderStyle}
                  >
                    Target
                  </span>
                </div>

                <RadarChart />
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
