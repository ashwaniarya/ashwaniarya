import { describe, expect, it } from "vitest";

import { siteHeaderNavigationPolicy } from "@/app/constants/policy";

describe("siteHeaderNavigationPolicy", () => {
  it("uses wider horizontal gaps between nav links than the previous gap-4 default", () => {
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain("gap-x-6");
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain("sm:gap-x-8");
  });

  it("reserves touch-friendly minimum height on small screens for nav anchors", () => {
    expect(siteHeaderNavigationPolicy.navigationLinkClassName).toContain("min-h-11");
    expect(siteHeaderNavigationPolicy.navigationLinkClassName).toContain("sm:min-h-0");
  });
});
