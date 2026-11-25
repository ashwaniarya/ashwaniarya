import type { ReactNode } from "react";

/**
 * Small inline SVG icons, each with its own motion (defined in `app/globals.css`, "Micro icons").
 *
 * - `trigger="hover"`: plays while the nearest link, button or `[data-micro-trigger]` ancestor is
 *   hovered or focused.
 * - `trigger="view"`: plays once when the enclosing `ScrollHighlightSection` scrolls into view.
 *
 * Decorative by default (`aria-hidden`, not focusable) and drawn with `currentColor`. All motion
 * sits behind `prefers-reduced-motion: no-preference`, so reduced motion shows the static icon.
 */
export type MicroIconTrigger = "hover" | "view";

export type MicroIconProps = Readonly<{
  className?: string;
  trigger?: MicroIconTrigger;
}>;

export const microIconNames = [
  "code",
  "chart",
  "gear",
  "bolt",
  "chat",
  "mail",
  "phone",
  "pin",
  "arrow-right",
  "arrow-up-right",
  "sparkle",
  "send",
  "close",
  "chevron-left",
  "chevron-right",
  "eye",
] as const;

export type MicroIconName = (typeof microIconNames)[number];

/** What each icon does, used by tests and the PR table. */
export const microIconBehaviours: Readonly<Record<MicroIconName, string>> = {
  code: "brackets slide apart and back",
  chart: "bars grow from the baseline in turn",
  gear: "turns half a revolution",
  bolt: "flickers like a spark",
  chat: "typing dots bounce in sequence",
  mail: "envelope flap opens and closes",
  phone: "handset rings with a quick wiggle",
  pin: "pin drops and bounces",
  "arrow-right": "dashes forward and back",
  "arrow-up-right": "launches out of the corner and comes back in",
  sparkle: "stars twinkle in turn",
  send: "paper plane takes off and lands",
  close: "cross turns a quarter",
  "chevron-left": "nudges left",
  "chevron-right": "nudges right",
  eye: "blinks",
};

function MicroIconSvg({
  name,
  className = "",
  trigger = "hover",
  children,
}: MicroIconProps & Readonly<{ name: MicroIconName; children: ReactNode }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`micro-icon micro-icon-${name} ${className}`.trim()}
      data-micro-icon={name}
      data-trigger={trigger}
    >
      {children}
    </svg>
  );
}

export const MicroCodeIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="code" {...props}>
    <path className="mi-part mi-code-left" d="M8 7l-5 5l5 5" />
    <path className="mi-part mi-code-right" d="M16 7l5 5l-5 5" />
    <path d="M13.5 5l-3 14" />
  </MicroIconSvg>
);

export const MicroChartIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="chart" {...props}>
    <path d="M3 21h18" />
    <path className="mi-part mi-chart-bar mi-chart-bar-1" d="M6 18v-5" />
    <path className="mi-part mi-chart-bar mi-chart-bar-2" d="M12 18v-9" />
    <path className="mi-part mi-chart-bar mi-chart-bar-3" d="M18 18v-13" />
  </MicroIconSvg>
);

export const MicroGearIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="gear" {...props}>
    <g className="mi-part mi-gear-body">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" />
      <circle cx="12" cy="12" r="6.5" />
    </g>
  </MicroIconSvg>
);

export const MicroBoltIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="bolt" {...props}>
    <path className="mi-part mi-bolt-body" d="M13 3L5 14h6l-1 7l8-11h-6z" />
  </MicroIconSvg>
);

export const MicroChatIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="chat" {...props}>
    <path d="M4 5h16v11H9l-5 4z" />
    <path className="mi-part mi-chat-dot mi-chat-dot-1" d="M8.5 10.5h.01" />
    <path className="mi-part mi-chat-dot mi-chat-dot-2" d="M12 10.5h.01" />
    <path className="mi-part mi-chat-dot mi-chat-dot-3" d="M15.5 10.5h.01" />
  </MicroIconSvg>
);

export const MicroMailIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="mail" {...props}>
    <rect x="3" y="6" width="18" height="13" rx="2" />
    <path className="mi-part mi-mail-flap" d="M3 7l9 6l9-6" />
  </MicroIconSvg>
);

export const MicroPhoneIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="phone" {...props}>
    <path
      className="mi-part mi-phone-body"
      d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5-2.5l5 2v4a2 2 0 0 1-2 2a16 16 0 0 1-15-15a2 2 0 0 1 2-2"
    />
  </MicroIconSvg>
);

export const MicroPinIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="pin" {...props}>
    <g className="mi-part mi-pin-body">
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2" />
    </g>
  </MicroIconSvg>
);

export const MicroArrowRightIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="arrow-right" {...props}>
    <g className="mi-part mi-arrow-right-body">
      <path d="M5 12h14" />
      <path d="M13 6l6 6l-6 6" />
    </g>
  </MicroIconSvg>
);

export const MicroArrowUpRightIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="arrow-up-right" {...props}>
    <g className="mi-part mi-arrow-up-right-body">
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </g>
  </MicroIconSvg>
);

export const MicroSparkleIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="sparkle" {...props}>
    <path className="mi-part mi-sparkle-star mi-sparkle-star-1" d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8z" />
    <path className="mi-part mi-sparkle-star mi-sparkle-star-2" d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9z" />
  </MicroIconSvg>
);

export const MicroSendIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="send" {...props}>
    <g className="mi-part mi-send-body">
      <path d="M21 3L10 14" />
      <path d="M21 3l-7 18l-4-7l-7-4z" />
    </g>
  </MicroIconSvg>
);

export const MicroCloseIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="close" {...props}>
    <path className="mi-part mi-close-body" d="M6 6l12 12M18 6L6 18" />
  </MicroIconSvg>
);

export const MicroChevronLeftIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="chevron-left" {...props}>
    <path className="mi-part mi-chevron-left-body" d="M15 6l-6 6l6 6" />
  </MicroIconSvg>
);

export const MicroChevronRightIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="chevron-right" {...props}>
    <path className="mi-part mi-chevron-right-body" d="M9 6l6 6l-6 6" />
  </MicroIconSvg>
);

export const MicroEyeIcon = (props: MicroIconProps) => (
  <MicroIconSvg name="eye" {...props}>
    <g className="mi-part mi-eye-lid">
      <path d="M2 12s3.5-7 10-7s10 7 10 7s-3.5 7-10 7s-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </g>
  </MicroIconSvg>
);

export const microIconComponents: Readonly<Record<MicroIconName, (props: MicroIconProps) => ReactNode>> = {
  code: MicroCodeIcon,
  chart: MicroChartIcon,
  gear: MicroGearIcon,
  bolt: MicroBoltIcon,
  chat: MicroChatIcon,
  mail: MicroMailIcon,
  phone: MicroPhoneIcon,
  pin: MicroPinIcon,
  "arrow-right": MicroArrowRightIcon,
  "arrow-up-right": MicroArrowUpRightIcon,
  sparkle: MicroSparkleIcon,
  send: MicroSendIcon,
  close: MicroCloseIcon,
  "chevron-left": MicroChevronLeftIcon,
  "chevron-right": MicroChevronRightIcon,
  eye: MicroEyeIcon,
};
