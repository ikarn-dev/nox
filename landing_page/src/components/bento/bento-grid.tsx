"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-3 gap-2 w-full px-4 md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
};

interface BentoCardProps {
  className?: string;
  title: string;
  description: string;
  label?: string;
  stat?: string;
  statLabel?: string;
  svgBg?: ReactNode;
  index?: number;
}

export const BentoCard = ({
  className,
  title,
  description,
  label,
  stat,
  statLabel,
  svgBg,
  index = 0,
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative flex flex-col overflow-hidden cursor-default",
        "bg-[#0a0a0a] border border-white/[0.1] rounded-xl",
        className
      )}
    >
      {/* SVG Background */}
      {svgBg && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.07] group-hover:opacity-[0.14] transition-opacity duration-700 overflow-hidden">
          {svgBg}
        </div>
      )}

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(500px_circle_at_50%_50%,rgba(255,255,255,0.04),transparent_60%)]" />

      {/* Hover border */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none border border-white/[0.18]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-5 md:p-6">
        {/* Top row */}
        <div className="flex items-start justify-between gap-4">
          {label && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/50"
            >
              {label}
            </motion.span>
          )}
          {stat && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.08 }}
              className="flex items-baseline gap-2 ml-auto shrink-0"
            >
              <span className="font-display text-xl font-bold text-white/90 tracking-tighter">
                {stat}
              </span>
              {statLabel && (
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">
                  {statLabel}
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* Bottom content — slide up reveal */}
        <div className="mt-8 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 + index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <h3 className="font-serif text-[20px] md:text-[22px] font-normal leading-[1.2] text-white mb-2.5">
              {title}
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 + index * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="font-sans text-[13px] leading-[1.7] text-white/55">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
