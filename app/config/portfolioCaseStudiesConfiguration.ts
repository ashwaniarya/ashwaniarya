export type CaseStudyProductPageLinkConfiguration = Readonly<{
  url: string;
  label: string;
}>;

export type CaseStudyProductChapterConfiguration = Readonly<{
  heading: string;
  segmentLabel: string;
  /**
   * Omit when there is no honest public URL (client embeds, NDA, sunset SKU, etc.).
   * The UI shows `availabilityCaption` or a default “no public page” line.
   */
  productPageLink?: CaseStudyProductPageLinkConfiguration;
  /** Shown when `productPageLink` is omitted; set a specific reason for credibility. */
  availabilityCaption?: string;
  bodyParagraphs: readonly string[];
  impactBullets: readonly string[];
  skills: readonly string[];
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
    title: "GetBujo — founding engineer, three product surfaces",
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
      "GetBujo needed a senior engineer who could move fast across the stack while keeping UX coherent. I joined as a founding engineer to turn ambiguous problems into shippable product: live collaboration, distribution through the browser, and AI-assisted workflows tied back to clear dashboards.",
      "GetBujo’s company site is getbujo.com (linked in the header). The sections below call out embed-only or channel-specific work where there was no separate public product URL—e.g. live video inside a retailer’s storefront or the copilot inside Sprinklr. The AI Shopping Assistant Chrome extension is publicly listed on the Chrome Web Store.",
    ],
    productChapters: [
      {
        heading: "Live video + dashboard",
        segmentLabel: "B2B",
        availabilityCaption:
          "No standalone public product page—live video shipped inside a retailer’s SSR e-commerce experience.",
        bodyParagraphs: [
          "Built the first uninterrupted, cross-platform in-browser video calling experience on a Server-Side Rendered e-commerce site. The hard part was not the first paint—it was guided selling: a rep walks a shopper across PDPs, collections, and checkout-style sections, but classic full-page navigations rebuild the whole document, which repeatedly tore down the call surface and created a jarring disconnect mid-conversation.",
          "Designed the experience so the video layer survives those SSR route changes: the call stays attached and continuous while the storefront content around it updates, instead of forcing a re-join after every click.",
          "Created a wrapper on top of the existing third-party video stack so we could deliberately reshape the out-of-the-box UX: instead of two disconnected entry points, both embed surfaces route through our own central launcher icon, so every visitor sees one consistent way to start or join a call.",
          "Refined real-time session state and the operator dashboard so hosts and internal teams can read live and historical usage without digging through noisy raw metrics.",
        ],
        impactBullets: [
          "E-commerce + SSR navigation: addressed full-page rebuilds that broke sales-led flows when users moved between sections.",
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
        ],
      },
      {
        heading: "AI Shopping Assistant — Chrome extension",
        segmentLabel: "B2C",
        productPageLink: {
          url: "https://chromewebstore.google.com/detail/bujo-ai-shopping-assistan/hohpkegbedejmdcebpapfafgcdgjjbnn",
          label: "Chrome Web Store listing",
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
        ],
      },
      {
        heading: "AI copilot + dashboard",
        segmentLabel: "B2B",
        availabilityCaption:
          "No separate public product page for this copilot (company site: getbujo.com)—it ran as an iframe inside Sprinklr with an in-house AI backend.",
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
