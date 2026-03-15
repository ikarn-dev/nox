"use client";

/**
 * Matte black frosty gradient background with heavy grain.
 * Lighter gray at top, fading to deep black at bottom.
 */
export function HeroGradient() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Matte gradient — brighter top for more visible whites */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #484848 0%, #353535 15%, #252525 35%, #151515 60%, #080808 85%, #030303 100%)",
        }}
      />

      {/* Film grain — heavier, more visible */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.55,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
