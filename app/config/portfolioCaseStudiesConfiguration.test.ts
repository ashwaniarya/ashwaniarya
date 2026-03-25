import { describe, expect, it } from "vitest";

import {
  getCaseStudyBySlug,
  getAllCaseStudies,
} from "@/app/config/portfolioCaseStudiesConfiguration";

const chromeWebStoreShoppingAssistantUrl =
  "https://chromewebstore.google.com/detail/bujo-ai-shopping-assistan/hohpkegbedejmdcebpapfafgcdgjjbnn" as const;

describe("portfolioCaseStudiesConfiguration", () => {
  it("includes getbujo case study with AI shopping assistant chapter and Chrome Web Store link", () => {
    const caseStudy = getCaseStudyBySlug("getbujo");
    expect(caseStudy).toBeDefined();

    const shoppingAssistantChapter = caseStudy?.productChapters.find((chapter) =>
      chapter.heading.toLowerCase().includes("shopping assistant"),
    );
    expect(shoppingAssistantChapter).toBeDefined();
    expect(shoppingAssistantChapter?.segmentLabel).toBe("B2C");
    expect(shoppingAssistantChapter?.productPageLink?.url).toBe(
      chromeWebStoreShoppingAssistantUrl,
    );
    expect(shoppingAssistantChapter?.productPageLink?.label.length).toBeGreaterThan(0);
    expect(shoppingAssistantChapter?.availabilityCaption).toBeUndefined();
  });

  it("exposes at least one case study for static routes", () => {
    expect(getAllCaseStudies().length).toBeGreaterThan(0);
  });
});
