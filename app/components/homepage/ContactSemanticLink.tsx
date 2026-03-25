import type { ReactNode } from "react";

export type ContactSemanticLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>;

const contactSemanticLinkClassName =
  "font-medium text-accentPrimary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accentPrimary focus-visible:ring-offset-2 focus-visible:ring-offset-backgroundPage rounded-sm";

/** Mail and phone handoff: no `target` (avoid `_blank` on mailto/tel). */
export function ContactSemanticLink({
  href,
  children,
  className = "",
}: ContactSemanticLinkProps) {
  return (
    <a
      href={href}
      className={[contactSemanticLinkClassName, className].join(" ").trim()}
    >
      {children}
    </a>
  );
}
