export type ProductionProofMetricKey =
  | "zoomJoinTime"
  | "widgetSessionsDelivered"
  | "widgetOpens"
  | "perCallSentiment";

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
    "Numbers from the merchant product at getbujo. Each one is unpacked in the case study below.",
  ],
} as const;

export const homepageProductionProofMetricsConfiguration = [
  {
    metricKey: "zoomJoinTime",
    valueLabel: "24s → 6s",
    metricLabel: "Zoom join",
    contextLine:
      "Calling moved into a global UI with clear join states. Zoom join time went from 24s to 6s, which reduced call churn.",
  },
  {
    metricKey: "widgetSessionsDelivered",
    valueLabel: "100K–150K",
    metricLabel: "Widget sessions",
    contextLine: "The widget delivered 100K–150K sessions.",
  },
  {
    metricKey: "widgetOpens",
    valueLabel: "4K–5K",
    metricLabel: "Widget opens",
    contextLine: "Those sessions came with 4K–5K opens.",
  },
  {
    metricKey: "perCallSentiment",
    valueLabel: "Sentiment",
    metricLabel: "Per-call score",
    contextLine:
      "Each call got a sentiment score, with sales and merchant dashboards and AI video summaries.",
  },
] as const satisfies readonly ProductionProofMetricRecord[];
