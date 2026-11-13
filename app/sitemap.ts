import type { MetadataRoute } from "next";

import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";
import { getAllSelectedWork } from "@/app/config/portfolioSelectedWorkConfiguration";

import { siteOriginUrl as siteOrigin } from "@/app/config/siteConfiguration";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModifiedDate = new Date();

  const caseStudyPagePaths = new Set([
    ...getAllCaseStudies().map((caseStudy) => `/work/${caseStudy.slug}`),
    ...getAllSelectedWork().flatMap((selectedWork) =>
      selectedWork.caseStudyHref ? [selectedWork.caseStudyHref] : [],
    ),
  ]);

  const caseStudyEntries = Array.from(caseStudyPagePaths, (caseStudyPagePath) => ({
    url: `${siteOrigin}${caseStudyPagePath}`,
    lastModified: lastModifiedDate,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteOrigin,
      lastModified: lastModifiedDate,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...caseStudyEntries,
  ];
}
