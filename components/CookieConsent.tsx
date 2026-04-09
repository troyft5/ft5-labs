'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'ft5-cookie-consent'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    }, 1500)
    return () => clearTimeout(t)
  }, [])

  const accept = () => { localStorage.setItem(STORAGE_KEY, 'accepted'); setVisible(false) }
  const decline = () => { localStorage.setItem(STORAGE_KEY, 'declined'); setVisible(false) }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-6 py-3"
      style={{
        background: 'rgba(6,12,6,0.97)',
        borderTop: '1px solid rgba(78,144,0,0.18)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <p className="text-xs text-slate-500 leading-relaxed flex-1">
        <span className="font-bold text-slate-300">Cookies</span> — we use them to analyse traffic and improve your experience. No personal data is ever sold.{' '}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-slate-300 transition-colors">
          Privacy Policy
        </Link>
      </p>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={decline}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors px-3 py-1.5 rounded-lg"
        >
          Decline
        </button>
        <button
          onClick={accept}
          className="text-xs font-black text-white px-4 py-1.5 rounded-lg transition-all hover:-translate-y-0.5"
          style={{ background: '#4e9000' }}
        >
          Got it
        </button>
      </div>
    </div>
  )
}
