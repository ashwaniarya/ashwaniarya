import { describe, expect, it } from "vitest";

import { footerConfiguration } from "@/app/config/siteConfiguration";

describe("footerConfiguration copyright attribution", () => {
  it("keeps the public footer attribution line stable for branding and legal clarity", () => {
    expect(footerConfiguration.footerCopyrightAttributionLine).toBe(
      "Ashwani Arya, product engineer: from prototyping to productionizing to finding and solving problems through the product. Currently at AIclicks, a SaaS analytics platform.",
    );
  });
});
