import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Comparison", href: "#comparison" },
      { label: "Pricing", href: "#pricing" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "API Reference", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Twitter / X", href: "#" },
      { label: "Telegram", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer
      className="w-full bg-black pt-8 md:pt-10 pb-0"
      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div className="w-full px-6 md:px-12 lg:px-16">
        {/* Top: Brand + Links */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-8 mb-6">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="text-xl font-sans font-bold text-white tracking-tight">
              ✦ Nox
            </span>
            <p className="text-white/60 text-[13px] font-sans font-medium leading-relaxed mt-2">
              The fastest memecoin sniper on Solana. Sub-50ms execution, silent
              KOL intelligence, and zero MEV attacks.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-mono uppercase tracking-wider text-white/70 hover:text-white transition-colors"
            >
              Launch App
              <ArrowUpRight size={12} />
            </a>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-14">
            {footerLinks.map((col) => (
              <div key={col.heading}>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/70 mb-3 block font-bold">
                  {col.heading}
                </span>
                <ul className="flex flex-col gap-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[13px] font-sans text-white/70 hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span className="text-[11px] font-mono text-white/60 tracking-wider">
            © {new Date().getFullYear()} Nox. All rights reserved.
          </span>
          <div className="flex items-center gap-5">
            <a
              href="#"
              className="text-[11px] font-mono text-white/60 hover:text-white/80 transition-colors tracking-wider"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-[11px] font-mono text-white/60 hover:text-white/80 transition-colors tracking-wider"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
