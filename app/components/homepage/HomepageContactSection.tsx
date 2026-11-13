import { ContactChannelRow } from "@/app/components/homepage/ContactChannelRow";
import {
  homepageContactChannelsConfiguration,
  homepageContactSectionCopyConfiguration,
} from "@/app/config/homepageContactConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  homepageAnchoredSectionScrollMarginPolicy,
  homepageContactSectionPolicy,
  homepageProjectsSectionPolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageContactSection() {
  return (
    <section
      id={homepageSectionAnchorConfiguration.contactSectionDomId}
      aria-labelledby="homepage-contact-heading"
      className={[
        homepageContactSectionPolicy.sectionClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
      data-test="homepage-contact-section"
    >
        <header
          className={[
            homepageProjectsSectionPolicy.headerStackClassName,
            homepageProjectsSectionPolicy.headingMaxWidthClassName,
          ].join(" ")}
        >
          <Heading level="h2" id="homepage-contact-heading">
            {homepageContactSectionCopyConfiguration.sectionHeading}
          </Heading>
          {homepageContactSectionCopyConfiguration.sectionIntroLines.map(
            (line, index) => (
              <BodyText
                key={`contact-intro-${index}`}
                className={[
                  homepageProjectsSectionPolicy.introMaxWidthClassName,
                  "text-textSecondary",
                ].join(" ")}
              >
                {line}
              </BodyText>
            ),
          )}
        </header>

        <ul className={homepageContactSectionPolicy.channelListClassName}>
          {homepageContactChannelsConfiguration.map((channel) => (
            <ContactChannelRow key={channel.channelKey} channel={channel} />
          ))}
        </ul>
    </section>
  );
}
