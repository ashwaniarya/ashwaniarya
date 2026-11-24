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

const productionSiteOrigin = "https://ashwaniarya.vercel.app";

export const siteOriginUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || productionSiteOrigin
).replace(/\/$/, "");

export const siteIdentityConfiguration = {
  siteName: "Ashwani Arya",
  /**
   * Homepage `<title>`. Deliberately longer than `siteName`: three other engineers
   * named Ashwani Arya outrank this site, so the title has to carry the role and
   * stack terms that separate them.
   */
  homepageTitle: "Ashwani Arya — Product Engineer",
  siteDescription:
    "Product engineer in Bengaluru with 7+ years. End-to-end UI, backend, AI and payments. React, Next.js, TypeScript, Node.js (NestJS, Express), and Stripe.",
  homepageDescription:
    "Product engineer in Bengaluru with 7+ years. I build products end to end: UI, backend, AI and payments. React, Next.js, TypeScript, Node.js (NestJS, Express), and Stripe. Open to remote or Bengaluru, full-time or contract.",
  ownerName: "Ashwani Arya",
  ownerJobTitle: "Product Engineer",
  ownerLocality: "Bengaluru",
  ownerCountry: "India",
  shareCardSummary:
    "Product engineer in Bengaluru. 7+ years building UI, backend, AI and payments.",
  shareCardLocationLine: "Bengaluru · remote",
  shareCardCapabilityLabels: ["React", "Next.js", "TypeScript", "Node", "Stripe"],
  socialProfileUrls: [
    "https://github.com/ashwaniarya",
    "https://syncoderslabs.com",
  ],
  expertiseAreas: [
    "Product engineering",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "NestJS",
    "Express",
    "Stripe",
    "WebSockets",
    "REST API design",
    "MCP",
    "Embeddings",
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
    "Ashwani Arya, product engineer in Bengaluru. 7+ years. Open to remote or Bengaluru, full-time or contract.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;
