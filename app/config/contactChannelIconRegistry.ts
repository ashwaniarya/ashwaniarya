import type { IconType } from "react-icons";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiWhatsapp } from "react-icons/si";
import { TbMail, TbMapPin, TbPhone } from "react-icons/tb";

import type { ContactChannelKey } from "@/app/config/homepageContactConfiguration";

const contactChannelIconByKey: Readonly<Record<ContactChannelKey, IconType>> = {
  email: TbMail,
  call: TbPhone,
  whatsapp: SiWhatsapp,
  location: TbMapPin,
  github: SiGithub,
  linkedin: FaLinkedin,
};

export function resolveContactChannelIcon(
  channelKey: ContactChannelKey,
): IconType {
  return contactChannelIconByKey[channelKey];
}
