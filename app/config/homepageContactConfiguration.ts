export type ContactChannelKey =
  | "email"
  | "call"
  | "whatsapp"
  | "location"
  | "github"
  | "linkedin";

export type ContactChannelRecord = Readonly<{
  channelKey: ContactChannelKey;
  rowLabel: string;
  displayText: string;
  href?: string;
}>;

export const homepageContactSectionCopyConfiguration = {
  sectionHeading: "Contact",
  sectionIntroLines: [
    "Reach out for collaborations, product work, or a quick hello—I am remote-first and reply best by email or WhatsApp.",
  ],
} as const;

export const homepageContactChannelsConfiguration = [
  {
    channelKey: "email",
    rowLabel: "Email",
    displayText: "syncoders@gmail.com",
    href: "mailto:syncoders@gmail.com",
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
    displayText: "Remote",
  },
  {
    channelKey: "github",
    rowLabel: "GitHub",
    displayText: "github.com/ashwaniarya",
    href: "https://github.com/ashwaniarya",
  },
  {
    channelKey: "linkedin",
    rowLabel: "LinkedIn",
    displayText: "ashwani-arya",
    href: "https://www.linkedin.com/in/ashwani-arya-1623963a0/",
  },
] as const satisfies readonly ContactChannelRecord[];
