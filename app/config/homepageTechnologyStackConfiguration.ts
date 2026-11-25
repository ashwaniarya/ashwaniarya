export type TechnologyStackCategoryRecord = Readonly<{
  categoryTitle: string;
  itemLabels: readonly string[];
}>;

/** Tiered by how much each one is used. visx and OIDC were dropped on purpose. */
export const homepageTechnologyStackCategoriesConfiguration = [
  {
    categoryTitle: "Primary",
    itemLabels: [
      "TypeScript",
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Stripe",
      "Redis + BullMQ",
      "React Native",
      "WebSockets / Socket.io",
      "Docker + AWS",
      "Tailwind CSS",
      "Chrome extensions",
      "GitHub Actions",
    ],
  },
  {
    categoryTitle: "Secondary",
    itemLabels: [
      "Python + FastAPI",
      "Prisma",
      "LangGraph + MCP",
      "Vitest / Storybook / Cypress",
      "MongoDB",
      "Datadog / PostHog",
      "MySQL",
      "Embeddings / clustering",
    ],
  },
  {
    categoryTitle: "Tertiary",
    itemLabels: ["NestJS", "Three.js / GSAP / WebGL"],
  },
] as const satisfies readonly TechnologyStackCategoryRecord[];
