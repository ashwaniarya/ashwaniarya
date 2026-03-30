import { describe, expect, it } from "vitest";

import { footerConfiguration } from "@/app/config/siteConfiguration";

describe("footerConfiguration copyright attribution", () => {
  it("keeps the public footer attribution line stable for branding and legal clarity", () => {
    expect(footerConfiguration.footerCopyrightAttributionLine).toBe(
      "Ashwani Arya, a product engineer focused on shipping clear, useful experiences end-to-end.",
    );
  });
});
