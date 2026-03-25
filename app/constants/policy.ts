export const homepageHeroPolicy = {
  heroSectionSpacingClassName: "space-y-4",
  heroImageWrapperClassName:
    "mx-auto flex h-[176px] w-[176px] items-center justify-center rounded-full border border-borderDefault bg-backgroundPage/80 shadow-sm",
  heroImageSizePx: 160,
  heroTitleStackClassName: "flex flex-col items-center gap-3 sm:gap-4",
  heroTextStackSpacingClassName: "space-y-2 sm:space-y-3",
  heroTextAlignmentClassName: "text-center",
  heroTextWrapperClassName: "mx-auto w-full max-w-2xl",
  /** Frosted panel so copy stays legible over mesh glow orbs. */
  heroTextContrastPanelClassName:
    "rounded-xl bg-surfaceElevated/95 px-5 py-4 shadow-sm ring-1 ring-borderDefault/70 backdrop-blur-sm sm:px-6 sm:py-5",
} as const;

export const projectSectionPolicy = {
  sectionSpacingClassName: "mt-14",
  containerClassName:
    "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 items-stretch",
  panelBaseClassName:
    "rounded-lg border border-borderDefault bg-backgroundPage shadow-sm",
  panelPaddingClassName: "p-6 sm:p-8",
  panelLeftClassName: "overflow-hidden",
  panelRightClassName: "overflow-hidden",
} as const;

/** Homepage projects block: heading → intro → card list (no duplicate panel chrome). */
export const homepageProjectsSectionPolicy = {
  sectionClassName: "mt-10 border-t border-borderDefault/80 pt-8 sm:mt-12 sm:pt-10",
  headerStackClassName: "space-y-2 sm:space-y-3",
  headingMaxWidthClassName: "max-w-2xl",
  introMaxWidthClassName: "max-w-prose",
  cardsListClassName:
    "mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:mt-8 sm:gap-5 md:grid-cols-2",
} as const;

/** Homepage technology stack: same rhythm as projects; cards reuse projects grid classes. */
export const homepageTechnologyStackSectionPolicy = {
  sectionClassName: "mt-10 border-t border-borderDefault/80 pt-8 sm:mt-12 sm:pt-10",
  technologyItemListClassName: "mt-3 list-none space-y-2 p-0",
  technologyItemRowClassName: "flex items-start gap-2.5",
  technologyItemIconClassName:
    "mt-0.5 h-4 w-4 shrink-0 text-textSecondary",
} as const;

/** Homepage contact: channel list under mesh shell (matches stack section rhythm). */
export const homepageContactSectionPolicy = {
  sectionClassName: "mt-10 border-t border-borderDefault/80 pt-8 sm:mt-12 sm:pt-10",
  channelListClassName: "mt-6 list-none space-y-4 p-0 sm:mt-8",
  channelRowClassName: "flex items-start gap-3 sm:gap-4",
  channelIconClassName: "mt-0.5 h-5 w-5 shrink-0 text-textSecondary",
  channelLabelClassName: "w-28 shrink-0 text-sm font-medium text-textPrimary sm:w-32",
  channelValueClassName: "min-w-0 flex-1 text-sm text-textSecondary",
} as const;

/** Editorial mesh surfaces (shared with work case study canvas). */
export const meshEditorialSurfacePolicy = {
  /** Border + fill only — compose with a shadow token below. */
  shellBaseClassName: "rounded-2xl border border-borderDefault/70 bg-surfaceMuted",
  /** Home: keep the frame light; the old case-study shadow felt heavy on marketing pages. */
  homepageMeshShellShadowClassName: "shadow-sm",
  /** Work: deeper lift for long-form reading depth. */
  caseStudyMeshShellShadowClassName: "shadow-caseStudyElevated",
  caseStudyPaddingClassName: "px-4 py-8 sm:px-8 sm:py-11",
  homepageHeroPaddingClassName: "px-4 py-6 sm:px-8 sm:py-8",
  homepageProjectsPaddingClassName: "px-4 py-8 sm:px-8 sm:py-10",
} as const;

/** Primary display titles (hero name, case study document title) — clip gradient to glyphs. */
export const editorialGradientTitlePolicy = {
  gradientTextClassName:
    "bg-gradient-to-r from-textPrimary via-accentPrimary to-accentSecondary bg-clip-text text-transparent",
} as const;

/** Vertical rhythm inside long-form case study article wrapper. */
export const caseStudyArticleShellPolicy = {
  contentStackClassName: "mx-auto max-w-prose space-y-8 sm:space-y-10",
} as const;

/** Product chapter cards: gradient accent rail matches editorial marks + title gradient stops. */
export const caseStudyProductChapterPolicy = {
  shellFlexClassName:
    "flex gap-4 rounded-xl border border-borderDefault/80 bg-surfaceElevated p-6 shadow-md sm:gap-5",
  accentGradientRailClassName:
    "w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-accentPrimary/80 via-accentHighlight/90 to-accentSecondary/80",
} as const;

/** Mesh orb strengths — lower = less color bleed through typography. */
export const meshGlowBackdropPolicy = {
  violetOrbClassName:
    "pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-glowViolet/16 blur-3xl",
  cyanOrbClassName:
    "pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-glowCyan/14 blur-3xl",
  accentWashOrbClassName:
    "pointer-events-none absolute left-1/2 top-1/3 h-48 w-96 -translate-x-1/2 rounded-full bg-accentPrimary/7 blur-3xl",
} as const;

export const contentCardPolicy = {
  containerBaseClassName:
    "block min-w-0 rounded-lg border border-borderDefault bg-backgroundPage p-6 shadow-sm",
  linkInteractiveClassName:
    "transition-colors transition-shadow hover:border-accentPrimary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
} as const;
