export type WorkHistoryRoleRecord = Readonly<{
  roleKey: string;
  company: string;
  title: string;
  /** Plain-text range, e.g. "Apr 2026 to Nov 2026". */
  dateRange: string;
  /** Short tag such as "Contract, ended". Optional. */
  engagementLabel?: string;
  detailLines: readonly string[];
}>;

export const homepageWorkHistorySectionCopyConfiguration = {
  sectionHeading: "Experience",
  sectionIntroLines: ["Every role since 2019, newest first."],
  educationLine: "B.E. Computer Science, JSS Academy of Technical Education, 2019.",
} as const;

/** Newest first. Dates come from the master CV; details only from the approved about text. */
export const homepageWorkHistoryConfiguration = [
  {
    roleKey: "aiclicks",
    company: "AIClicks",
    title: "Founding Engineer, Full Stack",
    dateRange: "Apr 2026 to Nov 2026",
    engagementLabel: "Remote contract, ended",
    detailLines: [
      "Recommendation engine pulling posts from 6 platforms.",
      "Raised AI mention-detection accuracy from 90% to 98%. Stripe PaymentIntents and Invoices.",
    ],
  },
  {
    roleKey: "getbujo",
    company: "getbujo",
    title: "Founding Engineer",
    dateRange: "Dec 2024 to Feb 2026",
    detailLines: [
      "Built the merchant side: AI copilot, co-browsing, video calling and chat. Moved calling into a global UI with clear join states and cut Zoom join time from 24s to 6s, which reduced call churn.",
      "Per-call sentiment score, sales and merchant dashboards with AI video summaries. The widget delivered 100K-150K sessions, with 4K-5K opens.",
    ],
  },
  {
    roleKey: "msquare",
    company: "Msquare Labs (client: Genpact)",
    title: "Senior React Native consultant",
    dateRange: "Feb 2024 to Aug 2024",
    engagementLabel: "Contract",
    detailLines: [],
  },
  {
    roleKey: "uipath",
    company: "UiPath",
    title: "SDE 2, Frontend",
    dateRange: "Oct 2023 to Feb 2024",
    detailLines: [],
  },
  {
    roleKey: "tapinvest",
    company: "Tap Invest",
    title: "Founding Engineer, Full Stack",
    dateRange: "Dec 2021 to Aug 2023",
    detailLines: [
      "Automated onboarding for asset-leasing companies, from document checks to the public listing page, cutting it from 2-3 days to 3-4 hours. Also built an atomic-design system.",
    ],
  },
  {
    roleKey: "geekyants",
    company: "GeekyAnts",
    title: "Software engineer",
    dateRange: "Feb 2020 to Dec 2021",
    detailLines: [],
  },
  {
    roleKey: "backtick",
    company: "BackTick Infotech",
    title: "Co-founder",
    dateRange: "Aug 2019 to Feb 2020",
    detailLines: [],
  },
] as const satisfies readonly WorkHistoryRoleRecord[];
