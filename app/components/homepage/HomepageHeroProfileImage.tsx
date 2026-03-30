import Image from "next/image";

import { homepageHeroMediaConfiguration } from "@/app/config/homepageConfiguration";
import { homepageHeroPolicy } from "@/app/constants/policy";

export function HomepageHeroProfileImage() {
  const { pngSrc, webpSrc, alt } = homepageHeroMediaConfiguration.profileImage;

  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <Image
        src={pngSrc}
        alt={alt}
        width={homepageHeroPolicy.heroImageSizePx}
        height={homepageHeroPolicy.heroImageSizePx}
        sizes={homepageHeroPolicy.heroProfileImageSizes}
        className={homepageHeroPolicy.heroProfileRasterImageClassName}
        priority
        unoptimized
      />
    </picture>
  );
}
