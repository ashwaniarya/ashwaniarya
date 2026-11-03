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
    title: "GetBujo — Founding Engineer, Three Product Surfaces",
    metaTitle: "GetBujo — Founding Engineer",
    metaDescription:
      "How I shipped a live video dashboard, a Chrome extension, and an AI copilot experience as founding engineer at GetBujo: end-to-end product engineering.",
    role: "Founding engineer",
    company: "GetBujo",
    companySiteUrl: "https://getbujo.com",
    credentialsLine: "YC P26",
    location: "Bangalore",
    dateRange: "Dec 2024 — Feb 2026",
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
          revenueLabel: "$0 → $150K ARR",
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
          "Virtualized tables"
        ],
      },
      {
        heading: "AI Copilot + Dashboard",
        segmentLabel: "B2B",
        availabilityCaption:
          "No separate public product page for this copilot (company site: getbujo.com)—it ran as an iframe inside Sprinklr with an in-house AI backend.",
        productImpactSnapshot: {
          stageLabel: "YC-backed (Seed)",
          dailyReachLabel: "~80 agents · ~30k/month conversations",
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
  {
    slug: "aiclicks",
    title: "AIclicks: Product Engineer, AI Visibility Analytics",
    metaTitle: "AIclicks: Product Engineer",
    metaDescription:
      "Contract product engineering at AIclicks: prompt tagging and bulk workflows, a mention and citation pipeline, a recommendations service, and the first version of a public Data Explorer.",
    role: "Product engineer (contract)",
    company: "AIclicks",
    companySiteUrl: "https://aiclicks.io",
    credentialsLine: "GEO analytics SaaS",
    location: "Remote",
    dateRange: "Apr 2026 to Nov 2026",
    summary:
      "Owned features end to end across a Next.js dashboard, a FastAPI backend on Postgres and two Python workers: prompt tagging and bulk workflows, the mention and citation pipeline, a recommendations service, and the first version of a public Data Explorer.",
    highlights: [
      "Six repositories, full stack: dashboard, API, two pipeline workers, recommendations service",
      "Cited-sources payload cut from 19 MB to about 2 MB with brotli compression",
      "Sole author of the explorer-preprocess worker and the Get Mentioned recommendations service",
    ],
    engagementOverviewParagraphs: [
      "AIclicks tracks how AI assistants mention and cite brands. I joined as a contract product engineer and took customer problems from ticket to merged PR across the whole stack: schema and migrations, FastAPI routes, Postgres rollups and indexes, background workers, and the React dashboard. Work went out as small PRs behind feature flags, merged to a dev branch and released to main.",
    ],
    productChapters: [
      {
        heading: "Prompt tags and bulk workflows",
        segmentLabel: "B2B SaaS",
        productPageLink: {
          url: "https://aiclicks.io",
          label: "AIclicks (aiclicks.io)",
        },
        availabilityCaption: "Dashboard features for paying customers; no public demo.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "Customers tracked hundreds of prompts per brand with no way to group, filter or act on them in bulk, and analytics views lost their state on refresh.",
          },
          {
            sectionHeading: "My role",
            sectionBody: "Schema, API, and dashboard UI for every feature in this chapter.",
          },
        ],
        bodyParagraphs: [
          "Built the tag system for prompts and topics: schema, API, tag chips in the prompts table, a dashboard tag filter, and bulk tag assignment at topic level. Added select-all and bulk actions on the prompts table with server-side selection semantics, so a customer can tag, pause or delete a whole filtered set at once.",
          "Made the analytics views stateful: filters, tabs and sort live in the URL, prompt analytics sorting and a dynamic timeline follow one shared date range, and a project picker lets users who belong to several brands switch without losing context. A domain-view rollup aggregates brand pages across tracked domains.",
        ],
        impactBullets: [
          "Tagging and bulk actions replaced one-prompt-at-a-time edits.",
          "Filters persist in the URL, so a view can be shared as a link.",
          "Prompt analytics sort and timeline follow one shared range state.",
        ],
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Radix UI",
          "Tailwind",
          "recharts",
          "URL state",
          "FastAPI (Python)",
          "Postgres",
          "Row-level security",
          "Jest",
        ],
      },
      {
        heading: "Data Explorer, first version and groundwork",
        segmentLabel: "Public data product",
        availabilityCaption:
          "Shipped behind a feature flag as a first version; the rollup infrastructure needed a redesign before it could run across the full dataset.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "AIclicks wanted a public explorer over its citation data: which sources AI assistants cite, per brand and per day. The raw tables were too large to query live.",
          },
          {
            sectionHeading: "My role",
            sectionBody: "Rollup design, the nightly worker, the API routes and the explorer views.",
          },
        ],
        bodyParagraphs: [
          "Designed the rollup tables and wrote the nightly explorer-preprocess worker as sole author: day planning, roll-day jobs, a claim guard with takeover, retry and heal paths, roll versioning and a late scan for stragglers. A gate serves a rollup only once it is complete for the day. The worker runs on a VM under Docker Compose.",
          "On the API side I added the explorer metric cards, a citations API, a lean cited-sources endpoint, an influence route and an untracked-mentions route, backed by a GIN index on citations and a function-based query path. Compressing the cited-sources endpoint with brotli took the payload from 19 MB to about 2 MB, measured before and after the change.",
          "This shipped as a first version. The rollup infrastructure needed a redesign before it could run across the full dataset, and that work was not finished when the engagement ended.",
        ],
        impactBullets: [
          "Cited-sources payload 19 MB to about 2 MB with brotli (measured before and after).",
          "Nightly rollups with claim, retry and heal paths in production.",
          "Explorer routes and views live behind a feature flag.",
        ],
        skills: [
          "Postgres rollups",
          "GIN indexes",
          "SQL functions",
          "Python workers",
          "Docker Compose",
          "FastAPI (Python)",
          "brotli",
          "Next.js",
          "Feature flags",
        ],
      },
      {
        heading: "Mention pipeline and recommendations",
        segmentLabel: "Data pipeline",
        availabilityCaption: "Internal pipeline and operator tooling; no public page.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "Mention detection missed subdomains and social hosts, credits were charged inconsistently, onboarding snapshots raced the first analysis, and the recommendations service had no operator view.",
          },
          {
            sectionHeading: "My role",
            sectionBody:
              "Worker and backend fixes, and sole author of the Get Mentioned path in the recommendations service.",
          },
        ],
        bodyParagraphs: [
          "In the pipeline worker I added citation host matching and a test suite for the mention matcher before touching classification, fixed the stage-5 social host classifier, credited a brand's subdomains to the brand, and reworked mention credit accounting. On the backend I fixed the onboarding snapshot race so a new brand's first snapshot waits for its first analysis.",
          "In the recommendations service I built the Get Mentioned path: citations enrichment with an on-demand variant, a ScrapingBee rate limiter, title-group jobs, scheduled mention fetches, Engage Online v2, the first phase of outreach feedback, and a reco-ops dashboard so operators can see job state without reading logs.",
        ],
        impactBullets: [
          "Matcher behaviour covered by tests before classification changes.",
          "Subdomains and social hosts credited to the right brand.",
          "Operators see job state in a dashboard instead of logs.",
        ],
        skills: [
          "Python 3.12",
          "asyncio",
          "Postgres",
          "ScrapingBee",
          "LLM pipelines",
          "FastAPI (Python)",
          "pytest",
          "Operator dashboards",
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
