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

describe("service inquiry field limits and sanitising (G6, G7)", () => {
  const errorsFor = (patch: Record<string, unknown>) => validateServiceInquiry(normaliseServiceInquiry({ ...valid, ...patch }));

  it("enforces the name, email and need length limits", () => {
    expect(errorsFor({ name: "n".repeat(100) })).not.toHaveProperty("name");
    expect(errorsFor({ name: "n".repeat(101) })).toHaveProperty("name");
    expect(errorsFor({ email: `${"e".repeat(189)}@example.com` })).toHaveProperty("email");
    expect(errorsFor({ need: "d".repeat(3000) })).not.toHaveProperty("need");
    expect(errorsFor({ need: "d".repeat(3001) })).toHaveProperty("need");
  });

  it("rejects a@b and a@b.c", () => {
    expect(errorsFor({ email: "a@b" })).toHaveProperty("email");
    expect(errorsFor({ email: "a@b.c" })).toHaveProperty("email");
    expect(errorsFor({ email: "a@b.co" })).not.toHaveProperty("email");
  });

  it("strips control characters from the name (no header injection) but keeps newlines in the message", () => {
    const input = normaliseServiceInquiry({ ...valid, name: "Ada\r\nBcc: v@evil.test", need: "Line one\nLine two\u0007 of the brief" });
    expect(input.name).not.toMatch(/[\r\n]/);
    expect(input.need).toContain("\n");
    expect(input.need).not.toContain("\u0007");
  });
});

