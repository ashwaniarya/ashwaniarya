import { describe, expect, it } from "vitest";

import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

describe("siteIdentityConfiguration positioning", () => {
  it("presents the owner as a product engineer in JSON-LD and the share card", () => {
    expect(siteIdentityConfiguration.ownerJobTitle).toBe("Product Engineer");
  });

  it("carries the backend and infrastructure terms in knowsAbout", () => {
    for (const expertiseArea of ["Node.js", "FastAPI", "PostgreSQL", "AWS"]) {
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

  it("opens the hero with the full-stack product engineer line", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toMatch(
      /^Product engineer, full-stack\./,
    );
  });

  it("names the current aiclicks engagement in the hero", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[1]).toMatch(/aiclicks/i);
  });
});
