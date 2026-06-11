import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const profileEmail = process.env.PORTFOLIO_PROFILE_EMAIL ?? "sumit.vikram@example.com";

const skillPayload = [
  { slug: "python", name: "Python", category: "Programming" },
  { slug: "javascript", name: "JavaScript", category: "Programming" },
  { slug: "java", name: "Java", category: "Programming" },
  { slug: "c", name: "C", category: "Programming" },
  { slug: "data-science", name: "Data Science", category: "AI / ML" },
  { slug: "machine-learning", name: "Machine Learning", category: "AI / ML" },
  { slug: "deep-learning", name: "Deep Learning", category: "AI / ML" },
  { slug: "tensorflow", name: "TensorFlow", category: "AI / ML" },
  { slug: "keras", name: "Keras", category: "AI / ML" },
  { slug: "scikit-learn", name: "Scikit-learn", category: "AI / ML" },
  { slug: "pandas", name: "Pandas", category: "AI / ML" },
  { slug: "react-js", name: "React.js", category: "Frontend" },
  { slug: "next-js", name: "Next.js", category: "Frontend" },
  { slug: "tailwind-css", name: "Tailwind CSS", category: "Frontend" },
  { slug: "node-js", name: "Node.js", category: "Backend" },
  { slug: "express-js", name: "Express.js", category: "Backend" },
  { slug: "mongodb", name: "MongoDB", category: "Database" },
  { slug: "mysql", name: "MySQL", category: "Database" },
  { slug: "cybersecurity", name: "Cybersecurity", category: "Security" },
];

async function upsertSkills() {
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

function connectSkills(skillIds, slugs) {
  return slugs.map((slug) => ({ id: skillIds[slug] }));
}

async function main() {
  const skillIds = await upsertSkills();

  const user = await prisma.user.upsert({
    where: { email: profileEmail },
    update: {
      name: "Sumit Vikram",
      headline:
        "B.Tech IT Student | Data Science & AI/ML | Full Stack Development | Open to Internship Opportunities",
      bio:
        "I'm a final-year B.Tech IT student specializing in Data Science, AI/ML, and MERN Stack development. I love building end-to-end systems, from training ML models to shipping full-stack web apps.",
      location: "India",
      websiteUrl: "https://github.com/vikramsumit",
    },
    create: {
      email: profileEmail,
      name: "Sumit Vikram",
      headline:
        "B.Tech IT Student | Data Science & AI/ML | Full Stack Development | Open to Internship Opportunities",
      bio:
        "I'm a final-year B.Tech IT student specializing in Data Science, AI/ML, and MERN Stack development. I love building end-to-end systems, from training ML models to shipping full-stack web apps.",
      location: "India",
      websiteUrl: "https://github.com/vikramsumit",
    },
  });

  await prisma.$transaction([
    prisma.certificate.deleteMany({ where: { userId: user.id } }),
    prisma.project.deleteMany({ where: { userId: user.id } }),
    prisma.education.deleteMany({ where: { userId: user.id } }),
  ]);

  const btech = await prisma.education.create({
    data: {
      userId: user.id,
      institution: "West Bengal University of Technology (WBUT)",
      degree: "B.Tech",
      fieldOfStudy: "Information Technology",
      description:
        "Final-year B.Tech IT student with an 8.04 / 10 GPA, focused on Data Science, AI/ML, full-stack development, and problem solving.",
      startDate: new Date("2024-07-01"),
      endDate: new Date("2027-06-30"),
      order: 0,
      skills: {
        connect: connectSkills(skillIds, ["data-science", "machine-learning", "next-js"]),
      },
    },
  });

  const diploma = await prisma.education.create({
    data: {
      userId: user.id,
      institution: "New Govt. Polytechnic, Patna",
      degree: "Diploma",
      fieldOfStudy: "Computer Science and Engineering",
      description:
        "Completed diploma coursework with an 8.15 / 10 GPA and a strong foundation in programming, systems, and practical troubleshooting.",
      startDate: new Date("2021-07-01"),
      endDate: new Date("2024-06-30"),
      order: 1,
      skills: {
        connect: connectSkills(skillIds, ["python", "java", "cybersecurity"]),
      },
    },
  });

  await prisma.education.create({
    data: {
      userId: user.id,
      institution: "Cambridge School, Nalanda",
      degree: "CBSE Class X",
      fieldOfStudy: "Secondary Education",
      description: "Completed CBSE Class X with 87.6%.",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2020-12-31"),
      order: 2,
    },
  });

  await prisma.project.create({
    data: {
      userId: user.id,
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
      skills: {
        connect: connectSkills(skillIds, [
          "python",
          "tensorflow",
          "keras",
          "react-js",
          "express-js",
        ]),
      },
    },
  });

  await prisma.project.create({
    data: {
      userId: user.id,
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
      skills: {
        connect: connectSkills(skillIds, ["python", "pandas", "scikit-learn", "data-science"]),
      },
    },
  });

  await prisma.project.createMany({
    data: [
      {
        userId: user.id,
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
      },
      {
        userId: user.id,
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
      },
      {
        userId: user.id,
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
      },
    ],
  });

  await prisma.certificate.createMany({
    data: [
      {
        userId: user.id,
        educationId: btech.id,
        title: "Introduction to Software Engineering",
        issuer: "IBM / Coursera",
        imageUrl: "https://picsum.photos/seed/cert-ibm-software/840/560",
        issueDate: new Date("2026-05-22"),
        verificationUrl: "https://www.coursera.org/verify/DH9WY9GDPYRK",
        order: 0,
      },
      {
        userId: user.id,
        educationId: btech.id,
        title: "AI Strategy & Business Intelligence Internship",
        issuer: "CSRBOX / AICTE / IBM SkillsBuild",
        imageUrl: "https://picsum.photos/seed/cert-ai-strategy/840/560",
        issueDate: new Date("2026-04-12"),
        verificationUrl: "https://skillsbuild.org",
        order: 1,
      },
      {
        userId: user.id,
        educationId: null,
        title: "Artificial Intelligence Fundamentals",
        issuer: "IBM SkillsBuild",
        imageUrl: "https://picsum.photos/seed/cert-ai-fundamentals/840/560",
        issueDate: new Date("2024-12-28"),
        verificationUrl: "https://www.credly.com",
        order: 2,
      },
      {
        userId: user.id,
        educationId: null,
        title: "Generative AI in Action",
        issuer: "IBM SkillsBuild",
        imageUrl: "https://picsum.photos/seed/cert-gen-ai-action/840/560",
        issueDate: new Date("2024-12-31"),
        verificationUrl: "https://www.credly.com",
        order: 3,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "Foundations of Cybersecurity",
        issuer: "Google / Coursera",
        imageUrl: "https://picsum.photos/seed/cert-google-cyber/840/560",
        issueDate: new Date("2024-03-18"),
        verificationUrl: "https://www.coursera.org/verify/XNHVP8TPMBDT",
        order: 4,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "Play It Safe: Manage Security Risks",
        issuer: "Google / Coursera",
        imageUrl: "https://picsum.photos/seed/cert-play-it-safe/840/560",
        issueDate: new Date("2024-03-17"),
        verificationUrl: "https://www.coursera.org/verify/2R4M482V7EQU",
        order: 5,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "CCNA: Switching, Routing, and Wireless Essentials",
        issuer: "Cisco Networking Academy",
        imageUrl: "https://picsum.photos/seed/cert-cisco-ccna/840/560",
        issueDate: null,
        verificationUrl: "https://www.netacad.com",
        order: 6,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "Introduction to IoT Cybersecurity",
        issuer: "Cisco Networking Academy",
        imageUrl: "https://picsum.photos/seed/cert-cisco-iot-cyber/840/560",
        issueDate: null,
        verificationUrl: "https://www.netacad.com",
        order: 7,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "IT Essentials",
        issuer: "Cisco Networking Academy",
        imageUrl: "https://picsum.photos/seed/cert-cisco-it-essentials/840/560",
        issueDate: null,
        verificationUrl: "https://www.netacad.com",
        order: 8,
      },
      {
        userId: user.id,
        educationId: diploma.id,
        title: "Python Programming Essentials",
        issuer: "Cisco Networking Academy",
        imageUrl: "https://picsum.photos/seed/cert-cisco-python/840/560",
        issueDate: null,
        verificationUrl: "https://www.netacad.com",
        order: 9,
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
