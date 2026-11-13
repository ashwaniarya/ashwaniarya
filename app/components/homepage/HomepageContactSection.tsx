import { ContactChannelRow } from "@/app/components/homepage/ContactChannelRow";
import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageContactChannelsConfiguration,
  homepageContactSectionCopyConfiguration,
} from "@/app/config/homepageContactConfiguration";
import { homepageSectionAnchorConfiguration } from "@/app/config/homepageSectionAnchorConfiguration";
import {
  homepageAnchoredSectionScrollMarginPolicy,
  homepageContactSectionPolicy,
  homepageProjectsSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageContactSection() {
  return (
    <ScrollHighlightSection
      id={homepageSectionAnchorConfiguration.contactSectionDomId}
      aria-labelledby="homepage-contact-heading"
      className={[
        homepageContactSectionPolicy.sectionClassName,
        homepageAnchoredSectionScrollMarginPolicy.scrollMarginTopClassName,
      ].join(" ")}
      data-test="homepage-contact-section"
    >
      <MeshGlowBackdrop
        className={[
          meshEditorialSurfacePolicy.shellBaseClassName,
          meshEditorialSurfacePolicy.homepageMeshShellShadowClassName,
          meshEditorialSurfacePolicy.homepageProjectsPaddingClassName,
        ].join(" ")}
      >
        <header
          className={[
            homepageProjectsSectionPolicy.headerStackClassName,
            homepageProjectsSectionPolicy.headingMaxWidthClassName,
          ].join(" ")}
        >
          <EditorialAccentMark
            variant="horizontalTitle"
            className={homepageScrollHighlightPolicy.accentBarClassName}
          />
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id="homepage-contact-heading">
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
          {homepageContactChannelsConfiguration.map((channel, index) => (
            <ContactChannelRow key={channel.channelKey} channel={channel} staggerIndex={index} />
          ))}
        </ul>
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
