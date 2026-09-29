import Image from "next/image";
import { TbArrowRight } from "react-icons/tb";

import { Button3D } from "@/app/components/three/Button3D";
import {
  homepageSelectedWorkSectionCopyConfiguration,
  type SelectedWorkRecord,
} from "@/app/config/portfolioSelectedWorkConfiguration";
import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

export type SelectedWorkTileProps = Readonly<{
  work: SelectedWorkRecord;
}>;

export function SelectedWorkTile({ work }: SelectedWorkTileProps) {
  const { screenshot, caseStudyHref, sourceUrl } = work;

  return (
    <article className="flex h-full flex-col gap-3">
      <Button3D
        variant="card"
        href={caseStudyHref ?? work.liveUrl}
        isExternal={!caseStudyHref}
        className={homepageSelectedWorkSectionPolicy.tileLinkClassName}
      >
        <figure className={homepageSelectedWorkSectionPolicy.tileFigureClassName}>
          <picture>
            <source srcSet={screenshot.webpSrc} type="image/webp" />
            <Image
              src={screenshot.pngSrc}
              alt={screenshot.alt}
              width={screenshot.width}
              height={screenshot.height}
              sizes={homepageSelectedWorkSectionPolicy.tileImageSizes}
              className={homepageSelectedWorkSectionPolicy.tileImageClassName}
              unoptimized
            />
          </picture>
        </figure>
        <div className="mt-4 space-y-1">
          <Caption>{work.kicker}</Caption>
          <Heading level="h3">{work.title}</Heading>
          <BodyText size="sm" className="text-textSecondary">
            {work.summary}
          </BodyText>
          {caseStudyHref ? (
            <span className={homepageSelectedWorkSectionPolicy.tileCaseStudyCueClassName}>
              {homepageSelectedWorkSectionCopyConfiguration.caseStudyCueLabel}
              <TbArrowRight
                aria-hidden
                className={homepageSelectedWorkSectionPolicy.tileCaseStudyCueIconClassName}
              />
            </span>
          ) : null}
        </div>
      </Button3D>
      <div className={homepageSelectedWorkSectionPolicy.tileMetaRowClassName}>
        <ul className={homepageSelectedWorkSectionPolicy.stackListClassName}>
          {work.stackLabels.map((label) => (
            <li key={label} className={homepageSelectedWorkSectionPolicy.stackChipClassName}>
              {label}
            </li>
          ))}
        </ul>
        {caseStudyHref || sourceUrl ? (
          <div className={homepageSelectedWorkSectionPolicy.tileSecondaryLinksClassName}>
            {caseStudyHref ? (
              <Button3D variant="externalLink" href={work.liveUrl} isExternal className="text-sm">
                {homepageSelectedWorkSectionCopyConfiguration.liveLinkLabel}
              </Button3D>
            ) : null}
            {sourceUrl ? (
              <Button3D variant="externalLink" href={sourceUrl} isExternal className="text-sm">
                {homepageSelectedWorkSectionCopyConfiguration.sourceLinkLabel}
              </Button3D>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
