/**
 * Server-side Cloudflare Turnstile verification.
 * Call from a form API route with the token the client sent
 * (`cf-turnstile-response` from the widget's callback).
 */
const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

const EXPECTED_HOSTNAMES = new Set(
  (process.env.TURNSTILE_HOSTNAMES ?? '')
    .split(',')
    .map(h => h.trim())
    .filter(Boolean),
)

export async function verifyTurnstile(token: unknown, expectedAction: string, ip: string): Promise<boolean> {
  if (typeof token !== 'string' || token.length === 0 || token.length > 2048 || EXPECTED_HOSTNAMES.size === 0) {
    return false
  }

  let result: { success?: boolean; action?: string; hostname?: string }
  try {
    const res = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      signal: AbortSignal.timeout(10_000),
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET ?? '',
        response: token,
        remoteip: ip,
      }),
    })
    if (!res.ok) return false
    result = await res.json()
  } catch {
    return false
  }

  return result.success === true && result.action === expectedAction && EXPECTED_HOSTNAMES.has(result.hostname ?? '')
}
