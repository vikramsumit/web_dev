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

const skills = {
  python: { id: "skill-python", name: "Python", slug: "python" },
  tensorflow: { id: "skill-tensorflow", name: "TensorFlow", slug: "tensorflow" },
  react: { id: "skill-react", name: "React.js", slug: "react-js" },
  dataScience: { id: "skill-data-science", name: "Data Science", slug: "data-science" },
  next: { id: "skill-next", name: "Next.js", slug: "next-js" },
  cybersecurity: { id: "skill-cybersecurity", name: "Cybersecurity", slug: "cybersecurity" },
};

const fallbackPortfolioData = {
  profile: {
    id: "sumit-vikram",
    name: "Sumit Vikram",
    headline:
      "B.Tech IT Student | Data Science & AI/ML | Full Stack Development | Open to Internship Opportunities",
    // bio:
    //   "I'm a final-year B.Tech IT student specializing in Data Science, AI/ML, and MERN Stack development. I love building end-to-end systems, from training ML models to shipping full-stack web apps.",
      bio: null,
    location: "India",
    websiteUrl: "https://github.com/vikramsumit",
  } satisfies PortfolioProfile,
  projects: [
    {
      id: "project-plant-disease",
      slug: "plant-disease-detection-system",
      title: "Plant Disease Detection System",
      summary:
        "AI-powered plant disease detection with a two-stage TensorFlow/Keras pipeline, supporting 9 plant species and live predictions around 97.7% confidence.",
      caseStudy:
        "Built a plant identifier and disease classifier using augmented PlantVillage data, plus a React/Vite frontend, Express REST API, camera upload flow, and CLI batch prediction with CSV export.",
      techStack: ["Python", "TensorFlow", "Keras", "Express.js", "React.js", "Vite", "Node.js"],
      imageUrl: "https://picsum.photos/seed/sumit-plant-disease/1200/760",
      featured: true,
      order: 0,
      skills: [skills.python, skills.tensorflow, skills.react],
    },
    {
      id: "project-retail-analytics",
      slug: "integrated-retail-analytics-dashboard",
      title: "Integrated Retail Analytics Dashboard",
      summary:
        "End-to-end ML pipeline on 421,000+ retail sales records across 45 stores and 99 departments, reaching 95%+ R2 after model tuning.",
      caseStudy:
        "Handled large-scale cleaning, 50%+ missing promotional data, 15+ engineered temporal and business features, six-model comparison, and stakeholder-ready visualizations.",
      techStack: ["Python", "Pandas", "Scikit-learn", "Matplotlib", "Seaborn", "Jupyter"],
      imageUrl: "https://picsum.photos/seed/sumit-retail-analytics/1200/760",
      featured: true,
      order: 1,
      skills: [skills.python, skills.dataScience],
    },
    {
      id: "project-get-me-chai",
      slug: "get-me-chai-app",
      title: "Get Me Chai App",
      summary:
        "A full-stack creator support app built with Next.js, Node.js, MongoDB, and Razorpay payment integration.",
      caseStudy:
        "Built a practical web product with authentication-ready architecture, database-backed creator pages, and payment flow foundations.",
      techStack: ["Next.js", "Node.js", "MongoDB", "Razorpay"],
      imageUrl: "https://picsum.photos/seed/sumit-get-me-chai/1200/760",
      featured: false,
      order: 2,
      skills: [skills.next, skills.react],
    },
    {
      id: "project-netflix-clone",
      slug: "netflix-clone",
      title: "Netflix Clone",
      summary:
        "A React and Tailwind interface inspired by streaming product patterns, using the TMDB API for movie content.",
      caseStudy:
        "Practiced responsive UI structure, API-driven content rendering, reusable components, and polished frontend states.",
      techStack: ["React.js", "Tailwind CSS", "TMDB API"],
      imageUrl: "https://picsum.photos/seed/sumit-netflix-clone/1200/760",
      featured: false,
      order: 3,
      skills: [skills.react],
    },
    {
      id: "project-tripmate",
      slug: "tripmate-app",
      title: "TripMate App",
      summary:
        "A travel planning web app concept focused on practical trip organization and clean modern frontend flows.",
      caseStudy:
        "Explored destination planning, interface structure, and reusable app patterns with React/Next.js.",
      techStack: ["React.js", "Next.js"],
      imageUrl: "https://picsum.photos/seed/sumit-tripmate/1200/760",
      featured: false,
      order: 4,
      skills: [skills.react, skills.next],
    },
  ] satisfies PortfolioProject[],
  certificates: [
    {
      id: "cert-ibm-software-engineering",
      educationId: null,
      title: "Introduction to Software Engineering",
      issuer: "IBM / Coursera",
      imageUrl: "https://picsum.photos/seed/cert-ibm-software/840/560",
      issueDate: new Date("2026-05-22"),
      expirationDate: null,
      verificationUrl: "https://www.coursera.org/verify/DH9WY9GDPYRK",
      order: 0,
    },
    {
      id: "cert-ai-strategy-business-intelligence",
      educationId: null,
      title: "AI Strategy & Business Intelligence Internship",
      issuer: "CSRBOX / AICTE / IBM SkillsBuild",
      imageUrl: "https://picsum.photos/seed/cert-ai-strategy/840/560",
      issueDate: new Date("2026-04-12"),
      expirationDate: null,
      verificationUrl: "https://skillsbuild.org",
      order: 1,
    },
    {
      id: "cert-ai-fundamentals",
      educationId: null,
      title: "Artificial Intelligence Fundamentals",
      issuer: "IBM SkillsBuild",
      imageUrl: "https://picsum.photos/seed/cert-ai-fundamentals/840/560",
      issueDate: new Date("2024-12-28"),
      expirationDate: null,
      verificationUrl: "https://www.credly.com",
      order: 2,
    },
    {
      id: "cert-generative-ai-action",
      educationId: null,
      title: "Generative AI in Action",
      issuer: "IBM SkillsBuild",
      imageUrl: "https://picsum.photos/seed/cert-gen-ai-action/840/560",
      issueDate: new Date("2024-12-31"),
      expirationDate: null,
      verificationUrl: "https://www.credly.com",
      order: 3,
    },
    {
      id: "cert-foundations-cybersecurity",
      educationId: null,
      title: "Foundations of Cybersecurity",
      issuer: "Google / Coursera",
      imageUrl: "https://picsum.photos/seed/cert-google-cyber/840/560",
      issueDate: new Date("2024-03-18"),
      expirationDate: null,
      verificationUrl: "https://www.coursera.org/verify/XNHVP8TPMBDT",
      order: 4,
    },
    {
      id: "cert-play-it-safe",
      educationId: null,
      title: "Play It Safe: Manage Security Risks",
      issuer: "Google / Coursera",
      imageUrl: "https://picsum.photos/seed/cert-play-it-safe/840/560",
      issueDate: new Date("2024-03-17"),
      expirationDate: null,
      verificationUrl: "https://www.coursera.org/verify/2R4M482V7EQU",
      order: 5,
    },
    {
      id: "cert-ccna-switching-routing",
      educationId: null,
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco Networking Academy",
      imageUrl: "https://picsum.photos/seed/cert-cisco-ccna/840/560",
      issueDate: null,
      expirationDate: null,
      verificationUrl: "https://www.netacad.com",
      order: 6,
    },
    {
      id: "cert-iot-cybersecurity",
      educationId: null,
      title: "Introduction to IoT Cybersecurity",
      issuer: "Cisco Networking Academy",
      imageUrl: "https://picsum.photos/seed/cert-cisco-iot-cyber/840/560",
      issueDate: null,
      expirationDate: null,
      verificationUrl: "https://www.netacad.com",
      order: 7,
    },
    {
      id: "cert-it-essentials",
      educationId: null,
      title: "IT Essentials",
      issuer: "Cisco Networking Academy",
      imageUrl: "https://picsum.photos/seed/cert-cisco-it-essentials/840/560",
      issueDate: null,
      expirationDate: null,
      verificationUrl: "https://www.netacad.com",
      order: 8,
    },
    {
      id: "cert-python-essentials",
      educationId: null,
      title: "Python Programming Essentials",
      issuer: "Cisco Networking Academy",
      imageUrl: "https://picsum.photos/seed/cert-cisco-python/840/560",
      issueDate: null,
      expirationDate: null,
      verificationUrl: "https://www.netacad.com",
      order: 9,
    },
  ] satisfies PortfolioCertificate[],
  educations: [
    {
      id: "education-btech",
      institution: "West Bengal University of Technology (WBUT)",
      degree: "B.Tech",
      fieldOfStudy: "Information Technology",
      description:
        "Final-year B.Tech IT student with an 8.04 / 10 GPA, focused on Data Science, AI/ML, full-stack development, and problem solving.",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2027-06-30"),
      order: 0,
      skills: [skills.dataScience, skills.next, skills.python],
      certificates: [],
    },
    {
      id: "education-diploma",
      institution: "New Govt. Polytechnic, Patna",
      degree: "Diploma",
      fieldOfStudy: "Computer Science and Engineering",
      description:
        "Completed diploma coursework with an 8.15 / 10 GPA and a strong foundation in programming, systems, and practical troubleshooting.",
      startDate: new Date("2021-07-01"),
      endDate: new Date("2024-06-30"),
      order: 1,
      skills: [skills.python, skills.cybersecurity],
      certificates: [],
    },
    {
      id: "education-cbse",
      institution: "Cambridge School, Nalanda",
      degree: "CBSE Class X",
      fieldOfStudy: "Secondary Education",
      description: "Completed CBSE Class X with 87.6%.",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      order: 2,
      skills: [],
      certificates: [],
    },
  ] satisfies PortfolioEducation[],
};

/* ─── Data Fetchers ─────────────────────────────────────────────────────── */

async function fetchPortfolioData(profileEmail: string) {
  if (!process.env.DATABASE_URL || process.env.PORTFOLIO_DATA_SOURCE !== "database") {
    return fallbackPortfolioData;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: profileEmail },
      select: userProfileSelect,
    });

    if (!user) {
      return fallbackPortfolioData;
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
  } catch (error) {
    console.warn("Unable to load portfolio data; rendering local portfolio content.", error);
    return fallbackPortfolioData;
  }
}

export const getPortfolioData = unstable_cache(
  async (profileEmail: string) => fetchPortfolioData(profileEmail),
  ["portfolio-data"],
  { revalidate: 300, tags: ["portfolio"] }
);
