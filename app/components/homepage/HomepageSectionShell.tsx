import type { ComponentProps, ReactNode } from "react";

import { ScrollHighlightSection } from "@/app/components/homepage/ScrollHighlightSection";
import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import {
  homepageProjectsSectionPolicy,
  homepageScrollHighlightPolicy,
  meshEditorialSurfacePolicy,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

export type HomepageSectionShellProps = Readonly<
  Omit<ComponentProps<"section">, "children"> & {
    headingId: string;
    heading: string;
    introLines?: readonly string[];
    children: ReactNode;
  }
>;

/** Mesh card + accent bar + h2 + intro lines, shared by the newer homepage sections. */
export function HomepageSectionShell({
  headingId,
  heading,
  introLines = [],
  children,
  ...sectionProps
}: HomepageSectionShellProps) {
  return (
    <ScrollHighlightSection aria-labelledby={headingId} {...sectionProps}>
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
          <Heading level="h2" className={homepageScrollHighlightPolicy.headingClassName} id={headingId}>
            {heading}
          </Heading>
          {introLines.map((line) => (
            <BodyText
              key={line}
              className={[homepageProjectsSectionPolicy.introMaxWidthClassName, "text-textSecondary"].join(" ")}
            >
              {line}
            </BodyText>
          ))}
        </header>
        {children}
      </MeshGlowBackdrop>
    </ScrollHighlightSection>
  );
}
