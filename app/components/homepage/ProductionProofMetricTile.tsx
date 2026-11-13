import { Card } from "@/app/components/content/Card";
import type { ProductionProofMetricRecord } from "@/app/config/homepageProductionProofConfiguration";
import { homepageProductionProofSectionPolicy } from "@/app/constants/policy";
import { BodyText, Caption } from "@/design-system/tokens/Typography";

export type ProductionProofMetricTileProps = Readonly<{
  metric: Pick<ProductionProofMetricRecord, "metricLabel" | "valueLabel" | "contextLine">;
}>;

export function ProductionProofMetricTile({ metric }: ProductionProofMetricTileProps) {
  return (
    <Card className="h-full">
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
          className={homepageProductionProofSectionPolicy.metricValueClassName}
        >
          {metric.valueLabel}
        </BodyText>
        <Caption className="text-textSecondary">{metric.contextLine}</Caption>
      </div>
    </Card>
  );
}
