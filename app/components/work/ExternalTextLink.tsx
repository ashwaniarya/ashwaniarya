import type { ReactNode } from "react";

import { Button3D } from "@/app/components/three/Button3D";
import type { Button3DVariant } from "@/app/constants/policy";

export type ExternalTextLinkProps = Readonly<{
  href: string;
  isExternal: boolean;
  children: ReactNode;
  className?: string;
  /** Replaces the default text-link look, e.g. `pillLink` in a row of links. */
  variant?: Button3DVariant;
}>;

export function ExternalTextLink({
  href,
  isExternal,
  children,
  className = "",
  variant,
}: ExternalTextLinkProps) {
  return (
    <Button3D
      variant={variant ?? (isExternal ? "externalLink" : "inlineLink")}
      href={href}
      isExternal={isExternal}
      className={className}
    >
      {children}
      {isExternal ? (
        <span className="sr-only"> (opens in a new tab)</span>
      ) : null}
    </Button3D>
  );
}
