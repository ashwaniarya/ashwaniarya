import { CaseStudySummaryCard } from "@/app/components/homepage/CaseStudySummaryCard";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { homepageProjectsSectionCopyConfiguration } from "@/app/config/homepageConfiguration";
import { getAllCaseStudies } from "@/app/config/portfolioCaseStudiesConfiguration";
import {
  homepageProjectsSectionPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageProjectsSection() {
  const caseStudies = getAllCaseStudies();

  return (
    <section
      aria-labelledby="homepage-projects-heading"
      className={homepageProjectsSectionPolicy.sectionClassName}
      data-test="homepage-projects-section"
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
          <Heading level="h2" id="homepage-projects-heading">
            {homepageProjectsSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageProjectsSectionCopyConfiguration.sectionIntroLines.map(
            (line, index) => (
              <BodyText
                key={`projects-intro-${index}`}
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

        {caseStudies.length === 0 ? (
          <BodyText className="mt-6 text-textSecondary">
            Case studies will appear here once they are added to the portfolio
            configuration.
          </BodyText>
        ) : (
          <ul className={homepageProjectsSectionPolicy.cardsListClassName}>
            {caseStudies.map((caseStudy) => (
              <li key={caseStudy.slug} className="min-w-0">
                <CaseStudySummaryCard caseStudy={caseStudy} />
              </li>
            ))}
          </ul>
        )}
      </MeshGlowBackdrop>
    </section>
  );
}
