import { describe, expect, it, vi } from "vitest";

import { normaliseServiceInquiry } from "@/app/config/serviceInquiry";
import {
  buildServiceInquiryAutoReply,
  createServiceInquiryAutoReplyCaps,
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
  it("sends one FIXED thank-you to the inquirer, replying to SERVICE_INQUIRY_TO, with nothing the sender typed", async () => {
    const fetchImplementation = vi.fn(async () => ok());
    const hostile = { ...valid, name: "Visit http://phish.example now", need: "Click http://phish.example/login to verify your account" };
    const send = createResendServiceInquiryAutoReplySender(
      { ...verifiedSender, SERVICE_INQUIRY_TO: "syncoders@gmail.com" },
      fetchImplementation as unknown as typeof fetch,
    );
    expect(await send(hostile)).toEqual({ sent: true });
    expect(fetchImplementation).toHaveBeenCalledTimes(1);
    const body = JSON.parse((fetchImplementation.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    expect(body).toMatchObject({
      from: "Ashwani Arya <hello@mail.syncoderslabs.com>",
      to: ["test@example.com"],
      reply_to: "syncoders@gmail.com",
      subject: "Thanks for your inquiry",
    });
    expect(body.text).toBe("Hi there,\n\nThanks for your inquiry. I will reply within 1 to 2 business days.\n\nAshwani Arya\nhttps://ashwaniarya.vercel.app");
    expect(`${body.text}${body.html}`).not.toMatch(/phish|Visit|Click|[\u2013\u2014]/);
    expect((body.html.match(/href="/g) ?? []).length).toBe(1);
  });

  it("builds the same message for every inquiry (no echo of name or message)", () => {
    expect(buildServiceInquiryAutoReply()).toEqual(buildServiceInquiryAutoReply());
    expect(buildServiceInquiryAutoReply().html).toBe(
      '<p>Hi there,</p>\n<p>Thanks for your inquiry. I will reply within 1 to 2 business days.</p>\n<p>Ashwani Arya<br><a href="https://ashwaniarya.vercel.app">https://ashwaniarya.vercel.app</a></p>',
    );
  });

  it("keeps CR and LF out of every header field (name and email)", async () => {
    const injected = normaliseServiceInquiry({ ...valid, name: "Ada\r\nBcc: v@evil.test", email: "test@example.com\r\nBcc: v@evil.test" });
    expect(injected.name).not.toMatch(/[\r\n]/);
    expect(injected.email).not.toMatch(/[\r\n]/);
    const fetchImplementation = vi.fn(async () => ok());
    await createResendServiceInquiryAutoReplySender(verifiedSender, fetchImplementation as unknown as typeof fetch)({ ...valid, email: "a@b.co\r\nBcc: x" });
    const body = JSON.parse((fetchImplementation.mock.calls[0] as unknown as [string, RequestInit])[1].body as string);
    for (const header of [body.from, body.reply_to, body.subject, ...body.to]) expect(header).not.toMatch(/[\r\n]/);
  });

  it("passes a 10 second timeout signal to Resend (H3)", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout");
    const fetchImplementation = vi.fn(async () => ok());
    await createResendServiceInquiryAutoReplySender(verifiedSender, fetchImplementation as unknown as typeof fetch)(valid);
    expect(timeout).toHaveBeenCalledWith(10_000);
    const init = (fetchImplementation.mock.calls[0] as unknown as [string, RequestInit])[1];
    expect(init.signal).toBe(timeout.mock.results[0].value);
    timeout.mockRestore();
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

describe("auto-reply caps (per instance, in memory)", () => {
  const day = 24 * 60 * 60 * 1000;

  it("sends at most one auto-reply per address per 24 hours, case-insensitively", () => {
    const tryReserve = createServiceInquiryAutoReplyCaps();
    expect(tryReserve("Person@Example.com", 0)).toBe(true);
    expect(tryReserve(" person@example.COM ", 1000)).toBe(false);
    expect(tryReserve("person@example.com", day - 1)).toBe(false);
    expect(tryReserve("person@example.com", day)).toBe(true);
  });

  it("stops at the daily cap across all addresses, then resets the next day", () => {
    const tryReserve = createServiceInquiryAutoReplyCaps({ perRecipientWindowMilliseconds: day, dailyMax: 50, maxTrackedRecipients: 5000 });
    for (let index = 0; index < 50; index += 1) expect(tryReserve(`p${index}@example.com`, index)).toBe(true);
    expect(tryReserve("p50@example.com", 100)).toBe(false);
    expect(tryReserve("p50@example.com", day + 100)).toBe(true);
  });

  it("is enforced by the sender: a capped address gets no Resend call", async () => {
    const fetchImplementation = vi.fn(async () => ok());
    const send = createResendServiceInquiryAutoReplySender(verifiedSender, fetchImplementation as unknown as typeof fetch, () => undefined, createServiceInquiryAutoReplyCaps());
    expect(await send(valid)).toEqual({ sent: true });
    expect(await send({ ...valid, email: "TEST@example.com" })).toEqual({ sent: false, reason: "capped" });
    expect(fetchImplementation).toHaveBeenCalledTimes(1);
  });

  it("refuses new recipients when the bounded store is full of live entries", () => {
    const tryReserve = createServiceInquiryAutoReplyCaps({ perRecipientWindowMilliseconds: day, dailyMax: 1000, maxTrackedRecipients: 2 });
    expect(tryReserve("a@example.com", 0)).toBe(true);
    expect(tryReserve("b@example.com", 0)).toBe(true);
    expect(tryReserve("c@example.com", 0)).toBe(false);
  });
});

describe("auto-reply runs after the response (H2)", () => {
  it("returns the identical 200 body whether the auto-reply is sent, skipped or hangs, without waiting for it", async () => {
    const deliver = vi.fn(async () => ({ delivered: true as const }));
    const scheduled: Array<() => Promise<unknown>> = [];
    const runAfterResponse = (task: () => Promise<unknown>) => void scheduled.push(task);
    const bodies: string[] = [];
    for (const sendAutoReply of [
      vi.fn(async () => ({ sent: true as const })),
      vi.fn(async () => ({ sent: false as const, reason: "not_enabled" as const })),
      vi.fn(() => new Promise<never>(() => undefined)),
    ]) {
      const response = await handleServiceInquiry(post(valid), { isAllowed: () => true, deliver, sendAutoReply, runAfterResponse });
      expect(response.status).toBe(200);
      bodies.push(await response.text());
      expect(sendAutoReply).not.toHaveBeenCalled();
    }
    expect(new Set(bodies)).toEqual(new Set(['{"ok":true}']));
    expect(scheduled).toHaveLength(3);
    await scheduled[0]();
  });
});

