import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import { navigationConfiguration } from "@/app/config/siteConfiguration";
import { siteHeaderNavigationPolicy } from "@/app/constants/policy";

import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("renders primary nav links in order with section hash hrefs", () => {
    const html = renderToStaticMarkup(<SiteHeader />);

    expect(html).toContain("aria-label=\"Primary\"");
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.homeSectionDomId}"`,
    );
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.projectsSectionDomId}"`,
    );
    expect(html).toContain(
      `href="/#${homepageSectionAnchorConfiguration.contactSectionDomId}"`,
    );

    const homeIndex = html.indexOf(navigationConfiguration.navigationLinks[0].label);
    const projectsIndex = html.indexOf(navigationConfiguration.navigationLinks[1].label);
    const contactIndex = html.indexOf(navigationConfiguration.navigationLinks[2].label);
    expect(homeIndex).toBeLessThan(projectsIndex);
    expect(projectsIndex).toBeLessThan(contactIndex);
  });

  it("uses symmetric grid nav list and per-slot alignment classes from policy", () => {
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain("sm:grid");
    expect(siteHeaderNavigationPolicy.navigationListClassName).toContain(
      "sm:grid-cols-[1fr_auto_1fr]",
    );
    expect(siteHeaderNavigationPolicy.navigationListItemSlotClassNames).toEqual([
      "sm:justify-self-end",
      "sm:justify-self-center",
      "sm:justify-self-start",
    ]);

    const html = renderToStaticMarkup(<SiteHeader />);
    expect(html).toContain("sm:justify-self-end");
    expect(html).toContain("sm:justify-self-center");
    expect(html).toContain("sm:justify-self-start");
  });
});
