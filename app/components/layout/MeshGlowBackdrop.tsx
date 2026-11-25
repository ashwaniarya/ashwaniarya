import type { ReactNode } from "react";

import { meshGlowBackdropPolicy } from "@/app/constants/policy";

export type MeshGlowBackdropProps = Readonly<{
  children: ReactNode;
  /** Merged visual shell: border, bg-surfaceMuted, padding, shadow, rounded, etc. */
  className: string;
  /**
   * Let children overflow the shell (carousels that bleed to the viewport edge). The glows are then
   * clipped by an inner rounded layer, so they still stay inside the panel.
   */
  bleed?: boolean;
}>;

/**
 * Violet + cyan mesh glows + soft accent wash — same atmosphere as case study reading canvas.
 */
export function MeshGlowBackdrop({ children, className, bleed = false }: MeshGlowBackdropProps) {
  const glows = (
    <>
      <div aria-hidden className={meshGlowBackdropPolicy.violetOrbClassName} />
      <div aria-hidden className={meshGlowBackdropPolicy.cyanOrbClassName} />
      <div aria-hidden className={meshGlowBackdropPolicy.accentWashOrbClassName} />
    </>
  );
  return (
    <div className={`relative isolate ${bleed ? "" : "overflow-hidden "}${className}`.trim()} data-bleed={bleed || undefined}>
      {bleed ? (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
          {glows}
        </div>
      ) : (
        glows
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
