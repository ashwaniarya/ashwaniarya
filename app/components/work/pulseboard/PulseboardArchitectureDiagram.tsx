import { TbArrowRight, TbPoint } from "react-icons/tb";

import type {
  PulseboardArchitectureBulletGroupRecord,
  PulseboardArchitectureLaneRecord,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { pulseboardCaseStudyPagePolicy } from "@/app/constants/policy";
import { Label } from "@/design-system/tokens/Typography";

export type PulseboardArchitectureDiagramProps = Readonly<{
  diagramAriaLabel: string;
  lanes: readonly PulseboardArchitectureLaneRecord[];
  bulletGroups: readonly PulseboardArchitectureBulletGroupRecord[];
}>;

export function PulseboardArchitectureDiagram({
  diagramAriaLabel,
  lanes,
  bulletGroups,
}: PulseboardArchitectureDiagramProps) {
  return (
    <figure aria-label={diagramAriaLabel} className={pulseboardCaseStudyPagePolicy.diagramFigureClassName}>
      <div className={pulseboardCaseStudyPagePolicy.diagramLanesStackClassName}>
        {lanes.map((lane) => (
          <div key={lane.laneLabel} className={pulseboardCaseStudyPagePolicy.diagramLaneStackClassName}>
            <p className={pulseboardCaseStudyPagePolicy.diagramLaneLabelClassName}>{lane.laneLabel}</p>
            <ol className={pulseboardCaseStudyPagePolicy.diagramLaneListClassName}>
              {lane.nodes.map((node, nodeIndex) => (
                <li key={node.nodeLabel} className={pulseboardCaseStudyPagePolicy.diagramLaneItemClassName}>
                  {nodeIndex > 0 ? (
                    <TbArrowRight
                      aria-hidden
                      className={pulseboardCaseStudyPagePolicy.diagramArrowIconClassName}
                    />
                  ) : null}
                  <div
                    className={[
                      pulseboardCaseStudyPagePolicy.diagramNodeClassName,
                      pulseboardCaseStudyPagePolicy.diagramToneClassNames[node.tone].surfaceClassName,
                    ].join(" ")}
                  >
                    <p className={pulseboardCaseStudyPagePolicy.diagramNodeLabelClassName}>
                      {node.nodeLabel}
                    </p>
                    <p className={pulseboardCaseStudyPagePolicy.diagramNodeDetailClassName}>
                      {node.nodeDetail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <figcaption className={pulseboardCaseStudyPagePolicy.diagramLegendClassName}>
        {bulletGroups.map((bulletGroup) => {
          const toneClassNames = pulseboardCaseStudyPagePolicy.diagramToneClassNames[bulletGroup.tone];
          return (
            <div key={bulletGroup.groupLabel} className={pulseboardCaseStudyPagePolicy.legendGroupStackClassName}>
              <div className={pulseboardCaseStudyPagePolicy.legendGroupLabelRowClassName}>
                <span
                  aria-hidden="true"
                  className={[
                    pulseboardCaseStudyPagePolicy.legendSwatchClassName,
                    toneClassNames.surfaceClassName,
                  ].join(" ")}
                />
                <Label>{bulletGroup.groupLabel}</Label>
              </div>
              <ul className={pulseboardCaseStudyPagePolicy.iconBulletListClassName}>
                {bulletGroup.bullets.map((bullet) => (
                  <li key={bullet} className={pulseboardCaseStudyPagePolicy.iconBulletItemClassName}>
                    <TbPoint
                      aria-hidden
                      className={[
                        pulseboardCaseStudyPagePolicy.iconBulletIconClassName,
                        toneClassNames.iconClassName,
                      ].join(" ")}
                    />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </figcaption>
    </figure>
  );
}
