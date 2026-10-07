import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";

export type NavigationLink = Readonly<{
  label: string;
  href: string;
}>;

export const primaryHomepageNavigationHref = {
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
  homepageTitle: "Ashwani Arya — Product Engineer: React, Node, Three.js",
  siteDescription:
    "Product engineer portfolio: live video at scale, an AI copilot, dashboards and 3D interfaces by Ashwani Arya, built end to end across React, Node, FastAPI, Postgres and AWS.",
  homepageDescription:
    "Product engineer, full-stack, and three-time founding engineer. Live video at ~100k sessions a day, $0 → $10k MRR, an AI copilot at ~30k conversations a month. React, Next.js, Node, FastAPI, Postgres and AWS. Remote from Bangalore.",
  ownerName: "Ashwani Arya",
  ownerJobTitle: "Product Engineer",
  ownerLocality: "Bangalore",
  ownerCountry: "India",
  socialProfileUrls: [
    "https://github.com/ashwaniarya",
    "https://www.linkedin.com/in/ashwani-arya-1623963a0/",
    "https://syncoderslabs.com",
  ],
  expertiseAreas: [
    "Product engineering",
    "Full-stack development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "FastAPI",
    "PostgreSQL",
    "AWS",
    "WebSockets",
    "REST API design",
    "System design",
    "Three.js",
    "WebGL",
    "GSAP",
    "Tailwind CSS",
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
  phoneHeaderCallToActionHref: primaryHomepageNavigationHref.contact,
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
    "Ashwani Arya, product engineer: from prototyping to productionizing to finding and solving problems through the product. Currently at AIclicks, a SaaS analytics platform.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;


