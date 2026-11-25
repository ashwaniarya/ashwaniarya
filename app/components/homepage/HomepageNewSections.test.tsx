import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HomepageAboutMeSection } from "@/app/components/homepage/HomepageAboutMeSection";
import { HomepageExperienceSection } from "@/app/components/homepage/HomepageExperienceSection";
import { HomepageSelectedWorkSection } from "@/app/components/homepage/HomepageSelectedWorkSection";
import { HomepageTechnologyStackSection } from "@/app/components/homepage/HomepageTechnologyStackSection";
import { homepageAboutMeCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageWorkHistoryConfiguration } from "@/app/config/homepageWorkHistoryConfiguration";
import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";

describe("HomepageAboutMeSection", () => {
  const markup = renderToStaticMarkup(<HomepageAboutMeSection />);

  it("renders under the about anchor with every paragraph", () => {
    expect(markup).toContain('id="about"');
    for (const paragraph of homepageAboutMeCopyConfiguration.paragraphs) {
      expect(markup).toContain(paragraph.replace("'", "&#x27;"));
    }
  });
});

describe("HomepageExperienceSection", () => {
  const markup = renderToStaticMarkup(<HomepageExperienceSection />);

  it("renders one timeline entry per role plus education", () => {
    for (const role of homepageWorkHistoryConfiguration) {
      expect(markup).toContain(role.dateRange);
    }
    expect(markup).toContain("JSS Academy of Technical Education");
  });
});

describe("HomepageSelectedWorkSection", () => {
  const markup = renderToStaticMarkup(<HomepageSelectedWorkSection />);

  it("wraps the cards in a focusable, labelled scroll-snap region with prev/next buttons", () => {
    expect(markup).toContain('role="region"');
    expect(markup).toContain('tabindex="0"');
    const scrollerTag = markup.match(/<div[^>]*data-test="selected-work-scroller"[^>]*>/)?.[0] ?? "";
    expect(scrollerTag).toContain("snap-x");
    expect(scrollerTag).toContain("snap-mandatory");
    const listTag = markup.match(/<ul class="[^"]*"/)?.[0] ?? "";
    expect(listTag).toContain(homepageSelectedWorkSectionPolicy.tilesListClassName);
    expect(listTag).not.toContain("snap-");
    expect(markup).toContain('aria-label="Next project"');
    const regionId = scrollerTag.match(/id="([^"]+)"/)?.[1];
    expect(regionId).toBeTruthy();
    expect(markup.match(new RegExp(`aria-controls="${regionId}"`, "g"))).toHaveLength(2);
    expect(markup).toMatch(/aria-label="Previous project"[^>]*disabled=""|disabled=""[^>]*aria-label="Previous project"/);
  });
});

describe("HomepageTechnologyStackSection", () => {
  const markup = renderToStaticMarkup(<HomepageTechnologyStackSection />);

  it("shows the three tiers and drops visx and OIDC", () => {
    for (const tier of ["Primary", "Secondary", "Tertiary"]) {
      expect(markup).toContain(`>${tier}<`);
    }
    expect(markup).not.toMatch(/visx|OIDC/);
  });
});
