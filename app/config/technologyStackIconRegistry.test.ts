import { SiJavascript, SiTypescript } from "react-icons/si";
import { describe, expect, it } from "vitest";

import {
  resolveTechnologyStackIcon,
  technologyStackDefaultFallbackIcon,
} from "@/app/config/technologyStackIconRegistry";

describe("resolveTechnologyStackIcon", () => {
  it("returns the Simple Icons glyph for JavaScript", () => {
    expect(resolveTechnologyStackIcon("JavaScript")).toBe(SiJavascript);
  });

  it("returns the Simple Icons glyph for TypeScript", () => {
    expect(resolveTechnologyStackIcon("TypeScript")).toBe(SiTypescript);
  });

  it("returns the default fallback for unknown labels", () => {
    expect(resolveTechnologyStackIcon("Totally Unknown Stack Item")).toBe(
      technologyStackDefaultFallbackIcon,
    );
  });
});
