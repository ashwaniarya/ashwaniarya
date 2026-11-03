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
      "Contract product engineering at AIclicks: prompt tagging and bulk workflows, a multi-stage LLM pipeline for prompt discovery, a mention and citation pipeline, a recommendations service, and the first version of a public Data Explorer.",
    role: "Product engineer (contract)",
    company: "AIclicks",
    companySiteUrl: "https://aiclicks.io",
    credentialsLine: "GEO analytics SaaS",
    location: "Remote",
    dateRange: "Apr 2026 to Nov 2026",
    summary:
      "Owned features end to end across a Next.js dashboard, a FastAPI backend on Postgres and two Python workers: prompt tagging and bulk workflows, a multi-stage LLM pipeline for prompt discovery, the mention and citation pipeline, a recommendations service, and the first version of a public Data Explorer.",
    highlights: [
      "About 1,900 commits and about 500 PR merges across five repositories (git log, Apr to Oct 2026)",
      "Cited-sources payload 18.7 MB to 2.0 MB (9.34x) with brotli, measured in the real app stack",
      "Explorer reach queries 153.9 s to 30.9 s across 14 benchmark queries after a citations GIN index, identical results (prod, one run each)",
      "Multi-stage LLM pipeline for prompt discovery: topic clustering, planning, generation, similarity filter, LLM judge",
    ],
    engagementOverviewParagraphs: [
      "AIclicks tracks how AI assistants mention and cite brands. I joined as a contract product engineer and took customer problems from ticket to merged PR across the whole stack: schema and migrations, FastAPI routes, Postgres rollups and indexes, background workers, and the React dashboard. Work went out as small PRs behind feature flags, merged to a dev branch and released to main.",
      "Measured from git log across the five repositories I committed to, Apr to Oct 2026: about 1,900 commits, about 500 PR merges, roughly 225,000 lines added and 45,000 removed, excluding lockfiles and generated files. Commit counts include merge commits.",
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
          "Bulk topic delete went from one request per topic to one request for the whole set. On a 5,000-prompt fixture with a real Redis: 2,399 ms to 316 ms, 78 cache scans to 3, 26 webhooks to 1, 78 commits to 1.",
        ],
        impactBullets: [
          "Bulk delete of 5,000 prompts: 2,399 ms to 316 ms and 78 commits to 1 (fixture, real Redis).",
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
        heading: "Prompt discovery: a multi-stage LLM pipeline with topic clustering",
        segmentLabel: "LLM pipeline",
        availabilityCaption: "Backend feature behind the prompt-discovery route; no public page.",
        introductionSections: [
          {
            sectionHeading: "Problem",
            sectionBody:
              "Customers needed new prompts to track, but single-shot generation repeated themes the brand already covered and drifted away from what the brand wanted to rank for.",
          },
          {
            sectionHeading: "My role",
            sectionBody:
              "Designed and built the pipeline, its tests and the route; the team made later edits.",
          },
        ],
        bodyParagraphs: [
          "Built the generate-cluster-prompts pipeline in the FastAPI backend as eight stages. It embeds the brand's existing prompts, reduces them with PCA and clusters them with KMeans, picking k by a silhouette sweep from 5 to 40. Pools under 50 prompts skip clustering, and a clustering failure falls back to one bucket. A small model then labels each cluster as a topic.",
          "A planning call to a larger model reads the labelled topics and returns a brief: saturated themes to avoid, forbidden phrases, and an instruction for the writer. A generation call writes 8 to 12 candidate prompts under geo-targeting rules. Candidates pass a cosine-similarity filter against the existing pool with two bands (0.70 and 0.92); the gray zone goes to an LLM judge, survivors are re-ranked by alignment minus avoidance similarity, and the top 10 are returned, with optional scoring.",
          "In the recommendations service I extended the content-ideas path with the same idea at a different layer: a breadth-first search over co-cited URLs forms clusters, and each of the top 10 clusters gets one model call with its top 25 URLs to name the topic.",
        ],
        impactBullets: [
          "Topic clustering replaced single-shot generation, so new prompts avoid saturated themes.",
          "Two cosine bands plus an LLM judge keep near-duplicates out without rejecting useful variants.",
          "Pipeline and cluster-stats behaviour covered by 10 tests I wrote; the content-ideas topic step has 17.",
        ],
        skills: [
          "Python 3.12",
          "OpenAI models",
          "Embeddings",
          "scikit-learn (PCA, KMeans, silhouette)",
          "Prompt design",
          "FastAPI (Python)",
          "pytest",
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
          "On the API side I added the explorer metric cards, a citations API, a lean cited-sources endpoint, an influence route and an untracked-mentions route, backed by a GIN index on citations and a function-based query path. Compressing the cited-sources endpoint with brotli took the payload from 18.7 MB to 2.0 MB, a 9.34x cut measured in the real app stack.",
          "This shipped as a first version. The rollup infrastructure needed a redesign before it could run across the full dataset, and that work was not finished when the engagement ended.",
        ],
        impactBullets: [
          "Cited-sources payload 18.7 MB to 2.0 MB (9.34x) with brotli q4; 57 ms CPU against 238 ms for gzip.",
          "Reach queries after the citations GIN index: 106.8 s to 1.9 s on the heaviest site class, 153.9 s to 30.9 s over 14 queries with identical results (prod, one run each). Index 1.92 GiB on a 55 GiB table.",
          "Brand tab query 4.1 to 5.9 s down to under 0.1 s with a daily-brands rollup (prod mirror).",
          "Nightly worker: 90 of 90 days rolled, 0 errors, 163 to 190 s per day (prod, Oct 2026).",
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
          "Matcher review removed 1,814 wrong detections and kept all 5,674 correct ones (16,502 competitor rows against 38,804 page titles).",
          "Subdomain credit fix: 13.4% of tracked brands had uncredited subdomain mentions before it (prod read, checksum verified).",
          "Stage-5 brand-name fix recovered 15.8% more mentions for one customer, 174 snapshots rewritten and verified three ways.",
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
