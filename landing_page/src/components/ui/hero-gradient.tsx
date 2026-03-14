"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";

/**
 * Animated flowing gradient background — black & white only.
 * Renders organic, flowing light streaks similar to the Veltrix reference.
 */
export function HeroGradient() {
  return (
    <LazyMotion features={domAnimation} strict>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary flowing streak — top right */}
        <m.div
          animate={{
            rotate: [0, 3, -2, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute -top-[20%] right-[10%] w-[80%] h-[120%]"
          style={{
            background:
              "conic-gradient(from 160deg at 60% 40%, transparent 0%, rgba(255,255,255,0.06) 15%, transparent 30%, rgba(255,255,255,0.04) 45%, transparent 60%)",
            filter: "blur(60px)",
            willChange: "transform",
          }}
        />

        {/* Secondary streak — bottom left */}
        <m.div
          animate={{
            rotate: [0, -2, 3, 0],
            scale: [1, 0.97, 1.03, 1],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-[30%] -left-[10%] w-[70%] h-[100%]"
          style={{
            background:
              "conic-gradient(from 320deg at 40% 60%, transparent 0%, rgba(255,255,255,0.05) 20%, transparent 40%, rgba(255,255,255,0.03) 55%, transparent 70%)",
            filter: "blur(80px)",
            willChange: "transform",
          }}
        />

        {/* Thin bright streak across center — like a light trail */}
        <m.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            rotate: [-8, -6, -8],
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
          className="absolute top-[35%] -left-[10%] w-[120%] h-[2px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 70%, transparent 100%)",
            filter: "blur(1px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Secondary thin streak */}
        <m.div
          animate={{
            opacity: [0.2, 0.4, 0.2],
            rotate: [5, 7, 5],
          }}
          transition={{ repeat: Infinity, duration: 18, ease: "easeInOut", delay: 3 }}
          className="absolute top-[55%] -left-[10%] w-[120%] h-[1.5px]"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 80%, transparent 100%)",
            filter: "blur(1px)",
            willChange: "transform, opacity",
          }}
        />

        {/* Soft orb glow center-right */}
        <div
          className="absolute top-[25%] right-[20%] w-96 h-96 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>
    </LazyMotion>
  );
}
