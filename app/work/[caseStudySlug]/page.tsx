import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageLayout } from "@/app/components/layout/PageLayout";
import { CaseStudyPageContent } from "@/app/components/work/CaseStudyPageContent";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/app/config/portfolioCaseStudiesConfiguration";
import { siteIdentityConfiguration } from "@/app/config/siteConfiguration";

type CaseStudyPageProps = Readonly<{
  params: Promise<{ caseStudySlug: string }>;
}>;

export function generateStaticParams(): Array<{ caseStudySlug: string }> {
  return getAllCaseStudies().map((caseStudy) => ({
    caseStudySlug: caseStudy.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { caseStudySlug } = await params;
  const caseStudy = getCaseStudyBySlug(caseStudySlug);
  if (!caseStudy) {
    return { title: "Work" };
  }

  const searchResultTitle = caseStudy.metaTitle ?? caseStudy.title;

  return {
    title: searchResultTitle,
    description: caseStudy.metaDescription,
    alternates: {
      canonical: `/work/${caseStudy.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${searchResultTitle} | ${siteIdentityConfiguration.siteName}`,
      description: caseStudy.metaDescription,
      url: `/work/${caseStudy.slug}`,
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
      title: `${searchResultTitle} | ${siteIdentityConfiguration.siteName}`,
      description: caseStudy.metaDescription,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { caseStudySlug } = await params;
  const caseStudy = getCaseStudyBySlug(caseStudySlug);
  if (!caseStudy) {
    notFound();
  }

  return (
    <PageLayout>
      <CaseStudyPageContent caseStudy={caseStudy} />
    </PageLayout>
  );
}
