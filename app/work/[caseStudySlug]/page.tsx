import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PageLayout } from "@/app/components/layout/PageLayout";
import { CaseStudyPageContent } from "@/app/components/work/CaseStudyPageContent";
import {
  getAllCaseStudies,
  getCaseStudyBySlug,
} from "@/app/config/portfolioCaseStudiesConfiguration";

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

  return {
    title: caseStudy.title,
    description: caseStudy.metaDescription,
    alternates: {
      canonical: `/work/${caseStudy.slug}`,
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
