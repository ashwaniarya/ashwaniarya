import { describe, expect, it, vi } from "vitest";

import { createResendServiceInquiryDeliverer } from "@/app/lib/serviceInquiryDelivery";
import { handleServiceInquiry } from "@/app/lib/serviceInquiryHandler";
import { createServiceInquiryRateLimiter } from "@/app/lib/serviceInquiryRateLimit";

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
  it("posts to Resend with the key from the environment, to Ashwani's address, replying to the sender", async () => {
    const fetchImplementation = vi.fn(async () => new Response("{}", { status: 200 }));
    const deliver = createResendServiceInquiryDeliverer({ RESEND_API_KEY: "test-key" }, fetchImplementation as unknown as typeof fetch);
    expect(await deliver(valid)).toEqual({ delivered: true });
    const [url, init] = fetchImplementation.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    expect((init.headers as Record<string, string>).Authorization).toBe("Bearer test-key");
    const body = JSON.parse(init.body as string);
    expect(body.to).toEqual(["ashwaniparker@gmail.com"]);
    expect(body.reply_to).toBe("test@example.com");
    expect(body.text).toContain("Budget: $2,000 to $5,000");
  });

  it("reports a provider error without throwing", async () => {
    const deliver = createResendServiceInquiryDeliverer({ RESEND_API_KEY: "k" }, (async () => new Response("", { status: 500 })) as unknown as typeof fetch);
    expect(await deliver(valid)).toEqual({ delivered: false, reason: "provider_error" });
  });
});
