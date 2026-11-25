/**
 * Fixed-window rate limit per client IP, kept in memory.
 *
 * On Vercel each function instance has its own memory, and instances are recycled, so this is a
 * best-effort guard (it stops a single client hammering one warm instance), not a global quota.
 * No KV store is linked to this project; if spam gets through, swap this for a shared store.
 */
export const serviceInquiryRateLimitConfiguration = {
  maxRequestsPerWindow: 3,
  windowMilliseconds: 10 * 60 * 1000,
  /** Bounds memory: the oldest entries are dropped past this many tracked IPs. */
  maxTrackedClients: 5000,
} as const;

type WindowEntry = { windowStart: number; count: number };

export type ServiceInquiryRateLimitConfiguration = Readonly<{
  maxRequestsPerWindow: number;
  windowMilliseconds: number;
  maxTrackedClients: number;
}>;

export function createServiceInquiryRateLimiter(
  configuration: ServiceInquiryRateLimitConfiguration = serviceInquiryRateLimitConfiguration,
) {
  const windows = new Map<string, WindowEntry>();
  return function isAllowed(clientKey: string, now = Date.now()): boolean {
    const entry = windows.get(clientKey);
    if (!entry || now - entry.windowStart >= configuration.windowMilliseconds) {
      windows.delete(clientKey);
      windows.set(clientKey, { windowStart: now, count: 1 });
      if (windows.size > configuration.maxTrackedClients) {
        windows.delete(windows.keys().next().value as string);
      }
      return true;
    }
    if (entry.count >= configuration.maxRequestsPerWindow) return false;
    entry.count += 1;
    return true;
  };
}

/** First address in x-forwarded-for (set by Vercel), else x-real-ip, else a shared bucket. */
export function getClientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  // Cap the key so a long spoofed header cannot inflate the map (Vercel overwrites x-forwarded-for).
  return (forwarded || headers.get("x-real-ip")?.trim() || "unknown").slice(0, 64);
}
