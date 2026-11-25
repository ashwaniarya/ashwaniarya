import { createResendServiceInquiryDeliverer } from "@/app/lib/serviceInquiryDelivery";
import { handleServiceInquiry } from "@/app/lib/serviceInquiryHandler";
import { createServiceInquiryRateLimiter } from "@/app/lib/serviceInquiryRateLimit";

export const runtime = "nodejs";

// Module scope: shared by requests on the same warm instance (see serviceInquiryRateLimit.ts).
const isAllowed = createServiceInquiryRateLimiter();

export async function POST(request: Request) {
  return handleServiceInquiry(request, { isAllowed, deliver: createResendServiceInquiryDeliverer() });
}
