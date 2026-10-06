import type { Metadata } from "next";

import type { CaseStudyPagePath } from "@/app/config/portfolioCaseStudiesConfiguration";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

export type CaseStudyPageMetadataInput = Readonly<{
  pagePath: CaseStudyPagePath;
  searchResultTitle: string;
  metaDescription: string;
}>;

export function buildCaseStudyPageMetadata({
  pagePath,
  searchResultTitle,
  metaDescription,
}: CaseStudyPageMetadataInput): Metadata {
  const socialCardTitle = `${searchResultTitle} | ${siteIdentityConfiguration.siteName}`;

  return {
    title: searchResultTitle,
    description: metaDescription,
    alternates: {
      canonical: pagePath,
    },
    openGraph: {
      type: "article",
      title: socialCardTitle,
      description: metaDescription,
      url: pagePath,
      siteName: siteIdentityConfiguration.siteName,
      locale: "en_US",
      // Declaring `openGraph` here suppresses inheritance of the root
      // opengraph-image file, so the shared card is referenced explicitly.
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: siteIdentityConfiguration.homepageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialCardTitle,
      description: metaDescription,
    },
  };
}
