import type { ReactNode } from "react";

import { InteractiveLink } from "@/app/components/content/InteractiveLink";

export type ContactSemanticLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>;

/** Mail/phone handoff via the InteractiveLink primitive (externalLink: no `target` on mailto/tel). */
export function ContactSemanticLink({
  href,
  children,
  className = "",
}: ContactSemanticLinkProps) {
  return (
    <InteractiveLink variant="externalLink" href={href} isExternal className={className}>
      {children}
    </InteractiveLink>
  );
}
