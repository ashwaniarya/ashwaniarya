import { describe, expect, it } from "vitest";

import { normaliseServiceInquiry, validateServiceInquiry } from "@/app/config/serviceInquiry";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  need: "A booking dashboard for a small clinic with Stripe payments.",
  budget: "$2,000 to $5,000",
  timeline: "Within a month",
};

describe("validateServiceInquiry", () => {
  it("accepts a complete inquiry", () => {
    expect(validateServiceInquiry(normaliseServiceInquiry(valid))).toEqual({});
  });

  it("reports every missing field", () => {
    expect(Object.keys(validateServiceInquiry(normaliseServiceInquiry({})))).toEqual(["name", "email", "need", "budget", "timeline"]);
  });

  it("rejects a bad email, a too-short need and options that are not in the lists", () => {
    const errors = validateServiceInquiry(
      normaliseServiceInquiry({ ...valid, email: "not-an-email", need: "too short", budget: "$1", timeline: "yesterday" }),
    );
    expect(Object.keys(errors).sort()).toEqual(["budget", "email", "need", "timeline"]);
  });

  it("trims input and ignores non-string values", () => {
    const input = normaliseServiceInquiry({ ...valid, name: "  Test Person  ", email: 42 });
    expect(input.name).toBe("Test Person");
    expect(input.email).toBe("");
  });
});
