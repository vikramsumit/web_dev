"use client";

import { useMemo, useState } from "react";

import type { PortfolioCertificate } from "@/lib/portfolio-data";

type CertificatesSectionProps = {
  certificates: PortfolioCertificate[];
};

type Theme = {
  mark: string;
  label: string;
  gradient: string;
  accent: string;
  text: string;
};

function getCertificateTheme(certificate: PortfolioCertificate): Theme {
  const issuer = certificate.issuer.toLowerCase();
  const title = certificate.title.toLowerCase();

  if (issuer.includes("google")) {
    const accent = title.includes("safe") ? "#ea4335" : "#34a853";
    return {
      mark: "G",
      label: "Google",
      gradient: `linear-gradient(135deg, #fffaf0 0%, #ffffff 48%, ${accent} 165%)`,
      accent,
      text: "text-[#2a1a0a]",
    };
  }

  if (issuer.includes("cisco")) {
    return {
      mark: "CS",
      label: "Cisco",
      gradient: "linear-gradient(135deg, #06151a 0%, #0d3440 56%, #00bceb 145%)",
      accent: "#00bceb",
      text: "text-white",
    };
  }

  if (issuer.includes("csrbox") || issuer.includes("aicte")) {
    return {
      mark: "AI",
      label: "AICTE",
      gradient: "linear-gradient(135deg, #07152f 0%, #1a56db 60%, #c7d7ff 145%)",
      accent: "#1a56db",
      text: "text-white",
    };
  }

  return {
    mark: "IBM",
    label: "IBM",
    gradient: "linear-gradient(135deg, #07152f 0%, #0f62fe 58%, #dbe8ff 138%)",
    accent: "#0f62fe",
    text: "text-white",
  };
}

function formatIssueDate(date: Date | string | null) {
  if (!date) return "Credential issued";

  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function wrapIndex(index: number, length: number) {
  return (index + length) % length;
}

export default function CertificatesSection({ certificates }: CertificatesSectionProps) {
  const sortedCertificates = useMemo(
    () => [...certificates].sort((a, b) => a.order - b.order),
    [certificates]
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!sortedCertificates.length) {
    return (
      <section id="certificates" className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32">
        <article
          data-reveal
          className="col-start-2 border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-8 text-center"
        >
          <p className="italic leading-[1.9]">
            Certificates will appear once portfolio data is added.
          </p>
        </article>
      </section>
    );
  }

  const safeActiveIndex = wrapIndex(activeIndex, sortedCertificates.length);
  const activeCertificate = sortedCertificates[safeActiveIndex];
  const theme = getCertificateTheme(activeCertificate);
  const previousIndex = wrapIndex(safeActiveIndex - 1, sortedCertificates.length);
  const nextIndex = wrapIndex(safeActiveIndex + 1, sortedCertificates.length);

  const goTo = (index: number) => {
    setActiveIndex(wrapIndex(index, sortedCertificates.length));
  };

  return (
    <section
      id="certificates"
      className="grid grid-cols-[0.75rem_minmax(0,1fr)_0.75rem] pb-24 sm:grid-cols-[1rem_minmax(0,1fr)_1rem] sm:pb-28 md:grid-cols-[minmax(1.5rem,1fr)_minmax(0,65ch)_minmax(1.5rem,1fr)] md:pb-32"
      aria-labelledby="certificates-heading"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") goTo(safeActiveIndex - 1);
        if (event.key === "ArrowRight") goTo(safeActiveIndex + 1);
      }}
    >
      <div className="col-start-2">
        <div
          data-reveal
          className="border-y border-[color-mix(in_srgb,var(--ink)_22%,transparent)] py-10 text-center will-change-[transform,opacity] sm:py-12"
        >
          <p className="emphasis-small-caps text-[0.76rem] italic tracking-[0.16em] text-(--accent)">
            Credentials
          </p>
          <h2
            id="certificates-heading"
            className="mt-3 text-[clamp(1.5rem,4vw,2.8rem)] leading-[1.15]"
            style={{ fontFamily: "var(--font-display), 'Times New Roman', serif" }}
          >
            Certificate Viewer
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] italic leading-[1.9] text-[color-mix(in_srgb,var(--ink)_82%,black)]">
            Use the arrows to move through each verified credential one at a time.
          </p>
        </div>

        <div
          data-card-group
          className="mt-10 grid grid-cols-[2.75rem_minmax(0,1fr)_2.75rem] items-center gap-2 sm:grid-cols-[3.5rem_minmax(0,1fr)_3.5rem] sm:gap-4"
        >
          <button
            type="button"
            onClick={() => goTo(safeActiveIndex - 1)}
            aria-label={`Show previous certificate: ${sortedCertificates[previousIndex].title}`}
            className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--ink)_24%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_94%,white)] text-[1.2rem] text-(--accent) shadow-[0_10px_24px_rgba(42,26,10,0.12)] transition hover:-translate-y-0.5 hover:border-(--accent) hover:shadow-[0_16px_34px_rgba(42,26,10,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            {"<"}
          </button>

          <article
            key={activeCertificate.id}
            data-card
            tabIndex={0}
            aria-label={`${activeCertificate.title}, issued by ${activeCertificate.issuer}`}
            className={`group relative mx-auto min-h-[260px] w-full max-w-[560px] overflow-hidden rounded-[18px] border border-[color-mix(in_srgb,var(--ink)_16%,transparent)] p-6 shadow-[0_24px_70px_rgba(42,26,10,0.2)] outline-none transition-[transform,box-shadow,filter] duration-500 [transform-style:preserve-3d] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] [will-change:transform] hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(42,26,10,0.26)] focus-visible:ring-2 focus-visible:ring-(--accent) sm:min-h-[300px] sm:p-8 ${theme.text}`}
            style={{ background: theme.gradient }}
          >
            <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0.1)_34%,rgba(255,255,255,0)_54%)] opacity-90 transition group-hover:translate-x-6" />
            <span
              className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full blur-3xl"
              style={{ backgroundColor: `${theme.accent}66` }}
            />
            <span className="pointer-events-none absolute bottom-0 left-0 h-1.5 w-full bg-white/35" />

            <div className="relative z-10 flex min-h-[212px] flex-col justify-between gap-8 sm:min-h-[236px]">
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="flex h-14 min-w-14 items-center justify-center rounded-2xl bg-white/18 px-4 text-base font-bold tracking-[0.14em] shadow-inner backdrop-blur">
                      {theme.mark}
                    </span>
                    <p className="emphasis-small-caps mt-4 text-[0.64rem] opacity-75">
                      {theme.label} / {activeCertificate.issuer}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.68rem] font-semibold backdrop-blur">
                      {String(safeActiveIndex + 1).padStart(2, "0")} / {String(sortedCertificates.length).padStart(2, "0")}
                    </span>
                    <p className="mt-3 text-xs opacity-70">
                      {formatIssueDate(activeCertificate.issueDate)}
                    </p>
                  </div>
                </div>

                <h3 className="mt-8 text-[clamp(1.45rem,4vw,2.25rem)] font-bold leading-tight">
                  {activeCertificate.title}
                </h3>
                <p className="mt-4 max-w-[46ch] text-sm leading-7 opacity-78 sm:text-base">
                  Issued by {activeCertificate.issuer}. This credential is part of
                  Sumit&apos;s AI, software, cybersecurity, networking, and programming archive.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {activeCertificate.verificationUrl ? (
                  <a
                    href={activeCertificate.verificationUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold transition hover:border-white/70 hover:bg-white/20 hover:shadow-[0_0_22px_rgba(255,255,255,0.28)]"
                  >
                    Verify Certificate -&gt;
                  </a>
                ) : (
                  <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold opacity-72">
                    Verification pending
                  </span>
                )}

                <p className="emphasis-small-caps text-[0.62rem] opacity-70">
                  Arrow keys work while card is focused
                </p>
              </div>
            </div>
          </article>

          <button
            type="button"
            onClick={() => goTo(safeActiveIndex + 1)}
            aria-label={`Show next certificate: ${sortedCertificates[nextIndex].title}`}
            className="z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--ink)_24%,transparent)] bg-[color-mix(in_srgb,var(--parchment)_94%,white)] text-[1.2rem] text-(--accent) shadow-[0_10px_24px_rgba(42,26,10,0.12)] transition hover:-translate-y-0.5 hover:border-(--accent) hover:shadow-[0_16px_34px_rgba(42,26,10,0.18)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--accent)"
          >
            {">"}
          </button>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-2" aria-label="Certificate position">
          {sortedCertificates.map((certificate, index) => (
            <button
              key={certificate.id}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Show certificate ${index + 1}: ${certificate.title}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-2.5 rounded-full border transition ${
                safeActiveIndex === index
                  ? "w-7 border-(--accent) bg-(--accent)"
                  : "w-2.5 border-[color-mix(in_srgb,var(--ink)_32%,transparent)] bg-transparent hover:border-(--accent)"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
