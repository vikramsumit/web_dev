export type Project = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  featured?: boolean;
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Editorial Typography System",
    summary:
      "A design system built around classical proportions and editorial rhythm. Type scales derived from harmonic ratios, with careful attention to line length and vertical rhythm.",
    tags: ["Typography", "Design Systems", "Figma"],
    featured: true,
  },
  {
    id: "2",
    title: "Parchment Digital Experience",
    summary:
      "An immersive web experience that evokes antique manuscripts through restrained animations and parchment-inspired surfaces.",
    tags: ["Next.js", "GSAP", "Motion"],
    featured: false,
  },
  {
    id: "3",
    title: "Ink Bleed Transitions",
    summary:
      "Exploration of SVG mask animations to create organic, editorial transitions between content sections.",
    tags: ["GSAP", "SVG", "ScrollTrigger"],
    featured: false,
  },
];
