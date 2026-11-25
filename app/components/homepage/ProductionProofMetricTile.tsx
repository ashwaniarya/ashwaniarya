import { Card } from "@/app/components/content/Card";
import {
  homepageProductionProofSectionCopyConfiguration,
  type ProductionProofMetricRecord,
} from "@/app/config/homepageProductionProofConfiguration";
import {
  homepageProductionProofSectionPolicy,
  homepageScrollHighlightPolicy,
} from "@/app/constants/policy";
import { BodyText, Caption } from "@/design-system/tokens/Typography";

export type ProductionProofMetricTileProps = Readonly<{
  /** `builtAt` and `inProduction` are optional so the Pulseboard case study can reuse the tile without pills. */
  metric: Pick<ProductionProofMetricRecord, "metricLabel" | "valueLabel" | "contextLine"> &
    Partial<Pick<ProductionProofMetricRecord, "builtAt" | "inProduction">>;
}>;

export function ProductionProofMetricTile({ metric }: ProductionProofMetricTileProps) {
  return (
    <Card className={homepageProductionProofSectionPolicy.metricTileCardClassName}>
      <div className={homepageProductionProofSectionPolicy.metricTileStackClassName}>
        <div className={homepageProductionProofSectionPolicy.metricLabelRowClassName}>
          <span
            aria-hidden="true"
            className={homepageProductionProofSectionPolicy.metricLabelRailClassName}
          />
          <span className={homepageProductionProofSectionPolicy.metricLabelClassName}>
            {metric.metricLabel}
          </span>
        </div>
        <BodyText
          size="lg"
          className={[
            homepageProductionProofSectionPolicy.metricValueClassName,
            homepageScrollHighlightPolicy.keyFigureClassName,
          ].join(" ")}
        >
          {metric.valueLabel}
        </BodyText>
        {metric.contextLine ? <Caption className="text-textSecondary">{metric.contextLine}</Caption> : null}
        {metric.builtAt ? (
        <div className={homepageProductionProofSectionPolicy.metricPillRowClassName}>
          <span data-test="outcome-built-at-pill" className={homepageProductionProofSectionPolicy.metricBuiltAtPillClassName}>
            {homepageProductionProofSectionCopyConfiguration.builtAtPillPrefix} {metric.builtAt}
          </span>
          {metric.inProduction ? (
            <span
              data-test="outcome-in-production-pill"
              className={homepageProductionProofSectionPolicy.metricInProductionPillClassName}
            >
              {homepageProductionProofSectionCopyConfiguration.inProductionPillLabel}
            </span>
          ) : null}
        </div>
        ) : null}
      </div>
    </Card>
  );
}
