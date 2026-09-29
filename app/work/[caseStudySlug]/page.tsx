import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageLayout } from "@/app/components/layout/PageLayout";
import { CaseStudyPageContent } from "@/app/components/work/CaseStudyPageContent";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/app/config/portfolioCaseStudiesConfiguration";
import { buildCaseStudyPageMetadata } from "@/app/work/buildCaseStudyPageMetadata";

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

  return buildCaseStudyPageMetadata({
    pagePath: `/work/${caseStudy.slug}`,
    searchResultTitle: caseStudy.metaTitle ?? caseStudy.title,
    metaDescription: caseStudy.metaDescription,
  });
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
