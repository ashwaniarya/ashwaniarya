import Link from "next/link";

import { Button3D } from "@/app/components/three/Button3D";
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

const phoneHeaderCallToActionLink = navigationConfiguration.navigationLinks.find(
  (navigationLink) => navigationLink.href === navigationConfiguration.phoneHeaderCallToActionHref,
);

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
        {phoneHeaderCallToActionLink ? (
          <Link
            href={phoneHeaderCallToActionLink.href}
            className={siteHeaderNavigationPolicy.phoneCallToActionPillClassName}
          >
            <NavigationLabel>{phoneHeaderCallToActionLink.label}</NavigationLabel>
          </Link>
        ) : null}
        <nav aria-label="Primary" className="min-w-0 w-full sm:shrink-0">
          <ul className={siteHeaderNavigationPolicy.navigationListClassName}>
            {navigationConfiguration.navigationLinks.map((navigationLink) => (
              <li
                key={navigationLink.href}
                className={
                  navigationLink === phoneHeaderCallToActionLink
                    ? siteHeaderNavigationPolicy.phoneHiddenCallToActionListItemClassName
                    : undefined
                }
              >
                <Button3D variant="nav" href={navigationLink.href}>
                  <NavigationLabel>{navigationLink.label}</NavigationLabel>
                </Button3D>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
