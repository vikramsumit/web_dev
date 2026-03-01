"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const CARD_SPRING = {
  type: "spring" as const,
  stiffness: 205,
  damping: 20,
  mass: 0.9,
};

const SHADOW_SPRING = {
  type: "spring" as const,
  stiffness: 170,
  damping: 24,
  mass: 0.95,
};

function projectImageSrc(slug: string) {
  return `https://picsum.photos/seed/project-${slug}/1200/760`;
}

export type ProjectCardProps = {
  slug: string;
  title: string;
  summary: string;
  techStack?: string[];
  imageUrl?: string | null;
  featured?: boolean;
};

/**
 * Project card — physics-based spring hover in Motion:
 * card lifts off parchment with expanding drop-shadow.
 * next/image with WebP/AVIF for project graphics.
 */
export default function ProjectCard({
  slug,
  title,
  summary,
  techStack = [],
  imageUrl,
  featured,
}: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const src = imageUrl ?? projectImageSrc(slug);

  return (
    <motion.article
      initial={false}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -12,
              scale: 1.012,
              transition: CARD_SPRING,
            }
      }
      className="relative overflow-visible rounded-sm border border-[color-mix(in_srgb,var(--ink)_22%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_92%,white)] px-4 py-5 sm:px-6 sm:py-7 will-change-transform"
    >
      <motion.span
        aria-hidden="true"
        initial={false}
        className="pointer-events-none absolute -bottom-5 left-[8%] h-8 w-[84%] rounded-[50%] bg-[color-mix(in_srgb,var(--ink)_28%,transparent)] blur-xl will-change-transform"
        whileHover={
          reduceMotion
            ? undefined
            : {
                scaleX: 1.24,
                scaleY: 1.52,
                y: 8,
                opacity: 0.44,
                transition: SHADOW_SPRING,
              }
        }
      />

      <div className="relative mb-5 aspect-16/10 overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={`${title} project preview`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 760px"
          className="object-cover"
          priority={featured}
        />
      </div>

      <p className="emphasis-small-caps mb-3 text-[0.72rem] italic tracking-[0.16em] text-(--accent)">
        {featured ? "Featured Project" : "Project"}
      </p>
      <h3
        className="mb-3 text-[clamp(1.2rem,2.4vw,1.9rem)] leading-[1.2]"
        style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
      >
        {title}
      </h3>
      <p className="max-w-[60ch] italic leading-[1.9] text-[color-mix(in_srgb,var(--ink)_90%,black)]">
        {summary}
      </p>
      {techStack.length > 0 && (
        <p className="emphasis-small-caps mt-4 text-[0.68rem] italic tracking-[0.14em] text-(--accent)">
          {techStack.join(" · ")}
        </p>
      )}
    </motion.article>
  );
}
