import { Card } from "@/app/components/content/Card";
import { homepageProductionProofSectionCopyConfiguration } from "@/app/config/homepageProductionProofConfiguration";
import type { CaseStudyRecord } from "@/app/config/portfolioCaseStudiesConfiguration";
import { homepageProductionProofSectionPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

export type CaseStudySummaryCardProps = Readonly<{
  caseStudy: CaseStudyRecord;
}>;

export function CaseStudySummaryCard({ caseStudy }: CaseStudySummaryCardProps) {
  return (
    <Card href={`/work/${caseStudy.slug}`} className="h-full">
      <div className="space-y-2">
        <Heading level="h3">{caseStudy.title}</Heading>
        <BodyText size="sm" className="text-textSecondary">
          {caseStudy.summary}
        </BodyText>
        <div className="flex flex-wrap items-center gap-2">
          <Caption>{caseStudy.dateRange}</Caption>
          {/* Text pill instead of a company logo (Ashwani, 25 Nov 2026). The name comes from `company` in config. */}
          <span data-test="case-study-built-at-pill" className={homepageProductionProofSectionPolicy.metricBuiltAtPillClassName}>
            {homepageProductionProofSectionCopyConfiguration.builtAtPillPrefix} {caseStudy.company}
          </span>
        </div>
      </div>
    </Card>
  );
}
