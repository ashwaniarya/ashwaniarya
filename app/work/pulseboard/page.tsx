import type { Metadata } from "next";

import { PageLayout } from "@/app/components/layout/PageLayout";
import { PulseboardCaseStudyPageContent } from "@/app/components/work/pulseboard/PulseboardCaseStudyPageContent";
import { pulseboardCaseStudyConfiguration } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { buildCaseStudyPageMetadata } from "@/app/work/buildCaseStudyPageMetadata";

export const metadata: Metadata = buildCaseStudyPageMetadata({
  pagePath: pulseboardCaseStudyConfiguration.pagePath,
  searchResultTitle: pulseboardCaseStudyConfiguration.metaTitle,
  metaDescription: pulseboardCaseStudyConfiguration.metaDescription,
});

export default function PulseboardCaseStudyPage() {
  return (
    <PageLayout>
      <PulseboardCaseStudyPageContent />
    </PageLayout>
  );
}
