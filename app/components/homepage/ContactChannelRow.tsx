import { createElement } from "react";

import { ContactSemanticLink } from "@/app/components/homepage/ContactSemanticLink";
import { ExternalTextLink } from "@/app/components/work/ExternalTextLink";
import type { ContactChannelRecord } from "@/app/config/homepageContactConfiguration";
import { resolveContactChannelIcon } from "@/app/config/contactChannelIconRegistry";
import { homepageContactSectionPolicy } from "@/app/constants/policy";

export type ContactChannelRowProps = Readonly<{
  channel: ContactChannelRecord;
}>;

export function ContactChannelRow({ channel }: ContactChannelRowProps) {
  const href = channel.href;
  const isMailOrTel =
    href !== undefined &&
    (href.startsWith("mailto:") || href.startsWith("tel:"));

  const channelGlyph = createElement(resolveContactChannelIcon(channel.channelKey), {
    "aria-hidden": true,
    className: homepageContactSectionPolicy.channelIconClassName,
  });

  return (
    <li className={homepageContactSectionPolicy.channelRowClassName}>
      {channelGlyph}
      <span className={homepageContactSectionPolicy.channelLabelClassName}>
        {channel.rowLabel}
      </span>
      <div className={homepageContactSectionPolicy.channelValueClassName}>
        {href === undefined ? (
          <span className="text-textPrimary">{channel.displayText}</span>
        ) : isMailOrTel ? (
          <ContactSemanticLink href={href}>{channel.displayText}</ContactSemanticLink>
        ) : (
          <ExternalTextLink href={href} isExternal>
            {channel.displayText}
          </ExternalTextLink>
        )}
      </div>
    </li>
  );
}
