import { Fragment } from "react";

import type { CaseStudyProductChapterConfiguration } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { ExternalTextLink } from "./ExternalTextLink";

export type CaseStudyProductChapterProps = Readonly<{
  chapter: CaseStudyProductChapterConfiguration;
}>;

export function CaseStudyProductChapter({
  chapter,
}: CaseStudyProductChapterProps) {
  return (
    <div className={caseStudyProductChapterPolicy.shellFlexClassName}>
      <div
        aria-hidden
        className={caseStudyProductChapterPolicy.accentGradientRailClassName}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4 pb-5">
          <Heading level="h3">{chapter.heading}</Heading>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-accentHighlight/40 bg-surfaceMuted px-3 py-1">
            <span
              aria-hidden
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-accentHighlight"
            />
            <Caption className="font-medium text-textPrimary">
              {chapter.segmentLabel}
            </Caption>
          </span>
        </div>

        <div className="border-t border-borderDefault pt-5">
          {chapter.productPageLink ? (
            <div>
              <ExternalTextLink href={chapter.productPageLink.url} isExternal>
                {chapter.productPageLink.label}
              </ExternalTextLink>
            </div>
          ) : (
            <Caption className="max-w-prose text-textSecondary">
              {chapter.availabilityCaption ??
                "No standalone public URL—work shipped inside client or partner systems."}
            </Caption>
          )}
        </div>

        <div className="space-y-3 border-t border-borderDefault pt-6">
          {chapter.bodyParagraphs.map((paragraph, index) => (
            <BodyText
              key={`${chapter.heading}-body-${index}`}
              className="text-textPrimary"
            >
              {paragraph}
            </BodyText>
          ))}
          {chapter.impactBullets.length > 0 ? (
            <ul className="list-inside list-disc space-y-2 pt-1 text-base leading-6 text-textPrimary marker:text-accentPrimary">
              {chapter.impactBullets.map((bullet, index) => (
                <li key={`${chapter.heading}-impact-${index}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </div>

        {chapter.skills.length > 0 ? (
          <div className="border-t border-borderDefault pt-6">
            <Caption className="font-semibold text-textPrimary">Skills</Caption>
            <p className="mt-3 text-sm leading-6 text-textPrimary">
              {chapter.skills.map((skill, index) => (
                <Fragment key={`${chapter.heading}-skill-${index}`}>
                  {index > 0 ? (
                    <span
                      className="font-normal text-textSecondary"
                      aria-hidden
                    >
                      {" · "}
                    </span>
                  ) : null}
                  <span className="font-bold">{skill}</span>
                </Fragment>
              ))}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
