import { describe, expect, it } from "vitest";

import { footerConfiguration } from "@/app/config/siteConfiguration";

describe("footerConfiguration copyright attribution", () => {
  it("keeps the public footer attribution line stable for branding and legal clarity", () => {
    expect(footerConfiguration.footerCopyrightAttributionLine).toBe(
      "Ashwani Arya, design engineer and product engineer: polished product UI, motion and 3D, dashboards, and agent interfaces, shipped end to end.",
    );
  });
});
