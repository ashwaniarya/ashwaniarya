import type { ReactNode } from "react";

import { projectSectionPolicy } from "@/app/constants/policy";

export type ProjectSectionProps = Readonly<{
  left: ReactNode;
  right: ReactNode;
  className?: string;
  leftPanelClassName?: string;
  rightPanelClassName?: string;
  "data-test"?: string;
}>;

export function ProjectSection({
  left,
  right,
  className = "",
  leftPanelClassName = "",
  rightPanelClassName = "",
  "data-test": dataTest = "project-section",
}: ProjectSectionProps) {
  return (
    <section className={`${projectSectionPolicy.sectionSpacingClassName} ${className}`.trim()} data-test={dataTest}>
      <div className={projectSectionPolicy.containerClassName}>
        <div
          className={[
            projectSectionPolicy.panelBaseClassName,
            projectSectionPolicy.panelPaddingClassName,
            projectSectionPolicy.panelLeftClassName,
            leftPanelClassName,
          ].join(" ")}
          data-test={`${dataTest}-left`}
        >
          {left}
        </div>
        <div
          className={[
            projectSectionPolicy.panelBaseClassName,
            projectSectionPolicy.panelPaddingClassName,
            projectSectionPolicy.panelRightClassName,
            rightPanelClassName,
          ].join(" ")}
          data-test={`${dataTest}-right`}
        >
          {right}
        </div>
      </div>
    </section>
  );
}

