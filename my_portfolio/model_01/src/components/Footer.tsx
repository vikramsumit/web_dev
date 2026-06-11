import Link from "next/link";

import type { PortfolioProfile } from "@/lib/portfolio-data";

type FooterProps = {
  profile: PortfolioProfile | null;
};

export default function Footer({ profile }: FooterProps) {
  const year = new Date().getFullYear();
  const name = profile?.name ?? "Sumit Vikram";
  const location = profile?.location ?? "India";
  const website = profile?.websiteUrl ?? null;

  return (
    <footer className="border-t border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-10 md:py-12">
      <div className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] sm:grid-cols-[1rem_minmax(0,1fr)_1rem] md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)]">
        <div className="col-start-2 flex flex-col gap-5 text-center md:flex-row md:items-end md:justify-between md:text-left">
          <div>
            <p
              className="text-[1.05rem] italic"
              style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
            >
              {name}
            </p>
            <p className="emphasis-small-caps mt-2 text-[0.64rem] text-[var(--accent)]">
              Crafted on parchment tones · {location}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:justify-end">
            <Link href="#intro" className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]">
              Top
            </Link>
            <Link href="#works" className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]">
              Works
            </Link>
            <Link href="#experience" className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]">
              Experience
            </Link>
            <Link href="#education" className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]">
              Education
            </Link>
            <Link href="#contact" className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]">
              Contact
            </Link>
            {website ? (
              <a
                href={website}
                target="_blank"
                rel="noreferrer noopener"
                className="emphasis-small-caps text-[0.62rem] text-[var(--accent)]"
              >
                GitHub
              </a>
            ) : null}
          </div>
        </div>

        <p className="col-start-2 mt-7 text-center text-[0.7rem] italic text-[color-mix(in_srgb,var(--ink)_70%,white)] md:text-left">
          © {year} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
