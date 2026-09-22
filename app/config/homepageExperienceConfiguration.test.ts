import { describe, expect, it } from "vitest";

import { resolveExperienceFocusAreaIcon } from "@/app/config/experienceFocusAreaIconRegistry";
import { homepageExperienceFocusAreasConfiguration } from "@/app/config/homepageExperienceConfiguration";

describe("homepageExperienceFocusAreasConfiguration", () => {
  it("leads with production and API depth before frontend craft", () => {
    const leadingFocusAreaKeys = homepageExperienceFocusAreasConfiguration
      .slice(0, 4)
      .map((focusArea) => focusArea.focusAreaKey);

    expect(leadingFocusAreaKeys).toEqual([
      "backendDevelopment",
      "apiAndContractDevelopment",
      "performanceOptimization",
      "dataIntensiveFrontend",
    ]);
  });

  it("keeps all seven focus areas with resolvable icons after the reorder", () => {
    expect(homepageExperienceFocusAreasConfiguration).toHaveLength(7);

    for (const focusArea of homepageExperienceFocusAreasConfiguration) {
      expect(resolveExperienceFocusAreaIcon(focusArea.focusAreaKey)).toBeTypeOf(
        "function",
      );
    }
  });
});
