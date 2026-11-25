import { describe, expect, it, vi } from "vitest";

import { normaliseServiceInquiry } from "@/app/config/serviceInquiry";
import {
  buildServiceInquiryAutoReply,
  createResendServiceInquiryAutoReplySender,
  isServiceInquiryAutoReplyEnabled,
} from "@/app/lib/serviceInquiryDelivery";
import { handleServiceInquiry } from "@/app/lib/serviceInquiryHandler";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  need: "A booking dashboard for a small clinic with Stripe payments.",
  budget: "$2,000 to $5,000",
  timeline: "Within a month",
};
const verifiedSender = { RESEND_API_KEY: "test-key", SERVICE_INQUIRY_FROM: "Ashwani Arya <hello@mail.syncoderslabs.com>" };
const post = (body: unknown) =>
  new Request("http://localhost/api/service-inquiry", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.7" },
    body: JSON.stringify(body),
  });
const ok = () => new Response("{}", { status: 200 });

describe("auto-reply gate", () => {
  it("is on only with a key and a SERVICE_INQUIRY_FROM that is not a resend.dev address", () => {
    expect(isServiceInquiryAutoReplyEnabled(verifiedSender)).toBe(true);
    expect(isServiceInquiryAutoReplyEnabled({ ...verifiedSender, SERVICE_INQUIRY_FROM: "hello@mail.syncoderslabs.com" })).toBe(true);
    expect(isServiceInquiryAutoReplyEnabled({ RESEND_API_KEY: "k" })).toBe(false);
    expect(isServiceInquiryAutoReplyEnabled({ RESEND_API_KEY: "k", SERVICE_INQUIRY_FROM: "Portfolio <onboarding@resend.dev>" })).toBe(false);
    expect(isServiceInquiryAutoReplyEnabled({ RESEND_API_KEY: "k", SERVICE_INQUIRY_FROM: "x@sub.resend.dev" })).toBe(false);
    expect(isServiceInquiryAutoReplyEnabled({ SERVICE_INQUIRY_FROM: "hello@mail.syncoderslabs.com" })).toBe(false);
  });

  it("skips silently, without calling Resend, when not gated in", async () => {
    const fetchImplementation = vi.fn(async () => ok());
    for (const environment of [{ RESEND_API_KEY: "k" }, { RESEND_API_KEY: "k", SERVICE_INQUIRY_FROM: "onboarding@resend.dev" }]) {
      const send = createResendServiceInquiryAutoReplySender(environment, fetchImplementation as unknown as typeof fetch);
      expect(await send(valid)).toEqual({ sent: false, reason: "not_enabled" });
    }
    expect(fetchImplementation).not.toHaveBeenCalled();
  });
});

describe("auto-reply email", () => {
  it("sends one plain thank-you to the inquirer, replying to SERVICE_INQUIRY_TO, signed with the portfolio link", async () => {
    const fetchImplementation = vi.fn(async () => ok());
    const send = createResendServiceInquiryAutoReplySender(
      { ...verifiedSender, SERVICE_INQUIRY_TO: "syncoders@gmail.com" },
      fetchImplementation as unknown as typeof fetch,
    );
    expect(await send(valid)).toEqual({ sent: true });
    expect(fetchImplementation).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchImplementation.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body).toMatchObject({
      from: "Ashwani Arya <hello@mail.syncoderslabs.com>",
      to: ["test@example.com"],
      reply_to: "syncoders@gmail.com",
      subject: "Thanks for your inquiry",
    });
    expect(body.text).toContain("Thanks for reaching out about a custom application. I will reply within 1 to 2 business days.");
    expect(body.text).toContain(`Your message:\n${valid.need}`);
    expect(body.text.trim().endsWith("Ashwani Arya\nhttps://ashwaniarya.vercel.app")).toBe(true);
    expect(`${body.text}${body.html}`).not.toMatch(/[\u2013\u2014]/);
    expect((body.html.match(/href="/g) ?? []).length).toBe(1);
  });

  it("escapes the echoed message in HTML and caps it at the message length limit", () => {
    const echo = buildServiceInquiryAutoReply({ ...valid, need: `<script>alert("x")</script> & more` });
    expect(echo.html).toContain("&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; more");
    expect(echo.html).not.toContain("<script>");
    const long = buildServiceInquiryAutoReply({ ...valid, need: "y".repeat(5000) });
    expect(long.text).toContain("y".repeat(3000));
    expect(long.text).not.toContain("y".repeat(3001));
  });

  it("keeps CR and LF out of every header field (name and email)", async () => {
    const injected = normaliseServiceInquiry({ ...valid, name: "Ada\r\nBcc: v@evil.test", email: "test@example.com\r\nBcc: v@evil.test" });
    expect(injected.name).not.toMatch(/[\r\n]/);
    expect(injected.email).not.toMatch(/[\r\n]/);
    const fetchImplementation = vi.fn(async () => ok());
    await createResendServiceInquiryAutoReplySender(verifiedSender, fetchImplementation as unknown as typeof fetch)({ ...valid, name: "Ada\r\nBcc: x" });
    const body = JSON.parse((fetchImplementation.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    for (const header of [body.from, body.reply_to, body.subject, ...body.to]) expect(header).not.toMatch(/[\r\n]/);
    expect(body.text.split("\n")[0]).toBe("Hi Ada  Bcc: x,");
  });

  it("logs a warning without secrets and reports a provider error when Resend fails", async () => {
    const warn = vi.fn();
    const send = createResendServiceInquiryAutoReplySender(verifiedSender, (async () => new Response("", { status: 422 })) as unknown as typeof fetch, warn);
    expect(await send(valid)).toEqual({ sent: false, reason: "provider_error" });
    expect(warn).toHaveBeenCalledWith("service-inquiry: auto-reply not sent (provider status 422)");
    expect(JSON.stringify(warn.mock.calls)).not.toContain("test-key");
  });
});

describe("handler and auto-reply", () => {
  const setup = (delivered = true) => ({
    deliver: vi.fn(async () => (delivered ? { delivered: true as const } : { delivered: false as const, reason: "provider_error" as const })),
    sendAutoReply: vi.fn(async () => ({ sent: true as const })),
  });

  it("sends the auto-reply once after the owner email is delivered", async () => {
    const dependencies = { isAllowed: () => true, ...setup() };
    expect((await handleServiceInquiry(post(valid), dependencies)).status).toBe(200);
    expect(dependencies.deliver).toHaveBeenCalledTimes(1);
    expect(dependencies.sendAutoReply).toHaveBeenCalledTimes(1);
    expect(dependencies.sendAutoReply).toHaveBeenCalledWith(valid);
  });

  it("does not auto-reply for a honeypot hit, invalid input or a rate-limited request", async () => {
    const dependencies = { isAllowed: () => true, ...setup() };
    await handleServiceInquiry(post({ ...valid, company_website: "spam" }), dependencies);
    await handleServiceInquiry(post({ ...valid, email: "nope" }), dependencies);
    const limited = { ...dependencies, isAllowed: () => false };
    expect((await handleServiceInquiry(post(valid), limited)).status).toBe(429);
    expect(dependencies.sendAutoReply).not.toHaveBeenCalled();
  });

  it("does not auto-reply when the owner email fails", async () => {
    const dependencies = { isAllowed: () => true, ...setup(false) };
    expect((await handleServiceInquiry(post(valid), dependencies)).status).toBe(503);
    expect(dependencies.sendAutoReply).not.toHaveBeenCalled();
  });

  it("still answers success with the same body when the auto-reply fails or throws", async () => {
    const failing = { isAllowed: () => true, ...setup(), sendAutoReply: vi.fn(async () => ({ sent: false as const, reason: "provider_error" as const })) };
    const failed = await handleServiceInquiry(post(valid), failing);
    expect(failed.status).toBe(200);
    expect(await failed.json()).toEqual({ ok: true });
    const throwing = { isAllowed: () => true, ...setup(), sendAutoReply: vi.fn(async () => Promise.reject(new Error("boom"))) };
    const thrown = await handleServiceInquiry(post(valid), throwing);
    expect(thrown.status).toBe(200);
    expect(await thrown.json()).toEqual({ ok: true });
  });
});
