"use client";

import { HERO_GRAIN_STYLE } from "@/lib/constants";

/**
 * Matte black frosty gradient background with heavy grain.
 * Lighter gray at top, fading to deep black at bottom.
 *
 * ⚡ Hoisted grain style to module-scope constant to prevent
 * per-render object allocation.
 */

const gradientStyle: React.CSSProperties = {
  background:
    "linear-gradient(180deg, #484848 0%, #353535 15%, #252525 35%, #151515 60%, #080808 85%, #030303 100%)",
};

export function HeroGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Matte gradient */}
      <div className="absolute inset-0" style={gradientStyle} />

      {/* Film grain */}
      <div className="absolute inset-0" style={HERO_GRAIN_STYLE} />
    </div>
  );
}
