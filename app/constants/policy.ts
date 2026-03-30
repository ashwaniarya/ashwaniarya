export const homepageHeroPolicy = {
  heroSectionSpacingClassName: "space-y-4",
  heroImageWrapperClassName:
    "mx-auto flex h-[176px] w-[176px] items-center justify-center rounded-full border border-borderDefault bg-backgroundPage/80 shadow-sm",
  heroImageSizePx: 160,
  /** Outer hero portrait frame (tailwind `h/w-[176px]`); used for `sizes` on raster profile images. */
  heroProfilePictureFrameOuterEdgePx: 176,
  /**
   * Square edge length for exported homepage profile PNG/WebP (2× visible slot for retina).
   * Keep in sync with `HOMEPAGE_PROFILE_SOURCE_EDGE_PX` in `scripts/optimize-homepage-profile.mjs`.
   */
  heroProfileRasterSourceEdgePx: 352,
  heroProfileImageSizes: "176px",
  heroProfileRasterImageClassName: "rounded-full object-cover",
  heroTitleStackClassName: "flex flex-col items-center gap-3 sm:gap-4",
  heroTextStackSpacingClassName: "space-y-2 sm:space-y-3",
  heroTextAlignmentClassName: "text-center",
  heroTextWrapperClassName: "mx-auto w-full max-w-2xl",
  /** Frosted panel so copy stays legible over mesh glow orbs. */
  heroTextContrastPanelClassName:
    "rounded-xl bg-surfaceElevated/95 px-4 py-3 shadow-sm ring-1 ring-borderDefault/70 backdrop-blur-sm narrowPhoneUp:px-5 narrowPhoneUp:py-4 sm:px-6 sm:py-5",
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

/** Homepage experience focus areas: icon-led tiles in the projects grid rhythm. */
export const homepageExperienceSectionPolicy = {
  sectionClassName: "mt-10 border-t border-borderDefault/80 pt-8 sm:mt-12 sm:pt-10",
  focusAreaCardsListClassName:
    "mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:mt-8 sm:gap-5 md:grid-cols-2",
  focusAreaTileRowClassName: "flex gap-3 sm:gap-4",
  focusAreaTileIconClassName: "mt-0.5 h-5 w-5 shrink-0 text-textSecondary",
  focusAreaTileTextStackClassName: "min-w-0 space-y-1.5",
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
  caseStudyPaddingClassName:
    "px-2 py-2 narrowPhoneUp:px-4 narrowPhoneUp:py-4 sm:px-8 sm:py-11",
  homepageHeroPaddingClassName:
    "px-2 py-5 narrowPhoneUp:px-4 narrowPhoneUp:py-6 sm:px-8 sm:py-8",
  homepageProjectsPaddingClassName:
    "px-2 py-6 narrowPhoneUp:px-4 narrowPhoneUp:py-8 sm:px-8 sm:py-10",
} as const;

/** Primary display titles (hero name, case study document title) — clip gradient to glyphs. */
export const editorialGradientTitlePolicy = {
  gradientTextClassName:
    "bg-gradient-to-r from-textPrimary via-accentPrimary to-accentSecondary bg-clip-text text-transparent",
} as const;

/** Primary nav in `SiteHeader`: touch-friendly targets; `NavigationLabel` owns type; anchor owns color + focus ring. */
export const siteHeaderNavigationPolicy = {
  /**
   * Narrow: centered cluster. `sm+`: 1fr | auto | 1fr grid so Projects stays on the row midline with symmetric wings.
   */
  navigationListClassName:
    "flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:grid sm:w-full sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-x-8 sm:gap-y-0",
  /** Grid cell alignment for Home | Projects | Contact (indexes match `navigationConfiguration.navigationLinks` order). */
  navigationListItemSlotClassNames: [
    "sm:justify-self-end",
    "sm:justify-self-center",
    "sm:justify-self-start",
  ] as const,
  navigationLinkClassName:
    "inline-flex min-h-11 items-center rounded-sm px-2 text-textPrimary/80 transition-colors hover:text-accentPrimary focus-visible:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage sm:min-h-0 sm:px-1",
} as const;

/**
 * Sticky top bar for `SiteHeader`.
 * Keep vertical footprint aligned with `homepageAnchoredSectionScrollMarginPolicy` when changing padding or type scale.
 */
export const siteHeaderChromePolicy = {
  headerShellClassName:
    "sticky top-0 z-10 border-b border-black/10 bg-backgroundPage",
  /** Stacked brand then nav; centered band below `sm`, spaced column from `sm`. */
  headerInnerRowClassName:
    "flex w-full flex-col items-center gap-1 sm:items-center sm:justify-between sm:gap-4",
} as const;

/** Homepage sections targeted by hash links — offset scroll so targets sit below the sticky header. */
export const homepageAnchoredSectionScrollMarginPolicy = {
  scrollMarginTopClassName: "scroll-mt-24 sm:scroll-mt-16",
} as const;

/** Vertical rhythm inside long-form case study article wrapper. */
export const caseStudyArticleShellPolicy = {
  contentStackClassName: "mx-auto max-w-prose space-y-8 sm:space-y-10",
} as const;

/** Product chapter cards: gradient accent rail matches editorial marks + title gradient stops. */
export const caseStudyProductChapterPolicy = {
  shellFlexClassName:
    "flex gap-2 rounded-xl border border-borderDefault/80 bg-surfaceElevated p-3 shadow-md narrowPhoneUp:gap-3 narrowPhoneUp:p-4 sm:gap-4 sm:p-5",
  accentGradientRailClassName:
    "w-1 shrink-0 self-stretch rounded-full bg-gradient-to-b from-accentPrimary/80 via-accentHighlight/90 to-accentSecondary/80",
  /** Heading row: title + segment chip; bottom padding before first ruled block. */
  chapterTitleRowClassName:
    "flex flex-col gap-2 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3",
  /** Link / illustration / impact blocks that sit below a horizontal rule. */
  productChapterBorderedSectionTopClassName:
    "border-t border-borderDefault pt-4",
  /** Primary external link + optional `availabilityCaption` stack under the chapter title. */
  productPageLinkAvailabilityStackClassName: "space-y-2",
  /** Body + impact bullets when a rule sits above (no Impact KPI strip, or flush spacing handled separately). */
  productChapterBodyStackWhenTopRuleClassName:
    "space-y-2 border-t border-borderDefault pt-5",
  /** Body after Impact KPI strip: no extra rule; tighter top padding. */
  productChapterBodyStackWhenAfterImpactClassName: "space-y-2 pt-4",
  /** Skills block at chapter foot. */
  productChapterSkillsSectionClassName: "border-t border-borderDefault pt-5",
  /** Inset KPI strip inside a chapter (lighter than wrapping in a second Card). */
  impactSnapshotPanelClassName:
    "rounded-lg border border-borderDefault/60 bg-surfaceMuted/40 px-3 py-3 narrowPhoneUp:px-4",
  impactSnapshotHeadingClassName:
    "font-semibold uppercase tracking-wide text-accentPrimary",
  impactSnapshotMetricsGridClassName:
    "mt-2 grid grid-cols-1 gap-3 sm:mt-3 sm:grid-cols-3 sm:gap-4",
  impactSnapshotMetricCellClassName: "min-w-0 space-y-1",
  impactSnapshotMetricLabelClassName: "text-textSecondary",
  impactSnapshotMetricValueClassName: "text-textPrimary",
  /** Full-width figure inside prose column; matches chapter card chrome. */
  chapterIllustrationFigureClassName:
    "mt-4 overflow-hidden rounded-lg border border-borderDefault/70 bg-surfaceMuted/30 shadow-sm",
  chapterIllustrationImageClassName:
    "h-auto w-full object-cover object-top",
  /** Responsive hint for chapter screenshots (max ~65ch prose width). */
  chapterIllustrationImageSizes: "(max-width: 640px) 100vw, 42rem",
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
