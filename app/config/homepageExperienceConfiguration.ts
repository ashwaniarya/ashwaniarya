export type ExperienceFocusAreaKey =
  | "crossPlatformDevelopment"
  | "reusableComponentDesign"
  | "apiAndContractDevelopment"
  | "backendDevelopment"
  | "performanceOptimization"
  | "dataIntensiveFrontend"
  | "frontendArchitecture";

export type ExperienceFocusAreaRecord = Readonly<{
  focusAreaKey: ExperienceFocusAreaKey;
  titleLine: string;
  detailLine: string;
}>;

export const homepageExperienceSectionCopyConfiguration = {
  sectionHeading: "Experience",
  sectionIntroLines: [
    "Product engineer in Bengaluru, 7+ years. The tiles below are getbujo, AIClicks (ended Nov 2026), Tap Invest, then UiPath and GeekyAnts.",
  ],
} as const;

export const homepageExperienceFocusAreasConfiguration = [
  {
    focusAreaKey: "backendDevelopment",
    titleLine: "AIClicks (ended)",
    detailLine:
      "Apr–Nov 2026, contract, ended. Recommendation engine pulling posts from 6 platforms. Raised AI mention-detection accuracy from 90% to 98%. Stripe PaymentIntents and Invoices.",
  },
  {
    focusAreaKey: "apiAndContractDevelopment",
    titleLine: "getbujo merchant side",
    detailLine:
      "AI copilot, co-browsing, video calling and chat. When salespeople got confused on calls, I moved calling into a global UI with clear join states.",
  },
  {
    focusAreaKey: "performanceOptimization",
    titleLine: "Zoom join time",
    detailLine:
      "That global calling UI cut Zoom join time from 24s to 6s, which reduced call churn.",
  },
  {
    focusAreaKey: "dataIntensiveFrontend",
    titleLine: "Dashboards and sentiment",
    detailLine:
      "A per-call sentiment score, plus sales and merchant dashboards with AI video summaries. The widget delivered 100K–150K sessions, with 4K–5K opens.",
  },
  {
    focusAreaKey: "frontendArchitecture",
    titleLine: "Tap Invest",
    detailLine:
      "Automated onboarding for asset-leasing companies, from document checks to the public listing page, cutting it from 2–3 days to 3–4 hours. Also built an atomic-design system.",
  },
  {
    focusAreaKey: "crossPlatformDevelopment",
    titleLine: "UiPath and GeekyAnts",
    detailLine:
      "Earlier: UiPath (SDE 2, Frontend) and GeekyAnts.",
  },
  {
    focusAreaKey: "reusableComponentDesign",
    titleLine: "Own builds",
    detailLine:
      "AutoMixPilot (a query in, a finished AI music video out) and a Trello MCP server for AI agents. Also worked with embeddings, semantic clustering and topic extraction.",
  },
] as const satisfies readonly ExperienceFocusAreaRecord[];
