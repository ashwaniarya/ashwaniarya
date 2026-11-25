import { TbArrowUpRight } from "react-icons/tb";

import type { PulseboardCaseStudyConfiguration } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { pulseboardCaseStudyPagePolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { ExternalTextLink } from "../ExternalTextLink";
import { PulseboardChipList } from "./PulseboardChipList";

export type PulseboardPerformanceBreakdownProps = Readonly<{
  performance: PulseboardCaseStudyConfiguration["performance"];
}>;

export function PulseboardPerformanceBreakdown({ performance }: PulseboardPerformanceBreakdownProps) {
  const { virtualizedTable, bundleBudgets } = performance;

  return (
    <div className={pulseboardCaseStudyPagePolicy.performanceCardsStackClassName}>
      <div className={pulseboardCaseStudyPagePolicy.performanceCardClassName}>
        <div className={pulseboardCaseStudyPagePolicy.performanceCardTitleRowClassName}>
          <Heading level="h3">{virtualizedTable.title}</Heading>
          <ExternalTextLink
            href={virtualizedTable.benchmarkHref}
            isExternal
            className={pulseboardCaseStudyPagePolicy.inlineIconLinkClassName}
          >
            {virtualizedTable.benchmarkLinkLabel}
            <TbArrowUpRight aria-hidden className={pulseboardCaseStudyPagePolicy.inlineIconLinkIconClassName} />
          </ExternalTextLink>
        </div>
        <BodyText size="sm" className="text-textSecondary">
          {virtualizedTable.summaryLine}
        </BodyText>
      </div>
      <div className={pulseboardCaseStudyPagePolicy.performanceCardClassName}>
        <Heading level="h3">{bundleBudgets.title}</Heading>
        <BodyText size="sm" className="text-textSecondary">
          {bundleBudgets.summaryLine}
        </BodyText>
        <p>
          <Caption>{bundleBudgets.shellNote}</Caption>
        </p>
      </div>
      <PulseboardChipList
        chipLabels={performance.renderingPractices}
        ariaLabel={performance.renderingPracticesAriaLabel}
      />
    </div>
  );
}
