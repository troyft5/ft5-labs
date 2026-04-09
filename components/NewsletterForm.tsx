'use client'

import { useState } from 'react'

export default function NewsletterForm() {
  const [status, setStatus] = useState<'idle' | 'done'>('idle')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('done')
  }

  if (status === 'done') {
    return (
      <div className="flex items-center gap-3 py-2">
        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.2)' }}>
          <span style={{ color: '#6fc200' }} className="text-xs">✓</span>
        </div>
        <span className="text-sm font-bold" style={{ color: '#6fc200' }}>You&apos;re on the list — we&apos;ll alert you when rates change.</span>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        placeholder="your@email.com"
        className="flex-1 rounded-xl px-4 py-3 text-sm text-white outline-none focus:ring-1 focus:ring-[#4e9000] placeholder:text-slate-600"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
      />
      <button
        type="submit"
        className="shrink-0 px-6 py-3 rounded-xl text-sm font-black text-white transition-all hover:-translate-y-0.5"
        style={{ background: '#4e9000' }}
      >
        Subscribe
      </button>
    </form>
  )
}
