import { calculateBudgetUsagePercent } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { pulseboardCaseStudyPagePolicy } from "@/app/constants/policy";

export type PulseboardUsageBarProps = Readonly<{
  usageLabel: string;
  usageSummaryLabel: string;
  usedAmount: number;
  budgetAmount: number;
  fillClassName: string;
}>;

export function PulseboardUsageBar({
  usageLabel,
  usageSummaryLabel,
  usedAmount,
  budgetAmount,
  fillClassName,
}: PulseboardUsageBarProps) {
  return (
    <div className={pulseboardCaseStudyPagePolicy.usageBarGridClassName}>
      <span className={pulseboardCaseStudyPagePolicy.usageBarLabelClassName}>{usageLabel}</span>
      <span className={pulseboardCaseStudyPagePolicy.usageBarSummaryClassName}>
        {usageSummaryLabel}
      </span>
      <span aria-hidden="true" className={pulseboardCaseStudyPagePolicy.usageBarTrackClassName}>
        <span
          className={[pulseboardCaseStudyPagePolicy.usageBarFillBaseClassName, fillClassName].join(" ")}
          style={{ width: `${calculateBudgetUsagePercent(usedAmount, budgetAmount)}%` }}
        />
      </span>
    </div>
  );
}
