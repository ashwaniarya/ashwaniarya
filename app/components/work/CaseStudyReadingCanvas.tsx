import type { ReactNode } from "react";

import { MeshGlowBackdrop } from "@/app/components/layout/MeshGlowBackdrop";
import { meshEditorialSurfacePolicy } from "@/app/constants/policy";

export type CaseStudyReadingCanvasProps = Readonly<{
  children: ReactNode;
}>;

/**
 * Full-bleed-within-main visual frame: soft canvas, mesh glow, and depth for long-form case studies.
 */
export function CaseStudyReadingCanvas({ children }: CaseStudyReadingCanvasProps) {
  return (
    <MeshGlowBackdrop
      className={[
        meshEditorialSurfacePolicy.shellBaseClassName,
        meshEditorialSurfacePolicy.caseStudyMeshShellShadowClassName,
        meshEditorialSurfacePolicy.caseStudyPaddingClassName,
      ].join(" ")}
    >
      {children}
    </MeshGlowBackdrop>
  );
}
