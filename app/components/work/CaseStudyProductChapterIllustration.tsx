import Image from "next/image";

import type { CaseStudyProductChapterIllustrationConfiguration } from "@/app/config/portfolioCaseStudiesConfiguration";
import { caseStudyProductChapterPolicy } from "@/app/constants/policy";

export type CaseStudyProductChapterIllustrationProps = Readonly<{
  illustration: CaseStudyProductChapterIllustrationConfiguration;
}>;

export function CaseStudyProductChapterIllustration({
  illustration,
}: CaseStudyProductChapterIllustrationProps) {
  const { webpSrc, pngSrc, alt, width, height } = illustration;

  return (
    <figure className={caseStudyProductChapterPolicy.chapterIllustrationFigureClassName}>
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <Image
          src={pngSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={caseStudyProductChapterPolicy.chapterIllustrationImageSizes}
          className={caseStudyProductChapterPolicy.chapterIllustrationImageClassName}
          unoptimized
        />
      </picture>
    </figure>
  );
}
