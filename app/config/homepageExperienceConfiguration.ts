export type ExperienceFocusAreaKey =
  | "crossPlatformDevelopment"
  | "reusableComponentDesign"
  | "apiAndContractDevelopment"
  | "backendDevelopment"
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
    "Where I go deep: services and data models that hold up in production, contracts that do not break silently, and interfaces that stay fast under real load.",
  ],
} as const;

export const homepageExperienceFocusAreasConfiguration = [
  {
    focusAreaKey: "backendDevelopment",
    titleLine: "Backend development",
    detailLine:
      "Node and FastAPI services, PostgreSQL and MongoDB data modeling, multi-tenant boundaries, and payment flows built to survive real-world failure modes.",
  },
  {
    focusAreaKey: "apiAndContractDevelopment",
    titleLine: "API and contract development",
    detailLine:
      "REST and WebSocket boundaries, schema-first thinking, and client typings so frontend and backend evolve without silent breakage.",
  },
  {
    focusAreaKey: "performanceOptimization",
    titleLine: "Performance optimization",
    detailLine:
      "Virtualized tables, bundle budgets, connection churn under load, and GPU profiling so heavy views and 3D scenes stay smooth in the field.",
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
  {
    focusAreaKey: "crossPlatformDevelopment",
    titleLine: "Cross-platform development",
    detailLine:
      "Web, native, and embedded webviews. Shared patterns and tooling so one mental model travels across surfaces.",
  },
  {
    focusAreaKey: "reusableComponentDesign",
    titleLine: "Reusable component design",
    detailLine:
      "Design tokens, composable components, and Storybook as living documentation, so teams ship faster with fewer regressions.",
  },
] as const satisfies readonly ExperienceFocusAreaRecord[];
