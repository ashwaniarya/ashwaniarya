import type { MetadataRoute } from "next";

import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";

const canonicalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const siteOrigin = canonicalSiteUrl?.endsWith("/")
    ? canonicalSiteUrl.slice(0, -1)
    : canonicalSiteUrl;

  if (!siteOrigin) {
    return [];
  }

  const lastModifiedDate = new Date();

  const caseStudyEntries = getAllCaseStudies().map((caseStudy) => ({
    url: `${siteOrigin}/work/${caseStudy.slug}`,
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
