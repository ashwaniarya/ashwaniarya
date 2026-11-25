import { CustomApplicationCard } from "@/app/components/homepage/CustomApplicationCard";
import { OutcomesCarousel } from "@/app/components/homepage/OutcomesCarousel";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { ServiceCard } from "@/app/components/homepage/ServiceCard";
import { ServiceInquiryDialogProvider } from "@/app/components/homepage/ServiceInquiryDialog";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageServicesConfiguration,
  homepageServicesSectionCopyConfiguration,
} from "@/app/config/homepageServicesConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  homepageProductionProofSectionPolicy,
  homepageProjectsSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

/** Contra services plus a Custom application card, in the same carousel as Outcomes achieved. */
export function HomepageServicesSection() {
  const copy = homepageServicesSectionCopyConfiguration;
  return (
    <ScrollHighlightSection
      id={homepageSectionAnchorConfiguration.servicesSectionDomId}
      aria-labelledby="homepage-services-heading"
      className={homepageProductionProofSectionPolicy.sectionClassName}
      data-test="homepage-services-section"
    >
      <MeshGlowBackdrop
        className={[
          meshEditorialSurfacePolicy.shellBaseClassName,
          meshEditorialSurfacePolicy.homepageMeshShellShadowClassName,
          meshEditorialSurfacePolicy.homepageProjectsPaddingClassName,
        ].join(" ")}
      >
        <header className={[homepageProjectsSectionPolicy.headerStackClassName, homepageProjectsSectionPolicy.headingMaxWidthClassName].join(" ")}>
          <EditorialAccentMark variant="horizontalTitle" className={homepageScrollHighlightPolicy.accentBarClassName} />
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-services-heading">
            {copy.sectionHeading}
          </Heading>
          {copy.sectionIntroLines.map((line, index) => (
            <BodyText key={`services-intro-${index}`} className={[homepageProjectsSectionPolicy.introMaxWidthClassName, "text-textSecondary"].join(" ")}>
              {line}
            </BodyText>
          ))}
        </header>
        <ServiceInquiryDialogProvider>
        <OutcomesCarousel
          label={copy.carouselLabel}
          pageNoun={copy.carouselPageNoun}
          itemClassName={homepageScrollHighlightPolicy.staggerItemClassName}
          staggerStepMilliseconds={homepageScrollHighlightPolicy.staggerStepMilliseconds}
        >
          {[
            ...homepageServicesConfiguration.map((service) => <ServiceCard key={service.serviceKey} service={service} />),
            <CustomApplicationCard key="customApplication" />,
          ]}
        </OutcomesCarousel>
        </ServiceInquiryDialogProvider>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
