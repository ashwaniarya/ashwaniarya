import type { IconType } from "react-icons";
import { SiOpenapiinitiative } from "react-icons/si";
import {
  TbChartHistogram,
  TbCube,
  TbDevices,
  TbGauge,
  TbPuzzle,
  TbStack2,
} from "react-icons/tb";

import type { ExperienceFocusAreaKey } from "@/app/config/homepageExperienceConfiguration";

const experienceFocusAreaIconByKey: Readonly<Record<ExperienceFocusAreaKey, IconType>> = {
  crossPlatformDevelopment: TbDevices,
  reusableComponentDesign: TbPuzzle,
  apiAndContractDevelopment: SiOpenapiinitiative,
  performanceOptimization: TbGauge,
  dataIntensiveFrontend: TbChartHistogram,
  frontendArchitecture: TbStack2,
};

export function resolveExperienceFocusAreaIcon(focusAreaKey: ExperienceFocusAreaKey): IconType {
  return experienceFocusAreaIconByKey[focusAreaKey] ?? TbCube;
}
