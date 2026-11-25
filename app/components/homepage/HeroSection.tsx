import { MicroEyeIcon } from "@/app/components/icons/MicroIcons";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { HomepageHeroProfileImage } from "@/app/components/homepage/HomepageHeroProfileImage";
import { InteractiveLink } from "@/app/components/content/InteractiveLink";
import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  editorialGradientTitlePolicy,
  homepageAnchoredSectionScrollMarginPolicy,
  homepageHeroPolicy,
  meshEditorialSurfacePolicy,
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
      <MeshGlowBackdrop
        className={[
          meshEditorialSurfacePolicy.shellBaseClassName,
          meshEditorialSurfacePolicy.homepageMeshShellShadowClassName,
          meshEditorialSurfacePolicy.homepageHeroPaddingClassName,
        ].join(" ")}
      >
        <div className={homepageHeroPolicy.heroImageWrapperClassName}>
          <HomepageHeroProfileImage />
        </div>
        <div className={homepageHeroPolicy.heroTitleStackClassName}>
          <EditorialAccentMark variant="horizontalTitle" />
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
              className={editorialGradientTitlePolicy.gradientTextClassName}
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
          <InteractiveLink
            variant="primary"
            href={`#${homepageSectionAnchorConfiguration.projectsSectionDomId}`}
          >
            <span className="inline-flex items-center gap-2">
              <MicroEyeIcon className="h-4 w-4" />
              View work
            </span>
          </InteractiveLink>
        </div>
      </MeshGlowBackdrop>
    </section>
  );
}
