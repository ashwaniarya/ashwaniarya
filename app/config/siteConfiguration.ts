export type NavigationLink = Readonly<{
  label: string;
  href: string;
}>;

export const siteIdentityConfiguration = {
  siteName: "Arya – Personal Website",
  siteDescription:
    "A small, fast personal site with selected work, product experiments, and engineering notes.",
  ownerName: "Arya",
} as const;

export const navigationConfiguration = {
  navigationLinks: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/work/getbujo" },
    { label: "Design System", href: "/design-system" },
  ] satisfies ReadonlyArray<NavigationLink>,
} as const;

export const layoutConfiguration = {
  maximumPageWidthClassName: "max-w-5xl",
  pageHorizontalPaddingClassName: "px-6 sm:px-8",
  pageVerticalPaddingClassName: "py-8 sm:py-10",
  headerVerticalPaddingClassName: "py-4",
  footerVerticalPaddingClassName: "py-6",
} as const;

export const searchConfiguration = {
  minimumQueryLength: 2,
  maximumSearchResults: 10,
} as const;

export const footerConfiguration = {
  /** Shown after the © year in `SiteFooter` (name + short descriptor). */
  footerCopyrightAttributionLine:
    "Ashwani Arya, a cracked engineer with high agency and autonomy.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;


