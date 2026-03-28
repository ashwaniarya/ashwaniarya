import { TbDevices, TbServer } from "react-icons/tb";
import { describe, expect, it } from "vitest";

import { resolveExperienceFocusAreaIcon } from "@/app/config/experienceFocusAreaIconRegistry";

describe("resolveExperienceFocusAreaIcon", () => {
  it("returns devices icon for cross-platform focus key", () => {
    expect(resolveExperienceFocusAreaIcon("crossPlatformDevelopment")).toBe(TbDevices);
  });

  it("returns server icon for backend development focus key", () => {
    expect(resolveExperienceFocusAreaIcon("backendDevelopment")).toBe(TbServer);
  });
});
