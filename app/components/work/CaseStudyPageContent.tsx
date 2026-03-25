import type { CaseStudyRecord } from "@/app/config/portfolioCaseStudiesConfiguration";

import { BodyText } from "@/design-system/tokens/Typography";

import { CaseStudyArticleShell } from "./CaseStudyArticleShell";
import { CaseStudyHeader } from "./CaseStudyHeader";
import { CaseStudyProductChapter } from "./CaseStudyProductChapter";
import { CaseStudyReadingCanvas } from "./CaseStudyReadingCanvas";
import { CaseStudySection } from "./CaseStudySection";

export type CaseStudyPageContentProps = Readonly<{
  caseStudy: CaseStudyRecord;
}>;

export function CaseStudyPageContent({ caseStudy }: CaseStudyPageContentProps) {
  return (
    <CaseStudyReadingCanvas>
      <CaseStudyArticleShell>
        <CaseStudyHeader caseStudy={caseStudy} />
        <CaseStudySection title="Engagement overview">
          {caseStudy.engagementOverviewParagraphs.map((paragraph, index) => (
            <BodyText
              key={`engagement-overview-${index}`}
              className="text-textSecondary"
            >
              {paragraph}
            </BodyText>
          ))}
        </CaseStudySection>
        <CaseStudySection title="Product surfaces">
          <div className="space-y-6">
            {caseStudy.productChapters.map((chapter) => (
              <CaseStudyProductChapter key={chapter.heading} chapter={chapter} />
            ))}
          </div>
        </CaseStudySection>
      </CaseStudyArticleShell>
    </CaseStudyReadingCanvas>
  );
}
