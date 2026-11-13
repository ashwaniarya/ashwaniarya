import { ExperienceFocusAreaTile } from "@/app/components/homepage/ExperienceFocusAreaTile";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageExperienceFocusAreasConfiguration,
  homepageExperienceSectionCopyConfiguration,
} from "@/app/config/homepageExperienceConfiguration";
import {
  homepageExperienceSectionPolicy,
  homepageProjectsSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageExperienceSection() {
  return (
    <ScrollHighlightSection
      aria-labelledby="homepage-experience-heading"
      className={homepageExperienceSectionPolicy.sectionClassName}
      data-test="homepage-experience-section"
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
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-experience-heading">
            {homepageExperienceSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageExperienceSectionCopyConfiguration.sectionIntroLines.map((line, index) => (
            <BodyText
              key={`experience-intro-${index}`}
              className={[
                homepageProjectsSectionPolicy.introMaxWidthClassName,
                "text-textSecondary",
              ].join(" ")}
            >
              {line}
            </BodyText>
          ))}
        </header>

        <ul className={homepageExperienceSectionPolicy.focusAreaCardsListClassName}>
          {homepageExperienceFocusAreasConfiguration.map((focusArea, index) => (
            <li
              key={focusArea.focusAreaKey}
              className={`min-w-0 ${homepageScrollHighlightPolicy.staggerItemClassName}`}
              style={{ transitionDelay: `${index * homepageScrollHighlightPolicy.staggerStepMilliseconds}ms` }}
            >
              <ExperienceFocusAreaTile focusArea={focusArea} />
            </li>
          ))}
        </ul>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
