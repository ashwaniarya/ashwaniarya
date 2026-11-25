export type ProductionProofMetricKey =
  | "getbujoZoomJoinTime"
  | "getbujoWidgetSessions"
  | "aiclicksMentionDetectionAccuracy"
  | "aiclicksRecommendationSources";

export type ProductionProofMetricRecord = Readonly<{
  metricKey: ProductionProofMetricKey;
  /**
   * Must appear inside the Experience timeline copy (with "→" read as "to"); the drift guard in
   * `homepageProductionProofConfiguration.test.ts` enforces it.
   */
  valueLabel: string;
  metricLabel: string;
  /** Company the number comes from. */
  contextLine: string;
}>;

export const homepageProductionProofSectionCopyConfiguration = {
  sectionHeading: "In production",
  sectionIntroLines: ["Numbers from getbujo and AIClicks. The roles behind them are in Experience below."],
} as const;

export const homepageProductionProofMetricsConfiguration = [
  {
    metricKey: "getbujoZoomJoinTime",
    valueLabel: "24s → 6s",
    metricLabel: "Zoom join time",
    contextLine: "getbujo",
  },
  {
    metricKey: "getbujoWidgetSessions",
    valueLabel: "100K–150K",
    metricLabel: "Widget sessions",
    contextLine: "getbujo, with 4K–5K opens",
  },
  {
    metricKey: "aiclicksMentionDetectionAccuracy",
    valueLabel: "90% → 98%",
    metricLabel: "Mention-detection accuracy",
    contextLine: "AIClicks",
  },
  {
    metricKey: "aiclicksRecommendationSources",
    valueLabel: "6 platforms",
    metricLabel: "Recommendation engine sources",
    contextLine: "AIClicks",
  },
] as const satisfies readonly ProductionProofMetricRecord[];
