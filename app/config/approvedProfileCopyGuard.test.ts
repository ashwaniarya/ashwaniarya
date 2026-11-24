import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { homepageContactChannelsConfiguration, homepageContactSectionCopyConfiguration } from "@/app/config/homepageContactConfiguration";
import { homepageExperienceFocusAreasConfiguration, homepageExperienceSectionCopyConfiguration } from "@/app/config/homepageExperienceConfiguration";
import { homepageHeroCopyConfiguration, homepageProjectsSectionCopyConfiguration, homepageTechnologyStackSectionCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageProductionProofMetricsConfiguration, homepageProductionProofSectionCopyConfiguration } from "@/app/config/homepageProductionProofConfiguration";
import { homepageTechnologyStackCategoriesConfiguration } from "@/app/config/homepageTechnologyStackConfiguration";
import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";
import { getAllSelectedWork, homepageSelectedWorkSectionCopyConfiguration } from "@/app/config/portfolioSelectedWorkConfiguration";
import { footerConfiguration, siteIdentityConfiguration } from "@/app/config/siteConfiguration";

const removedClaimPatterns: ReadonlyArray<readonly [string, RegExp]> = [
  ["sessions a day", /sessions a day/i],
  ["sessions/day", /sessions\/day/i],
  ["$150K ARR", /\$150K(?:\s*ARR)?/i],
  ["YC P26", /YC P26/i],
  ["first engineer", /first engineer/i],
  ["5 seconds join", /5 seconds/i],
  ["5s join", /(?<![\d])5s\b/i],
  ["99% scraping", /99%/],
  ["3–4 days", /3[–-]4 days/],
  ["FastAPI", /FastAPI/],
  ["Azure", /\bAzure\b/],
  ["Salesforce", /\bSalesforce\b/],
  ["Fabric", /\bFabric\b/],
  ["Nuxt", /\bNuxt\b/],
  ["Figma", /\bFigma\b/],
  ["Bangalore", /Bangalore/],
  ["founding engineer", /founding engineer/i],
  ["6+ years", /6\+ years/],
];

function publicCopyCorpus(): string {
  const readme = readFileSync(new URL("../../README.md", import.meta.url), "utf8");
  return JSON.stringify({
    siteIdentityConfiguration,
    footerConfiguration,
    homepageHeroCopyConfiguration,
    homepageProjectsSectionCopyConfiguration,
    homepageTechnologyStackSectionCopyConfiguration,
    homepageExperienceSectionCopyConfiguration,
    homepageExperienceFocusAreasConfiguration,
    homepageProductionProofSectionCopyConfiguration,
    homepageProductionProofMetricsConfiguration,
    homepageTechnologyStackCategoriesConfiguration,
    homepageContactSectionCopyConfiguration,
    homepageContactChannelsConfiguration,
    homepageSelectedWorkSectionCopyConfiguration,
    caseStudies: getAllCaseStudies(),
    selectedWork: getAllSelectedWork(),
    readme,
  });
}

describe("approved profile copy guard", () => {
  const corpus = publicCopyCorpus();

  it.each(removedClaimPatterns)("removes %s from public copy", (_label, pattern) => {
    expect(corpus).not.toMatch(pattern);
  });

  it("keeps AIClicks ended, never Present or current", () => {
    const aiclicks = JSON.stringify(getAllCaseStudies().find((caseStudy) => caseStudy.slug === "aiclicks"));
    expect(aiclicks).toMatch(/Nov 2026/);
    expect(aiclicks).toMatch(/ended/i);
    expect(aiclicks).not.toMatch(/Present/);
    expect(aiclicks).not.toMatch(/current/i);
  });

  it("uses Bengaluru and 7+ years in the hero and the meta description", () => {
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toContain("Bengaluru");
    expect(homepageHeroCopyConfiguration.descriptionLines[0]).toContain("7+ years");
    expect(siteIdentityConfiguration.homepageDescription).toContain("Bengaluru");
    expect(siteIdentityConfiguration.homepageDescription).toContain("7+ years");
  });
});
