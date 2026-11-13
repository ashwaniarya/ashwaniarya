import type { ReactNode } from "react";

import { InteractiveLink } from "@/app/components/content/InteractiveLink";
import { contentCardPolicy } from "@/app/constants/policy";

export type CardProps = Readonly<{
  children: ReactNode;
  href?: string;
  className?: string;
}>;

export function Card({ children, href, className = "" }: CardProps) {
  if (href) {
    return (
      <InteractiveLink variant="card" href={href} className={className}>
        {children}
      </InteractiveLink>
    );
  }

  return (
    <div
      className={[contentCardPolicy.containerBaseClassName, className]
        .join(" ")
        .trim()}
    >
      {children}
    </div>
  );
}
