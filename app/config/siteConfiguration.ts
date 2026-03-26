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

/**
 * Page shell padding (with `meshEditorialSurfacePolicy`): per-side sum ≈ 24px / 36px / 64px
 * below narrowPhoneMinWidth / 420–639px / sm+ so ultra-narrow phones are not double-guttered by main+mesh.
 */
export const layoutConfiguration = {
  maximumPageWidthClassName: "max-w-5xl",
  pageHorizontalPaddingClassName: "px-2 narrowPhoneUp:px-5 sm:px-8",
  pageVerticalPaddingClassName: "py-6 narrowPhoneUp:py-8 sm:py-10",
  /** Tighter vertical padding below `sm` so the sticky bar wastes less viewport. */
  headerVerticalPaddingClassName: "py-2 sm:py-4",
  footerVerticalPaddingClassName: "py-6",
} as const;

export const searchConfiguration = {
  minimumQueryLength: 2,
  maximumSearchResults: 10,
} as const;

export const footerConfiguration = {
  /** Shown after the © year in `SiteFooter` (name + short descriptor). */
  footerCopyrightAttributionLine:
    "Ashwani Arya, a product engineer with high agency and commitment.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;


