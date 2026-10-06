import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration } from "@/app/config/siteConfiguration";

import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders primary nav links in order with section hash hrefs", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain("aria-label=\"Primary\"");
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.homeSectionDomId}"`,
    );
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.selectedWorkSectionDomId}"`,
    );
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.projectsSectionDomId}"`,
    );
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.contactSectionDomId}"`,
    );

    const [homeIndex, workIndex, caseStudiesIndex, contactIndex] =
      navigationConfiguration.navigationLinks.map((navigationLink) =>
        html.indexOf(navigationLink.label),
      );
    expect(homeIndex).toBeGreaterThan(-1);
    expect(homeIndex).toBeLessThan(workIndex);
    expect(workIndex).toBeLessThan(caseStudiesIndex);
    expect(caseStudiesIndex).toBeLessThan(contactIndex);
  });

  it("keeps the primary nav list a centered wrapping row at every breakpoint, never a fixed-column grid", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListClassTokens = /<ul class="([^"]*)"/.exec(html)?.[1].split(" ") ?? [];

    expect(navigationListClassTokens).toEqual(
      expect.arrayContaining(["flex", "flex-wrap", "justify-center"]),
    );
    expect(navigationListClassTokens.filter((classToken) => /(^|:)grid/.test(classToken))).toEqual(
      [],
    );
  });

  it("renders one identical list item per primary nav link, so no link is placed by its position", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListItemOpeningTags = html.match(/<li(?:\s[^>]*)?>/g) ?? [];

    expect(navigationListItemOpeningTags).toHaveLength(
      navigationConfiguration.navigationLinks.length,
    );
    expect(new Set(navigationListItemOpeningTags).size).toBe(1);
  });
});
