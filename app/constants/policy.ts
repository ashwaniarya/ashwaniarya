export const homepageHeroPolicy = {
  heroSectionSpacingClassName: "space-y-6",
  heroImageWrapperClassName:
    "mx-auto flex h-[176px] w-[176px] items-center justify-center rounded-full border border-borderDefault bg-backgroundPage/80 shadow-sm",
  heroImageSizePx: 160,
  heroTextStackSpacingClassName: "space-y-3",
  heroTextAlignmentClassName: "text-center",
  heroTextWrapperClassName: "mx-auto max-w-2xl",
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

export const contentCardPolicy = {
  containerBaseClassName:
    "block min-w-0 rounded-lg border border-borderDefault bg-backgroundPage p-6 shadow-sm",
  linkInteractiveClassName:
    "transition-colors transition-shadow hover:border-accentPrimary/50 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage",
} as const;
