import {
  normaliseServiceInquiry,
  serviceInquiryDefaultRecipient,
  serviceInquiryHoneypotFieldName,
  validateServiceInquiry,
} from "@/app/config/serviceInquiry";
import type { ServiceInquiryAutoReplySender, ServiceInquiryDeliverer } from "@/app/lib/serviceInquiryDelivery";
import { getClientKey } from "@/app/lib/serviceInquiryRateLimit";

const maxBodyBytes = 10_000;

export type ServiceInquiryHandlerDependencies = Readonly<{
  isAllowed: (clientKey: string) => boolean;
  deliver: ServiceInquiryDeliverer;
  /** Optional "Thanks for your inquiry" email to the sender, tried only after the owner email is delivered. */
  sendAutoReply?: ServiceInquiryAutoReplySender;
  /**
   * Runs work after the response is sent (Next's `after()` in the route), so the auto-reply never delays
   * the 200 and timing does not reveal whether it is enabled. Defaults to fire-and-forget.
   */
  runAfterResponse?: (task: () => Promise<unknown>) => void;
  /** Mailto shown when delivery fails: the same address inquiries go to (SERVICE_INQUIRY_TO). */
  fallbackEmail?: string;
}>;

/**
 * Reads the body as a stream and stops once it passes `limit` bytes, so a chunked upload with no
 * Content-Length is never buffered in full. Returns null when over the limit.
 */
async function readBodyWithinLimit(request: Request, limit: number): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > limit) {
      await reader.cancel().catch(() => undefined);
      return null;
    }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(bytes);
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

/** POST handler body, with rate limit and delivery injected so tests can drive it. */
export async function handleServiceInquiry(request: Request, dependencies: ServiceInquiryHandlerDependencies) {
  if (!dependencies.isAllowed(getClientKey(request.headers))) {
    return json(429, { ok: false, error: "rate_limited", message: "Too many requests. Please try again in a few minutes." });
  }
  if (!(request.headers.get("content-type") ?? "").toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, error: "unsupported_media_type" });
  }
  if (Number(request.headers.get("content-length") ?? "0") > maxBodyBytes) return json(413, { ok: false, error: "too_large" });
  const rawText = await readBodyWithinLimit(request, maxBodyBytes);
  if (rawText === null) return json(413, { ok: false, error: "too_large" });
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
  if (result.delivered) {
    // Best effort, after the response: an auto-reply problem never changes the answer or its timing.
    const sendAutoReply = dependencies.sendAutoReply;
    if (sendAutoReply) {
      const task = () => sendAutoReply(inquiry).catch(() => undefined);
      (dependencies.runAfterResponse ?? ((run) => void run()))(task);
    }
    return json(200, { ok: true });
  }
  return json(503, {
    ok: false,
    error: result.reason,
    message: "The form could not send right now. Please email me instead.",
    contactEmail: dependencies.fallbackEmail ?? serviceInquiryDefaultRecipient,
  });
}
