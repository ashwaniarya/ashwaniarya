import {
  normaliseServiceInquiry,
  serviceInquiryHoneypotFieldName,
  validateServiceInquiry,
} from "@/app/config/serviceInquiry";
import type { ServiceInquiryDeliverer } from "@/app/lib/serviceInquiryDelivery";
import { getClientKey } from "@/app/lib/serviceInquiryRateLimit";

const maxBodyBytes = 10_000;

export type ServiceInquiryHandlerDependencies = Readonly<{
  isAllowed: (clientKey: string) => boolean;
  deliver: ServiceInquiryDeliverer;
}>;

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

/** POST handler body, with rate limit and delivery injected so tests can drive it. */
export async function handleServiceInquiry(request: Request, dependencies: ServiceInquiryHandlerDependencies) {
  if (!dependencies.isAllowed(getClientKey(request.headers))) {
    return json(429, { ok: false, error: "rate_limited", message: "Too many requests. Please try again in a few minutes." });
  }
  const rawText = await request.text();
  if (rawText.length > maxBodyBytes) return json(413, { ok: false, error: "too_large" });
  let raw: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(rawText);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("not an object");
    raw = parsed as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, error: "invalid_json" });
  }
  // Honeypot: answer as if it worked, so bots learn nothing, and send nothing.
  const honeypot = raw[serviceInquiryHoneypotFieldName];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return json(200, { ok: true });

  const inquiry = normaliseServiceInquiry(raw);
  const errors = validateServiceInquiry(inquiry);
  if (Object.keys(errors).length > 0) return json(400, { ok: false, error: "invalid", errors });

  const result = await dependencies.deliver(inquiry);
  if (result.delivered) return json(200, { ok: true });
  return json(503, {
    ok: false,
    error: result.reason,
    message: "The form could not send right now. Please email me instead.",
  });
}
