import { OutcomesCarousel } from "@/app/components/homepage/OutcomesCarousel";
import { ProductionProofMetricTile } from "@/app/components/homepage/ProductionProofMetricTile";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageProductionProofMetricsConfiguration,
  homepageProductionProofSectionCopyConfiguration,
} from "@/app/config/homepageProductionProofConfiguration";
import {
  homepageProductionProofSectionPolicy,
  homepageProjectsSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageProductionProofSection() {
  return (
    <ScrollHighlightSection
      aria-labelledby="homepage-outcomes-achieved-heading"
      className={homepageProductionProofSectionPolicy.sectionClassName}
      data-test="homepage-production-proof-section"
    >
      <MeshGlowBackdrop
        className={[
          meshEditorialSurfacePolicy.shellBaseClassName,
          meshEditorialSurfacePolicy.homepageMeshShellShadowClassName,
          meshEditorialSurfacePolicy.homepageProjectsPaddingClassName,
        ].join(" ")}
      >
        <header
          className={[
            homepageProjectsSectionPolicy.headerStackClassName,
            homepageProjectsSectionPolicy.headingMaxWidthClassName,
          ].join(" ")}
        >
          <EditorialAccentMark
            variant="horizontalTitle"
            className={homepageScrollHighlightPolicy.accentBarClassName}
          />
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-outcomes-achieved-heading">
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

        <OutcomesCarousel
          label={homepageProductionProofSectionCopyConfiguration.carouselLabel}
          itemClassName={homepageScrollHighlightPolicy.staggerItemClassName}
          staggerStepMilliseconds={homepageScrollHighlightPolicy.staggerStepMilliseconds}
        >
          {homepageProductionProofMetricsConfiguration.map((metric) => (
            <ProductionProofMetricTile key={metric.metricKey} metric={metric} />
          ))}
        </OutcomesCarousel>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
