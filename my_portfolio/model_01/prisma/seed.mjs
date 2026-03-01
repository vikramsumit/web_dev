import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profileEmail = process.env.PORTFOLIO_PROFILE_EMAIL ?? "portfolio@example.com";

async function upsertSkills() {
  const skillPayload = [
    { slug: "ux-research", name: "UX Research", category: "Design" },
    { slug: "interaction-design", name: "Interaction Design", category: "Design" },
    { slug: "design-systems", name: "Design Systems", category: "Design" },
    { slug: "figma", name: "Figma", category: "Tooling" },
    { slug: "next-js", name: "Next.js", category: "Frontend" },
    { slug: "typescript", name: "TypeScript", category: "Frontend" },
    { slug: "tailwind-css", name: "Tailwind CSS", category: "Frontend" },
    { slug: "motion", name: "Motion", category: "Frontend" },
    { slug: "gsap", name: "GSAP", category: "Frontend" },
  ];

  const skills = await Promise.all(
    skillPayload.map((skill) =>
      prisma.skill.upsert({
        where: { slug: skill.slug },
        update: { name: skill.name, category: skill.category },
        create: skill,
      })
    )
  );

  return Object.fromEntries(skills.map((skill) => [skill.slug, skill.id]));
}

async function main() {
  const skillIds = await upsertSkills();

  const user = await prisma.user.upsert({
    where: { email: profileEmail },
    update: {
      name: "Raju Sharma",
      headline: "UI/UX Designer · Frontend Designer · Systems Thinker",
      bio: "Designing digital products with classical restraint, editorial rhythm, and modern engineering discipline.",
      location: "Bengaluru, India",
      websiteUrl: "https://example.com",
    },
    create: {
      email: profileEmail,
      name: "Raju Sharma",
      headline: "UI/UX Designer · Frontend Designer · Systems Thinker",
      bio: "Designing digital products with classical restraint, editorial rhythm, and modern engineering discipline.",
      location: "Bengaluru, India",
      websiteUrl: "https://example.com",
    },
  });

  await prisma.$transaction([
    prisma.certificate.deleteMany({ where: { userId: user.id } }),
    prisma.project.deleteMany({ where: { userId: user.id } }),
    prisma.education.deleteMany({ where: { userId: user.id } }),
  ]);

  const bachelor = await prisma.education.create({
    data: {
      userId: user.id,
      institution: "National Institute of Design",
      degree: "Bachelor of Design",
      fieldOfStudy: "Communication Design",
      description:
        "Focused on editorial systems, visual language, and interaction fundamentals for digital products.",
      startDate: new Date("2017-07-01"),
      endDate: new Date("2021-05-31"),
      order: 0,
      skills: {
        connect: [
          { id: skillIds["ux-research"] },
          { id: skillIds["interaction-design"] },
          { id: skillIds["figma"] },
        ],
      },
    },
  });

  const masters = await prisma.education.create({
    data: {
      userId: user.id,
      institution: "School of Visual Arts",
      degree: "Master of Fine Arts",
      fieldOfStudy: "Design for Digital Experiences",
      description:
        "Advanced work in product storytelling, service flows, and typographic systems for interfaces.",
      startDate: new Date("2022-01-01"),
      endDate: new Date("2023-12-20"),
      order: 1,
      skills: {
        connect: [
          { id: skillIds["design-systems"] },
          { id: skillIds["interaction-design"] },
          { id: skillIds["ux-research"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      userId: user.id,
      slug: "museum-archive-platform",
      title: "Museum Archive Platform",
      summary:
        "A searchable museum archive experience balancing scholarship, clarity, and narrative browsing.",
      caseStudy:
        "Redesigned archival discovery with progressive disclosure, semantic indexing, and editorial card layouts for curators and researchers.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL"],
      imageUrl: "https://picsum.photos/seed/project-museum/1200/760",
      featured: true,
      order: 0,
      skills: {
        connect: [
          { id: skillIds["next-js"] },
          { id: skillIds["typescript"] },
          { id: skillIds["ux-research"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      userId: user.id,
      slug: "foundry-editorial-commerce",
      title: "Foundry Editorial Commerce",
      summary: "A commerce narrative system built around long-form product storytelling.",
      caseStudy:
        "Built modular editorial blocks and motion hierarchy to improve conversion without sacrificing readability.",
      techStack: ["Next.js", "Tailwind CSS", "Motion", "Supabase"],
      imageUrl: "https://picsum.photos/seed/project-foundry/1200/760",
      featured: false,
      order: 1,
      skills: {
        connect: [
          { id: skillIds["tailwind-css"] },
          { id: skillIds["motion"] },
          { id: skillIds["interaction-design"] },
        ],
      },
    },
  });

  await prisma.project.create({
    data: {
      userId: user.id,
      slug: "atelier-systems-library",
      title: "Atelier Systems Library",
      summary: "A reusable component and pattern library for consistent product experiences.",
      caseStudy:
        "Standardized component behavior, accessibility states, and documentation to reduce design-engineering drift.",
      techStack: ["TypeScript", "Tailwind CSS", "Motion", "Storybook"],
      imageUrl: "https://picsum.photos/seed/project-atelier/1200/760",
      featured: false,
      order: 2,
      skills: {
        connect: [
          { id: skillIds["design-systems"] },
          { id: skillIds["gsap"] },
          { id: skillIds["typescript"] },
        ],
      },
    },
  });

  await prisma.certificate.createMany({
    data: [
      {
        userId: user.id,
        educationId: bachelor.id,
        title: "Human-Centered Design",
        issuer: "National Institute of Design",
        imageUrl: "https://picsum.photos/seed/cert-hcd/840/560",
        issueDate: new Date("2020-08-15"),
        verificationUrl: "https://example.com/certificates/hcd",
        order: 0,
      },
      {
        userId: user.id,
        educationId: masters.id,
        title: "Advanced Product Strategy",
        issuer: "School of Visual Arts",
        imageUrl: "https://picsum.photos/seed/cert-strategy/840/560",
        issueDate: new Date("2023-09-10"),
        verificationUrl: "https://example.com/certificates/aps",
        order: 1,
      },
      {
        userId: user.id,
        educationId: null,
        title: "Frontend Animation Systems",
        issuer: "Motion Academy",
        imageUrl: "https://picsum.photos/seed/cert-motion/840/560",
        issueDate: new Date("2024-03-20"),
        verificationUrl: "https://example.com/certificates/fas",
        order: 2,
      },
    ],
  });

  console.log(`Seed completed for ${profileEmail}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
