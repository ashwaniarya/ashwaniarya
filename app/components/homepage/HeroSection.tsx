"use client";

import { useRef } from "react";

import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { HomepageHeroProfileImage } from "@/app/components/homepage/HomepageHeroProfileImage";
import { ScrollScrubbedHighlightTextBlock } from "@/app/components/motion/ScrollScrubbedHighlightTextBlock";
import { homepageHeroCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  editorialGradientTitlePolicy,
  homepageAnchoredSectionScrollMarginPolicy,
  homepageHeroPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { Heading } from "@/design-system/tokens/Typography";

export function HeroSection() {
  const homepageHeroSectionReference = useRef<HTMLElement>(null);

  return (
    <section
      ref={homepageHeroSectionReference}
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
            <ScrollScrubbedHighlightTextBlock
              lines={homepageHeroCopyConfiguration.descriptionLines}
              sectionRef={homepageHeroSectionReference}
              paragraphClassName="mx-auto max-w-prose text-center"
            />
          </div>
        </div>
      </MeshGlowBackdrop>
    </section>
  );
}
