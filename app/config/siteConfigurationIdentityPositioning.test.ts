import { describe, expect, it } from "vitest";

import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

describe("siteIdentityConfiguration positioning", () => {
  it("presents the owner as a product engineer in JSON-LD and the share card", () => {
    expect(siteIdentityConfiguration.ownerJobTitle).toBe("Product Engineer");
    expect(siteIdentityConfiguration.ownerLocality).toBe("Bengaluru");
  });

  it("carries the approved stack in knowsAbout", () => {
    for (const expertiseArea of ["React", "Next.js", "TypeScript", "Node.js", "NestJS", "Express", "Stripe"]) {
      expect(siteIdentityConfiguration.expertiseAreas).toContain(expertiseArea);
    }
  });

  it("does not list skills the profile does not claim", () => {
    const expertiseText = siteIdentityConfiguration.expertiseAreas.join(" ");
    expect(expertiseText).not.toMatch(/FastAPI|Azure|Salesforce|Nuxt|Figma|Fabric/i);
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

  it("opens the hero with the product engineer line", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toMatch(
      /^Product engineer in Bengaluru, 7\+ years/,
    );
  });

  it("names the ended aiclicks contract in the hero", () => {
    const heroCopy = homepageHeroCopyConfiguration.descriptionLines.join(" ");
    expect(heroCopy).toMatch(/aiclicks/i);
    expect(heroCopy).toMatch(/ended/i);
    expect(heroCopy).not.toMatch(/present/i);
    expect(heroCopy).not.toMatch(/current/i);
  });

  it("states remote or Bengaluru, full-time or contract", () => {
    const heroCopy = homepageHeroCopyConfiguration.descriptionLines.join(" ");
    expect(heroCopy).toMatch(/full-time or contract/i);
    expect(heroCopy).toMatch(/Bengaluru/);
    expect(heroCopy).not.toMatch(/relocation/i);
  });
});
