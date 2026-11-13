import { HomepageHeroProfileImage } from "@/app/components/homepage/HomepageHeroProfileImage";
import { Button3D } from "@/app/components/three/Button3D";
import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  homepageAnchoredSectionScrollMarginPolicy,
  homepageHeroPolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HeroSection() {
  return (
    <section
      id={homepageSectionAnchorConfiguration.homeSectionDomId}
      data-test="homepage-section"
      className={[
        homepageHeroPolicy.heroSectionSpacingClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
    >
        <div className={homepageHeroPolicy.heroImageWrapperClassName}>
          <HomepageHeroProfileImage />
        </div>
        <div className={homepageHeroPolicy.heroTitleStackClassName}>
          <div
            className={[
              homepageHeroPolicy.heroTextContrastPanelClassName,
              homepageHeroPolicy.heroTextWrapperClassName,
              homepageHeroPolicy.heroTextAlignmentClassName,
              homepageHeroPolicy.heroTextStackSpacingClassName,
            ].join(" ")}
          >
            <Heading
              level="h1"
            >
              {homepageHeroCopyConfiguration.headline}
            </Heading>
            {homepageHeroCopyConfiguration.descriptionLines.map((descriptionLine) => (
              <BodyText
                key={descriptionLine}
                className="mx-auto max-w-prose text-textSecondary"
              >
                {descriptionLine}
              </BodyText>
            ))}
          </div>
          <Button3D
            variant="primary"
            href={`#${homepageSectionAnchorConfiguration.projectsSectionDomId}`}
          >
            View work
          </Button3D>
        </div>
    </section>
  );
}
