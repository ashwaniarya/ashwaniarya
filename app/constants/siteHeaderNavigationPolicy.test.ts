import { describe, expect, it } from "vitest";

import { siteHeaderNavigationPolicy } from "@/app/constants/policy";

const tailwindSpacingUnitInPixels = 4;

function readSpacingMultiplier(className: string, utilityPrefix: string): number {
  const spacingClassToken = className
    .split(" ")
    .find((classToken) => classToken.startsWith(utilityPrefix));
  return Number(spacingClassToken?.slice(utilityPrefix.length));
}

describe("siteHeaderNavigationPolicy", () => {
  it("uses a tighter horizontal gap between nav links below sm than from sm", () => {
    const phoneGapMultiplier = readSpacingMultiplier(
      siteHeaderNavigationPolicy.navigationListClassName,
      "gap-x-",
    );
    const smallScreenUpGapMultiplier = readSpacingMultiplier(
      siteHeaderNavigationPolicy.navigationListClassName,
      "sm:gap-x-",
    );

    expect(phoneGapMultiplier).toBeGreaterThan(0);
    expect(phoneGapMultiplier).toBeLessThan(smallScreenUpGapMultiplier);
  });

  it("keeps the phone Contact pill at least 24px tall, the WCAG 2.2 AA minimum target size", () => {
    const pillHeightInPixels =
      readSpacingMultiplier(siteHeaderNavigationPolicy.phoneCallToActionPillClassName, "h-") *
      tailwindSpacingUnitInPixels;

    expect(pillHeightInPixels).toBeGreaterThanOrEqual(24);
  });
});
