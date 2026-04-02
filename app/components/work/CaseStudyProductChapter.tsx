import { Fragment } from "react";

import type {
  CaseStudyProductChapterConfiguration,
  CaseStudyProductChapterIntroductionSectionConfiguration,
} from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { ExternalTextLink } from "./ExternalTextLink";
import { CaseStudyProductChapterIllustration } from "./CaseStudyProductChapterIllustration";
import {
  CaseStudyProductImpactSnapshot,
  productImpactSnapshotHasRenderableContent,
} from "./CaseStudyProductImpactSnapshot";

export type CaseStudyProductChapterProps = Readonly<{
  chapter: CaseStudyProductChapterConfiguration;
}>;

function CaseStudyProductChapterIntroductionSection({
  section,
}: Readonly<{
  section: CaseStudyProductChapterIntroductionSectionConfiguration;
}>) {
  return (
    <div
      className={
        caseStudyProductChapterPolicy.productChapterIntroductionSectionBlockClassName
      }
    >
      <div
        className={
          caseStudyProductChapterPolicy.productChapterIntroductionHeadingRowClassName
        }
      >
        <span
          aria-hidden
          className={
            caseStudyProductChapterPolicy.productChapterEditorialMicroRailClassName
          }
        />
        <Heading level="h4" className="min-w-0 flex-1">
          {section.sectionHeading}
        </Heading>
      </div>
      <BodyText className="text-textPrimary">{section.sectionBody}</BodyText>
    </div>
  );
}

export function CaseStudyProductChapter({
  chapter,
}: CaseStudyProductChapterProps) {
  const productImpactSnapshotConfiguration = chapter.productImpactSnapshot;
  const chapterShowsProductImpactSnapshot =
    productImpactSnapshotConfiguration !== undefined &&
    productImpactSnapshotHasRenderableContent(productImpactSnapshotConfiguration);

  const productChapterBodyStackClassName = chapterShowsProductImpactSnapshot
    ? caseStudyProductChapterPolicy.productChapterBodyStackWhenAfterImpactClassName
    : caseStudyProductChapterPolicy.productChapterBodyStackWhenTopRuleClassName;

  return (
    <div className={caseStudyProductChapterPolicy.shellFlexClassName}>
      <div
        aria-hidden
        className={caseStudyProductChapterPolicy.accentGradientRailClassName}
      />
      <div className="min-w-0 flex-1">
        <div className={caseStudyProductChapterPolicy.chapterTitleRowClassName}>
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

        <div className={caseStudyProductChapterPolicy.productChapterBorderedSectionTopCPlassName}>
          {chapter.productPageLink ? (
            <div
              className={
                chapter.availabilityCaption
                  ? caseStudyProductChapterPolicy.productPageLinkAvailabilityStackClassName
                  : undefined
              }
            >
              <div>
                <ExternalTextLink href={chapter.productPageLink.url} isExternal>
                  {chapter.productPageLink.label}
                </ExternalTextLink>
              </div>
              {chapter.availabilityCaption ? (
                <Caption className="max-w-prose text-textSecondary">
                  {chapter.availabilityCaption}
                </Caption>
              ) : null}
            </div>
          ) : (
            <Caption className="max-w-prose text-textSecondary">
              {chapter.availabilityCaption ??
                "No standalone public URL—work shipped inside client or partner systems."}
            </Caption>
          )}
        </div>

        {chapter.chapterIllustration ? (
          <div className={caseStudyProductChapterPolicy.productChapterBorderedSectionTopCPlassName}>
            <CaseStudyProductChapterIllustration
              illustration={chapter.chapterIllustration}
            />
          </div>
        ) : null}

        {chapterShowsProductImpactSnapshot && productImpactSnapshotConfiguration ? (
          <div className={caseStudyProductChapterPolicy.productChapterBorderedSectionTopCPlassName}>
            <CaseStudyProductImpactSnapshot
              snapshot={productImpactSnapshotConfiguration}
            />
          </div>
        ) : null}

        <div className={productChapterBodyStackClassName}>
          {chapter.introductionSections && chapter.introductionSections.length > 0 ? (
            <div
              className={
                caseStudyProductChapterPolicy.productChapterIntroductionOuterStackClassName
              }
            >
              {chapter.introductionSections.map((section, index) => (
                <CaseStudyProductChapterIntroductionSection
                  key={`${chapter.heading}-intro-${index}`}
                  section={section}
                />
              ))}
            </div>
          ) : null}
          {chapter.bodyParagraphs.map((paragraph, index) => (
            <BodyText
              key={`${chapter.heading}-body-${index}`}
              className="text-textPrimary"
            >
              {paragraph}
            </BodyText>
          ))}
          {chapter.impactBullets.length > 0 ? (
            <ul className="list-outside list-disc ml-5 space-y-3 pt-1 text-base leading-6 text-textPrimary marker:text-accentPrimary">
              {chapter.impactBullets.map((bullet, index) => (
                <li key={`${chapter.heading}-impact-${index}`} className="pl-1">
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {chapter.skills.length > 0 ? (
          <div className={caseStudyProductChapterPolicy.productChapterSkillsSectionClassName}>
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
