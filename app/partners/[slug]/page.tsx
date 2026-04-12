'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, CheckCircle2, Clock, Star, Users, TrendingDown } from 'lucide-react'
import { getPartner } from '@/lib/partners'
import CountUp from '@/components/CountUp'
import Reveal from '@/components/Reveal'

const inputClass = "w-full rounded-xl px-4 py-3.5 text-white text-sm font-medium outline-none transition-all focus:ring-1 focus:ring-[#4e9000] placeholder:text-slate-600"
const inputStyle = { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }
const labelClass = "text-xs font-bold text-slate-400 mb-1.5 block uppercase tracking-wider"

export default function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = getPartner(params.slug)
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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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
        body: JSON.stringify({ ...form, fileData, referralPartner: params.slug, referralSource: partner.company }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: '#0a1208' }}>

      {/* ── HERO — Plaid-style: clean, spacious, mesh depth ── */}
      <section className="relative px-6 pt-44 pb-24 overflow-hidden">
        {/* Layered mesh glow spotlights */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% 0%, rgba(78,144,0,0.10) 0%, transparent 65%),
            radial-gradient(ellipse 40% 30% at 10% 100%, rgba(78,144,0,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 30% 50% at 90% 50%, rgba(78,144,0,0.04) 0%, transparent 55%)
          `
        }} />
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            {/* Partner referral badge — glassmorphism */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 green-frame" style={{ background: 'rgba(78,144,0,0.08)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#6fc200' }} />
              <span className="text-xs font-bold text-white">{'Referred by'}</span>
              <span className="text-xs font-bold" style={{ color: '#6fc200' }}>{partner.company}</span>
              <span className="text-xs px-2 py-0.5 rounded-full text-slate-500" style={{ background: 'rgba(255,255,255,0.06)' }}>{partner.type}</span>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-start">
            <div>
              <Reveal delay={60}>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-8 display-heading">
                  {'Find out what'}<br />{'you\'re actually'}<br />
                  <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    {'overpaying.'}
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={120}>
                <p className="text-xl text-slate-400 leading-relaxed mb-6 max-w-xl">{partner.tagline}</p>
              </Reveal>

              <Reveal delay={160}>
                <p className="text-base text-slate-500 leading-relaxed max-w-lg">{partner.heroMessage}</p>
              </Reveal>

              {partner.incentive && (
                <Reveal delay={200}>
                  <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.3)' }}>
                    <Star className="w-4 h-4 shrink-0" style={{ color: '#6fc200' }} />
                    <span className="text-sm font-bold text-white">{partner.incentive}</span>
                  </div>
                </Reveal>
              )}
            </div>

            {/* Plaid-style stat block — glass cards */}
            <Reveal direction="right" delay={100}>
              <div className="flex flex-col gap-4">
                {[
                  { value: 0, suffix: '%', prefix: '', label: 'Consulting fee', sub: 'Free, always', display: '$0' },
                  { value: 24, suffix: 'h', prefix: '', label: 'Audit turnaround', sub: 'Same day or less', display: '24h' },
                  { value: 14, suffix: '', prefix: '', label: 'Processors in network', sub: 'Blind competitive bid', display: '14' },
                  { value: 18, suffix: '%', prefix: 'Up to ', label: 'Savings in year one', sub: 'For qualifying merchants', display: '' },
                ].map((s, i) => (
                  <div key={i} className="flex items-center gap-5 rounded-2xl px-5 py-4 glass-card inset-glow-top">
                    <div className="text-3xl font-black shrink-0 display-heading" style={{ color: '#6fc200' }}>
                      {s.display || <CountUp to={s.value} prefix={s.prefix} suffix={s.suffix} />}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{s.label}</div>
                      <div className="text-slate-600 text-xs">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FORM + TRUST SIDEBAR ── */}
      <section className="px-6 py-20 relative" style={{ background: '#0f1a0f' }}>
        <div className="section-rule absolute top-0 left-0 right-0" />
        {/* Plaid-style section mesh glow */}
        <div className="absolute inset-0 pointer-events-none mesh-glow-tl" style={{ opacity: 0.6 }} />

        <div className="relative max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[3fr_2fr] gap-14">

            {/* ── FORM ── */}
            <div>
              <div className="rounded-2xl p-8 md:p-10 glass-card green-frame">
                {status === 'success' ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 green-frame" style={{ background: 'rgba(78,144,0,0.12)' }}>
                      <ShieldCheck className="w-10 h-10" style={{ color: '#6fc200' }} />
                    </div>
                    <h2 className="text-2xl font-black text-white mb-3 section-heading">{'Request Received'}</h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6 leading-relaxed">
                      {'Our team will reach out within 24 hours or less with your full savings analysis.'} {partner.company} {'will be notified that you connected with us.'}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-slate-400 border border-white/10 rounded-xl hover:border-white/25 transition-all">
                        {'Read our Insights Blog'}
                      </Link>
                      <Link href="/calculator" className="inline-flex items-center gap-2 px-5 py-3 text-sm font-black text-white rounded-xl" style={{ background: '#4e9000' }}>
                        {'Try the Calculator'} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                      <h2 className="text-xl font-black text-white mb-1 section-heading">{'Get your free savings analysis'}</h2>
                      <p className="text-slate-500 text-sm">{'Referred by'} {partner.company}. {'Your analysis is prioritized.'}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{'First Name *'}</label>
                        <input type="text" required placeholder="John" value={form.firstName} onChange={set('firstName')} className={inputClass} style={inputStyle} />
                      </div>
                      <div>
                        <label className={labelClass}>{'Last Name'}</label>
                        <input type="text" placeholder="Smith" value={form.lastName} onChange={set('lastName')} className={inputClass} style={inputStyle} />
                      </div>
                    </div>

                    <div>
                      <label className={labelClass}>{'Business Name *'}</label>
                      <input type="text" required placeholder="Acme Corp" value={form.business} onChange={set('business')} className={inputClass} style={inputStyle} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{'Email *'}</label>
                        <input type="email" required placeholder="you@business.com" value={form.email} onChange={set('email')} className={inputClass} style={inputStyle} />
                      </div>
                      <div>
                        <label className={labelClass}>{'Phone'}</label>
                        <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={set('phone')} className={inputClass} style={inputStyle} />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>{'Monthly Volume'}</label>
                        <select value={form.volume} onChange={set('volume')} className={inputClass} style={inputStyle}>
                          {['Under $10,000', '$10,000 – $50,000', '$50,000 – $250,000', '$250,000+'].map(o => (
                            <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>{'Industry'}</label>
                        <select value={form.industry} onChange={set('industry')} className={inputClass} style={inputStyle}>
                          {['Retail','E-Commerce','Healthcare','Restaurant','B2B','Petroleum','High-Risk','Other'].map(o => (
                            <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Statement upload */}
                    <div>
                      <label className={`${labelClass} flex items-center gap-2`}>
                        <span>{'Merchant Statement'}</span>
                        <span className="text-slate-600 font-normal normal-case tracking-normal">{'— optional, maximizes accuracy'}</span>
                      </label>
                      <label className="flex flex-col items-center justify-center py-8 rounded-xl cursor-pointer transition-all" style={{ background: file ? 'rgba(78,144,0,0.08)' : 'rgba(255,255,255,0.03)', border: `2px dashed ${file ? 'rgba(78,144,0,0.5)' : 'rgba(255,255,255,0.1)'}` }}>
                        <input type="file" accept=".pdf,.csv,.xls,.xlsx,.png,.jpg,.jpeg" onChange={handleFile} className="hidden" />
                        {file ? (
                          <span className="text-sm font-bold" style={{ color: '#6fc200' }}>✓ {file.name}</span>
                        ) : (
                          <div className="text-center">
                            <div className="text-sm font-bold text-slate-400 mb-1">{'Drop statement or click to browse'}</div>
                            <div className="text-xs text-slate-600">{'PDF, XLS, CSV, or image'}</div>
                          </div>
                        )}
                      </label>
                    </div>

                    {status === 'error' && (
                      <div className="text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)', color: '#fca5a5' }}>
                        {'Something went wrong. Please try again or call (646) 941-7853.'}
                      </div>
                    )}

                    <button type="submit" disabled={status === 'loading'}
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-60"
                      style={{ background: '#4e9000', boxShadow: '0 8px 32px rgba(78,144,0,0.35)' }}>
                      {status === 'loading' ? (
                        <><div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" /> {'Sending...'}</>
                      ) : (
                        <>{'Get My Free Analysis'} <ArrowRight className="w-5 h-5" /></>
                      )}
                    </button>

                    <p className="text-center text-xs text-slate-700">
                      {'Referred by'} {partner.company} {'· No consulting fees · No obligation to switch'}
                    </p>
                  </form>
                )}
              </div>
            </div>

            {/* ── TRUST SIDEBAR ── */}
            <div className="flex flex-col gap-5">

              {/* Why partner referred */}
              <Reveal direction="right">
                <div className="rounded-2xl p-6 glass-card">
                  <div className="section-eyebrow mb-4">{'Why'} {partner.company} {'sent you here'}</div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-5">
                    {'Your partner knows that payment processing fees are often the largest controllable cost in a business — and they\'re often 20–40% higher than they need to be.'}
                  </p>
                  <div className="flex flex-col gap-3">
                    {[
                      'They hold no financial stake in this referral',
                      'We\'ll tell you honestly if your current rate is fair',
                      'Zero cost whether you switch or not',
                    ].map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4e9000' }} />
                        <span className="text-xs text-slate-400">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Call option */}
              <Reveal direction="right" delay={60}>
                <div className="rounded-2xl p-6 glass-card">
                  <div className="section-eyebrow mb-4">{'Prefer to talk first?'}</div>
                  <a href="tel:6469417853" className="block text-3xl font-black text-white hover:text-[#8cd627] transition-colors mb-1 display-heading">
                    (646) 941-7853
                  </a>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-slate-600" />
                    <span className="text-xs text-slate-600">{'Mon – Fri, 9am – 6pm ET'}</span>
                  </div>
                </div>
              </Reveal>

              {/* Social proof */}
              <Reveal direction="right" delay={120}>
                <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: '#f59e0b' }} />)}
                  </div>
                  <p className="text-sm text-slate-300 italic leading-relaxed mb-3">
                    &ldquo;{'We were on tiered pricing for four years and had no idea. After the audit, we switched to IC+ and saved $11,200 in year one.'}&rdquo;
                  </p>
                  <div className="text-xs text-slate-600 font-bold">{'— Restaurant group, New Jersey'}</div>
                </div>
              </Reveal>

              {/* FT5 credentials */}
              <Reveal direction="right" delay={180}>
                <div className="rounded-2xl p-6 glass-card">
                  <div className="section-eyebrow mb-4">{'About FinTech 5'}</div>
                  <div className="flex flex-col gap-4">
                    {[
                      { Icon: Users, label: 'Processor-agnostic', sub: 'No ownership in any processor' },
                      { Icon: TrendingDown, label: '14 competing bids', sub: 'Blind auction, you pick the winner' },
                      { Icon: ShieldCheck, label: 'Zero cost model', sub: 'Processors compensate us, not you' },
                    ].map(({ Icon, label, sub }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.12)' }}>
                          <Icon className="w-4 h-4" style={{ color: '#6fc200' }} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white">{label}</div>
                          <div className="text-xs text-slate-600">{sub}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA STRIP ── Plaid-style bold section ── */}
      <section className="px-6 py-16 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {'Referred by'} {partner.company}
          </div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight section-heading">
            {'Submit above — we\'ll get back to you in same day or less.'}
          </h2>
          <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
            {'Questions first?'} {'Call'} {' '} <a href="tel:6469417853" className="font-black underline">(646) 941-7853</a> {'or email'} <a href="mailto:info@fintech5group.com" className="font-black underline">info@fintech5group.com</a>.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-bold border border-white/30 hover:border-white/60 rounded-xl text-white transition-all">
            {'Learn more about FinTech 5 →'}
          </Link>
        </div>
      </section>

    </div>
  )
}
