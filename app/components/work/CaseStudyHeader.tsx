import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import {
  caseStudyArticleShellPolicy,
} from "@/app/constants/policy";
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
    <header className={caseStudyArticleShellPolicy.caseStudyHeaderCardClassName}>
      <Heading
        level="h1"
      >
        {caseStudy.title}
      </Heading>
      <BodyText size="lg" className="text-textSecondary">{caseStudy.summary}</BodyText>
      <div className="flex flex-col gap-2 border-t border-borderDefault/60 pt-4">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {metaLineParts.map((metaLinePart, index) => (
            <Caption
              key={metaLinePart}
              className={index === 0 ? "font-semibold text-textPrimary" : ""}
            >
              {metaLinePart}
            </Caption>
          ))}
        </div>
        {caseStudy.credentialsLine ? (
          <Caption>{caseStudy.credentialsLine}</Caption>
        ) : null}
        {caseStudy.companySiteUrl ? (
          <div>
            <ExternalTextLink href={caseStudy.companySiteUrl} isExternal>
              {caseStudy.company}
            </ExternalTextLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}
