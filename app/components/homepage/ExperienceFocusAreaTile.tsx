import { createElement } from "react";

import { Card } from "@/app/components/content/Card";
import type { ExperienceFocusAreaRecord } from "@/app/config/homepageExperienceConfiguration";
import { resolveExperienceFocusAreaIcon } from "@/app/config/experienceFocusAreaIconRegistry";
import { homepageExperienceSectionPolicy } from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export type ExperienceFocusAreaTileProps = Readonly<{
  focusArea: ExperienceFocusAreaRecord;
}>;

export function ExperienceFocusAreaTile({ focusArea }: ExperienceFocusAreaTileProps) {
  const Icon = resolveExperienceFocusAreaIcon(focusArea.focusAreaKey);

  return (
    <Card className="h-full">
      <div className={homepageExperienceSectionPolicy.focusAreaTileRowClassName}>
        <span className={homepageExperienceSectionPolicy.focusAreaTileIconBadgeClassName}>
          {createElement(Icon, {
            "aria-hidden": true,
            className: homepageExperienceSectionPolicy.focusAreaTileIconClassName,
          })}
        </span>
        <div className={homepageExperienceSectionPolicy.focusAreaTileTextStackClassName}>
          <Heading level="h3">{focusArea.titleLine}</Heading>
          <BodyText size="sm" className="text-textSecondary">
            {focusArea.detailLine}
          </BodyText>
        </div>
      </div>
    </Card>
  );
}
