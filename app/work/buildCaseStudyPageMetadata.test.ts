import type { Metadata } from "next";
import { describe, expect, it } from "vitest";

import { getCaseStudyBySlug } from "@/app/config/portfolioCaseStudiesConfiguration";
import { pulseboardCaseStudyConfiguration } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";
import { generateMetadata as generateCaseStudyPageMetadata } from "@/app/work/[caseStudySlug]/page";
import type { CaseStudyPageMetadataInput } from "@/app/work/buildCaseStudyPageMetadata";
import { metadata as pulseboardCaseStudyPageMetadata } from "@/app/work/pulseboard/page";

function expectCaseStudyPageMetadata(
  pageMetadata: Metadata,
  { pagePath, searchResultTitle, metaDescription }: CaseStudyPageMetadataInput,
) {
  const socialCardTitle = `${searchResultTitle} | ${siteIdentityConfiguration.siteName}`;

  expect(pageMetadata).toMatchObject({
    title: searchResultTitle,
    description: metaDescription,
    alternates: { canonical: pagePath },
    openGraph: {
      type: "article",
      url: pagePath,
      title: socialCardTitle,
      description: metaDescription,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialCardTitle,
      description: metaDescription,
    },
  });
}

describe("buildCaseStudyPageMetadata", () => {
  it("builds the canonical URL, article card and shared image for a dynamic case study", async () => {
    const getbujoCaseStudy = getCaseStudyBySlug("getbujo")!;
    const getbujoPageMetadata = await generateCaseStudyPageMetadata({
      params: Promise.resolve({ caseStudySlug: "getbujo" }),
    });

    expectCaseStudyPageMetadata(getbujoPageMetadata, {
      pagePath: "/work/getbujo",
      searchResultTitle: getbujoCaseStudy.metaTitle!,
      metaDescription: getbujoCaseStudy.metaDescription,
    });
  });

  it("builds the same metadata for the static Pulseboard page", () => {
    expectCaseStudyPageMetadata(pulseboardCaseStudyPageMetadata, {
      pagePath: "/work/pulseboard",
      searchResultTitle: pulseboardCaseStudyConfiguration.metaTitle,
      metaDescription: pulseboardCaseStudyConfiguration.metaDescription,
    });
  });
});
