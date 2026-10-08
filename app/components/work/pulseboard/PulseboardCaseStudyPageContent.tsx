import Image from "next/image";
import { TbArrowUpRight, TbInfoCircle, TbShieldCheck } from "react-icons/tb";

import { ProductionProofMetricTile } from "@/app/components/homepage/ProductionProofMetricTile";
import {
  pulseboardCaseStudyConfiguration,
  type PulseboardLimitRecord,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { resolvePulseboardDesignSystemRuleIcon } from "@/app/config/pulseboardCaseStudyIconRegistry";
import {
  caseStudyArticleShellPolicy,
  caseStudyDemoVideoPolicy,
  homepageProductionProofSectionPolicy,
  pulseboardCaseStudyPagePolicy,
} from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { CaseStudyArticleShell } from "../CaseStudyArticleShell";
import { CaseStudyDemoVideoPlayer } from "../CaseStudyDemoVideoPlayer";
import { CaseStudyReadingCanvas } from "../CaseStudyReadingCanvas";
import { CaseStudySection } from "../CaseStudySection";
import { ExternalTextLink } from "../ExternalTextLink";
import { PulseboardArchitectureDiagram } from "./PulseboardArchitectureDiagram";
import { PulseboardCaseStudyHeader } from "./PulseboardCaseStudyHeader";
import { PulseboardChipList } from "./PulseboardChipList";
import { PulseboardFactCardGrid } from "./PulseboardFactCardGrid";
import { PulseboardPerformanceBreakdown } from "./PulseboardPerformanceBreakdown";

export function PulseboardCaseStudyPageContent() {
  const {
    header,
    links,
    demoVideo,
    heroScreenshot,
    glance,
    architecture,
    designSystem,
    performance,
    failureModes,
    testing,
    limits,
  } = pulseboardCaseStudyConfiguration;

  return (
    <CaseStudyReadingCanvas>
      <CaseStudyArticleShell>
        <div className={caseStudyArticleShellPolicy.caseStudyHeaderBlockBottomMarginClassName}>
          <PulseboardCaseStudyHeader header={header} links={links} />
          <figure className={caseStudyDemoVideoPolicy.figureClassName} aria-label={demoVideo.title}>
            <CaseStudyDemoVideoPlayer demoVideo={demoVideo} />
          </figure>
          <figure className={pulseboardCaseStudyPagePolicy.heroFigureClassName}>
            <picture className={pulseboardCaseStudyPagePolicy.heroPictureFrameClassName}>
              <source srcSet={heroScreenshot.webpSrc} type="image/webp" />
              <Image
                src={heroScreenshot.pngSrc}
                alt={heroScreenshot.alt}
                width={heroScreenshot.width}
                height={heroScreenshot.height}
                loading="eager"
                fetchPriority="high"
                className={pulseboardCaseStudyPagePolicy.heroImageClassName}
                unoptimized
              />
            </picture>
            <figcaption>
              <Caption>{heroScreenshot.caption}</Caption>
            </figcaption>
          </figure>
          <ul
            aria-label={glance.listAriaLabel}
            className={homepageProductionProofSectionPolicy.metricCardsListClassName}
          >
            {glance.metrics.map((metric) => (
              <li key={metric.metricLabel} className="min-w-0">
                <ProductionProofMetricTile metric={metric} />
              </li>
            ))}
          </ul>
        </div>
        <div className={caseStudyArticleShellPolicy.caseStudyBodySectionsVerticalStackClassName}>
          <CaseStudySection title={architecture.sectionTitle} titleId={architecture.sectionTitleId}>
            <div className={pulseboardCaseStudyPagePolicy.sectionBodyStackClassName}>
              <BodyText className="text-textSecondary">{architecture.introParagraph}</BodyText>
              <PulseboardArchitectureDiagram
                diagramAriaLabel={architecture.diagramAriaLabel}
                lanes={architecture.lanes}
                bulletGroups={architecture.bulletGroups}
              />
              <div className={pulseboardCaseStudyPagePolicy.subsectionStackClassName}>
                <Heading level="h3">{architecture.decisionRecordsHeading}</Heading>
                <ol className={pulseboardCaseStudyPagePolicy.decisionRecordListClassName}>
                  {architecture.decisionRecords.map((decisionRecord) => (
                    <li key={decisionRecord.decisionNumberLabel}>
                      <ExternalTextLink href={decisionRecord.href} isExternal>
                        {`${decisionRecord.decisionNumberLabel}: ${decisionRecord.title}`}
                      </ExternalTextLink>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </CaseStudySection>
          <CaseStudySection title={designSystem.sectionTitle} titleId={designSystem.sectionTitleId}>
            <PulseboardFactCardGrid
              factCards={designSystem.rules}
              listClassName={pulseboardCaseStudyPagePolicy.designRuleGridClassName}
              resolveFactCardIcon={(designSystemRule) =>
                resolvePulseboardDesignSystemRuleIcon(designSystemRule.ruleKey)
              }
            />
          </CaseStudySection>
          <CaseStudySection title={performance.sectionTitle} titleId={performance.sectionTitleId}>
            <PulseboardPerformanceBreakdown performance={performance} />
          </CaseStudySection>
          <CaseStudySection title={failureModes.sectionTitle} titleId={failureModes.sectionTitleId}>
            <div className={pulseboardCaseStudyPagePolicy.sectionBodyStackClassName}>
              <PulseboardChipList
                chipLabels={failureModes.scenarioLabels}
                ariaLabel={failureModes.scenariosAriaLabel}
                highlightedChipLabel={failureModes.demoScenarioLabel}
              />
              <ul className={pulseboardCaseStudyPagePolicy.iconBulletGridClassName}>
                {failureModes.behaviours.map((behaviour) => (
                  <li key={behaviour} className={pulseboardCaseStudyPagePolicy.iconBulletItemClassName}>
                    <TbShieldCheck
                      aria-hidden
                      className={[
                        pulseboardCaseStudyPagePolicy.iconBulletIconClassName,
                        pulseboardCaseStudyPagePolicy.behaviourIconClassName,
                      ].join(" ")}
                    />
                    <span>{behaviour}</span>
                  </li>
                ))}
              </ul>
              <p>
                <ExternalTextLink
                  href={failureModes.demoHref}
                  isExternal
                  className={pulseboardCaseStudyPagePolicy.inlineIconLinkClassName}
                >
                  {failureModes.demoLinkLabel}
                  <TbArrowUpRight aria-hidden className={pulseboardCaseStudyPagePolicy.inlineIconLinkIconClassName} />
                </ExternalTextLink>
              </p>
            </div>
          </CaseStudySection>
          <CaseStudySection title={testing.sectionTitle} titleId={testing.sectionTitleId}>
            <div className={pulseboardCaseStudyPagePolicy.sectionBodyStackClassName}>
              <PulseboardFactCardGrid
                factCards={testing.testTiers}
                listClassName={pulseboardCaseStudyPagePolicy.testTierGridClassName}
              />
              <div className={pulseboardCaseStudyPagePolicy.subsectionStackClassName}>
                <div className={pulseboardCaseStudyPagePolicy.labelledChipRowClassName}>
                  <span className={pulseboardCaseStudyPagePolicy.chipRowLabelClassName}>{testing.ciJobsLabel}</span>
                  <PulseboardChipList
                    chipLabels={testing.ciJobNames}
                    chipClassName={pulseboardCaseStudyPagePolicy.ciJobChipClassName}
                  />
                </div>
                <div className={pulseboardCaseStudyPagePolicy.labelledChipRowClassName}>
                  <span className={pulseboardCaseStudyPagePolicy.chipRowLabelClassName}>
                    {testing.coverageGatesLabel}
                  </span>
                  <PulseboardChipList chipLabels={testing.coverageGateLabels} />
                </div>
              </div>
            </div>
          </CaseStudySection>
          <CaseStudySection title={limits.sectionTitle} titleId={limits.sectionTitleId}>
            <ul className={pulseboardCaseStudyPagePolicy.iconBulletListClassName}>
              {limits.items.map((limit: PulseboardLimitRecord) => (
                <li key={limit.limitText} className={pulseboardCaseStudyPagePolicy.iconBulletItemClassName}>
                  <TbInfoCircle
                    aria-hidden
                    className={[
                      pulseboardCaseStudyPagePolicy.iconBulletIconClassName,
                      pulseboardCaseStudyPagePolicy.limitIconClassName,
                    ].join(" ")}
                  />
                  <span>
                    {limit.limitText}
                    {limit.decisionRecord ? (
                      <>
                        {" ("}
                        <ExternalTextLink href={limit.decisionRecord.href} isExternal>
                          {limit.decisionRecord.decisionNumberLabel}
                        </ExternalTextLink>
                        {")"}
                      </>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          </CaseStudySection>
        </div>
      </CaseStudyArticleShell>
    </CaseStudyReadingCanvas>
  );
}
