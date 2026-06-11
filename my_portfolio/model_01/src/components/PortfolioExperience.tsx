"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import CertificatesSection from "@/components/CertificatesSection";
import EducationTimeline from "@/components/EducationTimeline";
import Hero from "@/components/Hero";
import InkBleedDivider from "@/components/InkBleedDivider";
import ProjectCard from "@/components/ProjectCard";
import type {
  PortfolioCertificate,
  PortfolioEducation,
  PortfolioProfile,
  PortfolioProject,
} from "@/lib/portfolio-data";
import {
  aboutCopy,
  achievements,
  experienceItems,
  profileLinks,
  skillGroups,
} from "@/lib/site-content";

gsap.registerPlugin(ScrollTrigger);

type PortfolioExperienceProps = {
  profile: PortfolioProfile | null;
  projects: PortfolioProject[];
  certificates: PortfolioCertificate[];
  educations: PortfolioEducation[];
};

/**
 * PortfolioExperience — Scroll reveal (GSAP), project cards (Motion spring),
 * ink bleed transitions. Mobile-first text frame.
 */
export default function PortfolioExperience({
  profile,
  projects,
  certificates,
  educations,
}: PortfolioExperienceProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const revealTargets = gsap.utils.toArray<HTMLElement>("[data-reveal]", root);
      const cardGroups = gsap.utils.toArray<HTMLElement>("[data-card-group]", root);

      if (prefersReducedMotion) {
        gsap.set(revealTargets, { autoAlpha: 1, y: 0 });
        cardGroups.forEach((group) => {
          const cards = group.querySelectorAll<HTMLElement>("[data-card]");
          gsap.set(cards, { autoAlpha: 1, y: 0 });
        });
        return;
      }

      revealTargets.forEach((target) => {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 85%",
              once: true,
            },
          }
        );
      });

      cardGroups.forEach((group) => {
        const cards = gsap.utils.toArray<HTMLElement>(group.querySelectorAll("[data-card]"));
        if (!cards.length) return;

        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 44 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 82%",
              once: true,
            },
          }
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={rootRef}
      className="paper-texture relative isolate min-h-svh"
    >
      <Hero profile={profile} />

      {/* About */}
      <section id="about" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <article
          data-reveal
          className="col-start-2 border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-10 text-center sm:py-12 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            About
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            AI/ML, Data Science, and Full-Stack Craft
          </h2>
          <div className="mx-auto mt-6 grid max-w-[58ch] gap-4 text-left sm:text-center">
            {aboutCopy.map((paragraph) => (
              <p key={paragraph} className="italic leading-[1.9]">
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </section>

      {/* Skills */}
      <section id="skills" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <header
          data-reveal
          className="col-start-2 mb-6 text-center sm:mb-8 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Skills
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Technical Foundations
          </h2>
        </header>

        <div data-card-group className="col-start-2 grid gap-4 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <article
              key={group.title}
              data-card
              className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_96%,white)] p-4 will-change-[transform,opacity] sm:p-5"
            >
              <h3
                className="text-[1.1rem]"
                style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
              >
                {group.title}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_16%,transparent)] px-2 py-1 text-[0.72rem] italic"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mobile-first text frame: tight on small, generous on large */}
      <section id="works" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <header
          data-reveal
          className="col-start-2 mb-8 text-center sm:mb-10 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.75rem] italic tracking-[0.16em] text-(--accent)">
            Selected Works
          </p>
          <h2
            className="mt-3 text-[clamp(1.5rem,4.8vw,3rem)] leading-[1.15]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Projects in Motion
          </h2>
        </header>

        <div data-card-group className="col-start-2 grid gap-6 sm:gap-7">
          {projects.length ? (
            projects.map((project) => (
              <div key={project.id} data-card className="will-change-[transform,opacity]">
                <ProjectCard
                  slug={project.slug}
                  title={project.title}
                  summary={project.summary}
                  techStack={project.techStack}
                  imageUrl={project.imageUrl}
                  featured={project.featured}
                />
              </div>
            ))
          ) : (
            <article
              data-reveal
              className="border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-10 text-center"
            >
              <p className="italic leading-[1.9]">
                Projects will appear once portfolio data is seeded.
              </p>
            </article>
          )}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <header
          data-reveal
          className="col-start-2 mb-6 text-center sm:mb-8 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Experience
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Internship Highlights
          </h2>
        </header>

        <div data-card-group className="col-start-2 grid gap-5">
          {experienceItems.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              data-card
              className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_96%,white)] p-4 will-change-[transform,opacity] sm:p-6"
            >
              <p className="emphasis-small-caps text-[0.68rem] italic tracking-[0.15em] text-(--accent)">
                {item.period}
              </p>
              <h3
                className="mt-2 text-[clamp(1.15rem,2.4vw,1.7rem)] leading-[1.2]"
                style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
              >
                {item.role}
              </h3>
              <p className="mt-1 text-[0.92rem] italic text-[color-mix(in_srgb,var(--ink)_90%,black)]">
                {item.company} | {item.meta}
              </p>
              <ul className="mt-4 grid gap-2">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="italic leading-[1.8]">
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Education & Study */}
      <section id="education" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <header
          data-reveal
          className="col-start-2 mb-6 text-center sm:mb-8 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Education & Study
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Academic Timeline
          </h2>
        </header>

        <div data-reveal className="col-start-2 will-change-[transform,opacity]">
          <EducationTimeline educations={educations} certificates={certificates} />
        </div>
      </section>

      <CertificatesSection certificates={certificates} />

      {/* Achievements */}
      <section id="achievements" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <article
          data-reveal
          className="col-start-2 border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-10 text-center sm:py-12 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Achievements
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Recognition and Momentum
          </h2>
          <ul className="mx-auto mt-6 grid max-w-[58ch] gap-3 text-left">
            {achievements.map((achievement) => (
              <li key={achievement} className="italic leading-[1.85]">
                {achievement}
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Contact */}
      <section id="contact" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <article
          data-reveal
          className="col-start-2 border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-12 text-center sm:py-14 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Contact
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            {"Let's Build Something"}
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] px-2 text-[clamp(1rem,1.7vw,1.25rem)] italic leading-[1.95] sm:px-0">
            Open to internship opportunities from July 2026 in Data Science, AI/ML,
            and Full-Stack Development.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            {profileLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer noopener" : undefined}
                className="emphasis-small-caps text-[0.66rem] text-(--accent) underline-offset-4 hover:underline"
              >
                {link.label}
              </a>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
