import type { PortfolioProfile } from "@/lib/portfolio-data";
import { heroCtas, profileLinks } from "@/lib/site-content";

type HeroProps = {
  profile: PortfolioProfile | null;
};

/**
 * Hero — Neo-Classical centered typography, paper texture
 * Layout: CSS Grid text frame with generous margins (mobile-first)
 */
export default function Hero({ profile }: HeroProps) {
  const name = profile?.name ?? "Sumit Vikram";
  const headline =
    profile?.headline ??
    "B.Tech IT Student | Data Science & AI/ML | Full Stack Development";
  const bio =
    profile?.bio ??
    "Building intelligent systems, practical web apps, and strong foundations in computer science.";

  return (
    <section
      id="intro"
      className="paper-texture text-frame grid min-h-[86svh] grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] items-center py-12 sm:min-h-[90svh] sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:py-14 md:min-h-dvh md:grid-cols-[minmax(2rem,1fr)_minmax(0,65ch)_minmax(2rem,1fr)] md:py-0"
      aria-label="Introduction"
    >
      <svg width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="paper-noise" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.04" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <article className="col-start-2 px-1 text-center sm:px-0">
        <p
          className="emphasis-small-caps text-[0.75rem] text-(--accent)"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Portfolio of
        </p>
        <h1
          className="mt-3 mb-4 text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.1]"
          style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
        >
          {name}
        </h1>
        <p
          className="mx-auto max-w-[44ch] text-[clamp(0.95rem,1.25vw,1.2rem)] italic leading-[1.9]"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {bio}
        </p>
        <p
          className="emphasis-small-caps mt-6 text-[0.72rem] text-(--accent)"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {headline}
        </p>

        {/* <p className="emphasis-small-caps mt-3 text-[0.66rem] text-(--accent)">
          B.Tech IT | WBUT | Open to Internship - July 2026
        </p> */}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {heroCtas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`emphasis-small-caps rounded-sm border px-4 py-2 text-[0.64rem] transition ${
                cta.primary
                  ? "border-(--accent) bg-(--accent) text-(--parchment)"
                  : "border-[color-mix(in_srgb,var(--ink)_24%,transparent)] text-(--accent) hover:border-(--accent)"
              }`}
            >
              {cta.label}
            </a>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          {profileLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="emphasis-small-caps text-[0.62rem] text-(--accent) underline-offset-4 hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      </article>
    </section>
  );
}
