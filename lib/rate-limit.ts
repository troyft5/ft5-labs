/**
 * Simple in-memory per-key rate limiter. Resets on cold start — good enough
 * as a backstop behind Turnstile, not a substitute for it.
 */
const counts = new Map<string, { count: number; reset: number }>()

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = counts.get(key)
  if (!entry || now > entry.reset) {
    counts.set(key, { count: 1, reset: now + windowMs })
    return false
  }
  entry.count++
  return entry.count > limit
}
