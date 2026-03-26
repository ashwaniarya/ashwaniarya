import { describe, expect, it } from "vitest";

import { narrowPhoneMinWidthPx } from "./layoutViewportBreakpoints";

describe("layoutViewportBreakpoints", () => {
  it("stays aligned with narrowPhoneUp screen in tailwind.config.ts", () => {
    expect(narrowPhoneMinWidthPx).toBe(420);
  });
});
