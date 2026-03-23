import Link from "next/link";

import {
  layoutConfiguration,
  navigationConfiguration,
  siteIdentityConfiguration,
} from "@/app/config/siteConfiguration";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10 bg-backgroundPage">
      <div
        className={[
          "mx-auto flex w-full items-center justify-between",
          layoutConfiguration.maximumPageWidthClassName,
          layoutConfiguration.pageHorizontalPaddingClassName,
          layoutConfiguration.headerVerticalPaddingClassName,
        ].join(" ")}
      >
        {/* <Link
          href="/"
          className="text-base font-semibold tracking-tight text-textPrimary"
        >
          {siteIdentityConfiguration.siteName}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-4">
            {navigationConfiguration.navigationLinks.map((navigationLink) => (
              <li key={navigationLink.href}>
                <Link
                  href={navigationLink.href}
                  className="text-sm font-medium text-textPrimary/80 hover:text-accentPrimary"
                >
                  {navigationLink.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav> */}
      </div>
    </header>
  );
}


