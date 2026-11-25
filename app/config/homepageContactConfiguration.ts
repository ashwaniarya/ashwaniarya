export type ContactChannelKey =
  | "email"
  | "call"
  | "whatsapp"
  | "location"
  | "github";

export type ContactChannelRecord = Readonly<{
  channelKey: ContactChannelKey;
  rowLabel: string;
  displayText: string;
  href?: string;
}>;

export const homepageContactSectionCopyConfiguration = {
  sectionHeading: "Contact",
  sectionIntroLines: [
    "Reach out about a product engineering role, a contract build, or a quick hello. I am in Bengaluru and open to remote or Bengaluru, full-time or contract.",
  ],
} as const;

export const homepageContactChannelsConfiguration = [
  {
    channelKey: "email",
    rowLabel: "Email",
    displayText: "ashwaniparker@gmail.com",
    href: "mailto:ashwaniparker@gmail.com",
  },
  {
    channelKey: "call",
    rowLabel: "Call",
    displayText: "+91 79797 68174",
    href: "tel:+917979768174",
  },
  {
    channelKey: "whatsapp",
    rowLabel: "WhatsApp",
    displayText: "+91 79797 68174",
    href: "https://wa.me/917979768174",
  },
  {
    channelKey: "location",
    rowLabel: "Address",
    displayText: "Bengaluru (IST), open to remote",
  },
  {
    channelKey: "github",
    rowLabel: "GitHub",
    displayText: "github.com/ashwaniarya",
    href: "https://github.com/ashwaniarya",
  },
] as const satisfies readonly ContactChannelRecord[];
