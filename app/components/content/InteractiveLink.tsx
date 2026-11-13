import Link from "next/link";
import type { ReactNode } from "react";

import { button3DPolicy, type Button3DVariant } from "@/app/constants/policy";

type InteractiveLinkProps = {
  children: ReactNode;
  variant: Button3DVariant;
  href?: string;
  isExternal?: boolean;
  onClick?: () => void;
  className?: string;
};

export function InteractiveLink({
  children,
  variant,
  href,
  isExternal = false,
  onClick,
  className = "",
}: InteractiveLinkProps) {
  const mergedClassName = [button3DPolicy.variantClassName[variant], className]
    .join(" ")
    .trim();

  if (href && isExternal) {
    const isWebUrl = href.startsWith("http");
    return (
      <a
        href={href}
        className={mergedClassName}
        {...(isWebUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={mergedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={mergedClassName}>
      {children}
    </button>
  );
}
