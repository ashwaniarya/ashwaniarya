import { HomepageSectionShell } from "@/app/components/homepage/HomepageSectionShell";
import { homepageAboutMeCopyConfiguration } from "@/app/config/homepageConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  homepageAboutMeSectionPolicy,
  homepageAnchoredSectionScrollMarginPolicy,
} from "@/app/constants/policy";
import { BodyText } from "@/design-system/tokens/Typography";

export function HomepageAboutMeSection() {
  return (
    <HomepageSectionShell
      id={homepageSectionAnchorConfiguration.aboutSectionDomId}
      headingId="homepage-about-me-heading"
      heading={homepageAboutMeCopyConfiguration.sectionHeading}
      className={[
        homepageAboutMeSectionPolicy.sectionClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
      data-test="homepage-about-me-section"
    >
      <div className={homepageAboutMeSectionPolicy.bodyStackClassName}>
        {homepageAboutMeCopyConfiguration.paragraphs.map((paragraph) => (
          <BodyText key={paragraph} className="text-textSecondary">
            {paragraph}
          </BodyText>
        ))}
      </div>
    </HomepageSectionShell>
  );
}
