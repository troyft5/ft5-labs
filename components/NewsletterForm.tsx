'use client'

import { useRef, useState } from 'react'
import { identifyVisitor } from '@/lib/identify'
import Turnstile, { type TurnstileHandle } from './Turnstile'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [hp, setHp] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')
  const [turnstileToken, setTurnstileToken] = useState('')
  const turnstileRef = useRef<TurnstileHandle>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, hp, turnstileToken, source: 'newsletter-footer' }),
    }).catch(() => null)
    identifyVisitor(email)
    setTurnstileToken('')
    turnstileRef.current?.reset()
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.2)' }}>
          <span style={{ color: '#6fc200' }} className="text-xs">✓</span>
        </div>
        <span className="text-sm font-bold" style={{ color: '#6fc200' }}>You&apos;re on the list: we&apos;ll alert you when rates change.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input
        type="text"
        name="website"
        value={hp}
        onChange={e => setHp(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }}
      />
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#4e9000] placeholder:text-slate-600"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !turnstileToken}
          className="shrink-0 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:-translate-y-0.5 disabled:opacity-60"
          style={{ background: '#4e9000' }}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      <Turnstile ref={turnstileRef} action="newsletter" onVerify={setTurnstileToken} />
    </form>
  )
}
