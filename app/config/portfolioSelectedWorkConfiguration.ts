import type { CaseStudyPagePath } from "@/app/config/portfolioCaseStudiesConfiguration";
import {
  pulseboardCaseStudyPagePath,
  pulseboardLiveAppUrl,
  pulseboardOverviewScreenshot,
  pulseboardSourceRepositoryUrl,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";

export type SelectedWorkScreenshotPreviewConfiguration = Readonly<{
  previewKind: "screenshot";
  webpSrc: string;
  pngSrc: string;
  alt: string;
  width: number;
  height: number;
}>;

/** @deprecated Use `SelectedWorkScreenshotPreviewConfiguration` in new code. */
export type SelectedWorkScreenshotConfiguration = SelectedWorkScreenshotPreviewConfiguration;

export type SelectedWorkCodePreviewConfiguration = Readonly<{
  previewKind: "code";
  accessibilityLabel: string;
  codeLines: readonly string[];
}>;

export type SelectedWorkTilePreviewConfiguration =
  | SelectedWorkScreenshotPreviewConfiguration
  | SelectedWorkCodePreviewConfiguration;

export type SelectedWorkRecord = Readonly<{
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  liveUrl: string;
  sourceUrl?: string;
  /** Internal case-study page; when set, the tile card opens it instead of `liveUrl`. */
  caseStudyHref?: CaseStudyPagePath;
  stackLabels: readonly string[];
  tilePreview: SelectedWorkTilePreviewConfiguration;
}>;

export const homepageSelectedWorkSectionCopyConfiguration = {
  sectionHeading: "Selected work",
  sectionIntroLines: [
    "Live things I defined, built, and deployed myself, then kept running. Open any of them; every one is in production (private repos link to contact for a demo).",
  ],
  caseStudyCueLabel: "Read the case study",
  liveLinkLabel: "Live",
  sourceLinkLabel: "Source",
} as const;

const portfolioSelectedWork = [
  {
    slug: "automixpilot",
    title: "AutoMixPilot",
    kicker: "Music-channel SaaS",
    summary:
      "Plans, composes, and renders music mixes on a schedule. Express and Prisma API, BullMQ worker with ffmpeg and AI adapters, Next.js 15 dashboard, tiered file retention, and a disk guard.",
    liveUrl: "https://mixpilot-web-three.vercel.app",
    stackLabels: ["Next.js 15", "Express", "Prisma", "BullMQ"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/automixpilot.webp",
      pngSrc: "/images/work/automixpilot.png",
      alt: "AutoMixPilot landing page: music channel on autopilot with genre controls and a waveform hero.",
      width: 1024,
      height: 594,
    },
  },
  {
    slug: "postgres-mcp",
    title: "postgres-mcp",
    kicker: "Multi-tenant MCP SaaS",
    summary:
      "Permission-gated Postgres access for AI agents over MCP. Organisations, invitations, live Prisma migrations, and 257 tests with spec-first, adversarial review on every change. Private repo; demo on request.",
    liveUrl: "https://ashwaniarya.vercel.app/#contact",
    stackLabels: ["MCP", "Prisma", "PostgreSQL", "Vitest"],
    tilePreview: {
      previewKind: "code",
      accessibilityLabel: "postgres-mcp permission model and scoped SQL access for AI agents.",
      codeLines: [
        "// postgres-mcp · org-scoped agent access",
        'mcp.connect({ orgId, role: "analyst" })',
        "await db.withScope(user, async (tx) => {",
        '  return tx.$queryRaw`SELECT ...`',
        "})",
        "// invitations · live migrations · 257 tests",
      ],
    },
  },
  {
    slug: "shop-management",
    title: "Shop Management",
    kicker: "Parts-shop operations",
    summary:
      "Inventory and invoicing for parts shops. Express, Prisma, PostgreSQL, Next.js 15, and OIDC with PKCE. Deadlock-free invoices in one transaction with ordered locks; a single-origin proxy fixed DNS failures on Indian carriers.",
    liveUrl: "https://github.com/ashwaniarya/shop-management",
    stackLabels: ["Next.js 15", "Express", "Prisma", "OIDC"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/shop-management.webp",
      pngSrc: "/images/work/shop-management.png",
      alt: "Shop Management sign-in screen for the parts counter workstation.",
      width: 1024,
      height: 594,
    },
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    kicker: "Dashboard and design system",
    summary:
      "Clinic-operations analytics with a token-based design system: about twenty components documented and tested in Storybook with axe checks, visx charts, and a 52K-row virtualized table.",
    liveUrl: pulseboardLiveAppUrl,
    sourceUrl: pulseboardSourceRepositoryUrl,
    caseStudyHref: pulseboardCaseStudyPagePath,
    stackLabels: ["React 19", "Tailwind 4", "Storybook", "Cypress"],
    tilePreview: pulseboardOverviewScreenshot,
  },
  {
    slug: "ai-secure-share",
    title: "ai-secure-share",
    kicker: "Encrypted AI answer sharing",
    summary:
      "End-to-end encrypted sharing for AI-generated answers so teams can pass along model output without exposing prompts or data in the clear.",
    liveUrl: "https://airesponseshare.com",
    stackLabels: ["Next.js", "TypeScript", "E2E encryption"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/ai-secure-share.webp",
      pngSrc: "/images/work/ai-secure-share.png",
      alt: "ai-secure-share landing page: encrypted AI response sharing with agent CLI install.",
      width: 1024,
      height: 594,
    },
  },
  {
    slug: "agent-dev-tools",
    title: "Agent dev tools",
    kicker: "Open-source AI tooling",
    summary:
      "Dev tools for AI agents: grok-web-sdk (logged-in Grok as MCP, CLI, and HTTP tools without an API key), PromptBoard (SwiftUI overlay for saved prompts in coding tools), and trello-skill (Claude Code plugin for Trello).",
    liveUrl: "https://github.com/ashwaniarya/grok-web-sdk",
    stackLabels: ["MCP", "Claude Code", "TypeScript", "SwiftUI"],
    tilePreview: {
      previewKind: "code",
      accessibilityLabel: "Open-source agent dev tools: grok-web-sdk, PromptBoard, and trello-skill.",
      codeLines: [
        "// grok-web-sdk · MCP + CLI, no API key",
        'tools: ["grok.chat", "grok.search"]',
        "// PromptBoard · saved prompts at cursor",
        "// trello-skill · Claude Code ↔ Trello",
      ],
    },
  },
  {
    slug: "syncoderslabs",
    title: "Syncoders Labs",
    kicker: "Cinematic studio site",
    summary:
      "Marketing site for a generative-media studio. Hand-written CSS, a decode-style hero animation that respects reduced motion, and a WebGL scroll backdrop behind crawlable HTML.",
    liveUrl: "https://syncoderslabs.com",
    stackLabels: ["Vite", "TypeScript", "Three.js", "GSAP"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/syncoderslabs.webp",
      pngSrc: "/images/work/syncoderslabs.png",
      alt: "Syncoders Labs homepage: bold display headline over a dark generative backdrop.",
      width: 1200,
      height: 750,
    },
  },
  {
    slug: "scroll-engine",
    title: "scroll-engine",
    kicker: "Open-source 3D scroll engine",
    summary:
      "A TypeScript engine for scroll-driven 3D sites: composited layer renderers, GLSL shader layers, and visibility culling that cut steady-state draw calls from about 113 to between 4 and 47.",
    liveUrl: "https://scroll-engine.syncoderslabs.com",
    sourceUrl: "https://github.com/ashwaniarya/scroll-engine",
    stackLabels: ["TypeScript", "Three.js", "GSAP", "Vitest"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/scroll-engine.webp",
      pngSrc: "/images/work/scroll-engine.png",
      alt: "scroll-engine demo title: layered renders, one scroll, live props.",
      width: 1200,
      height: 750,
    },
  },
  {
    slug: "mindflow",
    title: "MindFlow",
    kicker: "Agent that builds mind maps",
    summary:
      "A ReAct agent in LangGraph that plans a mind map through tools, with a step budget and streamed reasoning. Predicted branch colours, tidy-tree Smart Align, and double-click markdown editing on the canvas.",
    liveUrl: "https://mindflow-ai-sepia.vercel.app",
    stackLabels: ["React Flow", "LangGraph", "Gemini", "Tailwind 4"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/mindflow.webp",
      pngSrc: "/images/work/mindflow.png",
      alt: "MindFlow canvas showing a colour-coded mind map about SEO visibility with a history sidebar.",
      width: 1200,
      height: 750,
    },
  },
  {
    slug: "trinetra",
    title: "TRINETRA",
    kicker: "Scroll-told film promo",
    summary:
      "Seven-screen promo for a mythic epic, told through scroll. Instanced yantra mandala, PMREM-lit gold trishul, nebula and god-ray shader passes, ACES tone mapping.",
    liveUrl: "https://trinetra.syncoderslabs.com",
    sourceUrl: "https://github.com/ashwaniarya/trinetra",
    stackLabels: ["Three.js", "GLSL", "GSAP ScrollTrigger"],
    tilePreview: {
      previewKind: "screenshot",
      webpSrc: "/images/work/trinetra.webp",
      pngSrc: "/images/work/trinetra.png",
      alt: "TRINETRA title card in gold serif type over drifting embers.",
      width: 1200,
      height: 750,
    },
  },
] as const satisfies readonly SelectedWorkRecord[];

export function getAllSelectedWork(): readonly SelectedWorkRecord[] {
  return portfolioSelectedWork;
}
