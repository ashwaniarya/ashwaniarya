import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration } from "@/app/config/siteConfiguration";

describe("navigationConfiguration primary links", () => {
  it("exposes three homepage hash targets aligned with homepageSectionAnchorConfiguration", () => {
    const { homeSectionDomId, projectsSectionDomId, contactSectionDomId } =
      homepageSectionAnchorConfiguration;

    expect(navigationConfiguration.navigationLinks).toEqual([
      { label: "Home", href: `/#${homeSectionDomId}` },
      { label: "Projects", href: `/#${projectsSectionDomId}` },
      { label: "Contact", href: `/#${contactSectionDomId}` },
    ]);
  });
});
