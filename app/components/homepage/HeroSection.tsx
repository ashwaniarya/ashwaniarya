import Image from "next/image";

import {
  homepageHeroCopyConfiguration,
  homepageHeroMediaConfiguration,
} from "@/app/config/homepageConfiguration";
import { homepageHeroPolicy } from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HeroSection() {
  return (
    <section
      data-test="homepage-section"
      className={homepageHeroPolicy.heroSectionSpacingClassName}
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
      <div
        className={[
          homepageHeroPolicy.heroTextWrapperClassName,
          homepageHeroPolicy.heroTextAlignmentClassName,
          homepageHeroPolicy.heroTextStackSpacingClassName,
        ].join(" ")}
      >
        <Heading level="h1">{homepageHeroCopyConfiguration.headline}</Heading>
        {homepageHeroCopyConfiguration.descriptionLines.map((descriptionLine) => (
          <BodyText
            key={descriptionLine}
            className="max-w-prose text-textPrimary/80"
          >
            {descriptionLine}
          </BodyText>
        ))}
      </div>
    </section>
  );
}
