import type { IconType } from "react-icons";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { TbMail, TbMapPin, TbPhone } from "react-icons/tb";

import type { ContactChannelKey } from "@/app/config/homepageContactConfiguration";

const contactChannelIconByKey: Readonly<Record<ContactChannelKey, IconType>> = {
  email: TbMail,
  call: TbPhone,
  whatsapp: SiWhatsapp,
  location: TbMapPin,
  github: SiGithub,
};

export function resolveContactChannelIcon(
  channelKey: ContactChannelKey,
): IconType {
  return contactChannelIconByKey[channelKey];
}
