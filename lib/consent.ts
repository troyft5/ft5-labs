'use client'

const STORAGE_KEY = 'ft5-cookie-consent'

/**
 * Default-on, opt-out: tracking runs until someone explicitly clicks
 * "Decline" in CookieConsent.tsx. Matches that banner's copy ("we use them
 * to analyse traffic..."), which implies tracking-by-default rather than
 * asking permission first: but a decline must actually stop it, which
 * nothing enforced before this.
 */
export function hasTrackingConsent(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(STORAGE_KEY) !== 'declined'
}
