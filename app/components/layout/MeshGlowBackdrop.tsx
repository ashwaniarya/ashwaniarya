import type { ReactNode } from "react";

import { meshGlowBackdropPolicy } from "@/app/constants/policy";

export type MeshGlowBackdropProps = Readonly<{
  children: ReactNode;
  /** Merged visual shell: border, bg-surfaceMuted, padding, shadow, rounded, etc. */
  className: string;
}>;

/**
 * Violet + cyan mesh glows + soft accent wash — same atmosphere as case study reading canvas.
 */
export function MeshGlowBackdrop({ children, className }: MeshGlowBackdropProps) {
  return (
    <div className={`relative isolate overflow-hidden ${className}`.trim()}>
      <div aria-hidden className={meshGlowBackdropPolicy.violetOrbClassName} />
      <div aria-hidden className={meshGlowBackdropPolicy.cyanOrbClassName} />
      <div aria-hidden className={meshGlowBackdropPolicy.accentWashOrbClassName} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
