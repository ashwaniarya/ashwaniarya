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
  heroTextStackSpacingClassName: "prose-rhythm",
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
  headerStackClassName: "prose-rhythm",
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
  /** Left-aligned under the brand on phones, centered from `sm`. On phones the first link drops its left padding (the `px-2` in `button3DPolicy.variantClassName.nav`) so its label lines up with the brand; a negative list margin would align it too, but push its focus ring past the 8px phone gutter. */
  navigationListClassName:
    "flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-1 max-sm:[&>li:first-child>a]:pl-0 sm:justify-center sm:gap-x-8",
  /** On phones `phoneCallToActionPillClassName` shows this link beside the brand instead, so it is exposed once at every width. */
  phoneHiddenCallToActionListItemClassName: "max-sm:hidden",
  phoneCallToActionPillClassName:
    "inline-flex h-8.5 items-center rounded-full border border-accentPrimary/45 bg-accentPrimary/5 px-3.5 text-accentPrimary transition-colors hover:bg-accentPrimary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage sm:hidden",
} as const;

/**
 * Sticky top bar for `SiteHeader`.
 * Keep vertical footprint aligned with `homepageAnchoredSectionScrollMarginPolicy` when changing padding, type scale or row layout.
 */
export const siteHeaderChromePolicy = {
  headerShellClassName:
    "sticky top-0 z-10 border-b border-black/10 bg-backgroundPage/80 backdrop-blur-md",
  /** Phones: brand left and call-to-action pill right, nav wrapping to its own full-width row below. From `sm`: brand centered over the nav. */
  headerInnerRowClassName:
    "flex w-full flex-wrap items-center justify-between gap-x-3 gap-y-0.5 sm:flex-col sm:gap-4",
} as const;

/** Homepage sections targeted by hash links — offset scroll so targets sit below the sticky header. */
export const homepageAnchoredSectionScrollMarginPolicy = {
  scrollMarginTopClassName: "scroll-mt-24 sm:scroll-mt-16",
} as const;

/** Vertical rhythm inside long-form case study article wrapper (header + sections). */
export const caseStudyArticleShellPolicy = {
  /** Article column — spacing comes from child wrappers so header vs body sections can differ. */
  articleShellColumnClassName: "mx-auto flex flex-col",
  /** Air between the elevated header card and the first prose section. */
  caseStudyHeaderBlockBottomMarginClassName: "mb-12 sm:mb-16",
  /** Tighter stack between “Engagement overview”, “Product surfaces”, etc. */
  caseStudyBodySectionsVerticalStackClassName: "flex flex-col gap-7 sm:gap-10",
  /** Elevated frosted card holding a case study's title block (shared by every case-study header). */
  caseStudyHeaderCardClassName:
    "space-y-4 rounded-xl border border-borderDefault/80 bg-surfaceElevated/95 p-4 shadow-md backdrop-blur-sm narrowPhoneUp:p-6 sm:p-8 mb-6",
} as const;

/** Short gradient spine beside Impact Metric labels and introduction h4 rows (single source of truth). */
const editorialMicroRailClassName =
  "h-2 w-px shrink-0 rounded-full bg-gradient-to-b from-accentPrimary via-accentHighlight to-accentSecondary opacity-90";

/** Product chapter cards: gradient accent rail matches editorial marks + title gradient stops. */
export const caseStudyProductChapterPolicy = {
  shellFlexClassName:
    "flex gap-2 rounded-xl border border-borderDefault/80 bg-surfaceElevated p-3 shadow-md narrowPhoneUp:gap-3 narrowPhoneUp:p-4 sm:gap-4 sm:p-5",
  accentGradientRailClassName:
    "w-[3px] sm:w-[4px] shrink-0 self-stretch rounded-full bg-gradient-to-b from-accentPrimary/80 via-accentHighlight/90 to-accentSecondary/80",
  /** Heading row: title + segment chip; bottom padding before first ruled block. */
  chapterTitleRowClassName:
    "flex flex-col gap-2 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3",
  /** Link / illustration / impact blocks that sit below a horizontal rule. */
  productChapterBorderedSectionTopCPlassName:
    "border-t border-borderDefault pt-4",
  /** Primary external link + optional `availabilityCaption` stack under the chapter title. */
  productPageLinkAvailabilityStackClassName: "space-y-2",
  /** Body + impact bullets when a rule sits above (no Impact KPI strip, or flush spacing handled separately). */
  productChapterBodyStackWhenTopRuleClassName: "border-t border-borderDefault pt-5 prose-rhythm",
  /** Body after Impact KPI strip: no extra rule; tighter top padding. */
  productChapterBodyStackWhenAfterImpactClassName: "pt-4 prose-rhythm",
  /** Optional h4-led blocks (Overview / Problem / My role) above technical paragraphs. */
  productChapterIntroductionOuterStackClassName: "prose-rhythm",
  productChapterIntroductionSectionBlockClassName: "prose-rhythm",
  /** Micro-rail + h4 row; rail uses `productChapterEditorialMicroRailClassName` (`aria-hidden` in component). */
  productChapterIntroductionHeadingRowClassName:
    "flex min-w-0 items-center gap-1.5",
  productChapterEditorialMicroRailClassName: editorialMicroRailClassName,
  /** Skills block at chapter foot. */
  productChapterSkillsSectionClassName: "border-t border-borderDefault pt-5",
  /** Section wrapper — chrome lives on `impactSnapshotPanelFrameClassName`. */
  impactSnapshotPanelClassName: "min-w-0",
  /**
   * Highlight rail + wash: light mode reads as a soft violet→cyan glass strip; dark mode uses the same
   * structure with deeper surfaces (tokens in `globals.css`).
   */
  impactSnapshotPanelFrameClassName:
    "flex gap-3 overflow-hidden rounded-xl border border-accentPrimary/25 bg-gradient-to-br from-accentPrimary/[0.12] via-surfaceMuted to-accentSecondary/[0.10] p-3 shadow-sm ring-1 ring-inset ring-borderDefault/40 narrowPhoneUp:gap-3.5 narrowPhoneUp:p-4 sm:gap-4",
  impactSnapshotHeadingClassName:
    "text-xs font-semibold uppercase tracking-[0.14em] text-accentHighlight",
  impactSnapshotMetricsGridClassName:
    "grid grid-cols-1 gap-2.5 sm:grid-cols-3 sm:gap-3",
  impactSnapshotMetricCellClassName:
    "min-w-0 space-y-2 rounded-lg border border-borderDefault/70 bg-surfaceElevated/55 px-3 py-2.5 shadow-sm backdrop-blur-[2px] narrowPhoneUp:px-3.5 narrowPhoneUp:py-3",
  /** Flex row: micro-rail + label; rail is decorative only (`aria-hidden` in component). */
  impactSnapshotMetricLabelRowClassName:
    "flex min-w-0 items-center gap-1.5",
  impactSnapshotMetricLabelRailClassName: editorialMicroRailClassName,
  impactSnapshotMetricLabelClassName:
    "block min-w-0 truncate text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-accentSecondary/90",
  impactSnapshotMetricValueClassName:
    "font-semibold tabular-nums tracking-tight text-textPrimary",
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

export type Button3DVariant =
  | "primary"
  | "card"
  | "nav"
  | "inlineLink"
  | "externalLink"
  | "pillLink";

/**
 * Reusable 3D interactive primitive (`Button3D`). `canvasVariants` get the
 * shared-canvas WebGL motif — they use translucent surfaces so the cube,
 * rendered behind the button, shows through. Text-link and pill-link variants
 * stay flat (no per-link WebGL view, which would not scale across a long page).
 */
export const button3DPolicy = {
  canvasVariants: ["primary", "card", "nav"] as ReadonlyArray<Button3DVariant>,
  variantClassName: {
    primary:
      "relative inline-flex items-center justify-center rounded-full border border-accentPrimary/40 bg-surfaceElevated/70 px-7 py-3 text-sm font-semibold text-textPrimary shadow-sm backdrop-blur-sm transition-colors hover:border-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
    card:
      "relative block min-w-0 rounded-lg border border-borderDefault bg-surfaceElevated/60 p-6 shadow-sm backdrop-blur-sm transition-colors transition-shadow hover:border-accentPrimary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
    nav:
      "relative inline-flex min-h-11 items-center rounded-sm px-2 text-textPrimary/80 transition-colors hover:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage sm:min-h-0 sm:px-1",
    inlineLink:
      "font-medium text-accentPrimary underline-offset-4 hover:underline",
    externalLink:
      "rounded-sm font-medium text-accentPrimary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
    pillLink:
      "inline-flex items-center rounded-full border border-borderDefault px-3.5 py-1.5 text-sm font-medium text-textPrimary transition-colors hover:border-accentPrimary/60 hover:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
  } satisfies Record<Button3DVariant, string>,
} as const;

/** Homepage selected work: screenshot tiles linking to live pieces. Shares the projects section rhythm. */
export const homepageSelectedWorkSectionPolicy = {
  tilesListClassName:
    "mt-6 grid list-none grid-cols-1 gap-5 p-0 sm:mt-8 sm:gap-6 md:grid-cols-2",
  tileLinkClassName: "h-full",
  tileFigureClassName:
    "m-0 overflow-hidden rounded-md border border-borderDefault/70 bg-backgroundPage",
  tileCodePreviewPanelClassName:
    "flex aspect-[8/5] w-full items-stretch bg-surfaceMuted/90 p-4 sm:p-5",
  tileCodePreviewPreClassName:
    "m-0 min-h-0 w-full flex-1 overflow-hidden whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-textSecondary sm:text-xs",
  tileImageClassName: "block h-auto w-full",
  tileImageSizes: "(min-width: 768px) 50vw, 100vw",
  tileMetaRowClassName: "flex flex-wrap items-center justify-between gap-2 px-1",
  tileCaseStudyCueClassName: "inline-flex items-center gap-1 pt-1 text-sm font-medium text-accentPrimary",
  tileCaseStudyCueIconClassName: "h-4 w-4 shrink-0",
  tileSecondaryLinksClassName: "flex items-center gap-3",
  stackListClassName: "flex list-none flex-wrap gap-1.5 p-0",
  stackChipClassName:
    "rounded-full border border-borderDefault/80 px-2.5 py-0.5 text-xs text-textSecondary",
  /** Must match `WORK_SCREENSHOT_WIDTH_PX` in `scripts/optimize-work-screenshots.mjs`. */
  selectedWorkTileImageWidthPx: 1200,
} as const;

/** Homepage production-proof strip: four KPI tiles in the shared section rhythm. */
export const homepageProductionProofSectionPolicy = {
  sectionClassName: "mt-10 border-t border-borderDefault/80 pt-8 sm:mt-12 sm:pt-10",
  metricCardsListClassName:
    "mt-6 grid list-none grid-cols-1 gap-4 p-0 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4",
  metricTileStackClassName: "min-w-0 space-y-2",
  /** Micro-rail + label row, mirroring `caseStudyProductChapterPolicy` (rail is `aria-hidden`). */
  metricLabelRowClassName: "flex min-w-0 items-center gap-1.5",
  metricLabelRailClassName: editorialMicroRailClassName,
  metricLabelClassName:
    "block min-w-0 text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-accentSecondary/90",
  /**
   * Sits on top of `BodyText size="lg"` (`text-lg`). Only the `sm:` variant sets a size, so there
   * is no same-variant font-size collision with the primitive's own class.
   */
  metricValueClassName:
    "font-semibold tabular-nums tracking-tight text-textPrimary sm:text-2xl",
} as const;

/** Pulseboard case study (`/work/pulseboard`): header link row, architecture lanes, fact cards, usage bars. */
export const pulseboardCaseStudyPagePolicy = {
  backLinkClassName: "inline-flex items-center gap-1.5 text-sm",
  backLinkIconClassName: "h-4 w-4 shrink-0",
  kickerAndTitleStackClassName: "space-y-2",
  /** Micro-rail + kicker, mirroring the metric label rows (rail is `aria-hidden`). */
  kickerRowClassName: "flex min-w-0 items-center gap-1.5 text-sm font-medium text-accentPrimary",
  kickerRailClassName: editorialMicroRailClassName,
  headerLinkListClassName: "flex list-none flex-wrap items-center gap-2 p-0",
  /** Neither `primary` nor `pillLink` sets a gap, so icon spacing is added here. */
  headerLinkButtonClassName: "gap-2",
  headerLinkIconClassName: "h-4 w-4 shrink-0",
  heroFigureClassName: "m-0 space-y-2",
  heroPictureFrameClassName:
    "block overflow-hidden rounded-lg border border-borderDefault/70 bg-surfaceMuted/30 shadow-sm",
  heroImageClassName: "block h-auto w-full",
  sectionBodyStackClassName: "space-y-6",
  subsectionStackClassName: "space-y-3",
  diagramFigureClassName: "m-0 space-y-5",
  diagramLanesStackClassName: "space-y-5",
  diagramLaneStackClassName: "space-y-2",
  diagramLaneLabelClassName:
    "text-xs font-medium uppercase tracking-[0.1em] text-textSecondary",
  diagramLaneListClassName: "flex list-none flex-col gap-6 p-0 sm:flex-row sm:gap-8",
  diagramLaneItemClassName: "relative min-w-0 sm:flex-1",
  /** Centred in the gap before its node: points down while lanes stack, right from `sm`. */
  diagramArrowIconClassName:
    "absolute -top-5 left-1/2 h-4 w-4 -translate-x-1/2 rotate-90 text-textSecondary sm:-left-6 sm:top-1/2 sm:translate-x-0 sm:-translate-y-1/2 sm:rotate-0",
  diagramNodeClassName: "h-full w-full rounded-lg border px-3 py-2.5 text-center",
  diagramNodeLabelClassName: "text-sm font-semibold text-textPrimary",
  diagramNodeDetailClassName: "text-xs text-textSecondary",
  diagramToneClassNames: {
    application: {
      surfaceClassName: "border-accentPrimary/50 bg-accentPrimary/10",
      iconClassName: "text-accentPrimary",
    },
    mockBackend: {
      surfaceClassName: "border-accentSecondary/50 bg-accentSecondary/10",
      iconClassName: "text-accentSecondary",
    },
  },
  diagramLegendClassName: "grid gap-4 sm:grid-cols-2",
  legendGroupStackClassName: "space-y-2",
  legendGroupLabelRowClassName: "flex items-center gap-2",
  legendSwatchClassName: "h-3 w-3 shrink-0 rounded-sm border",
  iconBulletListClassName: "list-none space-y-1.5 p-0",
  iconBulletGridClassName: "grid list-none grid-cols-1 gap-x-4 gap-y-2 p-0 sm:grid-cols-2",
  iconBulletItemClassName: "flex items-start gap-2 text-sm text-textSecondary",
  iconBulletIconClassName: "mt-0.5 h-4 w-4 shrink-0",
  behaviourIconClassName: "text-accentPrimary",
  limitIconClassName: "text-textSecondary",
  decisionRecordListClassName: "grid list-none gap-2 p-0 text-sm sm:grid-cols-2",
  factCardClassName:
    "min-w-0 rounded-lg border border-borderDefault/80 bg-surfaceElevated/60 p-4",
  factCardTitleRowClassName: "flex items-center gap-2 text-sm font-semibold text-textPrimary",
  factCardIconClassName: "h-[18px] w-[18px] shrink-0 text-accentPrimary",
  factCardDescriptionClassName: "mt-1 text-sm text-textSecondary",
  designRuleGridClassName: "grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2",
  testTierGridClassName: "grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4",
  performanceCardsStackClassName: "space-y-4",
  performanceCardClassName:
    "space-y-3 rounded-lg border border-borderDefault/80 bg-surfaceElevated/60 p-4 sm:p-5",
  performanceCardTitleRowClassName: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
  statGridClassName: "m-0 grid grid-cols-2 gap-3",
  statBoxClassName: "min-w-0 rounded-lg border border-borderDefault/70 p-3",
  statLabelClassName: "text-xs text-textSecondary",
  statValueClassName: "m-0 text-xl font-semibold tabular-nums text-textPrimary",
  usageBarListClassName: "list-none space-y-3 p-0",
  usageBarGridClassName:
    "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1.5 text-sm",
  usageBarLabelClassName: "min-w-0 text-textPrimary",
  usageBarSummaryClassName: "tabular-nums text-textSecondary",
  usageBarTrackClassName: "col-span-2 block h-2 overflow-hidden rounded-full bg-borderDefault/70",
  usageBarFillBaseClassName: "block h-full rounded-full",
  frameUsageFillClassName: "bg-accentSecondary",
  bundleUsageFillClassName: "bg-accentPrimary",
  highlightedChipClassName:
    "rounded-full border border-accentPrimary/60 bg-accentPrimary/10 px-2.5 py-0.5 text-xs font-medium text-textPrimary",
  ciJobChipClassName: `${homepageSelectedWorkSectionPolicy.stackChipClassName} font-mono`,
  labelledChipRowClassName: "flex flex-wrap items-center gap-x-2 gap-y-1.5",
  chipRowLabelClassName: "text-xs text-textSecondary",
  inlineIconLinkClassName: "inline-flex items-center gap-1 text-sm",
  inlineIconLinkIconClassName: "h-4 w-4 shrink-0",
} as const;

/** Click-to-play case study demo video: poster first, nothing but the poster is fetched until play. */
export const caseStudyDemoVideoPolicy = {
  /** Same air below as the header card, so the video and the screenshot under it read as separate figures. */
  figureClassName: "m-0 mb-6",
  frameClassName:
    "relative block overflow-hidden rounded-lg border border-borderDefault/70 bg-surfaceMuted/30 shadow-sm",
  videoClassName: "block h-auto w-full bg-black",
  /** `none` keeps the page weight to the poster until the visitor presses play. */
  videoPreload: "none",
  /** Pill sits bottom-left so it never covers the title card in the poster. */
  playButtonClassName:
    "group absolute inset-0 flex w-full items-end justify-start p-3 transition-colors hover:bg-black/5 focus-visible:outline-none narrowPhoneUp:p-4 sm:p-5 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accentPrimary",
  playButtonDiscClassName:
    "flex items-center gap-2 rounded-full border border-white/25 bg-black/55 py-2.5 pl-3.5 pr-4 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition-transform group-hover:scale-105 group-focus-visible:scale-105",
  playButtonIconClassName: "h-5 w-5 shrink-0",
  durationLabelClassName: "tabular-nums text-white/70",
} as const;
