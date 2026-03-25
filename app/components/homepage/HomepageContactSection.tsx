import { ContactChannelRow } from "@/app/components/homepage/ContactChannelRow";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageContactChannelsConfiguration,
  homepageContactSectionCopyConfiguration,
} from "@/app/config/homepageContactConfiguration";
import {
  homepageContactSectionPolicy,
  homepageProjectsSectionPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export function HomepageContactSection() {
  return (
    <section
      id="contact"
      aria-labelledby="homepage-contact-heading"
      className={homepageContactSectionPolicy.sectionClassName}
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
          <EditorialAccentMark variant="horizontalTitle" />
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
      </MeshGlowBackdrop>
    </section>
  );
}
