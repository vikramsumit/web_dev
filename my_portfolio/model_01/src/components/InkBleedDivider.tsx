"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useId, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/**
 * Ink bleed transition — GSAP ScrollTrigger animates an SVG mask
 * so accent color expands from center, simulating ink bleeding onto parchment.
 * Honors prefers-reduced-motion.
 */
export default function InkBleedDivider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const maskId = useId().replace(/:/g, "");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const core = container.querySelector<SVGCircleElement>("[data-ink-core]");
    const ring = container.querySelector<SVGCircleElement>("[data-ink-ring]");
    const fill = container.querySelector<SVGRectElement>("[data-ink-fill]");
    if (!core || !ring || !fill) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 84%",
        end: "bottom 22%",
        scrub: 1.15,
      },
    });
    const st = tl.scrollTrigger;

    tl.fromTo(
      core,
      { attr: { r: 8 } },
      { attr: { r: 280 }, ease: "power2.out", duration: 1.1 }
    )
      .fromTo(
        ring,
        { attr: { r: 4 }, opacity: 0.35 },
        { attr: { r: 360 }, opacity: 1, ease: "power2.out", duration: 1.1 },
        0
      )
      .fromTo(
        fill,
        { opacity: 0.16 },
        { opacity: 0.92, duration: 0.95, ease: "sine.out" },
        0.18
      );

    return () => {
      tl.kill();
      st?.kill();
    };
  }, [maskId]);

  return (
    <div
      ref={containerRef}
      data-ink-bleed
      className="relative col-start-2 my-10 h-24 overflow-hidden rounded-sm will-change-transform sm:my-12 sm:h-28 md:my-12 md:h-28"
      aria-hidden="true"
    >
      <svg viewBox="0 0 1200 220" className="h-full w-full" preserveAspectRatio="none">
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect width="1200" height="220" fill="black" />
            <circle data-ink-core cx="600" cy="110" r="8" fill="white" />
            <circle data-ink-ring cx="600" cy="110" r="4" fill="white" opacity="0.4" />
          </mask>
        </defs>
        <rect
          data-ink-fill
          width="1200"
          height="220"
          fill="var(--accent)"
          opacity="0.16"
          mask={`url(#${maskId})`}
        />
      </svg>
    </div>
  );
}
