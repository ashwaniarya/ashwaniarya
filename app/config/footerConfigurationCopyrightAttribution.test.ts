import { describe, expect, it } from "vitest";

import { footerConfiguration } from "@/app/config/siteConfiguration";

describe("footerConfiguration copyright attribution", () => {
  it("keeps the public footer attribution line stable for branding and legal clarity", () => {
    expect(footerConfiguration.footerCopyrightAttributionLine).toBe(
      "Ashwani Arya, independent contract engineer: fractional and contract founding-engineer builds for EU startups. Remote contract at AIClicks since Apr 2026.",
    );
  });
});
