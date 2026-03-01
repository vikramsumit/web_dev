"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

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

gsap.registerPlugin(ScrollTrigger);

function certificateImageSrc(certificateId: string) {
  return `https://picsum.photos/seed/certificate-${certificateId}/840/560`;
}

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

      {/* Certificates */}
      <section id="certificates" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <header
          data-reveal
          className="col-start-2 mb-6 text-center sm:mb-8 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Credentials
          </p>
          <h2
            className="mt-3 text-[clamp(1.4rem,4vw,2.4rem)] leading-[1.2]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Certificates
          </h2>
        </header>

        <div className="col-start-2 mb-12 grid gap-4">
          {certificates.length ? (
            certificates.map((certificate) => (
              <article
                key={certificate.id}
                data-reveal
                className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_96%,white)] p-4 will-change-[transform,opacity] sm:p-5"
              >
                <div className="relative mb-4 aspect-3/2 overflow-hidden rounded-sm">
                  <Image
                    src={certificate.imageUrl ?? certificateImageSrc(certificate.id)}
                    alt={`${certificate.title} certificate artwork`}
                    fill
                    sizes="(max-width: 640px) 100vw, 720px"
                    className="object-cover"
                  />
                </div>
                <p className="emphasis-small-caps mb-2 text-[0.72rem] italic tracking-[0.15em] text-(--accent)">
                  {certificate.issuer}
                </p>
                <h3
                  className="text-[1.15rem] sm:text-[1.25rem]"
                  style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
                >
                  {certificate.title}
                </h3>
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="emphasis-small-caps mt-3 inline-block text-[0.66rem] italic tracking-[0.16em] text-(--accent) underline-offset-4 hover:underline"
                >
                  Verify Certificate
                </a>
              </article>
            ))
          ) : (
            <article
              data-reveal
              className="border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-8 text-center"
            >
              <p className="italic leading-[1.9]">
                Certificates will appear once portfolio data is seeded.
              </p>
            </article>
          )}
        </div>
      </section>

      {/* Closing Note */}
      <section className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <InkBleedDivider />

        <article
          data-reveal
          className="col-start-2 border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-12 text-center sm:py-14 will-change-[transform,opacity]"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Closing Note
          </p>
          <p className="mx-auto mt-4 max-w-[52ch] px-2 text-[clamp(1rem,1.7vw,1.25rem)] italic leading-[1.95] sm:px-0">
            Every interface is treated as an editorial artifact where pace, structure,
            and motion reinforce meaning instead of distracting from it.
          </p>
        </article>
      </section>
    </main>
  );
}
