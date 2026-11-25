import { describe, expect, it } from "vitest";

import {
  homepageWorkHistoryConfiguration,
  homepageWorkHistorySectionCopyConfiguration,
} from "@/app/config/homepageWorkHistoryConfiguration";

describe("homepageWorkHistoryConfiguration", () => {
  it("lists every role newest first, from AIClicks back to BackTick", () => {
    expect(homepageWorkHistoryConfiguration.map((role) => role.roleKey)).toEqual([
      "aiclicks",
      "getbujo",
      "msquare",
      "uipath",
      "tapinvest",
      "geekyants",
      "backtick",
    ]);
  });

  it("uses the confirmed titles for AIClicks and getbujo", () => {
    expect(homepageWorkHistoryConfiguration[0].title).toBe("Founding Engineer, Full Stack");
    expect(homepageWorkHistoryConfiguration[1].title).toBe("Founding Engineer");
  });

  it("shows AIClicks as an ended contract, never as current", () => {
    const aiclicks = homepageWorkHistoryConfiguration[0];
    expect(aiclicks.dateRange).toBe("Apr 2026 to Nov 2026");
    expect(aiclicks.engagementLabel).toMatch(/ended/i);
    expect(JSON.stringify(homepageWorkHistoryConfiguration)).not.toMatch(/present|current|since/i);
  });

  it("keeps the timeline copy free of em and en dashes", () => {
    const copy = JSON.stringify([homepageWorkHistoryConfiguration, homepageWorkHistorySectionCopyConfiguration]);
    expect(copy).not.toContain("\u2014");
    expect(copy).not.toContain("\u2013");
  });
});
