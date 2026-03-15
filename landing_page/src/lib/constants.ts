/**
 * Shared constants — hoisted to module scope to avoid
 * re-creating identical objects / strings on every render.
 */

/* ── Grain SVG data URI ─────────────────────────────────────────────────────
 * Used as a background-image across hero, complaints, comparison, and pricing.
 * Extracting it here eliminates ~5 duplicate large strings in the heap.
 */
export const GRAIN_BG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export const GRAIN_BG_HERO = `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

/* ── Shared inline styles moved to module scope ─────────────────────────────
 * Prevents React from allocating new identical objects on every render.
 */

export const GRAIN_OVERLAY_STYLE: React.CSSProperties = {
  backgroundImage: GRAIN_BG,
  backgroundSize: "150px 150px",
  opacity: 0.2,
  mixBlendMode: "overlay" as const,
};

export const GRAIN_OVERLAY_STYLE_LIGHT: React.CSSProperties = {
  backgroundImage: GRAIN_BG,
  backgroundSize: "150px 150px",
  opacity: 0.12,
  mixBlendMode: "overlay" as const,
  zIndex: 0,
};

export const GRAIN_OVERLAY_STYLE_BUTTON: React.CSSProperties = {
  opacity: 0.4,
  mixBlendMode: "overlay" as const,
  backgroundImage: GRAIN_BG,
  backgroundSize: "128px 128px",
};

export const HERO_GRAIN_STYLE: React.CSSProperties = {
  opacity: 0.55,
  mixBlendMode: "overlay" as const,
  backgroundImage: GRAIN_BG_HERO,
  backgroundSize: "256px 256px",
};

/* ── Badge / Tag styles ─────────────────────────────────────────────────── */
export const BADGE_BG_STYLE: React.CSSProperties = {
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
  border: "1px solid rgba(255,255,255,0.1)",
};
