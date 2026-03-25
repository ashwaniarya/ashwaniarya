import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";

export type NavigationLink = Readonly<{
  label: string;
  href: string;
}>;

const primaryHomepageNavigationHref = {
  home: `/#${homepageSectionAnchorConfiguration.homeSectionDomId}`,
  projects: `/#${homepageSectionAnchorConfiguration.projectsSectionDomId}`,
  contact: `/#${homepageSectionAnchorConfiguration.contactSectionDomId}`,
} as const;

export const siteIdentityConfiguration = {
  siteName: "Ashwani Arya",
  siteDescription:
    "A small, fast personal site with selected work, product experiments, and engineering notes.",
  ownerName: "Ashwani Arya",
} as const;

export const navigationConfiguration = {
  navigationLinks: [
    { label: "Home", href: primaryHomepageNavigationHref.home },
    { label: "Projects", href: primaryHomepageNavigationHref.projects },
    { label: "Contact", href: primaryHomepageNavigationHref.contact },
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
    "Ashwani Arya, a project engineer with high agency and commitment.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;


