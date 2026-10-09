export type ProductionProofMetricKey =
  | "liveVideoDailySessions"
  | "liveVideoRevenueRamp"
  | "copilotMonthlyConversations"
  | "copilotMonthlyRevenue";

export type ProductionProofMetricRecord = Readonly<{
  metricKey: ProductionProofMetricKey;
  /**
   * Must appear verbatim inside the getbujo case study config; the drift guard in
   * `homepageProductionProofConfiguration.test.ts` enforces it.
   */
  valueLabel: string;
  metricLabel: string;
  contextLine: string;
}>;

export const homepageProductionProofSectionCopyConfiguration = {
  sectionHeading: "In production",
  sectionIntroLines: [
    "Numbers from the founding-engineer work at getbujo (YC P26). Each one is unpacked in the case study below.",
  ],
} as const;

export const homepageProductionProofMetricsConfiguration = [
  {
    metricKey: "liveVideoDailySessions",
    valueLabel: "~100k/day",
    metricLabel: "Live video sessions",
    contextLine:
      "Wingman widget embedded in server-rendered retailer storefronts, calls surviving full-page navigations.",
  },
  {
    metricKey: "liveVideoRevenueRamp",
    valueLabel: "$0 → $150K ARR",
    metricLabel: "Company revenue ramp",
    contextLine:
      "First engineer on the product, from nothing shipped to $150K ARR on a multi-tenant live-video platform.",
  },
  {
    metricKey: "copilotMonthlyConversations",
    valueLabel: "~30k/month",
    metricLabel: "AI conversations",
    contextLine:
      "About 80 sales agents on an iframe copilot inside Sprinklr, backed by an in-house AI service on AWS.",
  },
  {
    metricKey: "copilotMonthlyRevenue",
    valueLabel: "~$20k MRR",
    metricLabel: "Copilot revenue line",
    contextLine:
      "REST to WebSocket migration in four calendar days, cited as a factor in winning a long-term LG US contract.",
  },
] as const satisfies readonly ProductionProofMetricRecord[];
