import { HomepageSectionShell } from "@/app/components/homepage/HomepageSectionShell";
import {
  homepageWorkHistoryConfiguration,
  homepageWorkHistorySectionCopyConfiguration,
} from "@/app/config/homepageWorkHistoryConfiguration";
import { homepageExperienceSectionPolicy } from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageExperienceSection() {
  return (
    <HomepageSectionShell
      headingId="homepage-experience-heading"
      heading={homepageWorkHistorySectionCopyConfiguration.sectionHeading}
      introLines={homepageWorkHistorySectionCopyConfiguration.sectionIntroLines}
      className={homepageExperienceSectionPolicy.sectionClassName}
      data-test="homepage-experience-section"
    >
      <ol className={homepageExperienceSectionPolicy.timelineListClassName}>
        {homepageWorkHistoryConfiguration.map((role) => (
          <li key={role.roleKey} className={homepageExperienceSectionPolicy.timelineItemClassName}>
            <span aria-hidden="true" className={homepageExperienceSectionPolicy.timelineDotClassName} />
            <div className={homepageExperienceSectionPolicy.timelineHeaderRowClassName}>
              <Heading level="h3">
                {role.company}
                {"engagementLabel" in role ? (
                  <span className={homepageExperienceSectionPolicy.timelineEngagementTagClassName}>
                    {role.engagementLabel}
                  </span>
                ) : null}
              </Heading>
              <span className={homepageExperienceSectionPolicy.timelineMetaClassName}>{role.dateRange}</span>
            </div>
            <BodyText size="sm" className="text-textPrimary">
              {role.title}
            </BodyText>
            {role.detailLines.length > 0 ? (
              <ul className={homepageExperienceSectionPolicy.timelineDetailListClassName}>
                {role.detailLines.map((line) => (
                  <li key={line}>
                    <BodyText size="sm" className="text-textSecondary">
                      {line}
                    </BodyText>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
      <p className={homepageExperienceSectionPolicy.educationLineClassName}>
        {homepageWorkHistorySectionCopyConfiguration.educationLine}
      </p>
    </HomepageSectionShell>
  );
}
