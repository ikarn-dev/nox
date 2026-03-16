"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Comparison", href: "#comparison" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  /* Close menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-12 py-4"
      >
        {/* Logo */}
        <a
          href="#"
          className="text-base font-sans font-bold tracking-widest uppercase text-white"
        >
          ✦ Nox
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-mono font-normal text-white/60 hover:text-white transition-colors duration-300 tracking-wider uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="hidden md:inline-flex px-6 py-2.5 bg-white/5 border border-white/30 text-white text-[13px] font-sans font-semibold uppercase tracking-wider hover:bg-white/10 hover:border-white/50 transition-colors cursor-pointer"
        >
          Get Access
        </button>

        {/* Mobile Burger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] border border-white/20 hover:bg-white/5 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-4 h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-4 h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block w-4 h-[2px] bg-white rounded-full origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-2xl flex flex-col"
            style={{ top: "65px" }}
          >
            <div className="flex flex-col px-6 py-8 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="text-2xl font-sans font-medium text-white/80 hover:text-white py-4 transition-colors"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-6 mt-4">
              <button
                onClick={() => {
                  setOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center justify-center w-full py-3.5 text-black text-[14px] font-sans font-semibold uppercase tracking-wider cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #d8d8d8 100%)",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                Get Access
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
