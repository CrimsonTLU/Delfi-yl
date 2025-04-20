import { RateLimiterMemory } from "rate-limiter-flexible";

export const rateLimiter = new RateLimiterMemory({
  keyPrefix: "multiply",
  points: 5, // 5 requests
  duration: 15, // per 15 seconds per IP
});
