import { TbBrandGithub, TbNumbers, TbPaletteOff, TbTable } from "react-icons/tb";
import { describe, expect, it } from "vitest";

import {
  resolvePulseboardCaseStudyLinkIcon,
  resolvePulseboardDesignSystemRuleIcon,
} from "@/app/config/pulseboardCaseStudyIconRegistry";

describe("resolvePulseboardCaseStudyLinkIcon", () => {
  it("returns brand github icon for the source link key", () => {
    expect(resolvePulseboardCaseStudyLinkIcon("source")).toBe(TbBrandGithub);
  });

  it("returns table icon for the benchmark link key", () => {
    expect(resolvePulseboardCaseStudyLinkIcon("benchmark")).toBe(TbTable);
  });
});

describe("resolvePulseboardDesignSystemRuleIcon", () => {
  it("returns palette-off icon for the semantic tokens rule key", () => {
    expect(resolvePulseboardDesignSystemRuleIcon("semanticTokensOnly")).toBe(TbPaletteOff);
  });

  it("returns numbers icon for the tabular numbers rule key", () => {
    expect(resolvePulseboardDesignSystemRuleIcon("tabularNumbers")).toBe(TbNumbers);
  });
});
