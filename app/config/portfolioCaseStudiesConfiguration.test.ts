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
    expect(shoppingAssistantChapter?.chapterIllustration).toEqual({
      webpSrc: "/chrome_assistant.webp",
      pngSrc: "/chrome_assistant.png",
      alt: "Bujo AI Shopping Assistant Chrome extension in the browser, showing in-page shopping help.",
      width: 1280,
      height: 800,
    });
  });

  it("exposes at least one case study for static routes", () => {
    expect(getAllCaseStudies().length).toBeGreaterThan(0);
  });

  it("includes product impact snapshots on live video and AI copilot chapters", () => {
    const caseStudy = getCaseStudyBySlug("getbujo");
    expect(caseStudy).toBeDefined();

    const liveVideoChapter = caseStudy?.productChapters.find((chapter) =>
      chapter.heading.toLowerCase().includes("live video"),
    );
    expect(liveVideoChapter?.productPageLink).toEqual({
      url: "https://getwingman.io/",
      label: "Wingman (getwingman.io)",
    });
    expect(liveVideoChapter?.availabilityCaption).toBe(
      "Powered by Bujo — live video and co-browsing embedded in retailers’ SSR storefronts; more at getbujo.com.",
    );
    expect(liveVideoChapter?.productImpactSnapshot).toEqual({
      stageLabel: "YC-backed (Seed)",
      dailyReachLabel: "~100k/day",
      revenueLabel: "$0 → $10,000 MRR",
    });
    expect(liveVideoChapter?.chapterIllustration).toEqual({
      webpSrc: "/get-wingman.webp",
      pngSrc: "/get-wingman.png",
      alt: "Live video call experience embedded in a retailer storefront: rep and shopper connected in-browser during guided selling.",
      width: 3452,
      height: 1708,
    });

    const copilotChapter = caseStudy?.productChapters.find((chapter) =>
      chapter.heading.toLowerCase().includes("copilot"),
    );
    expect(copilotChapter?.productImpactSnapshot).toEqual({
      stageLabel: "YC-backed (Seed)",
      dailyReachLabel: "~80 agents · ~30k conversations/month",
      revenueLabel: "~$20k MRR",
    });
  });
});
