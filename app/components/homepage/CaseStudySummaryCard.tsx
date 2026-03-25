import { Card } from "@/app/components/content/Card";
import type { CaseStudyRecord } from "@/app/config/portfolioCaseStudiesConfiguration";
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
        <Caption>
          {caseStudy.dateRange} · {caseStudy.company}
        </Caption>
      </div>
    </Card>
  );
}
