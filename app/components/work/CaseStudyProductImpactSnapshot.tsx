import { useId } from "react";

import { caseStudyProductImpactSnapshotCopyConfiguration } from "@/app/config/caseStudyProductImpactSnapshotCopyConfiguration";
import type { CaseStudyProductImpactSnapshotConfiguration } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";
import { BodyText, Caption } from "@/design-system/tokens/Typography";

export type CaseStudyProductImpactSnapshotProps = Readonly<{
  snapshot: CaseStudyProductImpactSnapshotConfiguration;
}>;

export function productImpactSnapshotHasRenderableContent(
  snapshot: CaseStudyProductImpactSnapshotConfiguration,
): boolean {
  const stage = snapshot.stageLabel.trim();
  const reach = snapshot.dailyReachLabel.trim();
  const revenue = snapshot.revenueLabel?.trim() ?? "";
  return stage.length > 0 || reach.length > 0 || revenue.length > 0;
}

export function CaseStudyProductImpactSnapshot({
  snapshot,
}: CaseStudyProductImpactSnapshotProps) {
  const impactSectionHeadingElementId = useId();

  if (!productImpactSnapshotHasRenderableContent(snapshot)) {
    return null;
  }
  const { impactSectionHeading, stageMetricLabel, dailyReachMetricLabel, revenueMetricLabel } =
    caseStudyProductImpactSnapshotCopyConfiguration;

  const stageValue = snapshot.stageLabel.trim();
  const reachValue = snapshot.dailyReachLabel.trim();
  const revenueValue = snapshot.revenueLabel?.trim() ?? "";

  return (
    <section
      aria-labelledby={impactSectionHeadingElementId}
      className={caseStudyProductChapterPolicy.impactSnapshotPanelClassName}
    >
      <span id={impactSectionHeadingElementId} className="block">
        <Caption
          className={[
            caseStudyProductChapterPolicy.impactSnapshotHeadingClassName,
          ].join(" ")}
        >
          {impactSectionHeading}
        </Caption>
      </span>
      <div className={caseStudyProductChapterPolicy.impactSnapshotMetricsGridClassName}>
        {stageValue.length > 0 ? (
          <div className={caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName}>
            <Caption className={caseStudyProductChapterPolicy.impactSnapshotMetricLabelClassName}>
              {stageMetricLabel}
            </Caption>
            <BodyText
              size="sm"
              className={caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName}
            >
              {stageValue}
            </BodyText>
          </div>
        ) : null}
        {reachValue.length > 0 ? (
          <div className={caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName}>
            <Caption className={caseStudyProductChapterPolicy.impactSnapshotMetricLabelClassName}>
              {dailyReachMetricLabel}
            </Caption>
            <BodyText
              size="sm"
              className={caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName}
            >
              {reachValue}
            </BodyText>
          </div>
        ) : null}
        {revenueValue.length > 0 ? (
          <div className={caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName}>
            <Caption className={caseStudyProductChapterPolicy.impactSnapshotMetricLabelClassName}>
              {revenueMetricLabel}
            </Caption>
            <BodyText
              size="sm"
              className={caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName}
            >
              {revenueValue}
            </BodyText>
          </div>
        ) : null}
      </div>
    </section>
  );
}
