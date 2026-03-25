export type ExperienceFocusAreaKey =
  | "crossPlatformDevelopment"
  | "reusableComponentDesign"
  | "apiAndContractDevelopment"
  | "performanceOptimization"
  | "dataIntensiveFrontend"
  | "frontendArchitecture";

export type ExperienceFocusAreaRecord = Readonly<{
  focusAreaKey: ExperienceFocusAreaKey;
  titleLine: string;
  detailLine: string;
}>;

export const homepageExperienceSectionCopyConfiguration = {
  sectionHeading: "Experience",
  sectionIntroLines: [
    "Where I spend depth: shipping interfaces that scale across platforms, contracts, data volume, and performance budgets.",
  ],
} as const;

export const homepageExperienceFocusAreasConfiguration = [
  {
    focusAreaKey: "crossPlatformDevelopment",
    titleLine: "Cross-platform development",
    detailLine:
      "Web, native, and embedded webviews—shared patterns and tooling so one mental model travels across surfaces.",
  },
  {
    focusAreaKey: "reusableComponentDesign",
    titleLine: "Reusable component design",
    detailLine:
      "Composable UI building blocks, clear props, and design-system discipline so teams ship faster with fewer regressions.",
  },
  {
    focusAreaKey: "apiAndContractDevelopment",
    titleLine: "API and contract development",
    detailLine:
      "Stable HTTP boundaries, schema-first thinking, and client typings so frontend and backend evolve without silent breakage.",
  },
  {
    focusAreaKey: "performanceOptimization",
    titleLine: "Performance optimization",
    detailLine:
      "Virtual scroll, lazy loading, asset budgets, and cross-device tuning so heavy views stay smooth in the field.",
  },
  {
    focusAreaKey: "dataIntensiveFrontend",
    titleLine: "Data-intensive frontends",
    detailLine:
      "Large datasets, streaming updates, and interactive dashboards where rendering and network strategy matter as much as pixels.",
  },
  {
    focusAreaKey: "frontendArchitecture",
    titleLine: "Frontend architecture",
    detailLine:
      "Layering, state boundaries, and feature ownership so products stay maintainable as teams and traffic grow.",
  },
] as const satisfies readonly ExperienceFocusAreaRecord[];
