import { TbArrowRight } from "react-icons/tb";

import { SelectedWorkTilePreview } from "@/app/components/homepage/SelectedWorkTilePreview";
import { InteractiveLink } from "@/app/components/content/InteractiveLink";
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
  const { tilePreview, caseStudyHref, sourceUrl } = work;

  return (
    <article className="flex h-full flex-col gap-3">
      <InteractiveLink
        variant="card"
        href={caseStudyHref ?? work.liveUrl}
        isExternal={!caseStudyHref}
        className={homepageSelectedWorkSectionPolicy.tileLinkClassName}
      >
        <SelectedWorkTilePreview tilePreview={tilePreview} />
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
      </InteractiveLink>
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
              <InteractiveLink variant="externalLink" href={work.liveUrl} isExternal className="text-sm">
                {homepageSelectedWorkSectionCopyConfiguration.liveLinkLabel}
              </InteractiveLink>
            ) : null}
            {sourceUrl ? (
              <InteractiveLink variant="externalLink" href={sourceUrl} isExternal className="text-sm">
                {homepageSelectedWorkSectionCopyConfiguration.sourceLinkLabel}
              </InteractiveLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}
