import type {
  CaseStudyProductChapterConfiguration,
  CaseStudyProductChapterIntroductionSectionConfiguration,
} from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { EmphasizedFigures } from "./EmphasizedFigures";
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
      <Heading
        level="h4"
        className={caseStudyProductChapterPolicy.productChapterIntroductionHeadingClassName}
      >
        {section.sectionHeading}
      </Heading>
      <BodyText className="text-textPrimary">
        <EmphasizedFigures text={section.sectionBody} />
      </BodyText>
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
      <div className="min-w-0">
        <div className={caseStudyProductChapterPolicy.chapterTitleRowClassName}>
          <Heading level="h3">{chapter.heading}</Heading>
          <Caption className="shrink-0 text-textSecondary">
            {chapter.segmentLabel}
          </Caption>
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
              <EmphasizedFigures text={paragraph} />
            </BodyText>
          ))}
          {chapter.impactBullets.length > 0 ? (
            <ul className="list-outside list-disc ml-5 space-y-4 pt-2 text-textPrimary marker:text-textSecondary">
              {chapter.impactBullets.map((bullet, index) => (
                <li key={`${chapter.heading}-impact-${index}`} className="pl-1">
                  <EmphasizedFigures text={bullet} />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {chapter.skills.length > 0 ? (
          <div className={caseStudyProductChapterPolicy.productChapterSkillsSectionClassName}>
            <Caption className="font-semibold text-textPrimary">Skills</Caption>
            <ul className="mt-3 flex list-none flex-wrap gap-2 p-0">
              {chapter.skills.map((skill, index) => (
                <li
                  data-chip
                  key={`${chapter.heading}-skill-${index}`}
                  className="rounded-full bg-surfaceMuted px-3 py-1 text-sm text-textSecondary"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
