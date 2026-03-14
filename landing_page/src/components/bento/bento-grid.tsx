"use client";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  className?: string;
  children?: ReactNode;
}

export const BentoGrid = ({ className, children }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[25rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 w-full",
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
  headerIcon?: string;
  icon?: ReactNode;
  delay?: number;
}

export const BentoCard = ({
  className,
  title,
  description,
  headerIcon,
  icon,
  delay = 0,
}: BentoCardProps) => {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay: delay }}
        whileHover={{ scale: 1.02 }}
        className={cn(
          "row-span-1 glass-panel rounded-3xl group/bento transition duration-300 p-8 flex flex-col justify-between overflow-hidden relative",
          className
        )}
      >
        {/* Background Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover/bento:opacity-100 transition-opacity duration-500 rounded-3xl" />
        
        {/* Header Area */}
        <div className="relative z-10 flex flex-1 w-full h-full min-h-[6rem] rounded-2xl bg-black/40 border border-white/5 overflow-hidden mb-6 items-center justify-center group-hover/bento:border-white/10 transition-colors">
          {headerIcon ? (
            <img
              src={headerIcon}
              alt={title}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="invert opacity-50 group-hover/bento:opacity-100 group-hover/bento:scale-110 transition-all duration-500"
            />
          ) : (
            <div className="w-full h-full bg-noise opacity-30" />
          )}
        </div>

        {/* Content Area */}
        <div className="relative z-10 flex flex-col">
          <div className="group-hover/bento:-translate-y-1 transition duration-200">
            <div className="flex items-center gap-3 mb-2">
              {icon && <span className="text-zinc-400">{icon}</span>}
              <div className="font-bold text-xl text-neutral-100">{title}</div>
            </div>
            <div className="font-normal text-sm text-neutral-400">
              {description}
            </div>
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
};
