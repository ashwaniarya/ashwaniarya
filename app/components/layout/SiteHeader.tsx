import Link from "next/link";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  editorialGradientTitlePolicy,
  siteHeaderChromePolicy,
  siteHeaderNavigationPolicy,
} from "@/app/constants/policy";
import { NavigationLabel } from "@/design-system/tokens/Typography";
import {
  layoutConfiguration,
  navigationConfiguration,
  siteIdentityConfiguration,
} from "@/app/config/siteConfiguration";

export function SiteHeader() {
  return (
    <header className={siteHeaderChromePolicy.headerShellClassName}>
      <div
        className={[
          "mx-auto w-full",
          layoutConfiguration.maximumPageWidthClassName,
          layoutConfiguration.pageHorizontalPaddingClassName,
          layoutConfiguration.headerVerticalPaddingClassName,
          siteHeaderChromePolicy.headerInnerRowClassName,
        ].join(" ")}
      >
        <Link
          href={`/#${homepageSectionAnchorConfiguration.homeSectionDomId}`}
          className={[
            "min-w-0 shrink-0 text-sm font-semibold tracking-tight sm:text-base",
            editorialGradientTitlePolicy.gradientTextClassName,
          ].join(" ")}
        >
          {siteIdentityConfiguration.siteName}
        </Link>
        <nav aria-label="Primary" className="min-w-0 sm:shrink-0">
          <ul className={siteHeaderNavigationPolicy.navigationListClassName}>
            {navigationConfiguration.navigationLinks.map((navigationLink) => (
              <li key={navigationLink.href}>
                <Link
                  href={navigationLink.href}
                  className={siteHeaderNavigationPolicy.navigationLinkClassName}
                >
                  <NavigationLabel>{navigationLink.label}</NavigationLabel>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}


