/** Custom application inquiry: fields, options and validation shared by the form and the API route. */

export const serviceInquiryBudgetOptions = [
  "Under $2,000",
  "$2,000 to $5,000",
  "$5,000 to $10,000",
  "Over $10,000",
  "Not sure yet",
] as const;

export const serviceInquiryTimelineOptions = [
  "As soon as possible",
  "Within a month",
  "1 to 3 months",
  "Flexible",
] as const;

/**
 * Default inquiry recipient, also the client-side fallback mailto. Server env SERVICE_INQUIRY_TO overrides
 * it (Ashwani approved syncoders@gmail.com as the Resend account and recipient, 25 Nov 2026, 3:47 PM IST).
 */
export const serviceInquiryDefaultRecipient = "syncoders@gmail.com";

/** Hidden field real people never fill. A filled value means a bot; the server accepts and drops it. */
export const serviceInquiryHoneypotFieldName = "company_website";

export const serviceInquiryLimits = {
  nameMaxLength: 100,
  emailMaxLength: 200,
  needMinLength: 20,
  needMaxLength: 3000,
} as const;

export type ServiceInquiryInput = Readonly<{
  name: string;
  email: string;
  need: string;
  budget: string;
  timeline: string;
}>;

export type ServiceInquiryField = keyof ServiceInquiryInput;
export type ServiceInquiryErrors = Partial<Record<ServiceInquiryField, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normaliseServiceInquiry(raw: Record<string, unknown>): ServiceInquiryInput {
  const text = (key: ServiceInquiryField) => (typeof raw[key] === "string" ? (raw[key] as string).replace(key === "need" ? /[\u0000-\u0008\u000b-\u001f\u007f]/g : /[\u0000-\u001f\u007f]/g, " ").trim() : "");
  return { name: text("name"), email: text("email"), need: text("need"), budget: text("budget"), timeline: text("timeline") };
}

export function validateServiceInquiry(input: ServiceInquiryInput): ServiceInquiryErrors {
  const errors: ServiceInquiryErrors = {};
  const { nameMaxLength, emailMaxLength, needMinLength, needMaxLength } = serviceInquiryLimits;
  if (!input.name) errors.name = "Please add your name.";
  else if (input.name.length > nameMaxLength) errors.name = `Please keep your name under ${nameMaxLength} characters.`;
  if (!input.email) errors.email = "Please add your email so I can reply.";
  else if (input.email.length > emailMaxLength || !emailPattern.test(input.email)) errors.email = "Please enter a valid email address.";
  if (!input.need) errors.need = "Please describe what you need.";
  else if (input.need.length < needMinLength) errors.need = `Please add a little more detail (at least ${needMinLength} characters).`;
  else if (input.need.length > needMaxLength) errors.need = `Please keep it under ${needMaxLength} characters.`;
  if (!(serviceInquiryBudgetOptions as readonly string[]).includes(input.budget)) errors.budget = "Please pick a budget range.";
  if (!(serviceInquiryTimelineOptions as readonly string[]).includes(input.timeline)) errors.timeline = "Please pick a timeline.";
  return errors;
}
