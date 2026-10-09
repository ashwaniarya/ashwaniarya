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
  homepageTitle: "Ashwani Arya — Contract Founding Engineer",
  siteDescription:
    "Independent contract engineer portfolio: fractional and contract founding-engineer builds for EU startups. Live video at scale, AI copilot, dashboards, and full-stack SaaS by Ashwani Arya.",
  homepageDescription:
    "Independent contract engineer and four-time founding engineer. Live video at ~100k sessions a day, getbujo $0 → $150K ARR, an AI copilot at ~30k conversations a month. React, Next.js, Node, FastAPI, Postgres, Stripe, and AWS. Remote from Bangalore.",
  ownerName: "Ashwani Arya",
  ownerJobTitle: "Independent Contract Engineer",
  ownerLocality: "Bangalore",
  ownerCountry: "India",
  socialProfileUrls: [
    "https://github.com/ashwaniarya",
    "https://syncoderslabs.com",
  ],
  expertiseAreas: [
    "Contract product engineering",
    "Fractional founding engineer",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Stripe",
    "AWS",
    "WebSockets",
    "REST API design",
    "MCP",
    "Claude Code",
    "Three.js",
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
    "Ashwani Arya, independent contract engineer: fractional and contract founding-engineer builds for EU startups. Remote contract at AIClicks since Apr 2026.",
} as const;

export const siteConfiguration = {
  ...siteIdentityConfiguration,
  ...navigationConfiguration,
  layoutConfiguration,
  searchConfiguration,
  footerConfiguration,
} as const;
