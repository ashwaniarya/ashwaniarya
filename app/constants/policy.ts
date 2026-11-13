export const homepageHeroPolicy = {
  heroSectionSpacingClassName: "space-y-4",
  heroImageWrapperClassName:
    "mx-auto flex h-[176px] w-[176px] items-center justify-center rounded-full",
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
  heroTextContrastPanelClassName: "",
} as const;

export const projectSectionPolicy = {
  sectionSpacingClassName: "mt-14",
  containerClassName:
    "grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10 items-stretch",
  panelBaseClassName:
    "rounded-lg border border-borderDefault bg-backgroundPage",
  panelPaddingClassName: "p-6 sm:p-8",
  panelLeftClassName: "overflow-hidden",
  panelRightClassName: "overflow-hidden",
} as const;

/** Homepage projects block: heading → intro → card list (no duplicate panel chrome). */
export const homepageProjectsSectionPolicy = {
  sectionClassName: "mt-16 border-t border-borderDefault pt-12 sm:mt-20 sm:pt-16",
  headerStackClassName: "prose-rhythm",
  headingMaxWidthClassName: "max-w-2xl",
  introMaxWidthClassName: "max-w-prose",
  cardsListClassName:
    "mt-8 grid list-none grid-cols-1 gap-6 p-0",
} as const;

/** Homepage technology stack: same rhythm as projects; cards reuse projects grid classes. */
export const homepageTechnologyStackSectionPolicy = {
  sectionClassName: "mt-16 border-t border-borderDefault pt-12 sm:mt-20 sm:pt-16",
  technologyItemListClassName: "mt-3 list-none space-y-2 p-0",
  technologyItemRowClassName: "flex items-start gap-2.5",
  technologyItemIconClassName:
    "mt-0.5 h-4 w-4 shrink-0 text-textSecondary",
} as const;

/** Homepage experience focus areas: icon-led tiles in the projects grid rhythm. */
export const homepageExperienceSectionPolicy = {
  sectionClassName: "mt-16 border-t border-borderDefault pt-12 sm:mt-20 sm:pt-16",
  focusAreaCardsListClassName:
    "mt-8 grid list-none grid-cols-1 gap-6 p-0",
  focusAreaTileRowClassName: "flex gap-3 sm:gap-4",
  focusAreaTileIconClassName: "mt-0.5 h-5 w-5 shrink-0 text-textSecondary",
  focusAreaTileTextStackClassName: "min-w-0 space-y-1.5",
} as const;

/** Homepage contact: channel list under mesh shell (matches stack section rhythm). */
export const homepageContactSectionPolicy = {
  sectionClassName: "mt-16 border-t border-borderDefault pt-12 sm:mt-20 sm:pt-16",
  channelListClassName: "mt-6 list-none space-y-4 p-0 sm:mt-8",
  channelRowClassName: "flex items-start gap-3 sm:gap-4",
  channelIconClassName: "mt-0.5 h-5 w-5 shrink-0 text-textSecondary",
  channelLabelClassName: "w-28 shrink-0 text-sm font-medium text-textPrimary sm:w-32",
  channelValueClassName: "min-w-0 flex-1 text-sm text-textSecondary",
} as const;

/** Primary nav in `SiteHeader`: touch-friendly targets; `NavigationLabel` owns type; anchor owns color + focus ring. */
export const siteHeaderNavigationPolicy = {
  /** Left-aligned under the brand on phones, centered from `sm`. On phones the first link drops its left padding (the `px-2` in `button3DPolicy.variantClassName.nav`) so its label lines up with the brand; a negative list margin would align it too, but push its focus ring past the 8px phone gutter. */
  navigationListClassName:
    "flex w-full flex-wrap items-center justify-start gap-x-4 gap-y-1 max-sm:[&>li:first-child>a]:pl-0 sm:justify-center sm:gap-x-8",
  /** On phones `phoneCallToActionPillClassName` shows this link beside the brand instead, so it is exposed once at every width. */
  phoneHiddenCallToActionListItemClassName: "max-sm:hidden",
  phoneCallToActionPillClassName:
    "inline-flex h-11 items-center rounded-full border border-borderDefault px-3.5 text-textPrimary transition-colors hover:border-accentPrimary hover:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage sm:hidden",
} as const;

/**
 * Sticky top bar for `SiteHeader`.
 * Keep vertical footprint aligned with `homepageAnchoredSectionScrollMarginPolicy` when changing padding, type scale or row layout.
 */
export const siteHeaderChromePolicy = {
  headerShellClassName:
    "sticky top-0 z-10 border-b border-borderDefault bg-backgroundPage/95",
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
  articleShellColumnClassName: "case-study-reading mx-auto flex flex-col",
  /** Air between the elevated header card and the first prose section. */
  caseStudyHeaderBlockBottomMarginClassName: "mb-12 sm:mb-16",
  /** Tighter stack between “Engagement overview”, “Product surfaces”, etc. */
  caseStudyBodySectionsVerticalStackClassName: "flex flex-col gap-10 sm:gap-12",
  caseStudyHeaderCardClassName: "space-y-4 mb-6",
} as const;

/** Product chapters: plain stacked text, hairline between chapters. */
export const caseStudyProductChapterPolicy = {
  shellFlexClassName:
    "border-t border-borderDefault pt-10 first:border-t-0 first:pt-0",
  /** Heading row: title + segment chip; bottom padding before first ruled block. */
  chapterTitleRowClassName:
    "flex flex-col gap-2 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3",
  /** Link / illustration / impact blocks that sit below a horizontal rule. */
  productChapterBorderedSectionTopCPlassName:
    "pt-5",
  /** Primary external link + optional `availabilityCaption` stack under the chapter title. */
  productPageLinkAvailabilityStackClassName: "space-y-2",
  /** Body + impact bullets when a rule sits above (no Impact KPI strip, or flush spacing handled separately). */
  productChapterBodyStackWhenTopRuleClassName: "pt-6 prose-rhythm",
  /** Body after Impact KPI strip: no extra rule; tighter top padding. */
  productChapterBodyStackWhenAfterImpactClassName: "pt-4 prose-rhythm",
  /** Optional h4-led blocks (Overview / Problem / My role) above technical paragraphs. */
  productChapterIntroductionOuterStackClassName: "space-y-6",
  productChapterIntroductionSectionBlockClassName: "space-y-2",
  productChapterIntroductionHeadingClassName: "block min-w-0 font-sans text-xs font-medium uppercase leading-none tracking-[0.12em] text-textSecondary",
  /** Skills block at chapter foot. */
  productChapterSkillsSectionClassName: "pt-6",
  /** Section wrapper — chrome lives on `impactSnapshotPanelFrameClassName`. */
  impactSnapshotPanelClassName: "min-w-0",
  impactSnapshotPanelFrameClassName: "space-y-3",
  impactSnapshotHeadingClassName: "block min-w-0 font-sans text-xs font-medium uppercase leading-none tracking-[0.12em] text-textSecondary",
  impactSnapshotMetricsGridClassName:
    "grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6",
  impactSnapshotMetricCellClassName:
    "min-w-0 space-y-1.5",
  impactSnapshotMetricLabelClassName:
    "block min-w-0 truncate text-xs leading-none text-textSecondary",
  impactSnapshotMetricValueClassName:
    "font-medium tabular-nums text-textPrimary",
  /** Full-width figure inside prose column; matches chapter card chrome. */
  chapterIllustrationFigureClassName:
    "mt-4 overflow-hidden rounded-md border border-borderDefault",
  chapterIllustrationImageClassName:
    "h-auto w-full object-cover object-top",
  /** Responsive hint for chapter screenshots (max ~65ch prose width). */
  chapterIllustrationImageSizes: "(max-width: 640px) 100vw, 42rem",
} as const;

export const contentCardPolicy = {
  containerBaseClassName:
    "block min-w-0 border-t border-borderDefault pt-5",
  linkInteractiveClassName:
    "transition-colors hover:border-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
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
  canvasVariants: [] as ReadonlyArray<Button3DVariant>,
  variantClassName: {
    primary:
      "relative inline-flex min-h-11 items-center justify-center rounded-full border border-textPrimary px-6 py-2.5 text-sm font-medium text-textPrimary transition-colors hover:border-accentPrimary hover:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
    card:
      "relative block min-w-0 border-t border-borderDefault pt-5 transition-colors hover:border-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
    nav:
      "relative inline-flex min-h-11 items-center rounded-sm px-2 text-textSecondary transition-colors hover:text-accentPrimary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage sm:min-h-0 sm:px-1",
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
    "mt-8 grid list-none grid-cols-1 gap-12 p-0",
  tileLinkClassName: "h-full",
  tileFigureClassName:
    "m-0 overflow-hidden rounded-md border border-borderDefault bg-backgroundPage",
  tileCodePreviewPanelClassName:
    "flex aspect-[8/5] w-full items-stretch bg-surfaceMuted p-4 sm:p-5",
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
    "rounded-full bg-surfaceMuted px-2.5 py-0.5 text-xs text-textSecondary",
  /** Must match `WORK_SCREENSHOT_WIDTH_PX` in `scripts/optimize-work-screenshots.mjs`. */
  selectedWorkTileImageWidthPx: 1200,
} as const;

/** Homepage production-proof strip: four KPI tiles in the shared section rhythm. */
export const homepageProductionProofSectionPolicy = {
  sectionClassName: "mt-16 border-t border-borderDefault pt-12 sm:mt-20 sm:pt-16",
  metricCardsListClassName:
    "mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2",
  metricTileStackClassName: "min-w-0 space-y-2",
  metricLabelClassName: "block min-w-0 font-sans text-xs font-medium uppercase leading-none tracking-[0.12em] text-textSecondary",
  /**
   * Sits on top of `BodyText size="lg"` (`text-lg`). Only the `sm:` variant sets a size, so there
   * is no same-variant font-size collision with the primitive's own class.
   */
  metricValueClassName:
    "font-medium tabular-nums text-textPrimary sm:text-2xl",
} as const;

/** Pulseboard case study (`/work/pulseboard`): header link row, architecture lanes, fact cards, usage bars. */
export const pulseboardCaseStudyPagePolicy = {
  backLinkClassName: "inline-flex items-center gap-1.5 text-sm",
  backLinkIconClassName: "h-4 w-4 shrink-0",
  kickerAndTitleStackClassName: "space-y-2",
  kickerRowClassName: "block min-w-0 font-sans text-xs font-medium uppercase leading-none tracking-[0.12em] text-textSecondary",
  headerLinkListClassName: "flex list-none flex-wrap items-center gap-2 p-0",
  /** Neither `primary` nor `pillLink` sets a gap, so icon spacing is added here. */
  headerLinkButtonClassName: "gap-2",
  headerLinkIconClassName: "h-4 w-4 shrink-0",
  heroFigureClassName: "m-0 space-y-2",
  heroPictureFrameClassName:
    "block overflow-hidden rounded-md border border-borderDefault",
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
      surfaceClassName: "border-borderDefault bg-surfaceMuted",
      iconClassName: "text-textSecondary",
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
    "min-w-0 border-t border-borderDefault pt-3",
  factCardTitleRowClassName: "flex items-center gap-2 text-sm font-semibold text-textPrimary",
  factCardIconClassName: "h-[18px] w-[18px] shrink-0 text-accentPrimary",
  factCardDescriptionClassName: "mt-1 text-sm text-textSecondary",
  designRuleGridClassName: "grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2",
  testTierGridClassName: "grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4",
  performanceCardsStackClassName: "space-y-4",
  performanceCardClassName:
    "space-y-3 border-t border-borderDefault pt-5",
  performanceCardTitleRowClassName: "flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1",
  statGridClassName: "m-0 grid grid-cols-2 gap-3",
  statBoxClassName: "min-w-0",
  statLabelClassName: "text-xs text-textSecondary",
  statValueClassName: "m-0 text-xl font-semibold tabular-nums text-textPrimary",
  usageBarListClassName: "list-none space-y-3 p-0",
  usageBarGridClassName:
    "grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1.5 text-sm",
  usageBarLabelClassName: "min-w-0 text-textPrimary",
  usageBarSummaryClassName: "tabular-nums text-textSecondary",
  usageBarTrackClassName: "col-span-2 block h-2 overflow-hidden rounded-full bg-borderDefault/70",
  usageBarFillBaseClassName: "block h-full rounded-full",
  frameUsageFillClassName: "bg-textSecondary",
  bundleUsageFillClassName: "bg-accentPrimary",
  highlightedChipClassName:
    "rounded-full bg-surfaceMuted px-2.5 py-0.5 text-xs font-medium text-textPrimary",
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
    "relative block overflow-hidden rounded-md border border-borderDefault",
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
