"use client";

import { m, LazyMotion, domAnimation, Variants } from "framer-motion";
import { HeroGradient } from "./hero-gradient";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, delay: 0.8 },
  },
};

export function Hero() {
  return (
    <LazyMotion features={domAnimation} strict>
      <section className="relative w-full h-screen flex flex-col bg-black overflow-hidden">
        {/* Animated Gradient Background */}
        <HeroGradient />

        {/* Navigation */}
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative z-20 flex items-center justify-between px-8 md:px-16 py-6"
        >
          <span className="text-lg font-bold tracking-widest uppercase text-white">
            Nox
          </span>
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>
          <button
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/20 hover:border-white/40 transition-colors"
            aria-label="Menu"
          >
            <span className="block w-4 h-[1.5px] bg-white" />
            <span className="block w-4 h-[1.5px] bg-white" />
            <span className="block w-4 h-[1.5px] bg-white" />
          </button>
        </m.nav>

        {/* Hero Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-8 md:px-16 pb-12">
          {/* Main Heading — Large, Left-Aligned */}
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 flex flex-col justify-center"
          >
            <m.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] tracking-tighter text-white"
            >
              Where Bold
            </m.h1>
            <m.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1] tracking-tighter text-white"
            >
              Strategy Meets
            </m.h1>
            <m.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light italic leading-[1.15] tracking-tight text-gradient"
            >
              Innovation.
            </m.h1>
          </m.div>

          {/* Bottom Bar */}
          <m.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row items-end justify-between gap-8"
          >
            {/* Left Bottom — Tag Stack */}
            <m.div variants={fadeIn} className="flex flex-col gap-0.5">
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
                Break Limits
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-700">
                Build
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white">
                Stronger
              </span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
                Brands
              </span>
            </m.div>

            {/* Right Bottom — Description + CTA */}
            <m.div
              variants={fadeIn}
              className="flex flex-col items-start md:items-end gap-5 max-w-sm"
            >
              <p className="text-sm text-zinc-400 text-left md:text-right leading-relaxed">
                Creative engineering and design solutions that make an impact.
                We help forward-thinking teams stand out with bold ideas and
                measurable results.
              </p>
              <a
                href="#contact"
                className="px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:scale-105 active:scale-95 transition-transform"
              >
                Book a Call
              </a>
            </m.div>
          </m.div>
        </div>

        {/* Right Side Text */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-28 right-8 md:right-16 z-10 hidden lg:flex flex-col items-end gap-0.5"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
            Grow
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
            Your Brand
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase font-bold text-white">
            Beyond
          </span>
          <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-600">
            Boundaries
          </span>
        </m.div>
      </section>
    </LazyMotion>
  );
}
