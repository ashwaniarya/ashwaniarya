export const homepageHeroCopyConfiguration = {
  headline: "Ashwani Arya",
  descriptionLines: [
    "Product engineer in Bengaluru, 7+ years. I build products end to end: UI, backend, AI and payments.",
    "React, Next.js, TypeScript, Node.js and Stripe. Open to remote or Bengaluru, full-time or contract.",
  ],
} as const;

/** About me copy. Source: the approved about text (job details live in the Experience timeline). */
export const homepageAboutMeCopyConfiguration = {
  sectionHeading: "About me",
  paragraphs: [
    "Product engineer in Bengaluru, 7+ years. I build products end to end: UI, backend, AI and payments, and I like automating the slow parts of a business. I take ambiguous business problems, ship the first version fast, and iterate to maximise outcomes.",
    "Own builds: AutoMixPilot (a query in, a finished AI music video out) and a Trello MCP server for AI agents. I've also worked with embeddings, semantic clustering and topic extraction.",
    "Stack: React, Next.js, TypeScript, Node.js (NestJS, Express), Stripe. Open to remote or Bengaluru, full-time or contract.",
  ],
} as const;

export const homepageProjectsSectionCopyConfiguration = {
  sectionHeading: "Case studies",
  sectionIntroLines: [
    "Longer write-ups of production work at getbujo and AIClicks: live video, an AI copilot, a browser extension and an AI visibility analytics product.",
  ],
} as const;

export const homepageTechnologyStackSectionCopyConfiguration = {
  sectionHeading: "Technology stack",
  sectionIntroLines: [
    "Grouped by how much I use each one: primary every day, secondary regularly, tertiary now and then.",
  ],
} as const;

export const homepageHeroMediaConfiguration = {
  profileImage: {
    pngSrc: "/images/homepage-profile.png",
    webpSrc: "/images/homepage-profile.webp",
    alt: "Arya profile portrait",
  },
} as const;
