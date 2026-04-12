'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Upload, Clock, Phone, FileText, Star } from 'lucide-react'
import ExitIntentModal from '@/components/ExitIntentModal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const inputClass = "w-full rounded-xl px-4 py-3.5 text-white text-sm font-medium outline-none transition-all focus:ring-1 focus:ring-[#4e9000] placeholder:text-slate-600"
const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }
const labelClass = "text-xs font-bold text-slate-400 mb-1.5 block uppercase tracking-wider"

const processSteps = [
  { title: 'Submit your info',       body: 'Fill the form or upload a recent merchant statement. A statement gives us the most accurate analysis.',                                                               tag: 'Now' },
  { title: 'We analyze',             body: 'Our team reviews every line item — interchange, fees, markup, and any hidden charges buried in the fine print.',                                                    tag: 'Same day or less' },
  { title: 'You receive the report', body: 'We return a full report showing your true effective rate vs. what you could be paying with our processor network.',                                                  tag: 'Free' },
  { title: 'You make the call',      body: "No pressure. If the numbers don't make switching worth it, we tell you. If they do, we handle everything.",                                                         tag: 'Your choice' },
]

const guarantees = [
  'No consulting fee — ever',
  'No obligation to switch',
  'No ownership stake in any processor',
  'Response within 1 business day',
  'Honest analysis even if staying makes sense',
]

export default function Estimate() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', business: '',
    volume: 'Under $10,000', industry: 'Retail', notes: '',
  })
  const [file, setFile] = useState<File | null>(null)

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }))

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    try {
      let fileData: { name: string; content: string; type: string } | null = null
      if (file) {
        const buffer = await file.arrayBuffer()
        const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
        fileData = { name: file.name, content: base64, type: file.type }
      }
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, fileData }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['FREE', 'AUDIT'].map((word, i) => (
            <div key={i} className="text-[16vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.05 - i * 0.02})`, transform: `translateX(${i * 16}px)` }}>
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-end">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Analysis</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
                Find out what<br />you&apos;re actually<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  overpaying.
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                Upload your merchant statement — or just fill in the details. Our consultants return a full fee breakdown and competitive comparison same day or less.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {[
                { value: '$0',  label: 'cost to you',          sub: 'Our consulting is completely free' },
                { value: '24h', label: 'audit turnaround',     sub: 'Same day or less in most cases' },
                { value: '14',  label: 'processors compared',  sub: 'We shop your business to the market' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-5 rounded-2xl px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(78,144,0,0.15)' }}>
                  <div className="text-4xl font-black shrink-0" style={{ color: '#6fc200' }}>{s.value}</div>
                  <div>
                    <div className="text-white font-bold text-sm">{s.label}</div>
                    <div className="text-slate-600 text-xs">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN: FORM + SIDEBAR ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-14">

            {/* ── FORM ── */}
            <div>
              <div className="rounded-2xl p-8 md:p-10" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                {status === 'success' ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.3)' }}>
                      <ShieldCheck className="w-12 h-12" style={{ color: '#6fc200' }} />
                    </div>
                    <h2 className="text-3xl font-black mb-3 text-white">Request Received</h2>
                    <p className="text-slate-400 max-w-sm mx-auto mb-8 leading-relaxed">
                      Our consultants are reviewing your details and will reach out within one business day with your full savings analysis.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/blog" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-300 border border-white/10 rounded-xl hover:border-white/25 transition-all">
                        Read our Insights Blog
                      </Link>
                      <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000' }}>
                        Try the Calculator <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-2xl font-black text-white mb-1">Submit your information</h2>
                      <p className="text-slate-500 text-sm">A statement upload gets you the most precise analysis. The form alone still gets you a strong estimate.</p>
                    </div>

                    {/* Statement upload FIRST */}
                    <div>
                      <label className={labelClass}>
                        <span className="flex items-center gap-2">
                          <Upload className="w-3 h-3" /> Merchant Statement
                          <span className="text-slate-600 font-normal normal-case tracking-normal">— optional but recommended</span>
                        </span>
                      </label>
                      <label
                        className="flex flex-col items-center justify-center w-full py-10 rounded-xl cursor-pointer transition-all"
                        style={{ background: file ? 'rgba(78,144,0,0.08)' : 'rgba(255,255,255,0.03)', border: `2px dashed ${file ? 'rgba(78,144,0,0.5)' : 'rgba(255,255,255,0.12)'}` }}
                      >
                        <input type="file" accept=".pdf,.csv,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleFile} className="hidden" />
                        {file ? (
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-1" style={{ color: '#6fc200' }}>
                              <FileText className="w-5 h-5" />
                              <span className="text-sm font-bold">{file.name}</span>
                            </div>
                            <div className="text-xs text-slate-500">Click to change file</div>
                          </div>
                        ) : (
                          <div className="text-center">
                            <Upload className="w-8 h-8 mx-auto mb-3 text-slate-600" />
                            <div className="text-sm font-bold text-slate-300 mb-1">Drop your statement here or click to browse</div>
                            <div className="text-xs text-slate-600">PDF, XLS, CSV, or image — max 10MB</div>
                          </div>
                        )}
                      </label>
                    </div>

                    <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                    <div>
                      <label className={labelClass}>Your Name *</label>
                      <input type="text" required value={form.firstName} onChange={set('firstName')} className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className={labelClass}>Business Name *</label>
                      <input type="text" required value={form.business} onChange={set('business')} className={inputClass} style={inputStyle} />
                    </div>

                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" required value={form.email} onChange={set('email')} className={inputClass} style={inputStyle} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Monthly Volume</label>
                        <select value={form.volume} onChange={set('volume')} className={inputClass} style={inputStyle}>
                          {['Under $10,000','$10,000 – $50,000','$50,000 – $250,000','$250,000+'].map(o => (
                            <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Industry</label>
                        <select value={form.industry} onChange={set('industry')} className={inputClass} style={inputStyle}>
                          {['Retail','E-Commerce','Healthcare','Restaurant / Food Service','B2B / Professional Services','Petroleum / Gas','High-Risk','Other'].map(o => (
                            <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <details className="group">
                      <summary className="cursor-pointer text-xs font-bold text-slate-600 hover:text-slate-400 transition-colors select-none list-none flex items-center gap-2">
                        <span className="text-[#4e9000] group-open:rotate-90 transition-transform inline-block">›</span>
                        Add phone or notes <span className="font-normal text-slate-700">(optional — speeds up your analysis)</span>
                      </summary>
                      <div className="flex flex-col gap-5 mt-4">
                        <div>
                          <label className={labelClass}>Phone Number</label>
                          <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} style={inputStyle} />
                        </div>
                        <div>
                          <label className={labelClass}>Current processor / notes</label>
                          <textarea rows={3} value={form.notes} onChange={set('notes')} className={`${inputClass} resize-none`} style={inputStyle} />
                        </div>
                      </div>
                    </details>

                    {status === 'error' && (
                      <div className="text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)', color: '#fca5a5' }}>
                        Something went wrong. Please try again or call us at (646) 941-7853.
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0"
                      style={{ background: '#4e9000', boxShadow: '0 8px 32px rgba(78,144,0,0.35)' }}
                    >
                      {status === 'loading' ? (
                        <>
                          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Sending your request...
                        </>
                      ) : (
                        <>Get Your Free Audit <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-600">
                      By submitting, you agree to our{' '}
                      <Link href="/privacy-policy" className="underline hover:text-slate-400 transition-colors">Privacy Policy</Link>
                      . We never sell your data or share it with processors without your consent.
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── TRUST SIDEBAR ── */}
            <div className="flex flex-col gap-8">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>What Happens</span>
                </div>
                <div className="relative">
                  <div className="absolute left-[16px] top-4 bottom-4 w-px" style={{ background: 'linear-gradient(180deg,#4e9000,rgba(78,144,0,0.1))' }} />
                  <div className="flex flex-col gap-8">
                    {processSteps.map((step, i) => (
                      <div key={i} className="flex gap-5 items-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0 z-10"
                          style={{ background: '#4e9000', boxShadow: '0 0 0 3px #0f1a0f, 0 0 0 4px rgba(78,144,0,0.3)' }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 pt-0.5">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-black text-white">{step.title}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200' }}>{step.tag}</span>
                          </div>
                          <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldCheck className="w-5 h-5" style={{ color: '#6fc200' }} />
                  <span className="text-sm font-black text-white">Our commitments to you</span>
                </div>
                <div className="flex flex-col gap-3">
                  {guarantees.map(g => (
                    <div key={g} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4e9000' }} />
                      <span className="text-sm text-slate-300">{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-4 h-4 shrink-0" style={{ color: '#6fc200' }} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Prefer to call?</span>
                </div>
                <a href="tel:6469417853" className="block text-2xl font-black text-white hover:text-[#8cd627] transition-colors mb-1">
                  (646) 941-7853
                </a>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-slate-600" />
                  <span className="text-xs text-slate-600">Mon – Fri, 9am – 6pm ET</span>
                </div>
              </div>

              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" style={{ color: '#f59e0b' }} />)}
                </div>
                <p className="text-sm text-slate-300 italic leading-relaxed mb-3">
                  &ldquo;They analyzed our statement same day or less and found we were paying nearly 60 basis points above market rate. Switched in two weeks.&rdquo;
                </p>
                <div className="text-xs text-slate-600 font-bold">— Retail merchant, New Jersey</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BOTTOM TRUST STRIP ── */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { icon: '🏦', title: '14 Processor Network',     body: 'We compare bids from major acquiring banks and payment networks — not just one or two options.' },
              { icon: '📊', title: 'Line-by-Line Analysis',    body: 'Every fee gets flagged. We identify interchange, markup, statement fees, PCI fees, batch fees, and everything buried in the rates section.' },
              { icon: '🤝', title: 'Processor-Agnostic Always',body: 'We hold no ownership stake in any processor. Our only incentive is finding you the best deal.' },
            ].map(item => (
              <div key={item.title} className="flex flex-col items-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-black text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ExitIntentModal />
    </div>
  )
}
