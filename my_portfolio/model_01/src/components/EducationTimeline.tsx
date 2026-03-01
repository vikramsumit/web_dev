"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import type { PortfolioCertificate, PortfolioEducation } from "@/lib/portfolio-data";

type EducationWithCerts = PortfolioEducation & {
  certificates: Array<{
    id: string;
    title: string;
    issuer: string;
    imageUrl?: string | null;
    verificationUrl: string;
  }>;
};

type EducationTimelineProps = {
  educations: EducationWithCerts[];
  certificates: PortfolioCertificate[];
};

function formatYearRange(startDate: Date | null, endDate: Date | null) {
  const start = startDate ? new Date(startDate).getFullYear() : "Start";
  const end = endDate ? new Date(endDate).getFullYear() : "Present";
  return `${start} – ${end}`;
}

function certificateImageSrc(certificateId: string) {
  return `https://picsum.photos/seed/cert-${certificateId}/840/560`;
}

type CertForDisplay = {
  id: string;
  title: string;
  issuer: string;
  imageUrl?: string | null;
  verificationUrl: string;
};

function getRelevantCertificates(
  education: EducationWithCerts,
  allCertificates: PortfolioCertificate[]
): CertForDisplay[] {
  if (education.certificates && education.certificates.length > 0) {
    return education.certificates;
  }
  const institution = education.institution.toLowerCase();
  const byIssuer = allCertificates.filter((c) =>
    c.issuer.toLowerCase().includes(institution)
  );
  if (byIssuer.length) return byIssuer;
  if (education.startDate || education.endDate) {
    return allCertificates.filter((c) => {
      if (!c.issueDate) return false;
      const t = new Date(c.issueDate).getTime();
      const start = education.startDate
        ? new Date(education.startDate).getTime()
        : -Infinity;
      const end = education.endDate
        ? new Date(education.endDate).getTime()
        : Infinity;
      return t >= start && t <= end;
    });
  }
  return [];
}

export default function EducationTimeline({
  educations,
  certificates,
}: EducationTimelineProps) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>(educations[0]?.id ?? null);

  const activeEducation = educations.find((e) => e.id === activeId) ?? null;
  const relevantCertificates = activeEducation
    ? getRelevantCertificates(activeEducation, certificates)
    : [];

  if (!educations.length) {
    return (
      <article className="border-y border-[color-mix(in_srgb,var(--ink)_20%,transparent)] px-4 py-8 text-center">
        <p className="italic leading-[1.9]">
          Education milestones will appear once portfolio data is seeded.
        </p>
      </article>
    );
  }

  return (
    <section
      className="relative pl-6 sm:pl-8 md:grid md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10 md:pl-0"
      aria-label="Education timeline"
    >
      {/* Vertical line - mobile-first */}
      <span
        aria-hidden="true"
        className="absolute left-[0.4rem] top-1 h-[calc(100%-0.5rem)] w-px bg-[color-mix(in_srgb,var(--ink)_25%,transparent)] md:left-0 md:top-2"
      />

      <ol className="space-y-4 md:space-y-5">
        {educations.map((education) => {
          const isActive = education.id === activeId;
          return (
            <li key={education.id}>
              <button
                type="button"
                onClick={() => setActiveId(isActive ? null : education.id)}
                className="group relative block w-full text-left"
                aria-expanded={isActive}
                aria-controls={`education-detail-${education.id}`}
              >
                <span
                  className={`absolute -left-6 top-1.5 h-3 w-3 rounded-full border-2 border-(--ink) bg-(--parchment) transition-all md:-left-8 ${
                    isActive ? "scale-125 border-(--accent) bg-(--accent)" : "opacity-80"
                  }`}
                />
                <p className="emphasis-small-caps text-[0.65rem] sm:text-[0.67rem] italic tracking-[0.15em] text-(--accent)">
                  {formatYearRange(education.startDate, education.endDate)}
                </p>
                <p
                  className="mt-1 text-[0.9rem] leading-[1.35] sm:text-[0.95rem]"
                  style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
                >
                  {education.institution}
                </p>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-6 md:mt-0">
        <AnimatePresence mode="wait">
          {activeEducation && (
            <motion.article
              id={`education-detail-${activeEducation.id}`}
              key={activeEducation.id}
              initial={
                reduceMotion ? false : { opacity: 0, y: 16 }
              }
              animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
              exit={reduceMotion ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_20%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_96%,white)] p-4 shadow-[0_2px_12px_rgba(42,26,10,0.06)] sm:p-6 md:p-7"
            >
              <p className="emphasis-small-caps text-[0.7rem] italic tracking-[0.15em] text-(--accent)">
                {formatYearRange(activeEducation.startDate, activeEducation.endDate)}
              </p>
              <h3
                className="mt-2 text-[clamp(1.2rem,2.8vw,1.9rem)] leading-[1.2]"
                style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
              >
                {activeEducation.degree}
              </h3>
              <p className="mt-1 text-[0.9rem] italic text-[color-mix(in_srgb,var(--ink)_90%,black)]">
                {activeEducation.institution}
                {activeEducation.fieldOfStudy ? ` · ${activeEducation.fieldOfStudy}` : ""}
              </p>
              {activeEducation.description && (
                <p className="mt-4 leading-[1.9] italic">
                  {activeEducation.description}
                </p>
              )}

              <div className="mt-5 border-t border-[color-mix(in_srgb,var(--ink)_16%,transparent)] pt-5">
                <p className="emphasis-small-caps text-[0.68rem] italic tracking-[0.15em] text-(--accent)">
                  Relevant Certificates
                </p>
                {relevantCertificates.length ? (
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {relevantCertificates.map((cert) => {
                      const imgSrc =
                        cert.imageUrl ?? certificateImageSrc(cert.id);
                      return (
                        <article
                          key={cert.id}
                          className="rounded-sm border border-[color-mix(in_srgb,var(--ink)_15%,transparent)] p-3"
                        >
                          <div className="relative mb-3 aspect-3/2 overflow-hidden rounded-sm">
                            <Image
                              src={imgSrc}
                              alt={`${cert.title} certificate preview`}
                              fill
                              sizes="(max-width: 640px) 100vw, 280px"
                              className="object-cover"
                            />
                          </div>
                          <p className="emphasis-small-caps text-[0.62rem] italic tracking-[0.14em] text-(--accent)">
                            {cert.issuer}
                          </p>
                          <h4
                            className="mt-1 text-[1rem]"
                            style={{ fontFamily: "var(--font-display), serif" }}
                          >
                            {cert.title}
                          </h4>
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="emphasis-small-caps mt-2 inline-block text-[0.62rem] text-(--accent) underline-offset-4 hover:underline"
                          >
                            Verify
                          </a>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <p className="mt-3 italic leading-[1.9]">
                    No matched certificates for this milestone yet.
                  </p>
                )}
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
