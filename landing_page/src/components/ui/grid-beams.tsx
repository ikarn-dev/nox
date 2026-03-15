"use client";

import { motion } from "framer-motion";

/**
 * Animated grid background with light beams moving along grid borders.
 * Grid fades out radially toward the center to make the NOX image blend
 * seamlessly — no floating effect.
 */
export function GridBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base grid — drawn with CSS background */}
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

      {/* Horizontal beam 1 — left to right, aligned to grid row */}
      <motion.div
        animate={{ x: ["-20%", "120%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        className="absolute top-[240px] left-0 w-full h-[1px]"
      >
        <div
          className="w-[200px] h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </motion.div>

      {/* Horizontal beam 2 — right to left */}
      <motion.div
        animate={{ x: ["120%", "-20%"] }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
          delay: 3,
        }}
        className="absolute top-[400px] left-0 w-full h-[1px]"
      >
        <div
          className="ml-auto w-[180px] h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />
      </motion.div>

      {/* Horizontal beam 3 */}
      <motion.div
        animate={{ x: ["-20%", "120%"] }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
          delay: 6,
        }}
        className="absolute top-[560px] left-0 w-full h-[1px]"
      >
        <div
          className="w-[150px] h-full"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </motion.div>

      {/* Vertical beam 1 — top to bottom */}
      <motion.div
        animate={{ y: ["-20%", "120%"] }}
        transition={{
          repeat: Infinity,
          duration: 9,
          ease: "linear",
          delay: 1.5,
        }}
        className="absolute top-0 left-[160px] h-full w-[1px]"
      >
        <div
          className="h-[180px] w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
        />
      </motion.div>

      {/* Vertical beam 2 — bottom to top */}
      <motion.div
        animate={{ y: ["120%", "-20%"] }}
        transition={{
          repeat: Infinity,
          duration: 11,
          ease: "linear",
          delay: 4,
        }}
        className="absolute top-0 right-[160px] h-full w-[1px]"
      >
        <div
          className="mt-auto h-[200px] w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.25), transparent)",
          }}
        />
      </motion.div>

      {/* Vertical beam 3 */}
      <motion.div
        animate={{ y: ["-20%", "120%"] }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "linear",
          delay: 7,
        }}
        className="absolute top-0 left-[50%] h-full w-[1px]"
      >
        <div
          className="h-[160px] w-full"
          style={{
            background:
              "linear-gradient(180deg, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
      </motion.div>
    </div>
  );
}
