'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, FileDown, CheckCircle2, ShieldCheck } from 'lucide-react'
import { identifyVisitor, hasConverted } from '@/lib/identify'

export default function LeadMagnetModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Already gave us their email elsewhere on the site: don't ask again,
    // skip straight to the download state.
    if (hasConverted()) setStatus('success')
  }, [])

  if (!mounted) return null
  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source: 'lead-magnet-cheat-sheet' }),
    }).catch(() => null)
    identifyVisitor(email)
    setStatus('success')
  }

  // Portal to document.body: a fixed-position modal rendered inline can get
  // trapped inside a transformed/will-change ancestor (e.g. ScrollDepth3D's
  // reveal animation), which makes `position: fixed` relative to that
  // ancestor instead of the viewport and squashes the modal into a tiny box.
  return createPortal(
    <div className="fixed inset-0 z-[100] overflow-y-auto" style={{ background: 'rgba(5, 10, 5, 0.85)', backdropFilter: 'blur(8px)' }}>
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative min-h-full flex items-center justify-center p-4 sm:p-6">
        <div
          className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
          style={{ background: '#0a1208', border: '1px solid rgba(78,144,0,0.3)' }}
        >
        {/* Header gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#4e9000] to-[#8cd627]" />
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.3)' }}>
                <CheckCircle2 className="w-8 h-8" style={{ color: '#6fc200' }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">You&apos;re all set!</h3>
              <p className="text-slate-400 mb-6">
                View the cheat sheet now, or open it in your browser and print or save as PDF from there.
              </p>
              <a
                href="/interchange-cheat-sheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 mb-3"
                style={{ background: '#4e9000', boxShadow: '0 4px 14px rgba(78,144,0,0.3)' }}
              >
                <FileDown className="w-4 h-4" /> Open Cheat Sheet
              </a>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold text-slate-400 hover:text-white transition-colors text-sm"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Graphic/Icon */}
              <div className="mb-6 flex gap-4 items-start">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <FileDown className="w-6 h-6" style={{ color: '#6fc200' }} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight mb-2">
                    Steal our 2026 Interchange Cheat Sheet.
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Don&apos;t want a full statement audit yet? Grab our free guide showing exactly what Visa and Mastercard actually charge. If your processor is charging more, they&apos;re pocketing the difference.
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">
                    Where should we send it?
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="you@business.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl px-4 py-3.5 text-white text-sm font-medium outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-[#4e9000]" 
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0 mt-2"
                  style={{ background: '#4e9000', boxShadow: '0 4px 14px rgba(78,144,0,0.3)' }}
                >
                  {status === 'loading' ? 'Sending...' : 'Get the Free PDF'}
                </button>
              </form>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                No spam. We hate it as much as you do.
              </div>
            </>
          )}
        </div>
      </div>
      </div>
    </div>,
    document.body
  )
}
