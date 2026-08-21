'use client'

import { hasTrackingConsent } from './consent'

const CRM_BASE = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'https://app.fintech5group.com'
const SESSION_KEY = 'ft5_visit_session'
const CONVERTED_KEY = 'ft5_converted'

/** Has this visitor already submitted any form this browser? Lead-capture
 * popups (exit-intent, lead magnet) should never ask someone for their
 * email again once we already have it. */
export function hasConverted(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CONVERTED_KEY) === '1'
}

/**
 * Links this browser's anonymous pageview history to a real identity -
 * call on every successful form submit. The CRM backfills every prior
 * website_visits row for this session_id onto the matched contact, so an
 * agent can see "browsed pricing 3x before filling out the estimate form"
 * instead of the pageview trail and the lead being two disconnected things.
 */
export function identifyVisitor(email: string) {
  if (typeof window === 'undefined') return
  // Suppressing "give us your email" popups for someone who already did isn't
  // tracking, it's just not being annoying: set this regardless of consent.
  localStorage.setItem(CONVERTED_KEY, '1')
  if (!hasTrackingConsent()) return
  const sessionId = localStorage.getItem(SESSION_KEY)
  if (!sessionId || !email) return

  fetch(`${CRM_BASE}/api/track/pageview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      url: window.location.href,
      referrer: document.referrer || undefined,
      page_title: document.title,
      email,
    }),
  }).catch(() => {})
}
