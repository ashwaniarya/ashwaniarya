import type { CaseStudyPagePath } from "@/app/config/portfolioCaseStudiesConfiguration";
import type { CaseStudyDemoVideoConfiguration } from "@/app/config/caseStudyDemoVideoConfiguration";
import type { SelectedWorkScreenshotConfiguration } from "@/app/config/portfolioSelectedWorkConfiguration";

export type PulseboardCaseStudyLinkKey =
  | "liveApp"
  | "storybook"
  | "source"
  | "failureDemo"
  | "benchmark";

export type PulseboardCaseStudyLinkRecord = Readonly<{
  linkKey: PulseboardCaseStudyLinkKey;
  label: string;
  href: string;
}>;

export type PulseboardGlanceMetricRecord = Readonly<{
  metricLabel: string;
  valueLabel: string;
  contextLine: string;
}>;

export type PulseboardArchitectureNodeTone = "application" | "mockBackend";

export type PulseboardArchitectureNodeRecord = Readonly<{
  nodeLabel: string;
  nodeDetail: string;
  tone: PulseboardArchitectureNodeTone;
}>;

export type PulseboardArchitectureLaneRecord = Readonly<{
  laneLabel: string;
  nodes: readonly PulseboardArchitectureNodeRecord[];
}>;

export type PulseboardArchitectureBulletGroupRecord = Readonly<{
  tone: PulseboardArchitectureNodeTone;
  groupLabel: string;
  bullets: readonly string[];
}>;

export type PulseboardDecisionRecordLink = Readonly<{
  decisionNumberLabel: string;
  title: string;
  href: string;
}>;

export type PulseboardFactCardRecord = Readonly<{
  title: string;
  description: string;
}>;

export type PulseboardDesignSystemRuleKey =
  | "semanticTokensOnly"
  | "contrastPairsTested"
  | "chartHuesChecked"
  | "storiesAreTests"
  | "themeBeforePaint"
  | "tabularNumbers"
  | "prunedComponentSet"
  | "chartsOnCurrentColor";

export type PulseboardDesignSystemRuleRecord = PulseboardFactCardRecord &
  Readonly<{
    ruleKey: PulseboardDesignSystemRuleKey;
  }>;

export type PulseboardLimitRecord = Readonly<{
  limitText: string;
  /** Rendered after `limitText` as a parenthesised link. */
  decisionRecord?: PulseboardDecisionRecordLink;
}>;

export type PulseboardCaseStudySectionHeadingRecord = Readonly<{
  sectionTitle: string;
  sectionTitleId: string;
}>;

export type PulseboardCaseStudyConfiguration = Readonly<{
  pagePath: CaseStudyPagePath;
  metaTitle: string;
  metaDescription: string;
  header: Readonly<{
    backLinkLabel: string;
    kicker: string;
    title: string;
    tagline: string;
    stackLabels: readonly string[];
  }>;
  links: Readonly<{
    primaryLink: PulseboardCaseStudyLinkRecord;
    secondaryLinks: readonly PulseboardCaseStudyLinkRecord[];
  }>;
  demoVideo: CaseStudyDemoVideoConfiguration;
  heroScreenshot: SelectedWorkScreenshotConfiguration &
    Readonly<{
      caption: string;
    }>;
  glance: Readonly<{
    listAriaLabel: string;
    metrics: readonly PulseboardGlanceMetricRecord[];
  }>;
  architecture: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      introParagraph: string;
      diagramAriaLabel: string;
      lanes: readonly PulseboardArchitectureLaneRecord[];
      bulletGroups: readonly PulseboardArchitectureBulletGroupRecord[];
      decisionRecordsHeading: string;
      decisionRecords: readonly PulseboardDecisionRecordLink[];
    }>;
  designSystem: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      rules: readonly PulseboardDesignSystemRuleRecord[];
    }>;
  performance: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      virtualizedTable: Readonly<{
        title: string;
        benchmarkLinkLabel: string;
        benchmarkHref: string;
        summaryLine: string;
      }>;
      bundleBudgets: Readonly<{
        title: string;
        summaryLine: string;
        shellNote: string;
      }>;
      renderingPracticesAriaLabel: string;
      renderingPractices: readonly string[];
    }>;
  failureModes: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      scenariosAriaLabel: string;
      scenarioLabels: readonly PulseboardFailureScenarioLabel[];
      /** The scenario that `demoHref` opens. */
      demoScenarioLabel: PulseboardFailureScenarioLabel;
      behaviours: readonly string[];
      demoLinkLabel: string;
      demoHref: string;
    }>;
  testing: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      testTiers: readonly PulseboardFactCardRecord[];
      ciJobsLabel: string;
      ciJobNames: readonly string[];
      coverageGatesLabel: string;
      coverageGateLabels: readonly string[];
    }>;
  limits: PulseboardCaseStudySectionHeadingRecord &
    Readonly<{
      items: readonly PulseboardLimitRecord[];
    }>;
}>;

export const pulseboardCaseStudyPagePath = "/work/pulseboard";
export const pulseboardLiveAppUrl = "https://pulseboard-green-chi.vercel.app";
export const pulseboardSourceRepositoryUrl = "https://github.com/ashwaniarya/pulseboard";

export const pulseboardOverviewScreenshot = {
  previewKind: "screenshot",
  webpSrc: "/images/work/pulseboard.webp",
  pngSrc: "/images/work/pulseboard.png",
  alt: "Pulseboard overview in dark mode: KPI tiles with sparklines and a daily trend chart.",
  width: 1200,
  height: 675,
} as const satisfies SelectedWorkScreenshotConfiguration;

const pulseboardStorybookUrl = "https://pulseboard-storybook.vercel.app";
const pulseboardFailureDemoUrl = `${pulseboardLiveAppUrl}/?apiScenario=degraded`;
const pulseboardTableBenchmarkUrl = `${pulseboardLiveAppUrl}/benchmark/table`;
const pulseboardDecisionRecordBaseUrl = `${pulseboardSourceRepositoryUrl}/blob/main/docs/adr`;

const pulseboardTestTiers = [
  { title: "Unit", description: "Vitest, pure logic" },
  { title: "Behavioural", description: "jsdom" },
  { title: "Behavioural", description: "Real browser via Storybook" },
  { title: "Smoke", description: "Cypress e2e specs" },
] as const satisfies readonly PulseboardFactCardRecord[];

const pulseboardCiJobNames = ["quality", "storybook-tests", "build", "e2e"] as const;

const pulseboardFailureScenarioLabels = ["Slow", "Degraded", "Outage"] as const;

type PulseboardFailureScenarioLabel = (typeof pulseboardFailureScenarioLabels)[number];

const mswOnlyBackendDecisionRecord = {
  decisionNumberLabel: "ADR-0002",
  title: "MSW is the only backend",
  href: `${pulseboardDecisionRecordBaseUrl}/0002-msw-is-the-only-backend.md`,
} as const satisfies PulseboardDecisionRecordLink;

const storiesAsTestsDecisionRecord = {
  decisionNumberLabel: "ADR-0004",
  title: "Stories are the component test suite",
  href: `${pulseboardDecisionRecordBaseUrl}/0004-stories-as-tests.md`,
} as const satisfies PulseboardDecisionRecordLink;

const pulseboardDecisionRecords = [
  {
    decisionNumberLabel: "ADR-0001",
    title: "Vite SPA over Next.js",
    href: `${pulseboardDecisionRecordBaseUrl}/0001-vite-spa-over-nextjs.md`,
  },
  mswOnlyBackendDecisionRecord,
  {
    decisionNumberLabel: "ADR-0003",
    title: "Semantic tokens, CSS-first Tailwind 4",
    href: `${pulseboardDecisionRecordBaseUrl}/0003-semantic-tokens-css-first-tailwind4.md`,
  },
  storiesAsTestsDecisionRecord,
  {
    decisionNumberLabel: "ADR-0005",
    title: "Internal packages ship source, not dist",
    href: `${pulseboardDecisionRecordBaseUrl}/0005-internal-packages-ship-source.md`,
  },
  {
    decisionNumberLabel: "ADR-0006",
    title: "RTK Query for server state; the local-state rule",
    href: `${pulseboardDecisionRecordBaseUrl}/0006-rtk-query-and-the-local-state-rule.md`,
  },
  {
    decisionNumberLabel: "ADR-0007",
    title: "visx over Recharts",
    href: `${pulseboardDecisionRecordBaseUrl}/0007-visx-over-recharts.md`,
  },
] as const satisfies readonly PulseboardDecisionRecordLink[];

const dashboardAppNode = {
  nodeLabel: "Dashboard app",
  nodeDetail: "React 19, RTK Query",
  tone: "application",
} as const satisfies PulseboardArchitectureNodeRecord;

export const pulseboardCaseStudyConfiguration = {
  pagePath: pulseboardCaseStudyPagePath,
  metaTitle: "Pulseboard: dashboard and design system",
  metaDescription:
    "How Pulseboard works: a React 19 clinic dashboard with a token-based design system, a virtualized table, CI-enforced bundle budgets and a test suite.",
  header: {
    backLinkLabel: "All work",
    kicker: "Case study · dashboard and design system",
    title: "Pulseboard",
    tagline:
      "Operations analytics for multi-location clinics, built as a production-grade frontend showcase.",
    stackLabels: [
      "React 19",
      "RTK Query",
      "Tailwind 4",
      "visx",
      "TanStack Table",
      "Storybook 10",
      "MSW",
      "Cypress",
    ],
  },
  links: {
    primaryLink: { linkKey: "liveApp", label: "Open live app", href: pulseboardLiveAppUrl },
    secondaryLinks: [
      { linkKey: "storybook", label: "Storybook", href: pulseboardStorybookUrl },
      { linkKey: "source", label: "Source", href: pulseboardSourceRepositoryUrl },
      { linkKey: "failureDemo", label: "Failure demo", href: pulseboardFailureDemoUrl },
      { linkKey: "benchmark", label: "Table benchmark", href: pulseboardTableBenchmarkUrl },
    ],
  },
  demoVideo: {
    mp4Src: "/videos/work/pulseboard-demo.mp4",
    posterSrc: "/images/work/pulseboard-demo-poster.jpg",
    captionsSrc: "/videos/work/pulseboard-demo.en.vtt",
    captionsLanguage: "en",
    captionsLabel: "English",
    width: 1600,
    height: 900,
    title: "Pulseboard demo",
    durationLabel: "1:17",
    playButtonAriaLabel: "Play the Pulseboard demo video, 1 minute 17 seconds, with voiceover",
    videoAriaLabel: "Pulseboard demo video: filters, calls log, locations, outage handling and the virtualized table",
  },
  heroScreenshot: {
    ...pulseboardOverviewScreenshot,
    caption: "Overview, dark theme",
  },
  glance: {
    listAriaLabel: "Pulseboard at a glance",
    metrics: [
      {
        metricLabel: "Table",
        valueLabel: "Virtualized",
        contextLine: "Only visible rows in the DOM",
      },
      {
        metricLabel: "Frames",
        valueLabel: "In budget",
        contextLine: "Measured by Cypress",
      },
      {
        metricLabel: "Tests",
        valueLabel: `${pulseboardTestTiers.length} tiers`,
        contextLine: "Unit, two behavioural tiers and smoke",
      },
      {
        metricLabel: "CI",
        valueLabel: `${pulseboardCiJobNames.length} jobs`,
        contextLine: "Quality, Storybook tests, build and e2e",
      },
    ],
  },
  architecture: {
    sectionTitle: "How it works",
    sectionTitleId: "pulseboard-how-it-works",
    introParagraph:
      "The dashboard sends fetch requests that an MSW service worker intercepts and answers from a seeded mock API. The UI package supplies components to the dashboard, and Storybook runs its stories as tests.",
    diagramAriaLabel: "How Pulseboard works",
    lanes: [
      {
        laneLabel: "Requests",
        nodes: [
          dashboardAppNode,
          { nodeLabel: "MSW worker", nodeDetail: "Intercepts fetch", tone: "mockBackend" },
          { nodeLabel: "Mock API", nodeDetail: "Seeded, deterministic", tone: "mockBackend" },
        ],
      },
      {
        laneLabel: "Design system",
        nodes: [
          { nodeLabel: "Storybook", nodeDetail: "Stories as tests", tone: "application" },
          { nodeLabel: "UI package", nodeDetail: "Semantic tokens", tone: "application" },
          dashboardAppNode,
        ],
      },
    ],
    bulletGroups: [
      {
        tone: "application",
        groupLabel: "App and design system",
        bullets: [
          "RTK Query owns server state",
          "Slices own URL-synced filters and API health",
        ],
      },
      {
        tone: "mockBackend",
        groupLabel: "Mock backend, in the browser",
        bullets: [
          "Seeded streams per location, metric and date",
          "Daily totals roll up from the same call records",
        ],
      },
    ],
    decisionRecordsHeading: "Architecture decisions",
    decisionRecords: pulseboardDecisionRecords,
  },
  designSystem: {
    sectionTitle: "Design system",
    sectionTitleId: "pulseboard-design-system",
    rules: [
      {
        ruleKey: "semanticTokensOnly",
        title: "Palette wiped",
        description: "Only semantic tokens compile; bg-blue-500 fails the build.",
      },
      {
        ruleKey: "contrastPairsTested",
        title: "Contrast pairs tested",
        description: "A unit test checks each token pair against WCAG.",
      },
      {
        ruleKey: "chartHuesChecked",
        title: "Chart hues checked",
        description: "A colour-vision deficiency check guards chart colours.",
      },
      {
        ruleKey: "storiesAreTests",
        title: "Stories are tests",
        description: "Play functions and axe run in headless Chromium and fail the build.",
      },
      {
        ruleKey: "themeBeforePaint",
        title: "Theme before paint",
        description: "The data-theme attribute is set before first paint, so no flash.",
      },
      {
        ruleKey: "tabularNumbers",
        title: "Tabular numbers",
        description: "Every figure uses mono tabular-nums, so columns never jitter.",
      },
      {
        ruleKey: "prunedComponentSet",
        title: "A small component set",
        description: "Pruned on purpose: no Toast, no Breadcrumbs.",
      },
      {
        ruleKey: "chartsOnCurrentColor",
        title: "Charts on currentColor",
        description: "SVG attributes reject var(), so a wrapper class sets the colour.",
      },
    ],
  },
  performance: {
    sectionTitle: "Performance",
    sectionTitleId: "pulseboard-performance",
    virtualizedTable: {
      title: "Virtualized table",
      benchmarkLinkLabel: "Run it",
      benchmarkHref: pulseboardTableBenchmarkUrl,
      summaryLine: "Virtualized table benchmark, measured by Cypress on a production build.",
    },
    bundleBudgets: {
      title: "Bundle budgets, enforced in CI",
      summaryLine: "Set with size-limit and checked in CI for the app entry, the Overview (visx) and Calls (TanStack) chunks, and CSS.",
      shellNote: "Date picker and Radix stay in the shell on purpose.",
    },
    renderingPracticesAriaLabel: "Rendering practices",
    renderingPractices: [
      "Stable query args via createSelector",
      "No React.memo, by profiling",
      "Zero-CLS skeletons",
      "Shimmer over stale data",
    ],
  },
  failureModes: {
    sectionTitle: "Failure modes you can trigger",
    sectionTitleId: "pulseboard-failure-modes",
    scenariosAriaLabel: "Scenarios",
    scenarioLabels: pulseboardFailureScenarioLabels,
    demoScenarioLabel: "Degraded",
    behaviours: [
      "Per-widget error boundaries",
      "Retries with backoff",
      "Degraded banner over cached data",
      "Empty states",
    ],
    demoLinkLabel: "Open the degraded scenario",
    demoHref: pulseboardFailureDemoUrl,
  },
  testing: {
    sectionTitle: "Testing and CI",
    sectionTitleId: "pulseboard-testing",
    testTiers: pulseboardTestTiers,
    ciJobsLabel: "CI jobs",
    ciJobNames: pulseboardCiJobNames,
    coverageGatesLabel: "Coverage gates on packages/ui",
    coverageGateLabels: ["Line coverage", "Branch coverage"],
  },
  limits: {
    sectionTitle: "Honest limits",
    sectionTitleId: "pulseboard-limits",
    items: [
      { limitText: "Data is fictional and seeded" },
      { limitText: "No auth and no server" },
      {
        limitText: "MSW ships in the production bundle",
        decisionRecord: mswOnlyBackendDecisionRecord,
      },
      {
        limitText: "Coverage exclusions are documented",
        decisionRecord: storiesAsTestsDecisionRecord,
      },
    ],
  },
} as const satisfies PulseboardCaseStudyConfiguration;

