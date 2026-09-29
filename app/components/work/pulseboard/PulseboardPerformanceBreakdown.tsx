import { TbArrowUpRight } from "react-icons/tb";

import {
  calculateBudgetUsagePercent,
  type PulseboardCaseStudyConfiguration,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { pulseboardCaseStudyPagePolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

import { ExternalTextLink } from "../ExternalTextLink";
import { PulseboardChipList } from "./PulseboardChipList";
import { PulseboardUsageBar } from "./PulseboardUsageBar";

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
        <dl className={pulseboardCaseStudyPagePolicy.statGridClassName}>
          {virtualizedTable.stats.map((stat) => (
            <div key={stat.statLabel} className={pulseboardCaseStudyPagePolicy.statBoxClassName}>
              <dt className={pulseboardCaseStudyPagePolicy.statLabelClassName}>{stat.statLabel}</dt>
              <dd className={pulseboardCaseStudyPagePolicy.statValueClassName}>{stat.statValue}</dd>
            </div>
          ))}
        </dl>
        <PulseboardUsageBar
          usageLabel={virtualizedTable.frameUsageLabel}
          usageSummaryLabel={`${calculateBudgetUsagePercent(
            virtualizedTable.p95FrameMilliseconds,
            virtualizedTable.frameBudgetMilliseconds,
          )}%`}
          usedAmount={virtualizedTable.p95FrameMilliseconds}
          budgetAmount={virtualizedTable.frameBudgetMilliseconds}
          fillClassName={pulseboardCaseStudyPagePolicy.frameUsageFillClassName}
        />
      </div>
      <div className={pulseboardCaseStudyPagePolicy.performanceCardClassName}>
        <Heading level="h3">{bundleBudgets.title}</Heading>
        <BodyText size="sm" className="text-textSecondary">
          {bundleBudgets.summaryLine}
        </BodyText>
        <ul className={pulseboardCaseStudyPagePolicy.usageBarListClassName}>
          {bundleBudgets.budgets.map((budget) => (
            <li key={budget.chunkLabel}>
              <PulseboardUsageBar
                usageLabel={budget.chunkLabel}
                usageSummaryLabel={`${budget.usedKilobytes} / ${budget.budgetKilobytes} KB`}
                usedAmount={budget.usedKilobytes}
                budgetAmount={budget.budgetKilobytes}
                fillClassName={pulseboardCaseStudyPagePolicy.bundleUsageFillClassName}
              />
            </li>
          ))}
        </ul>
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
