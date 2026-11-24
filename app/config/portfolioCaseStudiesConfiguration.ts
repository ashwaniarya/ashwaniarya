export type CaseStudyProductPageLinkConfiguration = Readonly<{
  url: string;
  label: string;
}>;

export type CaseStudyProductImpactSnapshotConfiguration = Readonly<{
  stageLabel: string;
  dailyReachLabel: string;
  /** Omitted in UI when undefined (no placeholder row). */
  revenueLabel?: string;
}>;

export type CaseStudyProductChapterIllustrationConfiguration = Readonly<{
  webpSrc: string;
  pngSrc: string;
  alt: string;
  width: number;
  height: number;
}>;

export type CaseStudyProductChapterIntroductionSectionConfiguration = Readonly<{
  sectionHeading: string;
  sectionBody: string;
}>;

export type CaseStudyProductChapterConfiguration = Readonly<{
  heading: string;
  segmentLabel: string;
  /**
   * Omit when there is no honest public URL (client embeds, NDA, sunset SKU, etc.).
   * The UI shows `availabilityCaption` or a default “no public page” line.
   */
  productPageLink?: CaseStudyProductPageLinkConfiguration;
  /**
   * When `productPageLink` is omitted: primary line in the availability row.
   * When `productPageLink` is set: optional secondary line under the external link (e.g. attribution).
   */
  availabilityCaption?: string;
  /**
   * Optional labeled blocks (e.g. Overview / Problem / My role) rendered as h4 + body above `bodyParagraphs`.
   */
  introductionSections?: readonly CaseStudyProductChapterIntroductionSectionConfiguration[];
  bodyParagraphs: readonly string[];
  impactBullets: readonly string[];
  skills: readonly string[];
  /** Optional KPI strip above chapter body (Stage, Daily reach, Revenue). */
  productImpactSnapshot?: CaseStudyProductImpactSnapshotConfiguration;
  /** Optional hero-style screenshot or product frame (WebP + PNG in public/). */
  chapterIllustration?: CaseStudyProductChapterIllustrationConfiguration;
}>;

export type CaseStudyPagePath = `/work/${string}`;

export type CaseStudyRecord = Readonly<{
  slug: string;
  title: string;
  /** Shorter `<title>` when `title` would truncate in search results (~60 chars). */
  metaTitle?: string;
  metaDescription: string;
  role: string;
  company: string;
  companySiteUrl?: string;
  credentialsLine?: string;
  location: string;
  dateRange: string;
  summary: string;
  highlights: readonly string[];
  engagementOverviewParagraphs: readonly string[];
  productChapters: readonly CaseStudyProductChapterConfiguration[];
}>;

const portfolioCaseStudies = [
  {
    slug: "getbujo",
    title: "GetBujo — Merchant Product",
    metaTitle: "GetBujo — Merchant Product",
    metaDescription:
      "Merchant side of getbujo: AI copilot, co-browsing, video calling and chat. Zoom join time from 24s to 6s. The widget delivered 100K–150K sessions, with 4K–5K opens.",
    role: "Product engineer",
    company: "GetBujo",
    companySiteUrl: "https://getbujo.com",
    location: "Bengaluru",
    dateRange: "Dec 2024 — Feb 2026",
    summary:
      "Built the merchant side: AI copilot, co-browsing, video calling and chat, plus sales and merchant dashboards with AI video summaries.",
    highlights: [
      "Zoom join time from 24s to 6s, which reduced call churn",
      "Widget delivered 100K–150K sessions, with 4K–5K opens",
      "Per-call sentiment score on sales and merchant dashboards",
    ],
    engagementOverviewParagraphs: [
      "I built the merchant side of getbujo: an AI copilot, co-browsing, video calling and chat. When salespeople got confused on calls, I moved calling into a global UI with clear join states.",
    ],
    productChapters: [
      {
        heading: "Live Video Call Platform",
        segmentLabel: "B2B",
        productPageLink: {
          url: "https://getwingman.io/",
          label: "Wingman (getwingman.io)",
        },
        availabilityCaption:
          "Powered by Bujo — live video and co-browsing embedded in retailers’ SSR storefronts; more at getbujo.com.",
        productImpactSnapshot: {
          stageLabel: "24s → 6s",
          dailyReachLabel: "100K–150K",
          revenueLabel: "4K–5K",
        },
        chapterIllustration: {
          webpSrc: "/get-wingman.webp",
          pngSrc: "/get-wingman.png",
          alt: "Live video call experience embedded in a retailer storefront: rep and shopper connected in-browser during guided selling.",
          width: 3452,
          height: 1708,
        },
        introductionSections: [
          {
            sectionHeading: "Overview",
            sectionBody:
              "Video calling and chat on the merchant side, with co-browsing so a salesperson can stay with a shopper. Sales and merchant dashboards show how those calls went.",
          },
          {
            sectionHeading: "Problem",
            sectionBody:
              "Salespeople got confused on calls. Join state was unclear, and the time to get into Zoom was long enough that people dropped off.",
          },
          {
            sectionHeading: "My role",
            sectionBody:
              "Moved calling into a global UI with clear join states, and cut Zoom join time from 24s to 6s, which reduced call churn.",
          },
        ],
        bodyParagraphs: [
          "The widget delivered 100K–150K sessions, with 4K–5K opens. Calling sits in one global UI so join, active call, and wrap-up read the same way on every page.",
          "Zoom join time went from 24s to 6s. Shorter joins reduced call churn.",
          "Sales and merchant dashboards sit next to the call, including a Sentiment score for each call and AI video summaries.",
        ],
        impactBullets: [
          "Zoom join time: 24s → 6s, which reduced call churn.",
          "Widget sessions: 100K–150K, with 4K–5K opens.",
          "Clear join states in one global calling UI.",
          "Sales and merchant dashboards with AI video summaries.",
        ],
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
          "WebRTC",
          "Real-time state",
          "Dashboard UX",
          "Stripe",
          "Virtualized tables",
        ],
      },
      {
        heading: "AI Copilot + Dashboard",
        segmentLabel: "B2B",
        availabilityCaption:
          "No separate public product page for this copilot (company site: getbujo.com). It ran with the merchant calling UI.",
        bodyParagraphs: [
          "Built the AI copilot on the merchant side, next to co-browsing, video calling and chat.",
          "Each call got a Sentiment score. Sales and merchant dashboards include AI video summaries so a team can review the call without replaying the whole thing.",
        ],
        impactBullets: [
          "AI copilot on the merchant side, with co-browsing, video calling and chat.",
          "Per-call sentiment score.",
          "Sales and merchant dashboards with AI video summaries.",
        ],
        skills: [
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "WebSockets",
          "REST APIs",
        ],
      },
      {
        heading: "AI Shopping Assistant — Chrome extension",
        segmentLabel: "B2C",
        productPageLink: {
          url: "https://chromewebstore.google.com/detail/bujo-ai-shopping-assistan/hohpkegbedejmdcebpapfafgcdgjjbnn",
          label: "Chrome Web Store listing",
        },
        chapterIllustration: {
          webpSrc: "/chrome_assistant.webp",
          pngSrc: "/chrome_assistant.png",
          alt: "Bujo AI Shopping Assistant Chrome extension in the browser, showing in-page shopping help.",
          width: 1280,
          height: 800,
        },
        bodyParagraphs: [
          "Shipped Bujo AI Shopping Assistant as a consumer-facing Chrome extension listed on the Chrome Web Store—bringing in-page help into everyday browsing without a heavy install story. I architected the extension and built out the frontend layers so the product felt cohesive across surfaces rather than bolted on.",
          "The experience leans on a streamable UI over WebSocket with durable client state, guarded by explicit error paths and timeout handling when the network or host page misbehaves. An LRU-backed cache keeps repeat interactions snappy, and I contributed to shared extraction and parsing logic so the assistant could reason over real page content safely.",
        ],
        impactBullets: [
          "Extension architecture and multi-layer frontend for a B2C Chrome Web Store product.",
          "Streamable UI on WebSocket with persistence plus explicit error and timeout handling.",
          "LRU-backed client cache to keep interactions responsive.",
          "Shared webpage extraction and parsing library contributions for in-context assistance.",
        ],
        skills: [
          "Chrome extension APIs",
          "TypeScript",
          "WebSockets",
          "Streamable UI",
          "LRU caching",
          "Persistent storage",
          "Content scripts",
          "Webpage content parsing",
          "Release discipline",
          "React",
          "Next.js",
          "TypeScript",
          "Node.js",
        ],
      },
    ],
  },
  {
    slug: "aiclicks",
    title: "AIClicks — Contract Product Engineer",
    metaTitle: "AIClicks — Contract, Ended",
    metaDescription:
      "AIClicks contract, Apr–Nov 2026, ended. Recommendation engine pulling posts from 6 platforms. AI mention-detection accuracy from 90% to 98%. Stripe PaymentIntents and Invoices.",
    role: "Product engineer (contract, ended)",
    company: "AIClicks",
    companySiteUrl: "https://aiclicks.io",
    credentialsLine: "Contract ended Nov 2026",
    location: "Remote",
    dateRange: "Apr 2026 – Nov 2026",
    summary:
      "Contract from Apr 2026 to Nov 2026, now ended. Recommendation engine pulling posts from 6 platforms, AI mention detection, and Stripe payments.",
    highlights: [
      "Apr–Nov 2026, contract, ended",
      "Recommendation engine pulling posts from 6 platforms",
      "AI mention-detection accuracy from 90% to 98%",
      "Stripe PaymentIntents and Invoices",
    ],
    engagementOverviewParagraphs: [
      "AIClicks was a contract from April 2026 through November 2026. The contract has ended.",
      "I built a recommendation engine that pulls posts from 6 platforms, raised AI mention-detection accuracy from 90% to 98%, and shipped Stripe PaymentIntents and Invoices.",
    ],
    productChapters: [
      {
        heading: "Recommendation engine",
        segmentLabel: "B2B SaaS",
        productPageLink: {
          url: "https://aiclicks.io",
          label: "AIClicks (aiclicks.io)",
        },
        availabilityCaption: "Contract ended Nov 2026. No public demo of the merchant tools.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "Recommendations needed posts from several networks in one place.",
          },
          {
            sectionHeading: "My role",
            sectionBody:
              "Built the recommendation engine that pulls posts from 6 platforms.",
          },
        ],
        bodyParagraphs: [
          "The recommendation engine pulls posts from 6 platforms so a brand can see what to act on without checking each network by hand.",
        ],
        impactBullets: [
          "Posts from 6 platforms feed one recommendation engine.",
        ],
        skills: ["TypeScript", "React", "Next.js", "Node.js", "NestJS", "Express"],
      },
      {
        heading: "AI mention detection",
        segmentLabel: "AI",
        availabilityCaption: "Contract ended Nov 2026.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "Mention detection was missing posts the brand cared about.",
          },
          {
            sectionHeading: "My role",
            sectionBody:
              "Raised AI mention-detection accuracy from 90% to 98%.",
          },
        ],
        bodyParagraphs: [
          "I raised AI mention-detection accuracy from 90% to 98% on the posts the recommendation engine already pulled in.",
        ],
        impactBullets: [
          "AI mention-detection accuracy from 90% to 98%.",
        ],
        skills: ["TypeScript", "Node.js", "NestJS", "Embeddings"],
      },
      {
        heading: "Stripe payments",
        segmentLabel: "Payments",
        availabilityCaption: "Contract ended Nov 2026.",
        introductionSections: [
          {
            sectionHeading: "My role",
            sectionBody: "Stripe PaymentIntents and Invoices.",
          },
        ],
        bodyParagraphs: [
          "Payments on the contract used Stripe PaymentIntents and Invoices.",
        ],
        impactBullets: [
          "Stripe PaymentIntents and Invoices shipped during the contract.",
        ],
        skills: ["Stripe", "Node.js", "NestJS", "Express", "TypeScript"],
      },
    ],
  },
] as const satisfies readonly CaseStudyRecord[];

export function getAllCaseStudies(): readonly CaseStudyRecord[] {
  return portfolioCaseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudyRecord | undefined {
  return portfolioCaseStudies.find((caseStudy) => caseStudy.slug === slug);
}

export const featuredCaseStudySlug: CaseStudyRecord["slug"] = "getbujo";
