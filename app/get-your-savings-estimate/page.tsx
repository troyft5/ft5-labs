'use client'

import { useState } from 'react'
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react'

const BG = '#0f1a0f'
const BG2 = '#131f13'

const inputClass = "w-full rounded-xl px-4 py-3 text-white text-sm font-medium outline-none transition-all focus:ring-1"
const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
const inputFocusStyle = { '--tw-ring-color': '#4e9000' } as React.CSSProperties
const labelClass = "text-sm font-bold text-slate-400 mb-1.5 block"

export default function Estimate() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Analysis</span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.25)' }}>
            <Calculator className="w-7 h-7" style={{ color: '#6fc200' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
            Get Your <span style={{ color: '#6fc200' }}>Savings Estimate</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">Upload your statement or provide a few details — our consultants will calculate exactly how much you can save.</p>
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-16" style={{ background: BG }}>
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.3)' }}>
                  <ShieldCheck className="w-10 h-10" style={{ color: '#6fc200' }} />
                </div>
                <h3 className="text-2xl font-black mb-2 text-white">Request Received</h3>
                <p className="text-slate-400">Our consultants are reviewing your details and will reach out shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input type="text" required className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }} placeholder="John" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input type="text" required className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }} placeholder="Smith" />
                  </div>
                </div>

                <div>
                  <label className={labelClass}>Business Name *</label>
                  <input type="text" required className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }} placeholder="Acme Corp" />
                </div>

                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" required className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }} placeholder="john@business.com" />
                </div>

                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input type="tel" className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }} placeholder="(555) 000-0000" />
                </div>

                <div>
                  <label className={labelClass}>Estimated Monthly Processing Volume</label>
                  <select className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }}>
                    <option style={{ background: '#0f1a0f' }}>Under $10,000</option>
                    <option style={{ background: '#0f1a0f' }}>$10,000 – $50,000</option>
                    <option style={{ background: '#0f1a0f' }}>$50,000 – $250,000</option>
                    <option style={{ background: '#0f1a0f' }}>$250,000+</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Industry</label>
                  <select className={inputClass} style={{ ...inputStyle, ...inputFocusStyle }}>
                    {['Retail', 'E-Commerce', 'Healthcare', 'Restaurant / Food Service', 'B2B / Professional Services', 'Petroleum / Gas', 'High-Risk', 'Other'].map(o => (
                      <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Tell us about your current processor (optional)</label>
                  <textarea
                    rows={3}
                    className={`${inputClass} resize-none`}
                    style={{ ...inputStyle, ...inputFocusStyle }}
                    placeholder="E.g. 'We use Stripe at 2.9% + $0.30 and process ~$80k/month...'"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 mt-2 text-white font-bold rounded-xl transition-all hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
                  style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.3)' }}
                >
                  {status === 'loading' ? 'Submitting…' : 'Request My Free Estimate'}
                  {status !== 'loading' && <ArrowRight className="w-5 h-5" />}
                </button>

                <p className="text-center text-xs text-slate-500">No consulting fees. No obligation. No pressure.</p>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}
