export type SelectedWorkScreenshotConfiguration = Readonly<{
  webpSrc: string;
  pngSrc: string;
  alt: string;
  width: number;
  height: number;
}>;

export type SelectedWorkRecord = Readonly<{
  slug: string;
  title: string;
  kicker: string;
  summary: string;
  liveUrl: string;
  sourceUrl?: string;
  stackLabels: readonly string[];
  screenshot: SelectedWorkScreenshotConfiguration;
}>;

export const homepageSelectedWorkSectionCopyConfiguration = {
  sectionHeading: "Selected work",
  sectionIntroLines: [
    "Live things I designed and built end to end. Open any of them; every one is running in production.",
  ],
} as const;

const portfolioSelectedWork = [
  {
    slug: "syncoderslabs",
    title: "Syncoders Labs",
    kicker: "Cinematic studio site",
    summary:
      "Marketing site for a generative-media studio. Hand-written CSS, a decode-style hero animation that respects reduced motion, and a WebGL scroll backdrop behind crawlable HTML.",
    liveUrl: "https://syncoderslabs.com",
    stackLabels: ["Vite", "TypeScript", "Three.js", "GSAP"],
    screenshot: {
      webpSrc: "/images/work/syncoderslabs.webp",
      pngSrc: "/images/work/syncoderslabs.png",
      alt: "Syncoders Labs homepage: bold display headline over a dark generative backdrop.",
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
    screenshot: {
      webpSrc: "/images/work/trinetra.webp",
      pngSrc: "/images/work/trinetra.png",
      alt: "TRINETRA title card in gold serif type over drifting embers.",
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
    screenshot: {
      webpSrc: "/images/work/scroll-engine.webp",
      pngSrc: "/images/work/scroll-engine.png",
      alt: "scroll-engine demo title: layered renders, one scroll, live props.",
      width: 1200,
      height: 750,
    },
  },
  {
    slug: "pulseboard",
    title: "Pulseboard",
    kicker: "Dashboard and design system",
    summary:
      "Clinic-operations analytics with a token-based design system: about twenty components documented and tested in Storybook with axe checks, visx charts, and a 52K-row virtualized table.",
    liveUrl: "https://pulseboard-green-chi.vercel.app",
    sourceUrl: "https://github.com/ashwaniarya/pulseboard",
    stackLabels: ["React 19", "Tailwind 4", "Storybook", "Cypress"],
    screenshot: {
      webpSrc: "/images/work/pulseboard.webp",
      pngSrc: "/images/work/pulseboard.png",
      alt: "Pulseboard overview in dark mode: KPI tiles with sparklines and a daily trend chart.",
      width: 1200,
      height: 675,
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
    screenshot: {
      webpSrc: "/images/work/mindflow.webp",
      pngSrc: "/images/work/mindflow.png",
      alt: "MindFlow canvas showing a colour-coded mind map about SEO visibility with a history sidebar.",
      width: 1200,
      height: 750,
    },
  },
  {
    slug: "cascading-filters",
    title: "Cascading Filters Dashboard",
    kicker: "Analytics prototype",
    summary:
      "Global and local filters that cascade through a URL-analysis table and chart, plus a picture-in-picture chart that follows the reader down the page.",
    liveUrl: "https://cascading-filters-dashboard.vercel.app",
    stackLabels: ["React 19", "Recharts", "Tailwind 4"],
    screenshot: {
      webpSrc: "/images/work/cascading-filters.webp",
      pngSrc: "/images/work/cascading-filters.png",
      alt: "Cascading Filters Dashboard: filter bar, visibility-over-time chart, and a URL table.",
      width: 1200,
      height: 750,
    },
  },
] as const satisfies readonly SelectedWorkRecord[];

export function getAllSelectedWork(): readonly SelectedWorkRecord[] {
  return portfolioSelectedWork;
}
