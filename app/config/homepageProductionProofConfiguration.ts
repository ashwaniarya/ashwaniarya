export type ProductionProofMetricKey =
  | "getbujoZoomJoinTime"
  | "getbujoWidgetSessions"
  | "aiclicksMentionDetectionAccuracy"
  | "aiclicksRecommendationSources"
  | "tapInvestOnboardingTime"
  | "tapInvestFrontendFromScratch"
  | "tapInvestRenderEngineOpsWork"
  | "tapInvestDesignSystemDelivery";

/** Where a card's fact comes from. Timeline cards are checked against the Experience copy by test. */
export const experienceTimelineSourceReference = "Experience timeline";

export type ProductionProofMetricRecord = Readonly<{
  metricKey: ProductionProofMetricKey;
  /**
   * For `experienceTimelineSourceReference` cards this must appear inside the Experience timeline
   * copy (with "→" read as "to"); the drift guard in `homepageProductionProofConfiguration.test.ts`
   * enforces it. Other cards cite their source in `sourceReference`.
   */
  valueLabel: string;
  metricLabel: string;
  /** Company the work was built at, shown as a "Built at" pill (exact name as in the Experience timeline). */
  builtAt: "getbujo" | "AIClicks" | "Tap Invest";
  /** True only when the work shipped to production; shows the "In production" pill. */
  inProduction: boolean;
  /** Optional detail under the value. The company lives in `builtAt`, so it is not repeated here. */
  contextLine?: string;
  /** Fact source, kept in config so reviewers can trace every card. Not rendered. */
  sourceReference: string;
}>;

export const homepageProductionProofSectionCopyConfiguration = {
  sectionHeading: "Outcomes achieved",
  sectionIntroLines: [
    "Numbers from getbujo, AIClicks and Tap Invest. The roles behind them are in Experience below.",
  ],
  carouselLabel: "Outcomes achieved",
  builtAtPillPrefix: "Built at",
  inProductionPillLabel: "In production",
} as const;

export const homepageProductionProofMetricsConfiguration = [
  {
    metricKey: "getbujoZoomJoinTime",
    valueLabel: "24s → 6s",
    metricLabel: "Zoom join time",
    builtAt: "getbujo",
    inProduction: true,
    sourceReference: experienceTimelineSourceReference,
  },
  {
    metricKey: "getbujoWidgetSessions",
    valueLabel: "100K-150K",
    metricLabel: "Widget sessions",
    builtAt: "getbujo",
    inProduction: true,
    contextLine: "With 4K-5K opens",
    sourceReference: experienceTimelineSourceReference,
  },
  {
    metricKey: "aiclicksMentionDetectionAccuracy",
    valueLabel: "90% → 98%",
    metricLabel: "Mention-detection accuracy",
    builtAt: "AIClicks",
    inProduction: true,
    sourceReference: experienceTimelineSourceReference,
  },
  {
    metricKey: "aiclicksRecommendationSources",
    valueLabel: "6 platforms",
    metricLabel: "Recommendation engine sources",
    builtAt: "AIClicks",
    inProduction: true,
    sourceReference: experienceTimelineSourceReference,
  },
  {
    metricKey: "tapInvestOnboardingTime",
    valueLabel: "2-3 days → 3-4 hrs",
    metricLabel: "Onboarding time",
    builtAt: "Tap Invest",
    inProduction: true,
    contextLine: "Automated onboarding for new asset-leasing businesses, from document checks to the listing on the app",
    sourceReference: experienceTimelineSourceReference,
  },
  {
    metricKey: "tapInvestFrontendFromScratch",
    valueLabel: "Built from scratch",
    metricLabel: "Frontend web app",
    builtAt: "Tap Invest",
    inProduction: true,
    contextLine: "Architecture and build",
    sourceReference: "Ashwani, 25 Nov 2026 2:10 PM IST, relayed by Head",
  },
  {
    metricKey: "tapInvestRenderEngineOpsWork",
    valueLabel: "~10x",
    metricLabel: "Less ops work",
    builtAt: "Tap Invest",
    inProduction: true,
    contextLine: "Server-driven page-render engine reading layout from the database",
    sourceReference: "/workspace/cv/build_cv_tree.py:80-81 (tap_render)",
  },
  {
    metricKey: "tapInvestDesignSystemDelivery",
    valueLabel: "~10x",
    metricLabel: "Faster feature delivery",
    builtAt: "Tap Invest",
    inProduction: true,
    contextLine: "Company design system and designer-to-developer handoff",
    sourceReference: "/workspace/cv/build_cv_tree.py:82 (tap_ds)",
  },
] as const satisfies readonly ProductionProofMetricRecord[];
