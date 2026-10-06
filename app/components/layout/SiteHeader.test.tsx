import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration, siteIdentityConfiguration } from "@/app/config/siteConfiguration";

import { SiteHeader } from "./SiteHeader";

const contactHref = `/#${homepageSectionAnchorConfiguration.contactSectionDomId}`;

const escapedHtmlCharacters: Record<string, string> = {
  "&amp;": "&",
  "&gt;": ">",
  "&lt;": "<",
  "&quot;": "\"",
  "&#x27;": "'",
};

const displayClassTokenPattern =
  /^(?:.+:)?(?:hidden|block|inline|inline-block|inline-flex|flex|inline-grid|grid|contents|flow-root|table)$/;

function findRenderedElements(html: string, tagName: string) {
  const elementPattern = new RegExp(`(<${tagName}(?:\\s[^>]*)?>)([\\s\\S]*?)</${tagName}>`, "g");
  return [...html.matchAll(elementPattern)].map(([, openingTag, innerHtml]) => ({
    openingTag,
    innerHtml,
  }));
}

function readClassTokens(openingTag: string): string[] {
  const escapedClassAttribute = /\sclass="([^"]*)"/.exec(openingTag)?.[1];
  if (escapedClassAttribute === undefined) return [];
  return escapedClassAttribute
    .replace(/&(?:amp|gt|lt|quot|#x27);/g, (escapedCharacter) => escapedHtmlCharacters[escapedCharacter])
    .split(" ");
}

function readDisplayClassTokens(openingTag: string): string[] {
  return readClassTokens(openingTag)
    .filter((classToken) => displayClassTokenPattern.test(classToken))
    .sort();
}

function readPrimaryNavigationHtml(html: string): string {
  return html.slice(html.indexOf("<nav"), html.indexOf("</nav>"));
}

describe("SiteHeader", () => {
  it("renders primary nav links in order with section hash hrefs", () => {
    const primaryNavigationHtml = readPrimaryNavigationHtml(renderToStaticMarkup(<SiteHeader />));

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

  it("lays the header out as a wrapping row with centered items on phones and a centered column from sm", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const divOpeningTagsBeforeBrand = [...html.slice(0, html.indexOf("<a")).matchAll(/<div\s[^>]*>/g)];
    const headerInnerRowClassTokens = readClassTokens(divOpeningTagsBeforeBrand.pop()?.[0] ?? "");

    expect(headerInnerRowClassTokens).toEqual(
      expect.arrayContaining(["flex", "flex-wrap", "justify-between", "items-center", "sm:flex-col"]),
    );
    expect(headerInnerRowClassTokens).not.toContain("flex-col");
    expect(headerInnerRowClassTokens.filter((classToken) => /^.+:items-/.test(classToken))).toEqual(
      [],
    );
  });

  it("puts Contact in a pill after the brand and ahead of the primary nav on phones, and hides the pill from sm", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const anchorsBeforePrimaryNavigation = findRenderedElements(
      html.slice(0, html.indexOf("<nav")),
      "a",
    );
    const contactPillAnchor = anchorsBeforePrimaryNavigation.find((anchor) =>
      anchor.openingTag.includes(`href="${contactHref}"`),
    );

    expect(anchorsBeforePrimaryNavigation[0]?.innerHtml).toContain(siteIdentityConfiguration.siteName);
    expect(contactPillAnchor?.innerHtml).toContain(">Contact<");
    expect(readDisplayClassTokens(contactPillAnchor?.openingTag ?? "")).toEqual([
      "inline-flex",
      "sm:hidden",
    ]);
  });

  it("gives the primary nav a full-width row of its own on phones", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(readClassTokens(/<nav\s[^>]*>/.exec(html)?.[0] ?? "")).toContain("w-full");
  });

  it("lays the primary nav list out as a wrapping row, start-aligned on phones and centered from sm, never a fixed-column grid", () => {
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

  it("lines the first nav label up with the brand on phones by dropping its left padding, never by pulling the list into the page gutter", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListClassTokens = readClassTokens(/<ul\s[^>]*>/.exec(html)?.[0] ?? "");

    expect(navigationListClassTokens).toContain("max-sm:[&>li:first-child>a]:pl-0");
    expect(
      navigationListClassTokens.filter((classToken) => /(^|:)-m[lrxse]?-/.test(classToken)),
    ).toEqual([]);
  });

  it("gives every primary nav link a 44px minimum touch height on phones and releases it from sm", () => {
    const primaryNavigationAnchors = findRenderedElements(
      readPrimaryNavigationHtml(renderToStaticMarkup(<SiteHeader />)),
      "a",
    );

    expect(primaryNavigationAnchors).toHaveLength(navigationConfiguration.navigationLinks.length);
    for (const primaryNavigationAnchor of primaryNavigationAnchors) {
      expect(readClassTokens(primaryNavigationAnchor.openingTag)).toEqual(
        expect.arrayContaining(["min-h-11", "sm:min-h-0"]),
      );
    }
  });

  it("hides only Contact's nav item on phones, where the pill replaces it", () => {
    const html = renderToStaticMarkup(<SiteHeader />);
    const navigationListItems = findRenderedElements(html, "li");
    const contactListItem = navigationListItems.find((listItem) =>
      listItem.innerHtml.includes(`href="${contactHref}"`),
    );
    const otherListItems = navigationListItems.filter((listItem) => listItem !== contactListItem);

    expect(navigationListItems).toHaveLength(navigationConfiguration.navigationLinks.length);
    expect(readDisplayClassTokens(contactListItem?.openingTag ?? "")).toEqual(["max-sm:hidden"]);
    for (const otherListItem of otherListItems) {
      expect(readDisplayClassTokens(otherListItem.openingTag)).toEqual([]);
    }
  });
});
