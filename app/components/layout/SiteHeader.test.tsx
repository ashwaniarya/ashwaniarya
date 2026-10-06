import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration, siteIdentityConfiguration } from "@/app/config/siteConfiguration";

import { SiteHeader } from "./SiteHeader";

const contactHref = `/#${homepageSectionAnchorConfiguration.contactSectionDomId}`;

function findRenderedElements(html: string, tagName: string) {
  const elementPattern = new RegExp(`(<${tagName}(?:\\s[^>]*)?>)([\\s\\S]*?)</${tagName}>`, "g");
  return [...html.matchAll(elementPattern)].map(([, openingTag, innerHtml]) => ({
    openingTag,
    innerHtml,
  }));
}

function readClassTokens(openingTag: string): string[] {
  return /\sclass="([^"]*)"/.exec(openingTag)?.[1].split(" ") ?? [];
}

describe("SiteHeader", () => {
  it("renders primary nav links in order with section hash hrefs", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const primaryNavigationHtml = html.slice(html.indexOf("<nav"), html.indexOf("</nav>"));

    expect(primaryNavigationHtml).toContain("aria-label=\"Primary\"");
    expect(primaryNavigationHtml).toContain(
      `href="/#${homepageSectionAnchorConfiguration.homeSectionDomId}"`,
    );
    expect(primaryNavigationHtml).toContain(
      `href="/#${homepageSectionAnchorConfiguration.selectedWorkSectionDomId}"`,
    );
    expect(primaryNavigationHtml).toContain(
      `href="/#${homepageSectionAnchorConfiguration.projectsSectionDomId}"`,
    );
    expect(primaryNavigationHtml).toContain(`href="${contactHref}"`);

    const [homeIndex, workIndex, caseStudiesIndex, contactIndex] =
      navigationConfiguration.navigationLinks.map((navigationLink) =>
        primaryNavigationHtml.indexOf(navigationLink.label),
      );
    expect(homeIndex).toBeGreaterThan(-1);
    expect(homeIndex).toBeLessThan(workIndex);
    expect(workIndex).toBeLessThan(caseStudiesIndex);
    expect(caseStudiesIndex).toBeLessThan(contactIndex);
  });

  it("lines the brand and the Contact pill up on one row on phones, then stacks the brand over the nav from sm", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const headerInnerRowClassTokens = readClassTokens(/<header[^>]*>(<div\s[^>]*>)/.exec(html)?.[1] ?? "");

    expect(headerInnerRowClassTokens).toEqual(
      expect.arrayContaining(["flex", "flex-wrap", "justify-between", "sm:flex-col"]),
    );
    expect(headerInnerRowClassTokens).not.toContain("flex-col");
  });

  it("puts Contact in a pill beside the brand on phones, ahead of the primary nav, and drops the pill from sm", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const anchorsBeforePrimaryNavigation = findRenderedElements(
      html.slice(0, html.indexOf("<nav")),
      "a",
    );

    expect(anchorsBeforePrimaryNavigation).toHaveLength(2);
    const [brandAnchor, contactPillAnchor] = anchorsBeforePrimaryNavigation;
    expect(brandAnchor.innerHtml).toContain(siteIdentityConfiguration.siteName);
    expect(contactPillAnchor.openingTag).toContain(`href="${contactHref}"`);
    expect(contactPillAnchor.innerHtml).toContain(">Contact<");
    expect(readClassTokens(contactPillAnchor.openingTag)).toContain("sm:hidden");
  });

  it("lays the primary nav list out as a wrapping row, start-aligned on phones and centred from sm, never a fixed-column grid", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListClassTokens = readClassTokens(/<ul\s[^>]*>/.exec(html)?.[0] ?? "");

    expect(navigationListClassTokens).toEqual(
      expect.arrayContaining(["flex", "flex-wrap", "justify-start", "sm:justify-center"]),
    );
    expect(navigationListClassTokens).not.toContain("justify-center");
    expect(navigationListClassTokens.filter((classToken) => /(^|:)grid/.test(classToken))).toEqual(
      [],
    );
  });

  it("hides Contact's nav item on phones, where the pill replaces it, and renders every other item identically", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListItems = findRenderedElements(html, "li");
    const contactListItem = navigationListItems.find((listItem) =>
      listItem.innerHtml.includes(`href="${contactHref}"`),
    );
    const otherListItemOpeningTags = navigationListItems
      .filter((listItem) => listItem !== contactListItem)
      .map((listItem) => listItem.openingTag);

    expect(navigationListItems).toHaveLength(navigationConfiguration.navigationLinks.length);
    expect(readClassTokens(contactListItem?.openingTag ?? "")).toContain("max-sm:hidden");
    expect(new Set(otherListItemOpeningTags).size).toBe(1);
    expect(readClassTokens(otherListItemOpeningTags[0])).not.toContain("max-sm:hidden");
  });
});
