import { createElement } from "react";
import { TbArrowLeft } from "react-icons/tb";

import { EditorialAccentMark } from "@/app/components/layout/EditorialAccentMark";
import { Button3D } from "@/app/components/three/Button3D";
import type {
  PulseboardCaseStudyConfiguration,
  PulseboardCaseStudyLinkRecord,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { resolvePulseboardCaseStudyLinkIcon } from "@/app/config/pulseboardCaseStudyIconRegistry";
import { primaryHomepageNavigationHref } from "@/app/config/siteConfiguration";
import {
  caseStudyArticleShellPolicy,
  editorialGradientTitlePolicy,
  pulseboardCaseStudyPagePolicy,
  type Button3DVariant,
} from "@/app/constants/policy";
import { BodyText, Heading } from "@/design-system/tokens/Typography";

import { ExternalTextLink } from "../ExternalTextLink";
import { PulseboardChipList } from "./PulseboardChipList";

export type PulseboardCaseStudyHeaderProps = Readonly<{
  header: PulseboardCaseStudyConfiguration["header"];
  links: PulseboardCaseStudyConfiguration["links"];
}>;

type PulseboardCaseStudyHeaderLinkProps = Readonly<{
  link: PulseboardCaseStudyLinkRecord;
  variant: Button3DVariant;
}>;

function PulseboardCaseStudyHeaderLink({ link, variant }: PulseboardCaseStudyHeaderLinkProps) {
  return (
    <ExternalTextLink
      href={link.href}
      isExternal
      variant={variant}
      className={pulseboardCaseStudyPagePolicy.headerLinkButtonClassName}
    >
      {createElement(resolvePulseboardCaseStudyLinkIcon(link.linkKey), {
        "aria-hidden": true,
        className: pulseboardCaseStudyPagePolicy.headerLinkIconClassName,
      })}
      {link.label}
    </ExternalTextLink>
  );
}

export function PulseboardCaseStudyHeader({ header, links }: PulseboardCaseStudyHeaderProps) {
  return (
    <header className={caseStudyArticleShellPolicy.caseStudyHeaderCardClassName}>
      <Button3D
        variant="inlineLink"
        href={primaryHomepageNavigationHref.work}
        className={pulseboardCaseStudyPagePolicy.backLinkClassName}
      >
        <TbArrowLeft aria-hidden className={pulseboardCaseStudyPagePolicy.backLinkIconClassName} />
        {header.backLinkLabel}
      </Button3D>
      <EditorialAccentMark variant="horizontalTitle" />
      <div className={pulseboardCaseStudyPagePolicy.kickerAndTitleStackClassName}>
        <p className={pulseboardCaseStudyPagePolicy.kickerRowClassName}>
          <span aria-hidden="true" className={pulseboardCaseStudyPagePolicy.kickerRailClassName} />
          {header.kicker}
        </p>
        <Heading level="h1" className={editorialGradientTitlePolicy.gradientTextClassName}>
          {header.title}
        </Heading>
      </div>
      <BodyText className="text-textSecondary">{header.tagline}</BodyText>
      <PulseboardChipList chipLabels={header.stackLabels} />
      <ul className={pulseboardCaseStudyPagePolicy.headerLinkListClassName}>
        <li>
          <PulseboardCaseStudyHeaderLink link={links.primaryLink} variant="primary" />
        </li>
        {links.secondaryLinks.map((link) => (
          <li key={link.linkKey}>
            <PulseboardCaseStudyHeaderLink link={link} variant="pillLink" />
          </li>
        ))}
      </ul>
    </header>
  );
}
