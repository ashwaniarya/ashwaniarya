/**
 * Services offered on Contra, copied exactly from https://contra.com/ashwani_arya/services
 * (verified 25 Nov 2026 IST from the page's own service data: title, tags in Contra's order,
 * fixed price in USD and each service's URL). Contra's text wins: update here if Contra changes.
 */
export type ContraServiceRecord = Readonly<{
  serviceKey: string;
  /** Exactly as Contra shows it, slashes and all. */
  title: string;
  /** Contra's tags, in Contra's order. */
  tags: readonly string[];
  /** Contra fixed price in USD. */
  priceUsd: number;
  contraUrl: string;
}>;

export const contraServicesProfileUrl = "https://contra.com/ashwani_arya/services";

export const homepageServicesSectionCopyConfiguration = {
  sectionHeading: "Services",
  sectionIntroLines: [
    "Fixed-price builds on Contra, run the way I work as a product engineer and builder: take the problem, ship the first version, then iterate on outcomes. Need something else? Ask for a custom application.",
  ],
  carouselLabel: "Services",
  carouselPageNoun: "services",
  bookLinkLabel: "Book on Contra",
  /** Visible tags per card; the rest show as "+N". */
  maxVisibleTags: 3,
  customApplication: {
    title: "Custom application",
    summary: "Something that does not fit a package? Tell me what you need to build and I will reply by email.",
    buttonLabel: "Start an inquiry",
  },
} as const;

export const homepageServicesConfiguration = [
  {
    serviceKey: "paidTrialDay",
    title: "Paid trial day",
    tags: ["React"],
    priceUsd: 440,
    contraUrl: "https://contra.com/s/eL2XMAg7-paid-trial-day",
  },
  {
    serviceKey: "liveVideoRealTimeUi",
    title: "Live video and real-time UI",
    tags: ["React"],
    priceUsd: 2200,
    contraUrl: "https://contra.com/s/sWNrMEL6-live-video-and-real-time-ui",
  },
  {
    serviceKey: "aiAgentLlmPipelineBuild",
    title: "AI agent / LLM pipeline build",
    tags: ["LangGraph", "Python"],
    priceUsd: 2200,
    contraUrl: "https://contra.com/s/oc3oAELR-ai-agent-llm-pipeline-build",
  },
  {
    serviceKey: "frontendHeavyFullStackBuild",
    title: "Frontend-heavy full-stack build (React / Next.js + Node/FastAPI)",
    tags: ["Next.js"],
    priceUsd: 4400,
    contraUrl: "https://contra.com/s/PvklZRQE-frontend-heavy-full-stack-build-react-nextjs-nodefast-api",
  },
  {
    serviceKey: "aiAgentLlmPipelineBuilds",
    title: "AI agent and LLM pipeline builds",
    tags: ["FastAPI", "LangChain", "Next.js", "OpenAI", "Python", "Redis", "AI Agent Developer", "Artificial Intelligence"],
    priceUsd: 3000,
    contraUrl: "https://contra.com/s/oNqvlEZo-ai-agent-and-llm-pipeline-builds",
  },
  {
    serviceKey: "saasMvpBuild",
    title: "SaaS MVP build, from idea to production",
    tags: ["FastAPI", "Next.js", "Node.js", "PostgreSQL", "Prisma", "React", "Stripe"],
    priceUsd: 4800,
    contraUrl: "https://contra.com/s/WbMUlWqX-saa-s-mvp-build-from-idea-to-production",
  },
  {
    serviceKey: "reactNextTypeScriptDashboards",
    title: "React, Next.js and TypeScript dashboards",
    tags: ["Next.js", "React", "Storybook", "Tailwind CSS", "TypeScript", "Frontend Engineer"],
    priceUsd: 1800,
    contraUrl: "https://contra.com/s/g7AQFmkF-react-nextjs-and-type-script-dashboards",
  },
] as const satisfies readonly ContraServiceRecord[];

/** "$2,200" style, matching Contra. */
export function formatServicePriceUsd(priceUsd: number): string {
  return `$${priceUsd.toLocaleString("en-US")}`;
}
