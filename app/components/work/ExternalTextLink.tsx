import type { ReactNode } from "react";

import { Button3D } from "@/app/components/three/Button3D";

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
  return (
    <Button3D
      variant={isExternal ? "externalLink" : "inlineLink"}
      href={href}
      isExternal={isExternal}
      className={className}
    >
      {children}
    </Button3D>
  );
}
