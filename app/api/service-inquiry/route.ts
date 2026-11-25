import { after } from "next/server";

import {
  createResendServiceInquiryAutoReplySender,
  createResendServiceInquiryDeliverer,
  createServiceInquiryAutoReplyCaps,
  getServiceInquiryRecipient,
} from "@/app/lib/serviceInquiryDelivery";
import { handleServiceInquiry } from "@/app/lib/serviceInquiryHandler";
import { createServiceInquiryRateLimiter } from "@/app/lib/serviceInquiryRateLimit";

export const runtime = "nodejs";

// Module scope: shared by requests on the same warm instance (see serviceInquiryRateLimit.ts and the
// auto-reply caps in serviceInquiryDelivery.ts). Per instance by design: no shared store is linked.
const isAllowed = createServiceInquiryRateLimiter();
const tryReserveAutoReply = createServiceInquiryAutoReplyCaps();

export async function POST(request: Request) {
  return handleServiceInquiry(request, {
    isAllowed,
    deliver: createResendServiceInquiryDeliverer(),
    sendAutoReply: createResendServiceInquiryAutoReplySender(process.env, fetch, undefined, tryReserveAutoReply),
    runAfterResponse: (task) => after(task),
    fallbackEmail: getServiceInquiryRecipient(),
  });
}
