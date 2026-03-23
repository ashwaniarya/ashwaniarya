import Link from "next/link";
import type { ReactNode } from "react";

import { contentCardPolicy } from "@/app/constants/policy";

export type CardProps = Readonly<{
  children: ReactNode;
  href?: string;
  className?: string;
}>;

export function Card({ children, href, className = "" }: CardProps) {
  const containerClassName = [
    contentCardPolicy.containerBaseClassName,
    href ? contentCardPolicy.linkInteractiveClassName : "",
    className,
  ]
    .join(" ")
    .trim();

  if (href) {
    return (
      <Link href={href} className={containerClassName}>
        {children}
      </Link>
    );
  }

  return <div className={containerClassName}>{children}</div>;
}
