import { describe, expect, it } from "vitest";

import { layoutConfiguration } from "./siteConfiguration";

describe("layout responsive padding (narrowPhoneUp tier)", () => {
  it("page shell uses three-tier horizontal and vertical padding", () => {
    expect(layoutConfiguration.pageHorizontalPaddingClassName).toContain("narrowPhoneUp:px-5");
    expect(layoutConfiguration.pageHorizontalPaddingClassName).toContain("sm:px-8");
    expect(layoutConfiguration.pageVerticalPaddingClassName).toContain("py-10");
    expect(layoutConfiguration.pageVerticalPaddingClassName).toContain("sm:py-16");
  });
});
