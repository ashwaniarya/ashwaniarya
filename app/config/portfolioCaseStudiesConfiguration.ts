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

export type CaseStudyRecord = Readonly<{
  slug: string;
  title: string;
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
    title: "GetBujo — Founding Engineer, Three Product Surfaces",
    metaDescription:
      "How I shipped a live video dashboard, a Chrome extension, and an AI copilot experience as founding engineer at GetBujo—end-to-end product engineering.",
    role: "Founding engineer",
    company: "GetBujo",
    companySiteUrl: "https://getbujo.com",
    credentialsLine: "Early-stage product",
    location: "Remote",
    dateRange: "2023 — 2025",
    summary:
      "End-to-end ownership across three product streams: live video and dashboards, a browser extension, and AI-assisted workflows—shipping iteratively with a small team.",
    highlights: [
      "Three shippable product surfaces from one engagement",
      "Strong focus on clarity, performance, and user trust",
      "Cross-functional work from discovery to release",
    ],
    engagementOverviewParagraphs: [
      "GetBujo needed a senior engineer who could move fast across and build cost effective scalable platform. I joined as a founding engineer to turn ambiguous problems into shippable product: live collaboration, distribution through the browser, and AI-assisted workflows tied back to clear dashboards.",
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
          stageLabel: "YC-backed (Seed)",
          dailyReachLabel: "~100k/day",
          revenueLabel: "$0 → $10,000 MRR",
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
              "A multi-tenant, cross-platform live video call consultation platform which connects a shopper to a company's sales representative. An owner for the e-commerce business gets an AI Powered Dashboard—a very clean, easy way to understand how sales reps performed and evaluate their sales pitch.",
          },
          {
            sectionHeading: "Problem",
            sectionBody:
              "Buying a high-ticket product online is not easy. There is a lot of information available in a typical store. An interested buyer can easily get confused. Wingman helps the company solve this problem by removing the clutter and providing the offline store experience online.",
          },
          {
            sectionHeading: "My role",
            sectionBody: "End-to-end product development and platform building.",
          },
        ],
        bodyParagraphs: [
          "Built the first uninterrupted, cross-platform in-browser video calling experience on a Server-Side Rendered e-commerce site. The hard part was not the first paint—it was guided selling: a rep walks a shopper across PDPs, collections, and checkout-style sections, but classic full-page navigations rebuild the whole document, which repeatedly tore down the call surface and created a jarring disconnect mid-conversation.",
          "Designed the experience so the video layer survives those SSR route changes: the call stays attached and continuous while the storefront content around it updates, instead of forcing a re-join after every click.",
          "Created a wrapper on top of the existing third-party video stack so we could deliberately reshape the out-of-the-box UX: instead of two disconnected entry points, both embed surfaces route through our own central launcher icon, so every visitor sees one consistent way to start or join a call.",
          "Refined real-time session state and the operator dashboard so hosts and internal teams can read live and historical usage without digging through noisy raw metrics.",
        ],
        impactBullets: [
          "E-commerce + SSR navigation: addressed full-page rebuilds that broke sales-led flows when users moved between sections.",
          "Multi-tab experience for widget users.",
          "Dashboard for mulitiple tenants.",
          "Configurable brandable UI for the widget.",
          "Cross-platform in-browser video that stays coherent for “rep guides shopper” sessions—not only landing → call.",
          "Single launcher UX across two legacy widgets—shared affordance, shared telemetry hooks, less user confusion at join time.",
          "Reduced ambiguity in the live session lifecycle (join, active call, wrap-up).",
          "Tightened dashboard summaries so success metrics are scannable in under a minute.",
          
        ],
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "WebRTC",
          "Real-time state",
          "Dashboard UX",
          "Cross-browser",
          "Multi-tenant",
          "API development",
          "FastAPI (Python)",
          "Prisma ORM",
          "Problem solving",
          "Asset and bundling optimization",
          "System building",
          "CI/CD",
          "Monitoring and logging",
          "Vertualised Tables"
        ],
      },
      {
        heading: "AI Copilot + Dashboard",
        segmentLabel: "B2B",
        availabilityCaption:
          "No separate public product page for this copilot (company site: getbujo.com)—it ran as an iframe inside Sprinklr with an in-house AI backend.",
        productImpactSnapshot: {
          stageLabel: "YC-backed (Seed)",
          dailyReachLabel: "~80 agents · ~30k conversations/month",
          revenueLabel: "~$20k MRR",
        },
        bodyParagraphs: [
          "Designed and developed an iframe-based copilot embedded in Sprinklr, wired to an in-house AI backend. The rollout supported about 80 sales agents handling on the order of 30,000 conversations per month, with company revenue on the order of $20k MRR from this line.",
          "Migrated the integration from v1 (RESTful API–driven) to v2 (WebSocket-based) architecture in about four calendar days—reducing chat latency and connection churn for agents under load. That delivery window helped the company secure a long-term contract with LG US.",
          "Built a proxy path on AWS API Gateway so the iframe widget could work inside Sprinklr’s embedding constraints—routing traffic safely without fighting the platform’s same-origin and widget sandbox rules.",
          "Shipped an AI evaluation dashboard plus an AI QA workflow/system so teams could review model behavior, regressions, and production quality in one place. Reused the same streamable UI architecture used elsewhere in the stack to keep UX consistent and delivery fast.",
        ],
        impactBullets: [
          "Sprinklr-embedded iframe copilot + in-house AI: ~80 agents, ~30k conversations/month, ~$20k MRR.",
          "v1 REST → v2 WebSockets in ~4 days; cited as a factor in winning a long-term LG US contract.",
          "AWS API Gateway proxy to bypass iframe/widget restrictions inside Sprinklr.",
          "AI evaluation dashboard + QA workflow; streamable UI reused for speed and visual consistency.",
        ],
        skills: [
          "TypeScript",
          "React",
          "WebSockets",
          "REST APIs",
          "AWS API Gateway",
          "Iframe embedding",
          "Sprinklr",
          "Streamable UI",
          "AI evaluation",
          "QA workflows",
          "Cross-browser",
          "Multi-tenant",
          "API development",
          "FastAPI (Python)",
          "Prisma ORM",
          "Problem solving",
          "Asset and bundling optimization",
          "System building",
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
          "FastAPI (Python)",
          "Prisma ORM",
          "Problem solving",
          "Asset and bundling optimization",
          "System building",
          "CI/CD",
        ],
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
