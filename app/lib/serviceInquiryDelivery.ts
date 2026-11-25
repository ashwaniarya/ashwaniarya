import { serviceInquiryDefaultRecipient, type ServiceInquiryInput } from "@/app/config/serviceInquiry";

/**
 * Delivers an inquiry by email through Resend's HTTP API (free tier, no SDK dependency).
 * Needs RESEND_API_KEY in the Vercel environment. Until a domain is verified in Resend, the
 * sender is Resend's shared test address, which can only deliver to the Resend account's own
 * email, so the account must be created with the SERVICE_INQUIRY_TO address (default below).
 * Server-only variables: RESEND_API_KEY, SERVICE_INQUIRY_TO, SERVICE_INQUIRY_FROM (see .env.example).
 */
export const serviceInquiryDeliveryDefaults = {
  // Ashwani approved syncoders@gmail.com as the Resend account and recipient (25 Nov 2026, 3:47 PM IST).
  toEmail: serviceInquiryDefaultRecipient,
  fromEmail: "Portfolio inquiries <onboarding@resend.dev>",
  resendEndpoint: "https://api.resend.com/emails",
} as const;

export type ServiceInquiryDeliveryResult = { delivered: true } | { delivered: false; reason: "not_configured" | "provider_error" };

export type ServiceInquiryDeliverer = (inquiry: ServiceInquiryInput) => Promise<ServiceInquiryDeliveryResult>;

export function buildServiceInquiryEmail(inquiry: ServiceInquiryInput) {
  const subject = `Custom application inquiry from ${inquiry.name}`;
  const text = [
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Budget: ${inquiry.budget}`,
    `Timeline: ${inquiry.timeline}`,
    "",
    "What they need:",
    inquiry.need,
    "",
    "Sent from the Custom application form on the portfolio.",
  ].join("\n");
  return { subject, text };
}

export function createResendServiceInquiryDeliverer(
  environment: Record<string, string | undefined> = process.env,
  fetchImplementation: typeof fetch = fetch,
): ServiceInquiryDeliverer {
  return async (inquiry) => {
    const apiKey = environment.RESEND_API_KEY;
    if (!apiKey) return { delivered: false, reason: "not_configured" };
    const { subject, text } = buildServiceInquiryEmail(inquiry);
    try {
      const response = await fetchImplementation(serviceInquiryDeliveryDefaults.resendEndpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from: environment.SERVICE_INQUIRY_FROM || serviceInquiryDeliveryDefaults.fromEmail,
          to: [environment.SERVICE_INQUIRY_TO || serviceInquiryDeliveryDefaults.toEmail],
          reply_to: inquiry.email,
          subject,
          text,
        }),
      });
      return response.ok ? { delivered: true } : { delivered: false, reason: "provider_error" };
    } catch {
      return { delivered: false, reason: "provider_error" };
    }
  };
}

export const serviceInquiryAutoReplySubject = "Thanks for your inquiry";
const portfolioUrl = "https://ashwaniarya.vercel.app";

export type ServiceInquiryAutoReplyResult = { sent: true } | { sent: false; reason: "not_enabled" | "capped" | "provider_error" };
export type ServiceInquiryAutoReplySender = (inquiry: ServiceInquiryInput) => Promise<ServiceInquiryAutoReplyResult>;

/** Strips CR, LF and other control characters so nothing can add a header line. */
const singleLine = (value: string) => value.replace(/[\u0000-\u001f\u007f]/g, " ").trim();

/**
 * Auto-reply is on only with a real sending domain: SERVICE_INQUIRY_FROM must be set and must not
 * be a resend.dev address (Resend's test sender only delivers to the account owner).
 */
export function isServiceInquiryAutoReplyEnabled(environment: Record<string, string | undefined>): boolean {
  const from = environment.SERVICE_INQUIRY_FROM?.trim();
  if (!environment.RESEND_API_KEY || !from) return false;
  const address = (from.match(/<([^>]+)>/)?.[1] ?? from).trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+$/.test(address) && !/@(?:[^@]*\.)?resend\.dev$/.test(address);
}

/**
 * Fixed template: nothing the inquirer typed (name or message) is in it, so the form cannot be used to
 * send attacker-chosen text from the sending domain to an arbitrary address.
 */
export function buildServiceInquiryAutoReply() {
  const thanks = "Thanks for your inquiry. I will reply within 1 to 2 business days.";
  const text = ["Hi there,", "", thanks, "", "Ashwani Arya", portfolioUrl].join("\n");
  const html = [`<p>Hi there,</p>`, `<p>${thanks}</p>`, `<p>Ashwani Arya<br><a href="${portfolioUrl}">${portfolioUrl}</a></p>`].join("\n");
  return { subject: serviceInquiryAutoReplySubject, text, html };
}

/**
 * Auto-reply caps, in memory and per function instance (no shared store and no paid infra). At most one
 * auto-reply per recipient address (lowercased) per 24 hours, and at most `dailyMax` per instance per day.
 * Acceptable because the message is fixed: a bypass can only send the same plain thank-you.
 */
export const serviceInquiryAutoReplyCapsConfiguration = {
  perRecipientWindowMilliseconds: 24 * 60 * 60 * 1000,
  dailyMax: 50,
  maxTrackedRecipients: 5000,
} as const;

export type ServiceInquiryAutoReplyCapsConfiguration = Readonly<{
  perRecipientWindowMilliseconds: number;
  dailyMax: number;
  maxTrackedRecipients: number;
}>;

export function createServiceInquiryAutoReplyCaps(
  configuration: ServiceInquiryAutoReplyCapsConfiguration = serviceInquiryAutoReplyCapsConfiguration,
) {
  const lastSentAt = new Map<string, number>();
  let dayStart = -Infinity;
  let sentToday = 0;
  /** Reserves a send for this address now, or returns false when a cap says no. */
  return function tryReserve(email: string, now = Date.now()): boolean {
    const recipient = email.trim().toLowerCase();
    if (now - dayStart >= 24 * 60 * 60 * 1000) {
      dayStart = now;
      sentToday = 0;
    }
    if (sentToday >= configuration.dailyMax) return false;
    const previous = lastSentAt.get(recipient);
    if (previous !== undefined && now - previous < configuration.perRecipientWindowMilliseconds) return false;
    if (previous === undefined && lastSentAt.size >= configuration.maxTrackedRecipients) {
      for (const [key, sentAt] of lastSentAt) {
        if (now - sentAt >= configuration.perRecipientWindowMilliseconds) lastSentAt.delete(key);
      }
      if (lastSentAt.size >= configuration.maxTrackedRecipients) return false;
    }
    lastSentAt.set(recipient, now);
    sentToday += 1;
    return true;
  };
}

export function createResendServiceInquiryAutoReplySender(
  environment: Record<string, string | undefined> = process.env,
  fetchImplementation: typeof fetch = fetch,
  warn: (message: string) => void = (message) => console.warn(message),
  tryReserve: (email: string) => boolean = createServiceInquiryAutoReplyCaps(),
): ServiceInquiryAutoReplySender {
  return async (inquiry) => {
    if (!isServiceInquiryAutoReplyEnabled(environment)) return { sent: false, reason: "not_enabled" };
    if (!tryReserve(inquiry.email)) return { sent: false, reason: "capped" };
    const { subject, text, html } = buildServiceInquiryAutoReply();
    try {
      const response = await fetchImplementation(serviceInquiryDeliveryDefaults.resendEndpoint, {
        method: "POST",
        headers: { Authorization: `Bearer ${environment.RESEND_API_KEY}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(10_000),
        body: JSON.stringify({
          from: singleLine(environment.SERVICE_INQUIRY_FROM ?? ""),
          to: [singleLine(inquiry.email)],
          reply_to: environment.SERVICE_INQUIRY_TO || serviceInquiryDeliveryDefaults.toEmail,
          subject,
          text,
          html,
        }),
      });
      if (response.ok) return { sent: true };
      warn(`service-inquiry: auto-reply not sent (provider status ${response.status})`);
    } catch (error) {
      warn(`service-inquiry: auto-reply not sent (${error instanceof Error ? error.name : "error"})`);
    }
    return { sent: false, reason: "provider_error" };
  };
}

/** Where the no-key or failure fallback mailto points: the same address inquiries go to. */
export function getServiceInquiryRecipient(environment: Record<string, string | undefined> = process.env): string {
  return environment.SERVICE_INQUIRY_TO || serviceInquiryDeliveryDefaults.toEmail;
}
