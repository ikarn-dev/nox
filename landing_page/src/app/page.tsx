"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/ui/hero";
import { BentoGrid, BentoCard } from "@/components/bento/bento-grid";
import { FeaturesSectionHeader } from "@/components/ui/features-header";
import { Footer } from "@/components/ui/footer";

/* ── Lazy-loaded below-fold sections ── */
const ComplaintsSection = dynamic(
  () => import("@/components/ui/complaints-section").then((m) => m.ComplaintsSection),
  { ssr: false }
);
const ComparisonSection = dynamic(
  () => import("@/components/ui/comparison-section").then((m) => m.ComparisonSection),
  { ssr: false }
);
const PricingSection = dynamic(
  () => import("@/components/ui/pricing-section").then((m) => m.PricingSection),
  { ssr: false }
);
const FaqSection = dynamic(
  () => import("@/components/ui/faq-section").then((m) => m.FaqSection),
  { ssr: false }
);

/* ── SVG Backgrounds for feature cards ── */

const GridSvg = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="gridP" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#gridP)" />
  </svg>
);

const RadarSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="none" stroke="white" strokeWidth="0.4" />
    <circle cx="100" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.3" />
    <circle cx="100" cy="100" r="30" fill="none" stroke="white" strokeWidth="0.3" />
    <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="0.3" />
    <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="0.3" />
    <line x1="36" y1="36" x2="164" y2="164" stroke="white" strokeWidth="0.2" />
    <line x1="164" y1="36" x2="36" y2="164" stroke="white" strokeWidth="0.2" />
    <circle cx="130" cy="65" r="3" fill="white" opacity="0.5" />
    <circle cx="70" cy="125" r="2" fill="white" opacity="0.3" />
    <circle cx="150" cy="110" r="2.5" fill="white" opacity="0.4" />
  </svg>
);

const ShieldSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 220" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
    <path d="M100 15 L175 50 L175 115 Q175 170 100 200 Q25 170 25 115 L25 50 Z" fill="none" stroke="white" strokeWidth="0.5" />
    <path d="M100 40 L150 62 L150 108 Q150 148 100 170 Q50 148 50 108 L50 62 Z" fill="none" stroke="white" strokeWidth="0.3" />
    <line x1="100" y1="80" x2="100" y2="140" stroke="white" strokeWidth="0.6" />
    <line x1="75" y1="110" x2="125" y2="110" stroke="white" strokeWidth="0.6" />
  </svg>
);

const CircuitSvg = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="circuitP" width="50" height="50" patternUnits="userSpaceOnUse">
        <circle cx="8" cy="8" r="1.5" fill="white" />
        <circle cx="42" cy="42" r="1.5" fill="white" />
        <circle cx="42" cy="8" r="1" fill="white" />
        <line x1="8" y1="8" x2="42" y2="8" stroke="white" strokeWidth="0.4" />
        <line x1="42" y1="8" x2="42" y2="42" stroke="white" strokeWidth="0.4" />
        <line x1="8" y1="8" x2="8" y2="42" stroke="white" strokeWidth="0.3" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#circuitP)" />
  </svg>
);

const WaveSvg = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 100 Q50 40,100 100 T200 100 T300 100 T400 100" fill="none" stroke="white" strokeWidth="0.6" />
    <path d="M0 120 Q50 60,100 120 T200 120 T300 120 T400 120" fill="none" stroke="white" strokeWidth="0.4" />
    <path d="M0 140 Q50 80,100 140 T200 140 T300 140 T400 140" fill="none" stroke="white" strokeWidth="0.3" />
    <path d="M0 80 Q50 20,100 80 T200 80 T300 80 T400 80" fill="none" stroke="white" strokeWidth="0.3" />
  </svg>
);

const HexSvg = () => (
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="hexP" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(0.7)">
        <path d="M28 2 L52 18 L52 50 L28 66 L4 50 L4 18 Z" fill="none" stroke="white" strokeWidth="0.5" />
        <path d="M28 68 L52 84 L52 100 M28 68 L4 84 L4 100" fill="none" stroke="white" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#hexP)" />
  </svg>
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-[5px] bg-black">
      {/* Hero Section */}
      <Hero />

      {/* Features Bento Grid Section */}
      <section className="w-full relative py-20 md:py-28 bg-black" id="features">
        <FeaturesSectionHeader />

        <BentoGrid>
          {/* Row 1 */}
          <BentoCard
            title="Sub-50ms Sniper Engine"
            description="Yellowstone gRPC streams with pre-built TX templates. Jito bundles blasted across 5 global regions simultaneously."
            label="Speed"
            stat="35ms"
            statLabel="p50"
            svgBg={<GridSvg />}
            className="md:col-span-2"
            index={0}
          />
          <BentoCard
            title="Silent KOL Intelligence"
            description="Behavioral scoring of 1000+ wallets. Tier S wallets buy hours before any shill. Cluster detection auto-snipes on convergence."
            label="Intelligence"
            svgBg={<RadarSvg />}
            index={1}
          />

          {/* Row 2 */}
          <BentoCard
            title="MEV-Free Execution"
            description="Jito Block Engine across NY, Amsterdam, Frankfurt, Tokyo. Zero sandwich attacks, guaranteed."
            label="Protection"
            svgBg={<ShieldSvg />}
            index={2}
          />
          <BentoCard
            title="Threat Detection Engine"
            description="Pre-cached RugCheck scores, honeypot analysis, LP lock verification, ownership concentration checks. All resolved under 2ms."
            label="Safety"
            stat="<2ms"
            statLabel="scan"
            svgBg={<CircuitSvg />}
            className="md:col-span-2"
            index={3}
          />

          {/* Row 3 */}
          <BentoCard
            title="Token Scoring System"
            description="Rule-based + ML hybrid scoring. Volume spike detection, social pre-shill analysis, KOL wallet clustering produce 85%+ win rate."
            label="Analysis"
            stat="85%+"
            statLabel="win rate"
            svgBg={<WaveSvg />}
            className="md:col-span-2"
            index={4}
          />
          <BentoCard
            title="Auto-Exit on KOL Sell"
            description="When 40%+ of tracked KOLs exit, your position auto-liquidates via Jito bundle. No manual intervention needed."
            label="Risk"
            stat="40%"
            statLabel="threshold"
            svgBg={<HexSvg />}
            index={5}
          />
        </BentoGrid>
      </section>

      {/* Complaints & Fixes Section */}
      <ComplaintsSection />

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
