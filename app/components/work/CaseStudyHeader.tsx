import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { editorialGradientTitlePolicy } from "@/app/constants/policy";
import type { CaseStudyRecord } from "@/app/config/portfolioCaseStudiesConfiguration";

import { ExternalTextLink } from "./ExternalTextLink";

export type CaseStudyHeaderProps = Readonly<{
  caseStudy: CaseStudyRecord;
}>;

export function CaseStudyHeader({ caseStudy }: CaseStudyHeaderProps) {
  const metaLineParts = [
    caseStudy.role,
    caseStudy.dateRange,
    caseStudy.location,
    caseStudy.company,
  ].filter(Boolean);

  return (
    <header className="space-y-4 rounded-xl border border-borderDefault/80 bg-surfaceElevated/95 p-6 shadow-md backdrop-blur-sm sm:p-8">
      <EditorialAccentMark variant="horizontalTitle" />
      <Heading
        level="h1"
        className={editorialGradientTitlePolicy.gradientTextClassName}
      >
        {caseStudy.title}
      </Heading>
      <BodyText className="text-textSecondary">{caseStudy.summary}</BodyText>
      <div className="flex flex-col gap-2 border-t border-borderDefault/60 pt-4">
        <Caption>{metaLineParts.join(" · ")}</Caption>
        {caseStudy.credentialsLine ? (
          <Caption>{caseStudy.credentialsLine}</Caption>
        ) : null}
        {caseStudy.companySiteUrl ? (
          <div>
            <ExternalTextLink href={caseStudy.companySiteUrl} isExternal>
              {caseStudy.company} website
            </ExternalTextLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}
