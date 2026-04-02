import { useId } from "react";

import { caseStudyProductImpactSnapshotCopyConfiguration } from "@/app/config/caseStudyProductImpactSnapshotCopyConfiguration";
import type { CaseStudyProductImpactSnapshotConfiguration } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";
import { BodyText } from "@/design-system/tokens/Typography";

const productImpactSnapshotAccentRailClassName =
  caseStudyProductChapterPolicy.accentGradientRailClassName;

function CaseStudyProductImpactSnapshotMetricTitle({
  labelText,
}: Readonly<{ labelText: string }>) {
  return (
    <div
      className={
        caseStudyProductChapterPolicy.impactSnapshotMetricLabelRowClassName
      }
    >
      <span
        aria-hidden
        className={
          caseStudyProductChapterPolicy.impactSnapshotMetricLabelRailClassName
        }
      />
      <span
        className={
          caseStudyProductChapterPolicy.impactSnapshotMetricLabelClassName
        }
      >
        {labelText}
      </span>
    </div>
  );
}

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
  const {
    panelHeadingLabel,
    stageMetricLabel,
    dailyReachMetricLabel,
    revenueMetricLabel,
  } = caseStudyProductImpactSnapshotCopyConfiguration;

  const stageValue = snapshot.stageLabel.trim();
  const reachValue = snapshot.dailyReachLabel.trim();
  const revenueValue = snapshot.revenueLabel?.trim() ?? "";

  return (
    <section
      aria-labelledby={impactSectionHeadingElementId}
      className={caseStudyProductChapterPolicy.impactSnapshotPanelClassName}
    >
      <div
        className={caseStudyProductChapterPolicy.impactSnapshotPanelFrameClassName}
      >
        <div
          aria-hidden
          className={productImpactSnapshotAccentRailClassName}
        />
        <div className="min-w-0 flex-1 space-y-3">
          <h2
            id={impactSectionHeadingElementId}
            className={caseStudyProductChapterPolicy.impactSnapshotHeadingClassName}
          >
            {panelHeadingLabel}
          </h2>
          <div
            className={
              caseStudyProductChapterPolicy.impactSnapshotMetricsGridClassName
            }
          >
            {stageValue.length > 0 ? (
              <div
                className={
                  caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName
                }
              >
                <CaseStudyProductImpactSnapshotMetricTitle
                  labelText={stageMetricLabel}
                />
                <BodyText
                  size="sm"
                  className={
                    caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName
                  }
                >
                  {stageValue}
                </BodyText>
              </div>
            ) : null}
            {reachValue.length > 0 ? (
              <div
                className={
                  caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName
                }
              >
                <CaseStudyProductImpactSnapshotMetricTitle
                  labelText={dailyReachMetricLabel}
                />
                <BodyText
                  size="sm"
                  className={
                    caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName
                  }
                >
                  {reachValue}
                </BodyText>
              </div>
            ) : null}
            {revenueValue.length > 0 ? (
              <div
                className={
                  caseStudyProductChapterPolicy.impactSnapshotMetricCellClassName
                }
              >
                <CaseStudyProductImpactSnapshotMetricTitle
                  labelText={revenueMetricLabel}
                />
                <BodyText
                  size="sm"
                  className={
                    caseStudyProductChapterPolicy.impactSnapshotMetricValueClassName
                  }
                >
                  {revenueValue}
                </BodyText>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
