import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

import { prisma } from "@/lib/prisma";

/* ─── Typed Selects ─────────────────────────────────────────────────────── */
const projectSelect = Prisma.validator<Prisma.ProjectSelect>()({
  id: true,
  slug: true,
  title: true,
  summary: true,
  caseStudy: true,
  techStack: true,
  imageUrl: true,
  featured: true,
  order: true,
  skills: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: { name: "asc" },
  },
});

const certificateSelect = Prisma.validator<Prisma.CertificateSelect>()({
  id: true,
  educationId: true,
  title: true,
  issuer: true,
  imageUrl: true,
  issueDate: true,
  expirationDate: true,
  verificationUrl: true,
  order: true,
});

const educationSelect = Prisma.validator<Prisma.EducationSelect>()({
  id: true,
  institution: true,
  degree: true,
  fieldOfStudy: true,
  description: true,
  startDate: true,
  endDate: true,
  order: true,
  skills: {
    select: {
      id: true,
      name: true,
      slug: true,
    },
    orderBy: { name: "asc" },
  },
  certificates: {
    select: {
      id: true,
      title: true,
      issuer: true,
      imageUrl: true,
      verificationUrl: true,
    },
  },
});

const userProfileSelect = Prisma.validator<Prisma.UserSelect>()({
  id: true,
  name: true,
  headline: true,
  bio: true,
  location: true,
  websiteUrl: true,
});

export type PortfolioProject = Prisma.ProjectGetPayload<{ select: typeof projectSelect }>;
export type PortfolioCertificate = Prisma.CertificateGetPayload<{
  select: typeof certificateSelect;
}>;
export type PortfolioEducation = Prisma.EducationGetPayload<{
  select: typeof educationSelect;
}>;
export type PortfolioProfile = Prisma.UserGetPayload<{ select: typeof userProfileSelect }>;

/* ─── Data Fetchers ─────────────────────────────────────────────────────── */

async function fetchPortfolioData(profileEmail: string) {
  const empty = {
    profile: null as PortfolioProfile | null,
    projects: [] as PortfolioProject[],
    certificates: [] as PortfolioCertificate[],
    educations: [] as PortfolioEducation[],
  };

  if (!process.env.DATABASE_URL) {
    return empty;
  }

  const user = await prisma.user.findUnique({
    where: { email: profileEmail },
    select: userProfileSelect,
  });

  if (!user) {
    return empty;
  }

  const [projects, certificates, educations] = await prisma.$transaction([
    prisma.project.findMany({
      where: { userId: user.id },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { updatedAt: "desc" }],
      select: projectSelect,
    }),
    prisma.certificate.findMany({
      where: { userId: user.id },
      orderBy: [{ order: "asc" }, { issueDate: "desc" }],
      select: certificateSelect,
    }),
    prisma.education.findMany({
      where: { userId: user.id },
      orderBy: [{ order: "asc" }, { startDate: "desc" }],
      select: educationSelect,
    }),
  ]);

  return {
    profile: user,
    projects,
    certificates,
    educations,
  };
}

export const getPortfolioData = unstable_cache(
  async (profileEmail: string) => fetchPortfolioData(profileEmail),
  ["portfolio-data"],
  { revalidate: 300, tags: ["portfolio"] }
);
