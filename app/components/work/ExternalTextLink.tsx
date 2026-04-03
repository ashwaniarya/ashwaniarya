import Link from "next/link";
import type { ReactNode } from "react";

export type ExternalTextLinkProps = Readonly<{
  href: string;
  isExternal: boolean;
  children: ReactNode;
  className?: string;
}>;

export function ExternalTextLink({
  href,
  isExternal,
  children,
  className = "",
}: ExternalTextLinkProps) {
  const mergedClassName = [
    "font-medium text-accentPrimary underline-offset-4 hover:underline",
    className,
  ]
    .join(" ")
    .trim();

  if (isExternal) {
    return (
      <a
        href={href}
        className={mergedClassName}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={mergedClassName}>
      {children}
    </Link>
  );
}
