import Image from "next/image";

import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageHeroCopyConfiguration,
  homepageHeroMediaConfiguration,
} from "@/app/config/homepageConfiguration";
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
          <Image
            src={homepageHeroMediaConfiguration.profileImage.src}
            alt={homepageHeroMediaConfiguration.profileImage.alt}
            width={homepageHeroPolicy.heroImageSizePx}
            height={homepageHeroPolicy.heroImageSizePx}
            priority
          />
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
        </div>
      </MeshGlowBackdrop>
    </section>
  );
}
