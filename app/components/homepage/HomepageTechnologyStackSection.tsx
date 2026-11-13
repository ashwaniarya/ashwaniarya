import { TechnologyCategoryCard } from "@/app/components/homepage/TechnologyCategoryCard";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { homepageTechnologyStackCategoriesConfiguration } from "@/app/config/homepageTechnologyStackConfiguration";
import { homepageTechnologyStackSectionCopyConfiguration } from "@/app/config/homepageConfiguration";
import {
  homepageProjectsSectionPolicy,
  homepageTechnologyStackSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageTechnologyStackSection() {
  return (
    <ScrollHighlightSection
      aria-labelledby="homepage-technology-stack-heading"
      className={homepageTechnologyStackSectionPolicy.sectionClassName}
      data-test="homepage-technology-stack-section"
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
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-technology-stack-heading">
            {homepageTechnologyStackSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageTechnologyStackSectionCopyConfiguration.sectionIntroLines.map(
            (line, index) => (
              <BodyText
                key={`technology-stack-intro-${index}`}
                className={[
                  homepageProjectsSectionPolicy.introMaxWidthClassName,
                  "text-textSecondary",
                ].join(" ")}
              >
                {line}
              </BodyText>
            ),
          )}
        </header>

        <ul className={homepageProjectsSectionPolicy.cardsListClassName}>
          {homepageTechnologyStackCategoriesConfiguration.map((category, index) => (
            <li
              key={category.categoryTitle}
              className={`min-w-0 ${homepageScrollHighlightPolicy.staggerItemClassName}`}
              style={{ transitionDelay: `${index * homepageScrollHighlightPolicy.staggerStepMilliseconds}ms` }}
            >
              <TechnologyCategoryCard
                categoryTitle={category.categoryTitle}
                itemLabels={category.itemLabels}
              />
            </li>
          ))}
        </ul>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
