import {
  homepageSelectedWorkSectionPolicy,
  pulseboardCaseStudyPagePolicy,
} from "@/app/constants/policy";

export type PulseboardChipListProps = Readonly<{
  chipLabels: readonly string[];
  ariaLabel?: string;
  chipClassName?: string;
  /** Drawn in the accent style, e.g. the scenario the demo link opens. */
  highlightedChipLabel?: string;
}>;

export function PulseboardChipList({
  chipLabels,
  ariaLabel,
  chipClassName = homepageSelectedWorkSectionPolicy.stackChipClassName,
  highlightedChipLabel,
}: PulseboardChipListProps) {
  return (
    <ul aria-label={ariaLabel} className={homepageSelectedWorkSectionPolicy.stackListClassName}>
      {chipLabels.map((chipLabel) => (
        <li
          key={chipLabel}
          className={
            chipLabel === highlightedChipLabel
              ? pulseboardCaseStudyPagePolicy.highlightedChipClassName
              : chipClassName
          }
        >
          {chipLabel}
        </li>
      ))}
    </ul>
  );
}
