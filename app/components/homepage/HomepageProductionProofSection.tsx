import { ProductionProofMetricTile } from "@/app/components/homepage/ProductionProofMetricTile";
import {
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
} from "@/app/config/homepageProductionProofConfiguration";
import {
  homepageProductionProofSectionPolicy,
  homepageProjectsSectionPolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageProductionProofSection() {
  return (
    <section
      aria-labelledby="homepage-production-proof-heading"
      className={homepageProductionProofSectionPolicy.sectionClassName}
      data-test="homepage-production-proof-section"
    >
        <header
          className={[
            homepageProjectsSectionPolicy.headerStackClassName,
            homepageProjectsSectionPolicy.headingMaxWidthClassName,
          ].join(" ")}
        >
          <Heading level="h2" id="homepage-production-proof-heading">
            {homepageProductionProofSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageProductionProofSectionCopyConfiguration.sectionIntroLines.map((line, index) => (
            <BodyText
              key={`production-proof-intro-${index}`}
              className={[
                homepageProjectsSectionPolicy.introMaxWidthClassName,
                "text-textSecondary",
              ].join(" ")}
            >
              {line}
            </BodyText>
          ))}
        </header>

        <ul className={homepageProductionProofSectionPolicy.metricCardsListClassName}>
          {homepageProductionProofMetricsConfiguration.map((metric) => (
            <li key={metric.metricKey} className="min-w-0">
              <ProductionProofMetricTile metric={metric} />
            </li>
          ))}
        </ul>
    </section>
  );
}
