/**
 * In-memory sliding-window rate limiter. Per serverless instance only, which is
 * fine as a v1 abuse brake — the goal is stopping someone burning the Gemini key
 * in a loop, not perfect global accounting. Swap for Upstash/Redis at scale.
 */

interface Window {
  timestamps: number[];
}

const buckets = new Map<string, Window>();
const MAX_BUCKETS = 10_000;

export interface RateLimitRule {
  limit: number;
  windowMs: number;
}

export const IP_ANALYZE_RULE: RateLimitRule = { limit: 8, windowMs: 60 * 60 * 1000 }; // 8 analyses / hour / IP
export const IP_LEAD_RULE: RateLimitRule = { limit: 5, windowMs: 60 * 60 * 1000 }; // 5 lead submissions / hour / IP
export const CLINIC_DAY_WINDOW_MS = 24 * 60 * 60 * 1000;

export function checkRateLimit(key: string, rule: RateLimitRule): boolean {
  const now = Date.now();
  let bucket = buckets.get(key);
  if (!bucket) {
    if (buckets.size >= MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
    bucket = { timestamps: [] };
    buckets.set(key, bucket);
  }
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < rule.windowMs);
  if (bucket.timestamps.length >= rule.limit) return false;
  bucket.timestamps.push(now);
  return true;
}

export function getClientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return headers.get("x-real-ip") ?? "unknown";
}
