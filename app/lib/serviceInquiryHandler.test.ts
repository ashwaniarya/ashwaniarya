import { describe, expect, it, vi } from "vitest";

import { createResendServiceInquiryDeliverer } from "@/app/lib/serviceInquiryDelivery";
import { handleServiceInquiry } from "@/app/lib/serviceInquiryHandler";
import {
  createServiceInquiryRateLimiter,
  getClientKey,
  serviceInquiryRateLimitConfiguration,
} from "@/app/lib/serviceInquiryRateLimit";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  need: "A booking dashboard for a small clinic with Stripe payments.",
  budget: "$2,000 to $5,000",
  timeline: "Within a month",
};

const post = (body: unknown, ip = "203.0.113.7") =>
  new Request("http://localhost/api/service-inquiry", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": `${ip}, 10.0.0.1` },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const setup = () => {
  const deliver = vi.fn(async () => ({ delivered: true as const }));
  return { deliver, dependencies: { isAllowed: createServiceInquiryRateLimiter(), deliver } };
};

describe("handleServiceInquiry", () => {
  it("delivers a valid inquiry", async () => {
    const { deliver, dependencies } = setup();
    const response = await handleServiceInquiry(post(valid), dependencies);
    expect(response.status).toBe(200);
    expect(deliver).toHaveBeenCalledWith(valid);
  });

  it("answers 200 to a filled honeypot but sends nothing", async () => {
    const { deliver, dependencies } = setup();
    const response = await handleServiceInquiry(post({ ...valid, company_website: "https://spam.example" }), dependencies);
    expect(response.status).toBe(200);
    expect(deliver).not.toHaveBeenCalled();
  });

  it("returns field errors for invalid input, validated on the server too", async () => {
    const { deliver, dependencies } = setup();
    const response = await handleServiceInquiry(post({ ...valid, email: "nope" }), dependencies);
    expect(response.status).toBe(400);
    expect((await response.json()).errors).toHaveProperty("email");
    expect(deliver).not.toHaveBeenCalled();
    expect((await handleServiceInquiry(post("{not json"), dependencies)).status).toBe(400);
  });

  it("rate limits each IP to 3 requests per window", async () => {
    const { dependencies } = setup();
    for (let attempt = 0; attempt < 3; attempt += 1) {
      expect((await handleServiceInquiry(post(valid), dependencies)).status).toBe(200);
    }
    expect((await handleServiceInquiry(post(valid), dependencies)).status).toBe(429);
    expect((await handleServiceInquiry(post(valid, "198.51.100.9"), dependencies)).status).toBe(200);
  });

  it("returns 503 with an email fallback message when delivery is not configured", async () => {
    const response = await handleServiceInquiry(post(valid), {
      isAllowed: () => true,
      deliver: createResendServiceInquiryDeliverer({}),
    });
    expect(response.status).toBe(503);
    expect((await response.json()).error).toBe("not_configured");
  });
});

describe("createServiceInquiryRateLimiter", () => {
  it("opens a new window after the window length", () => {
    const isAllowed = createServiceInquiryRateLimiter({ maxRequestsPerWindow: 1, windowMilliseconds: 1000, maxTrackedClients: 10 });
    expect(isAllowed("a", 0)).toBe(true);
    expect(isAllowed("a", 500)).toBe(false);
    expect(isAllowed("a", 1000)).toBe(true);
  });
});

describe("createResendServiceInquiryDeliverer", () => {
  it("posts to Resend with the key from the environment, to syncoders@gmail.com by default, replying to the sender", async () => {
    const fetchImplementation = vi.fn(async () => new Response("{}", { status: 200 }));
    const deliver = createResendServiceInquiryDeliverer({ RESEND_API_KEY: "test-key" }, fetchImplementation as unknown as typeof fetch);
    expect(await deliver(valid)).toEqual({ delivered: true });
    const [url, init] = fetchImplementation.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer test-key");
    const body = JSON.parse(init.body as string);
    expect(body.to).toEqual(["syncoders@gmail.com"]);
    expect(body.reply_to).toBe("test@example.com");
    expect(body.text).toContain("Budget: $2,000 to $5,000");
  });

  it("reports a provider error without throwing", async () => {
    const deliver = createResendServiceInquiryDeliverer({ RESEND_API_KEY: "k" }, (async () => new Response("", { status: 500 })) as unknown as typeof fetch);
    expect(await deliver(valid)).toEqual({ delivered: false, reason: "provider_error" });
  });
});

describe("service inquiry limits (G7)", () => {
  const raw = (body: string, headers: Record<string, string> = {}) =>
    new Request("http://localhost/api/service-inquiry", {
      method: "POST",
      headers: { "content-type": "application/json", ...headers },
      body,
    });
  const allow = { isAllowed: () => true, deliver: vi.fn(async () => ({ delivered: true as const })) };

  it("rejects a body over 10,000 characters with 413, before reading it when content-length says so", async () => {
    const big = JSON.stringify({ ...valid, need: "x".repeat(10_001) });
    expect((await handleServiceInquiry(raw(big), allow)).status).toBe(413);
    const lying = raw(JSON.stringify(valid), { "content-length": "10001" });
    const text = vi.spyOn(lying, "text");
    expect((await handleServiceInquiry(lying, allow)).status).toBe(413);
    expect(text).not.toHaveBeenCalled();
  });

  it("rejects a JSON array with 400 and anything that is not JSON with 415", async () => {
    expect((await handleServiceInquiry(raw("[1,2]"), allow)).status).toBe(400);
    expect((await handleServiceInquiry(raw(JSON.stringify(valid), { "content-type": "text/plain" }), allow)).status).toBe(415);
  });

  it("keys the rate limit on the first X-Forwarded-For address, capped at 64 characters", () => {
    expect(getClientKey(new Headers({ "x-forwarded-for": "1.1.1.1, 2.2.2.2" }))).toBe("1.1.1.1");
    expect(getClientKey(new Headers({ "x-forwarded-for": "a".repeat(500) }))).toHaveLength(64);
    expect(getClientKey(new Headers())).toBe("unknown");
  });

  it("evicts the oldest client once maxTrackedClients is exceeded", () => {
    const isAllowed = createServiceInquiryRateLimiter({ maxRequestsPerWindow: 1, windowMilliseconds: 60_000, maxTrackedClients: 2 });
    expect(isAllowed("a", 0)).toBe(true);
    expect(isAllowed("b", 1)).toBe(true);
    expect(isAllowed("a", 2)).toBe(false);
    expect(isAllowed("c", 3)).toBe(true); // map now holds 3 > 2, so "a" (oldest) is dropped
    expect(isAllowed("a", 4)).toBe(true);
  });

  it("uses a 10 minute window of 3 requests", () => {
    expect(serviceInquiryRateLimitConfiguration.windowMilliseconds).toBe(10 * 60 * 1000);
    expect(serviceInquiryRateLimitConfiguration.maxRequestsPerWindow).toBe(3);
    const isAllowed = createServiceInquiryRateLimiter();
    for (let attempt = 0; attempt < 3; attempt += 1) expect(isAllowed("x", 0)).toBe(true);
    expect(isAllowed("x", 10 * 60 * 1000 - 1)).toBe(false);
    expect(isAllowed("x", 10 * 60 * 1000)).toBe(true);
  });
});

describe("Resend delivery hardening", () => {
  it("sends to SERVICE_INQUIRY_TO when set, with a 10s timeout signal", async () => {
    const fetchImplementation = vi.fn(async () => new Response("{}", { status: 200 }));
    const deliver = createResendServiceInquiryDeliverer(
      { RESEND_API_KEY: "k", SERVICE_INQUIRY_TO: "inbox@example.com" },
      fetchImplementation as unknown as typeof fetch,
    );
    await deliver(valid);
    const [, init] = fetchImplementation.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string).to).toEqual(["inbox@example.com"]);
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("reports a provider error when the request aborts (timeout)", async () => {
    const deliver = createResendServiceInquiryDeliverer({ RESEND_API_KEY: "k" }, (async () => {
      throw new DOMException("The operation timed out.", "TimeoutError");
    }) as unknown as typeof fetch);
    expect(await deliver(valid)).toEqual({ delivered: false, reason: "provider_error" });
  });
});

