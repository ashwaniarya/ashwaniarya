import type { ServiceInquiryInput } from "@/app/config/serviceInquiry";

/**
 * Delivers an inquiry by email through Resend's HTTP API (free tier, no SDK dependency).
 * Needs RESEND_API_KEY in the Vercel environment. Until a domain is verified in Resend, the
 * sender is Resend's shared test address, which can only deliver to the Resend account's own
 * email, so the account must be created with SERVICE_INQUIRY_TO_EMAIL (default below).
 */
export const serviceInquiryDeliveryDefaults = {
  toEmail: "ashwaniparker@gmail.com",
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
        body: JSON.stringify({
          from: environment.SERVICE_INQUIRY_FROM_EMAIL || serviceInquiryDeliveryDefaults.fromEmail,
          to: [environment.SERVICE_INQUIRY_TO_EMAIL || serviceInquiryDeliveryDefaults.toEmail],
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
