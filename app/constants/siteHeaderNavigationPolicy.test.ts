import { describe, expect, it } from "vitest";

import { siteHeaderNavigationPolicy } from "@/app/constants/policy";

describe("siteHeaderNavigationPolicy", () => {
  it("uses tighter horizontal gaps below sm and wider gaps from sm", () => {
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain("gap-x-3");
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain("sm:gap-x-8");
  });

  it("reserves touch-friendly minimum height on small screens for nav anchors", () => {
    expect(siteHeaderNavigationPolicy.navigationLinkClassName).toContain("min-h-11");
    expect(siteHeaderNavigationPolicy.navigationLinkClassName).toContain("sm:min-h-0");
  });
});
