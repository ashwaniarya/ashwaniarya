import { serviceInquiryLimits, type ServiceInquiryInput } from "@/app/config/serviceInquiry";

/**
 * Delivers an inquiry by email through Resend's HTTP API (free tier, no SDK dependency).
 * Needs RESEND_API_KEY in the Vercel environment. Until a domain is verified in Resend, the
 * sender is Resend's shared test address, which can only deliver to the Resend account's own
 * email, so the account must be created with the SERVICE_INQUIRY_TO address (default below).
 * Server-only variables: RESEND_API_KEY, SERVICE_INQUIRY_TO, SERVICE_INQUIRY_FROM (see .env.example).
 */
export const serviceInquiryDeliveryDefaults = {
  // Ashwani approved syncoders@gmail.com as the Resend account and recipient (25 Nov 2026, 3:47 PM IST).
  toEmail: "syncoders@gmail.com",
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

/** The service every inquiry from the Custom application form is about. */
export const serviceInquiryServiceTitle = "a custom application";
export const serviceInquiryAutoReplySubject = "Thanks for your inquiry";
const portfolioUrl = "https://ashwaniarya.vercel.app";

export type ServiceInquiryAutoReplyResult = { sent: true } | { sent: false; reason: "not_enabled" | "provider_error" };
export type ServiceInquiryAutoReplySender = (inquiry: ServiceInquiryInput) => Promise<ServiceInquiryAutoReplyResult>;

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

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

export function buildServiceInquiryAutoReply(inquiry: ServiceInquiryInput, messageMaxLength = serviceInquiryLimits.needMaxLength) {
  const name = singleLine(inquiry.name);
  const message = inquiry.need.slice(0, messageMaxLength);
  const thanks = `Thanks for reaching out about ${serviceInquiryServiceTitle}. I will reply within 1 to 2 business days.`;
  const text = [`Hi ${name},`, "", thanks, "", "Your message:", message, "", "Ashwani Arya", portfolioUrl].join("\n");
  const html = [
    `<p>Hi ${escapeHtml(name)},</p>`,
    `<p>${escapeHtml(thanks)}</p>`,
    `<p>Your message:</p>`,
    `<blockquote style="white-space:pre-wrap">${escapeHtml(message)}</blockquote>`,
    `<p>Ashwani Arya<br><a href="${portfolioUrl}">${portfolioUrl}</a></p>`,
  ].join("\n");
  return { subject: serviceInquiryAutoReplySubject, text, html };
}

export function createResendServiceInquiryAutoReplySender(
  environment: Record<string, string | undefined> = process.env,
  fetchImplementation: typeof fetch = fetch,
  warn: (message: string) => void = (message) => console.warn(message),
): ServiceInquiryAutoReplySender {
  return async (inquiry) => {
    if (!isServiceInquiryAutoReplyEnabled(environment)) return { sent: false, reason: "not_enabled" };
    const { subject, text, html } = buildServiceInquiryAutoReply(inquiry);
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
