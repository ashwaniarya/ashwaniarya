import { describe, expect, it } from "vitest";

import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { footerConfiguration, siteIdentityConfiguration } from "@/app/config/siteConfiguration";

describe("siteIdentityConfiguration positioning", () => {
  it("presents the owner as a product engineer in JSON-LD and the share card", () => {
    expect(siteIdentityConfiguration.ownerJobTitle).toBe("Product Engineer");
  });

  it("carries the backend and infrastructure terms in knowsAbout", () => {
    for (const expertiseArea of ["Node.js", "FastAPI", "PostgreSQL", "AWS", "Stripe"]) {
      expect(siteIdentityConfiguration.expertiseAreas).toContain(expertiseArea);
    }
  });

  it("drops the design-engineer framing from title and descriptions", () => {
    for (const copyField of [
      siteIdentityConfiguration.homepageTitle,
      siteIdentityConfiguration.siteDescription,
      siteIdentityConfiguration.homepageDescription,
    ]) {
      expect(copyField).not.toMatch(/design engineer/i);
    }
  });

  it("keeps the homepage title inside the search-result truncation budget", () => {
    expect(siteIdentityConfiguration.homepageTitle.length).toBeLessThanOrEqual(60);
  });

  it("opens the hero with the product engineer and builder line plus the approved positioning line (Ashwani, 2:57 PM IST)", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toBe(
      "Product engineer and builder in Bengaluru, 7+ years. I take ambiguous business problems, ship the first version fast, and iterate to maximise outcomes.",
    );
  });

  it("leads title, descriptions and hero with product engineer and builder, never a generic full stack or frontend title", () => {
    for (const copyField of [
      siteIdentityConfiguration.homepageTitle,
      siteIdentityConfiguration.siteDescription,
      siteIdentityConfiguration.homepageDescription,
      ...homepageHeroCopyConfiguration.descriptionLines,
    ]) {
      expect(copyField).not.toMatch(/full[ -]?stack|frontend engineer/i);
    }
    expect(siteIdentityConfiguration.homepageTitle).toMatch(/Product Engineer and Builder/);
    expect(siteIdentityConfiguration.siteDescription).toMatch(/^Portfolio of Ashwani Arya, product engineer and builder/);
    expect(siteIdentityConfiguration.homepageDescription).toMatch(/^Product engineer and builder/);
  });

  it("keeps the hero to two lines: positioning, then stack and open-to-work", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines).toHaveLength(2);
    expect(homepageHeroCopyConfiguration.descriptionLines[1]).toMatch(/Next\.js/);
    expect(homepageHeroCopyConfiguration.descriptionLines[1]).toMatch(/Open to remote or Bengaluru/);
  });

  it("keeps hero, SEO and footer copy free of em dashes (retired claims: retiredClaimPatterns.test.ts)", () => {
    const publicCopy = [
      ...homepageHeroCopyConfiguration.descriptionLines,
      siteIdentityConfiguration.homepageTitle,
      siteIdentityConfiguration.siteDescription,
      siteIdentityConfiguration.homepageDescription,
      footerConfiguration.footerCopyrightAttributionLine,
    ].join(" ");
    expect(publicCopy).not.toContain("\u2014");
  });
});
