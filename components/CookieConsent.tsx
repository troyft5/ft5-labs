'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ft5-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Small delay so it doesn't flash on first paint
    const t = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    }, 1200)
    return () => clearTimeout(t)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div
        className="max-w-xl ml-auto pointer-events-auto rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        style={{
          background: '#0d1a0d',
          border: '1px solid rgba(78,144,0,0.25)',
          boxShadow: '0 -4px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-white mb-1">We use cookies 🍪</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            To analyse site traffic and improve your experience. No personal data is ever sold.{' '}
            <Link href="/privacy-policy" className="underline hover:text-slate-300 transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-xs text-slate-600 hover:text-slate-400 transition-colors px-3 py-2 rounded-lg"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-xs font-black text-white px-5 py-2 rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: '#4e9000' }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
