import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration } from "@/app/config/siteConfiguration";

describe("navigationConfiguration primary links", () => {
  it("exposes four homepage hash targets aligned with homepageSectionAnchorConfiguration", () => {
    const { homeSectionDomId, selectedWorkSectionDomId, projectsSectionDomId, contactSectionDomId } =
      homepageSectionAnchorConfiguration;

    expect(navigationConfiguration.navigationLinks).toEqual([
      { label: "Home", href: `/#${homeSectionDomId}` },
      { label: "Work", href: `/#${selectedWorkSectionDomId}` },
      { label: "Case studies", href: `/#${projectsSectionDomId}` },
      { label: "Contact", href: `/#${contactSectionDomId}` },
    ]);
  });
});
