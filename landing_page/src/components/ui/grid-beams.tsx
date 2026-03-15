/**
 * Animated grid background with light beams moving along grid borders.
 * Grid fades out radially toward the center to make the NOX image blend
 * seamlessly — no floating effect.
 *
 * ⚡ Optimised: replaced 6 Framer Motion `repeat: Infinity` animations
 * with pure CSS `@keyframes` to eliminate ~400 K closures + native_bind
 * instances from the heap. CSS animations run on the compositor thread
 * without creating JS closures per requestAnimationFrame tick.
 */

const beamGradientH =
  "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)";
const beamGradientH2 =
  "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)";
const beamGradientH3 =
  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)";
const beamGradientV =
  "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)";
const beamGradientV2 =
  "linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)";
const beamGradientV3 =
  "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)";

export function GridBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Inject keyframes once */}
      <style>{`
        @keyframes beam-ltr  { from { transform: translateX(-20%); } to { transform: translateX(120%); } }
        @keyframes beam-rtl  { from { transform: translateX(120%); } to { transform: translateX(-20%); } }
        @keyframes beam-ttb  { from { transform: translateY(-20%); } to { transform: translateY(120%); } }
        @keyframes beam-btt  { from { transform: translateY(120%); } to { transform: translateY(-20%); } }
      `}</style>

      {/* Base grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, black 60%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 20%, black 60%)",
        }}
      />

      {/* Horizontal beam 1 — left to right */}
      <div
        className="absolute top-[240px] left-0 w-full h-[1px]"
        style={{ animation: "beam-ltr 8s linear infinite" }}
      >
        <div className="w-[200px] h-full" style={{ background: beamGradientH }} />
      </div>

      {/* Horizontal beam 2 — right to left */}
      <div
        className="absolute top-[400px] left-0 w-full h-[1px]"
        style={{ animation: "beam-rtl 10s linear 3s infinite" }}
      >
        <div className="ml-auto w-[180px] h-full" style={{ background: beamGradientH2 }} />
      </div>

      {/* Horizontal beam 3 */}
      <div
        className="absolute top-[560px] left-0 w-full h-[1px]"
        style={{ animation: "beam-ltr 12s linear 6s infinite" }}
      >
        <div className="w-[150px] h-full" style={{ background: beamGradientH3 }} />
      </div>

      {/* Vertical beam 1 — top to bottom */}
      <div
        className="absolute top-0 left-[160px] h-full w-[1px]"
        style={{ animation: "beam-ttb 9s linear 1.5s infinite" }}
      >
        <div className="h-[180px] w-full" style={{ background: beamGradientV }} />
      </div>

      {/* Vertical beam 2 — bottom to top */}
      <div
        className="absolute top-0 right-[160px] h-full w-[1px]"
        style={{ animation: "beam-btt 11s linear 4s infinite" }}
      >
        <div className="mt-auto h-[200px] w-full" style={{ background: beamGradientV2 }} />
      </div>

      {/* Vertical beam 3 */}
      <div
        className="absolute top-0 left-[50%] h-full w-[1px]"
        style={{ animation: "beam-ttb 7s linear 7s infinite" }}
      >
        <div className="h-[160px] w-full" style={{ background: beamGradientV3 }} />
      </div>
    </div>
  );
}
