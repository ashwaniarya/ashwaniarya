import type { IconType } from "react-icons";
import {
  TbAlertTriangle,
  TbBook,
  TbBrandGithub,
  TbChartLine,
  TbComponents,
  TbContrast,
  TbCube,
  TbExternalLink,
  TbEye,
  TbNumbers,
  TbPaletteOff,
  TbSunMoon,
  TbTable,
  TbTestPipe,
} from "react-icons/tb";

import type {
  PulseboardCaseStudyLinkKey,
  PulseboardDesignSystemRuleKey,
} from "@/app/config/portfolioPulseboardCaseStudyConfiguration";

const pulseboardCaseStudyLinkIconByKey: Readonly<Record<PulseboardCaseStudyLinkKey, IconType>> = {
  liveApp: TbExternalLink,
  storybook: TbBook,
  source: TbBrandGithub,
  failureDemo: TbAlertTriangle,
  benchmark: TbTable,
};

const pulseboardDesignSystemRuleIconByKey: Readonly<
  Record<PulseboardDesignSystemRuleKey, IconType>
> = {
  semanticTokensOnly: TbPaletteOff,
  contrastPairsTested: TbContrast,
  chartHuesChecked: TbEye,
  storiesAreTests: TbTestPipe,
  themeBeforePaint: TbSunMoon,
  tabularNumbers: TbNumbers,
  prunedComponentSet: TbComponents,
  chartsOnCurrentColor: TbChartLine,
};

export function resolvePulseboardCaseStudyLinkIcon(linkKey: PulseboardCaseStudyLinkKey): IconType {
  return pulseboardCaseStudyLinkIconByKey[linkKey] ?? TbExternalLink;
}

export function resolvePulseboardDesignSystemRuleIcon(
  ruleKey: PulseboardDesignSystemRuleKey,
): IconType {
  return pulseboardDesignSystemRuleIconByKey[ruleKey] ?? TbCube;
}
