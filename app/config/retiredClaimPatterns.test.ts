import { readFileSync } from "fs";
import path from "path";

import { describe, expect, it } from "vitest";

import {
  homepageAboutMeCopyConfiguration,
  homepageHeroCopyConfiguration,
  homepageProjectsSectionCopyConfiguration,
  homepageTechnologyStackSectionCopyConfiguration,
} from "@/app/config/homepageConfiguration";
import { homepageContactSectionCopyConfiguration } from "@/app/config/homepageContactConfiguration";
import {
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
} from "@/app/config/homepageProductionProofConfiguration";
import { homepageTechnologyStackCategoriesConfiguration } from "@/app/config/homepageTechnologyStackConfiguration";
import {
  homepageWorkHistoryConfiguration,
  homepageWorkHistorySectionCopyConfiguration,
} from "@/app/config/homepageWorkHistoryConfiguration";
import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";
import { pulseboardCaseStudyConfiguration } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import {
  getAllSelectedWork,
  homepageSelectedWorkSectionCopyConfiguration,
} from "@/app/config/portfolioSelectedWorkConfiguration";
import { findRetiredClaims } from "@/app/config/retiredClaimPatterns";
import { footerConfiguration, siteIdentityConfiguration } from "@/app/config/siteConfiguration";

const repoRoot = process.cwd();
const readSource = (relativePath: string) => readFileSync(path.join(repoRoot, relativePath), "utf8");

/** Every public-copy surface: homepage, SEO/JSON-LD, footer, contact, case studies, OG image, README. */
const publicCopySurfaces: Record<string, unknown> = {
  hero: homepageHeroCopyConfiguration,
  aboutMe: homepageAboutMeCopyConfiguration,
  projectsSection: homepageProjectsSectionCopyConfiguration,
  technologyStackSection: homepageTechnologyStackSectionCopyConfiguration,
  technologyStack: homepageTechnologyStackCategoriesConfiguration,
  contact: homepageContactSectionCopyConfiguration,
  productionProofSection: homepageProductionProofSectionCopyConfiguration,
  productionProof: homepageProductionProofMetricsConfiguration,
  workHistorySection: homepageWorkHistorySectionCopyConfiguration,
  workHistory: homepageWorkHistoryConfiguration,
  selectedWorkSection: homepageSelectedWorkSectionCopyConfiguration,
  selectedWork: getAllSelectedWork(),
  caseStudies: getAllCaseStudies(),
  pulseboard: pulseboardCaseStudyConfiguration,
  siteIdentity: siteIdentityConfiguration,
  footer: footerConfiguration,
  openGraphImageSource: readSource("app/opengraph-image.tsx"),
  readme: readSource("README.md"),
};

describe("retired claim guard", () => {
  for (const [surfaceName, surface] of Object.entries(publicCopySurfaces)) {
    it(`finds no retired or unsourced claim in ${surfaceName}`, () => {
      const text = typeof surface === "string" ? surface : JSON.stringify(surface);
      expect(findRetiredClaims(text)).toEqual([]);
    });
  }

  it("keeps the sourced numbers allowed", () => {
    for (const sourced of ["24s → 6s", "24s to 6s", "90% → 98%", "100K-150K", "4K-5K opens", "6 platforms", "2-3 days to 3-4 hours", "7+ years"]) {
      expect(findRetiredClaims(sourced), sourced).toEqual([]);
    }
  });

  it("catches each known regression, in any case", () => {
    for (const regression of [
      "$150K ARR", "100K/day sessions", "100k/day", "Zoom join in 5s", "5s join time", "99% uptime", "99% accuracy",
      "getbujo YC P26", "Remote contract at AIClicks since Apr 2026", "~30k conversations a month", "~$20k MRR",
      "257 tests", "18.7 MB to 2.0 MB (9.34x)", "52,555 rows", "1,814 wrong detections", "15.8% more mentions",
    ]) {
      expect(findRetiredClaims(regression), regression).not.toEqual([]);
      expect(findRetiredClaims(regression.toUpperCase()), regression).not.toEqual([]);
    }
  });
});
