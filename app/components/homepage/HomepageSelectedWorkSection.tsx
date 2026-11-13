import { SelectedWorkTile } from "@/app/components/homepage/SelectedWorkTile";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  getAllSelectedWork,
  homepageSelectedWorkSectionCopyConfiguration,
} from "@/app/config/portfolioSelectedWorkConfiguration";
import {
  homepageAnchoredSectionScrollMarginPolicy,
  homepageProjectsSectionPolicy,
  homepageSelectedWorkSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageSelectedWorkSection() {
  const work = getAllSelectedWork();

  return (
    <ScrollHighlightSection
      id={homepageSectionAnchorConfiguration.selectedWorkSectionDomId}
      aria-labelledby="homepage-selected-work-heading"
      className={[
        homepageProjectsSectionPolicy.sectionClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
      data-test="homepage-selected-work-section"
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
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-selected-work-heading">
            {homepageSelectedWorkSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageSelectedWorkSectionCopyConfiguration.sectionIntroLines.map((line, index) => (
            <BodyText
              key={`selected-work-intro-${index}`}
              className={[homepageProjectsSectionPolicy.introMaxWidthClassName, "text-textSecondary"].join(" ")}
            >
              {line}
            </BodyText>
          ))}
        </header>

        <ul className={homepageSelectedWorkSectionPolicy.tilesListClassName}>
          {work.map((item, index) => (
            <li
              key={item.slug}
              className={`min-w-0 ${homepageScrollHighlightPolicy.staggerItemClassName}`}
              style={{ transitionDelay: `${index * homepageScrollHighlightPolicy.staggerStepMilliseconds}ms` }}
            >
              <SelectedWorkTile work={item} />
            </li>
          ))}
        </ul>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
