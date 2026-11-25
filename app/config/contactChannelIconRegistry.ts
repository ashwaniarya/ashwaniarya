import type { ComponentType } from "react";
import { SiGithub, SiWhatsapp } from "react-icons/si";

import { MicroMailIcon, MicroPhoneIcon, MicroPinIcon } from "@/app/components/icons/MicroIcons";
import type { ContactChannelKey } from "@/app/config/homepageContactConfiguration";

/** Brand marks stay static; mail, phone and location use animated micro icons (play on row hover). */
export type ContactChannelIcon = ComponentType<{ className?: string; "aria-hidden"?: boolean }>;

const contactChannelIconByKey: Readonly<Record<ContactChannelKey, ContactChannelIcon>> = {
  email: MicroMailIcon,
  call: MicroPhoneIcon,
  whatsapp: SiWhatsapp,
  location: MicroPinIcon,
  github: SiGithub,
};

export function resolveContactChannelIcon(channelKey: ContactChannelKey): ContactChannelIcon {
  return contactChannelIconByKey[channelKey];
}
