'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

const CRM_BASE = process.env.NEXT_PUBLIC_CRM_API_URL ?? 'https://app.fintech5group.com'
const SESSION_KEY = 'ft5_visit_session'

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(SESSION_KEY, id)
  }
  return id
}

/**
 * Replaces the HubSpot tracking script — pageviews + UTM capture flow into
 * the FT5 CRM's `website_visits` table and get matched to a contact the
 * moment that visitor's email shows up anywhere (contact form, newsletter,
 * booking). No third-party tracker, no cookie consent complexity beyond
 * what we already control.
 */
export default function CrmTracking() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const sessionId = getSessionId()
    const url = window.location.href

    fetch(`${CRM_BASE}/api/track/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        url,
        referrer: document.referrer || undefined,
        page_title: document.title,
        utm_source: searchParams.get('utm_source') || undefined,
        utm_medium: searchParams.get('utm_medium') || undefined,
        utm_campaign: searchParams.get('utm_campaign') || undefined,
      }),
    }).catch(() => {})
  }, [pathname, searchParams])

  return null
}
