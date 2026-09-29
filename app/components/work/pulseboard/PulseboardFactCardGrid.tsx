import { createElement } from "react";
import type { IconType } from "react-icons";

import type { PulseboardFactCardRecord } from "@/app/config/portfolioPulseboardCaseStudyConfiguration";
import { pulseboardCaseStudyPagePolicy } from "@/app/constants/policy";

export type PulseboardFactCardGridProps<FactCard extends PulseboardFactCardRecord> = Readonly<{
  factCards: readonly FactCard[];
  listClassName: string;
  resolveFactCardIcon?: (factCard: FactCard) => IconType;
}>;

export function PulseboardFactCardGrid<FactCard extends PulseboardFactCardRecord>({
  factCards,
  listClassName,
  resolveFactCardIcon,
}: PulseboardFactCardGridProps<FactCard>) {
  return (
    <ul className={listClassName}>
      {factCards.map((factCard) => (
        <li
          key={`${factCard.title}: ${factCard.description}`}
          className={pulseboardCaseStudyPagePolicy.factCardClassName}
        >
          <p className={pulseboardCaseStudyPagePolicy.factCardTitleRowClassName}>
            {resolveFactCardIcon
              ? createElement(resolveFactCardIcon(factCard), {
                  "aria-hidden": true,
                  className: pulseboardCaseStudyPagePolicy.factCardIconClassName,
                })
              : null}
            {factCard.title}
          </p>
          <p className={pulseboardCaseStudyPagePolicy.factCardDescriptionClassName}>
            {factCard.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
