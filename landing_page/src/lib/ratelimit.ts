import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate limiter: 10 requests per 10 minutes per IP (sliding window)
// This prevents spam while being generous enough for legitimate users.
export const rateLimit = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(10, "10 m"),
      analytics: true,
      prefix: "nox:ratelimit:early-access",
    })
  : null;

// Export Redis client for manual key operations (e.g. resetting rate limits)
export const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? Redis.fromEnv()
  : null;
