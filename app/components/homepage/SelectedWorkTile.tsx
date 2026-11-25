import { TbArrowRight } from "react-icons/tb";

import { SelectedWorkTilePreview } from "@/app/components/homepage/SelectedWorkTilePreview";
import { InteractiveLink } from "@/app/components/content/InteractiveLink";
import {
  homepageSelectedWorkSectionCopyConfiguration,
  type SelectedWorkRecord,
} from "@/app/config/portfolioSelectedWorkConfiguration";
import { homepageSelectedWorkSectionPolicy as policy } from "@/app/constants/policy";

export type SelectedWorkTileProps = Readonly<{
  work: SelectedWorkRecord;
}>;

/** 3:4 project card: preview, kicker, title (stretched primary link), one-line tagline, chips, footer links. */
export function SelectedWorkTile({ work }: SelectedWorkTileProps) {
  const { tilePreview, caseStudyHref, sourceUrl } = work;
  const copy = homepageSelectedWorkSectionCopyConfiguration;
  const primaryHref = caseStudyHref ?? work.liveUrl;
  const isExternal = !caseStudyHref;

  return (
    <article className={policy.tileCardClassName} data-test="selected-work-card">
      <div className={policy.tilePreviewFrameClassName}>
        <SelectedWorkTilePreview tilePreview={tilePreview} />
      </div>
      <div className={policy.tileBodyClassName}>
        <p className={policy.tileKickerClassName}>{work.kicker}</p>
        <h3 className={policy.tileTitleClassName}>
          <a
            href={primaryHref}
            className={policy.tilePrimaryLinkClassName}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {work.title}
          </a>
        </h3>
        <p className={policy.tileTaglineClassName}>{work.tagline}</p>
        <ul className={policy.stackListClassName} aria-label={`${work.title} stack`}>
          {work.stackLabels.slice(0, policy.tileMaxStackChips).map((label) => (
            <li key={label} className={policy.stackChipClassName}>
              {label}
            </li>
          ))}
        </ul>
        <div className={policy.tileFooterClassName}>
          <span aria-hidden="true" className={policy.tileCaseStudyCueClassName}>
            {caseStudyHref ? copy.caseStudyCueLabel : copy.liveCueLabel}
            <TbArrowRight className={policy.tileCaseStudyCueIconClassName} />
          </span>
          {caseStudyHref || sourceUrl ? (
            <div className={policy.tileSecondaryLinksClassName}>
              {caseStudyHref ? (
                <InteractiveLink variant="externalLink" href={work.liveUrl} isExternal className="text-sm">
                  {copy.liveLinkLabel}
                </InteractiveLink>
              ) : null}
              {sourceUrl ? (
                <InteractiveLink variant="externalLink" href={sourceUrl} isExternal className="text-sm">
                  {copy.sourceLinkLabel}
                </InteractiveLink>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
