import type { ReactNode } from "react";

import { Button3D } from "@/app/components/three/Button3D";
import { contentCardPolicy } from "@/app/constants/policy";

export type CardProps = Readonly<{
  children: ReactNode;
  href?: string;
  className?: string;
}>;

export function Card({ children, href, className = "" }: CardProps) {
  if (href) {
    return (
      <Button3D variant="card" href={href} className={className}>
        {children}
      </Button3D>
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
