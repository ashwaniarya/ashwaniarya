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

  it("opens the hero with the approved product engineer line", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toBe(
      "Product engineer in Bengaluru, 7+ years. I build products end to end: UI, backend, AI and payments.",
    );
  });

  it("keeps the hero to two lines: positioning, then stack and open-to-work", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines).toHaveLength(2);
    expect(homepageHeroCopyConfiguration.descriptionLines[1]).toMatch(/Next\.js/);
    expect(homepageHeroCopyConfiguration.descriptionLines[1]).toMatch(/Open to remote or Bengaluru/);
  });

  it("never presents AIClicks as a current engagement or repeats retired claims", () => {
    const publicCopy = [
      ...homepageHeroCopyConfiguration.descriptionLines,
      siteIdentityConfiguration.homepageTitle,
      siteIdentityConfiguration.siteDescription,
      siteIdentityConfiguration.homepageDescription,
      footerConfiguration.footerCopyrightAttributionLine,
    ].join(" ");
    expect(publicCopy).not.toMatch(/since Apr 2026/i);
    expect(publicCopy).not.toMatch(/YC P26/);
    expect(publicCopy).not.toMatch(/100k\/day|100k sessions a day/i);
    expect(publicCopy).not.toMatch(/150K ARR/i);
    expect(publicCopy).not.toMatch(/30k conversations|20k MRR/i);
    expect(publicCopy).not.toContain("\u2014");
  });
});
