import type { ReactNode } from "react";

import { Button3D } from "@/app/components/three/Button3D";

export type ContactSemanticLinkProps = Readonly<{
  href: string;
  children: ReactNode;
  className?: string;
}>;

/** Mail/phone handoff via the Button3D primitive (externalLink: no `target` on mailto/tel). */
export function ContactSemanticLink({
  href,
  children,
  className = "",
}: ContactSemanticLinkProps) {
  return (
    <Button3D variant="externalLink" href={href} isExternal className={className}>
      {children}
    </Button3D>
  );
}
