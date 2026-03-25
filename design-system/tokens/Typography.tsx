import type { ReactNode } from "react";

const headingLevelClasses = {
  h1: "text-3xl font-semibold leading-tight tracking-tight text-textPrimary sm:text-4xl",
  h2: "text-2xl font-semibold leading-tight tracking-tight text-textPrimary",
  h3: "text-xl font-semibold leading-snug text-textPrimary",
  h4: "text-lg font-semibold leading-snug text-textPrimary",
} as const;

const bodySizeClasses = {
  sm: "text-sm leading-5 text-textPrimary",
  base: "text-base leading-6 text-textPrimary",
  lg: "text-lg leading-7 text-textPrimary",
} as const;

export type HeadingLevel = keyof typeof headingLevelClasses;
export type BodySize = keyof typeof bodySizeClasses;

export type HeadingProps = Readonly<{
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  id?: string;
}>;

export function Heading({ level, children, className = "", id }: HeadingProps) {
  const Tag = level;
  const classes = headingLevelClasses[level];
  return (
    <Tag className={`${classes} ${className}`.trim()} id={id}>
      {children}
    </Tag>
  );
}

export type BodyTextProps = Readonly<{
  size?: BodySize;
  children: ReactNode;
  className?: string;
}>;

export function BodyText({ size = "base", children, className = "" }: BodyTextProps) {
  const classes = bodySizeClasses[size];
  return <p className={`${classes} ${className}`.trim()}>{children}</p>;
}

export type CaptionProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function Caption({ children, className = "" }: CaptionProps) {
  return (
    <span className={`text-xs leading-4 text-textSecondary ${className}`.trim()}>
      {children}
    </span>
  );
}

export type LabelProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function Label({ children, className = "" }: LabelProps) {
  return (
    <span className={`text-sm font-medium text-textPrimary ${className}`.trim()}>
      {children}
    </span>
  );
}

/** Primary site navigation labels inside anchors — color comes from the parent link. */
export type NavigationLabelProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export function NavigationLabel({ children, className = "" }: NavigationLabelProps) {
  return (
    <span
      className={`text-sm font-semibold uppercase tracking-[0.12em] text-inherit ${className}`.trim()}
    >
      {children}
    </span>
  );
}
