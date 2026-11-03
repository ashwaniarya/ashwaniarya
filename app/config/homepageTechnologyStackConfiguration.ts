export type TechnologyStackCategoryRecord = Readonly<{
  categoryTitle: string;
  itemLabels: readonly string[];
}>;

export const homepageTechnologyStackCategoriesConfiguration = [
  {
    categoryTitle: "Frontend",
    itemLabels: [
      "ReactJS",
      "NextJS",
      "TypeScript",
      "Tailwind CSS",
      "React Native",
      "Chrome extensions",
      "Storybook",
      "visx",
    ],
  },
  {
    categoryTitle: "Backend & data",
    itemLabels: [
      "NodeJS",
      "ExpressJS",
      "NestJS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Prisma",
      "MongoDB",
      "Redis",
      "BullMQ",
    ],
  },
  {
    categoryTitle: "Payments",
    itemLabels: [
      "Stripe PaymentIntents",
      "Stripe Payment Links",
      "Stripe Invoices",
      "Stripe webhooks",
    ],
  },
  {
    categoryTitle: "AI toolchain",
    itemLabels: ["Claude Code", "Codex", "MCP", "LangGraph"],
  },
  {
    categoryTitle: "Ship & run",
    itemLabels: [
      "Docker",
      "AWS",
      "Vercel Deployment",
      "GitHub Actions",
      "Datadog",
      "PostHog",
      "Vitest",
      "Cypress",
    ],
  },
  {
    categoryTitle: "APIs & realtime",
    itemLabels: ["RESTful APIs", "WebSockets", "Socket.io", "OIDC"],
  },
  {
    categoryTitle: "Motion & 3D",
    itemLabels: ["Three.js", "GSAP", "WebGL"],
  },
] as const satisfies readonly TechnologyStackCategoryRecord[];
