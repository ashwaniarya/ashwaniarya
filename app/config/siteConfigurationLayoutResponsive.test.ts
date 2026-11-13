import { describe, expect, it } from "vitest";

import { meshEditorialSurfacePolicy } from "@/app/constants/policy";

import { layoutConfiguration } from "./siteConfiguration";

describe("layout responsive padding (narrowPhoneUp tier)", () => {
  it("page shell uses three-tier horizontal and vertical padding", () => {
    expect(layoutConfiguration.pageHorizontalPaddingClassName).toContain("narrowPhoneUp:px-5");
    expect(layoutConfiguration.pageHorizontalPaddingClassName).toContain("sm:px-8");
    expect(layoutConfiguration.pageVerticalPaddingClassName).toContain("narrowPhoneUp:py-8");
    expect(layoutConfiguration.pageVerticalPaddingClassName).toContain("sm:py-10");
  });

  it("mesh editorial surfaces use narrowPhoneUp with sm for hero, projects, and case study", () => {
    expect(meshEditorialSurfacePolicy.homepageHeroPaddingClassName).toContain("narrowPhoneUp:");
    expect(meshEditorialSurfacePolicy.homepageProjectsPaddingClassName).toContain("narrowPhoneUp:");
    expect(meshEditorialSurfacePolicy.caseStudyPaddingClassName).toContain("narrowPhoneUp:");
    for (const className of [
      meshEditorialSurfacePolicy.homepageHeroPaddingClassName,
      meshEditorialSurfacePolicy.homepageProjectsPaddingClassName,
      meshEditorialSurfacePolicy.caseStudyPaddingClassName,
    ]) {
      expect(className).toContain("sm:px-8");
    }
  });
});
