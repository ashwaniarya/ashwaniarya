export type TechnologyStackCategoryRecord = Readonly<{
  categoryTitle: string;
  itemLabels: readonly string[];
}>;

export const homepageTechnologyStackCategoriesConfiguration = [
  {
    categoryTitle: "Systems",
    itemLabels: ["Payment Systems","BFF (Backend for Frontend)", "Investment Management System", "Design Systems", "RESTful APIs"],
  },
  {
    categoryTitle: "Programming Languages",
    itemLabels: ["JavaScript", "TypeScript", "Java"],
  },
  {
    categoryTitle: "Frameworks",
    itemLabels: [
      "ReactJS",
      "React Native",
      "Vite",
      "NextJS",
      "ExpressJS",
      "Spring Boot (JPA)",
    ],
  },
  {
    categoryTitle: "Frontend",
    itemLabels: [
      "Vanilla JS",
      "Web APIs",
      "Material UI",
      "Bootstrap",
      "NativeBase",
      "react-native-paper",
    ],
  },
  {
    categoryTitle: "Backend",
    itemLabels: ["NodeJS"],
  },
  {
    categoryTitle: "Tools",
    itemLabels: [
      "Babel",
      "Docker",
      "Apache",
      "PM2",
      "Nginx",
      "Git",
      "GitHub",
      "Bash",
    ],
  },
  {
    categoryTitle: "Databases",
    itemLabels: ["MongoDB", "Mongoose ORM", "PostgreSQL", "Prisma"],
  },
  {
    categoryTitle: "Platforms",
    itemLabels: ["AWS", "Vercel Functions", "CDN"],
  },
  {
    categoryTitle: "Library",
    itemLabels: [
      "Jest",
      "React Testing Library",
      "Redux",
      "Context API",
      "Radio (in-house Pub/Sub engine)",
      "Socket.io",
    ],
  },

  {
    categoryTitle: "CI/CD",
    itemLabels: ["GitHub Actions", "Vercel Deployment"],
  },
] as const satisfies readonly TechnologyStackCategoryRecord[];
