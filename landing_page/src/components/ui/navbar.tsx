"use client";

import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "/ Home", href: "#" },
  { label: "/ Features", href: "#features" },
  { label: "/ KOL Intel", href: "#kol" },
  { label: "/ Dashboard", href: "#dashboard" },
  { label: "/ Docs", href: "#docs" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 py-4"
    >
      <span className="text-base font-sans font-bold tracking-widest uppercase text-white">
        ⬡ Nox
      </span>

      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-[13px] font-sans font-semibold text-white/80 hover:text-white transition-colors duration-300 tracking-wider uppercase"
          >
            {link.label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="#contact"
          className="hidden md:inline-flex px-6 py-2.5 bg-white/5 border border-white/30 text-white text-[13px] font-sans font-semibold uppercase tracking-wider rounded-md hover:bg-white/10 hover:border-white/50 transition-colors"
        >
          Launch App
        </a>
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 border border-white/30 rounded-md hover:bg-white/10 transition-colors"
          aria-label="Menu"
        >
          <span className="block w-4 h-[2px] bg-white rounded-full" />
          <span className="block w-4 h-[2px] bg-white rounded-full" />
        </button>
      </div>
    </motion.nav>
  );
}
