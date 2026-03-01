"use client";

import Link from "next/link";
import { useState } from "react";

import type { PortfolioProfile } from "@/lib/portfolio-data";

type NavbarProps = {
  profile: PortfolioProfile | null;
};

const navItems = [
  { href: "#works", label: "Works" },
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certificates" },
];

export default function Navbar({ profile }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const brand = profile?.name ?? "Portfolio";

  return (
    <header className="sticky top-0 z-50 border-b border-[color-mix(in_srgb,var(--ink)_20%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_90%,white)]/95 backdrop-blur-sm">
      <div className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] py-3 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)]">
        <div className="col-start-2 flex items-center justify-between gap-4">
          <Link
            href="#intro"
            className="text-[0.95rem] italic tracking-[0.06em]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            {brand}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="emphasis-small-caps rounded-sm border border-[color-mix(in_srgb,var(--ink)_20%,transparent)] px-3 py-1 text-[0.62rem] text-(--accent) md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            Menu
          </button>

          <nav className="hidden items-center gap-5 md:flex" aria-label="Primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="emphasis-small-caps text-[0.64rem] text-(--accent) underline-offset-4 transition hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open ? (
        <nav id="mobile-nav" className="border-t border-[color-mix(in_srgb,var(--ink)_16%,transparent)] md:hidden" aria-label="Mobile">
          <div className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] py-3">
            <ul className="col-start-2 flex items-center justify-between gap-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="emphasis-small-caps text-[0.62rem] text-(--accent)"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
