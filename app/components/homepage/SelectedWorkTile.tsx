import Image from "next/image";

import { Button3D } from "@/app/components/three/Button3D";
import type { SelectedWorkRecord } from "@/app/config/portfolioSelectedWorkConfiguration";
import { homepageSelectedWorkSectionPolicy } from "@/app/constants/policy";
import { BodyText, Caption, Heading } from "@/design-system/tokens/Typography";

export type SelectedWorkTileProps = Readonly<{
  work: SelectedWorkRecord;
}>;

export function SelectedWorkTile({ work }: SelectedWorkTileProps) {
  const { screenshot } = work;

  return (
    <article className="flex h-full flex-col gap-3">
      <Button3D
        variant="card"
        href={work.liveUrl}
        isExternal
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
        {work.sourceUrl ? (
          <Button3D variant="externalLink" href={work.sourceUrl} isExternal className="text-sm">
            Source
          </Button3D>
        ) : null}
      </div>
    </article>
  );
}
