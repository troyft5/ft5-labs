'use client'

import { useState, useEffect } from 'react'
import { X, CheckSquare, ShieldCheck, ArrowRight } from 'lucide-react'

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [hasFired, setHasFired] = useState(false)

  useEffect(() => {
    // Only fire on desktop. Mobile exit intent requires different heuristics (e.g. fast scrolling up).
    const handleMouseOut = (e: MouseEvent) => {
      // Fire if mouse moves up out of the viewport (clientY < 10) and leaves the document (relatedTarget is null)
      if (e.clientY < 10 && (e.relatedTarget === null || (e.relatedTarget as HTMLElement).nodeName === 'HTML') && !hasFired) {
        setIsOpen(true)
        setHasFired(true)
      }
    }

    document.addEventListener('mouseout', handleMouseOut)
    return () => document.removeEventListener('mouseout', handleMouseOut)
  }, [hasFired])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    // Simulate network
    await new Promise(r => setTimeout(r, 1000))
    setStatus('success')
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6" style={{ background: 'rgba(5, 10, 5, 0.85)', backdropFilter: 'blur(8px)' }}>
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      <div 
        className="relative w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        style={{ background: '#0a1208', border: '1px solid rgba(78,144,0,0.3)' }}
      >
        <div className="h-1 w-full bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4]" />
        
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 animate-pulse text-slate-500 hover:text-white hover:animate-none transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-5" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.3)' }}>
                <CheckSquare className="w-8 h-8" style={{ color: '#6fc200' }} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Checklist Sent!</h3>
              <p className="text-slate-400 mb-6">
                We&apos;ve sent the 5-Minute Self-Audit Checklist to <span className="text-white font-bold">{email}</span>.
              </p>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-full py-3.5 rounded-xl font-bold text-white transition-all hover:bg-white/10"
                style={{ border: '1px solid rgba(255,255,255,0.1)' }}
              >
                Close Window
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4" style={{ background: 'rgba(255,255,255,0.05)', color: '#06b6d4', border: '1px solid rgba(6,182,212,0.3)' }}>
                  Wait before you go
                </span>
                <h3 className="text-3xl font-black text-white leading-tight mb-3">
                  Not quite ready to share your statement?
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  We get it. Drop your email below, and we&apos;ll send you our <span className="text-white font-bold">5-Minute Self-Audit Checklist</span>. It shows you exactly where to look on your own statement to spot the 3 most common hidden fees.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input 
                  type="email" 
                  required 
                  placeholder="your@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl px-4 py-3.5 text-white text-sm font-medium outline-none transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-[#06b6d4]" 
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                />

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:translate-y-0"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)', boxShadow: '0 4px 14px rgba(6,182,212,0.3)' }}
                >
                  {status === 'loading' ? 'Sending Checklist...' : <>Send Me The Checklist <ArrowRight className="w-4 h-4" /></>}
                </button>
                <div className="text-center mt-2">
                   <button 
                     type="button" 
                     onClick={() => setIsOpen(false)} 
                     className="text-[11px] font-bold text-slate-500 hover:text-slate-300 transition-colors uppercase tracking-widest"
                   >
                     No thanks, I&apos;ll keep overpaying
                   </button>
                </div>
              </form>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-slate-500" />
                Zero spam. You can unsubscribe instantly.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
