import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";

export type NavigationLink = Readonly<{
  label: string;
  href: string;
}>;

const primaryHomepageNavigationHref = {
  home: `/#${homepageSectionAnchorConfiguration.homeSectionDomId}`,
  work: `/#${homepageSectionAnchorConfiguration.selectedWorkSectionDomId}`,
  projects: `/#${homepageSectionAnchorConfiguration.projectsSectionDomId}`,
  contact: `/#${homepageSectionAnchorConfiguration.contactSectionDomId}`,
} as const;

export const siteIdentityConfiguration = {
  siteName: "Ashwani Arya",
  /**
   * Homepage `<title>`. Deliberately longer than `siteName`: three other engineers
   * named Ashwani Arya outrank this site, so the title has to carry the role and
   * stack terms that separate them.
   */
  homepageTitle: "Ashwani Arya — Design Engineer, React & Three.js",
  siteDescription:
    "Design engineer portfolio: live product UI, motion and 3D work, dashboards, and agent interfaces by Ashwani Arya.",
  homepageDescription:
    "Design engineer and three-time founding engineer. I ship polished product UI in React, Next.js, Tailwind and Three.js — live video at 100K sessions a day, design systems, and AI product interfaces. Remote from Bangalore.",
  ownerName: "Ashwani Arya",
  ownerJobTitle: "Design Engineer",
  ownerLocality: "Bangalore",
  ownerCountry: "India",
  socialProfileUrls: [
    "https://github.com/ashwaniarya",
    "https://www.linkedin.com/in/ashwani-arya-1623963a0/",
    "https://syncoderslabs.com",
  ],
  expertiseAreas: [
    "Design engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Three.js",
    "GSAP",
    "Tailwind CSS",
    "WebGL",
    "Design systems",
  ],
} as const;

export const navigationConfiguration = {
  navigationLinks: [
    { label: "Home", href: primaryHomepageNavigationHref.home },
    { label: "Work", href: primaryHomepageNavigationHref.work },
    { label: "Case studies", href: primaryHomepageNavigationHref.projects },
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
    "Ashwani Arya, design engineer and product engineer: polished product UI, motion and 3D, dashboards, and agent interfaces, shipped end to end.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;


