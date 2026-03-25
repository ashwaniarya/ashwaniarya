import { TechnologyCategoryCard } from "@/app/components/homepage/TechnologyCategoryCard";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { homepageTechnologyStackCategoriesConfiguration } from "@/app/config/homepageTechnologyStackConfiguration";
import { homepageTechnologyStackSectionCopyConfiguration } from "@/app/config/homepageConfiguration";
import {
  homepageProjectsSectionPolicy,
  homepageTechnologyStackSectionPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageTechnologyStackSection() {
  return (
    <section
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
          <EditorialAccentMark variant="horizontalTitle" />
          <Heading level="h2" id="homepage-technology-stack-heading">
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
          {homepageTechnologyStackCategoriesConfiguration.map((category) => (
            <li key={category.categoryTitle} className="min-w-0">
              <TechnologyCategoryCard
                categoryTitle={category.categoryTitle}
                itemLabels={category.itemLabels}
              />
            </li>
          ))}
        </ul>
      </MeshGlowBackdrop>
    </section>
  );
}
