import { SelectedWorkTile } from "@/app/components/homepage/SelectedWorkTile";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  getAllSelectedWork,
  homepageSelectedWorkSectionCopyConfiguration,
} from "@/app/config/portfolioSelectedWorkConfiguration";
import {
  homepageAnchoredSectionScrollMarginPolicy,
  homepageProjectsSectionPolicy,
  homepageSelectedWorkSectionPolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageSelectedWorkSection() {
  const work = getAllSelectedWork();

  return (
    <section
      id={homepageSectionAnchorConfiguration.selectedWorkSectionDomId}
      aria-labelledby="homepage-selected-work-heading"
      className={[
        homepageProjectsSectionPolicy.sectionClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
      data-test="homepage-selected-work-section"
    >
        <header
          className={[
            homepageProjectsSectionPolicy.headerStackClassName,
            homepageProjectsSectionPolicy.headingMaxWidthClassName,
          ].join(" ")}
        >
          <Heading level="h2" id="homepage-selected-work-heading">
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
          {work.map((item) => (
            <li key={item.slug} className="min-w-0">
              <SelectedWorkTile work={item} />
            </li>
          ))}
        </ul>
    </section>
  );
}
