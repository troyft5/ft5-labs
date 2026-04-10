import Link from 'next/link'
import { industriesData } from '@/lib/data'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata: Metadata = {
  title: 'Industries We Serve | Payment Solutions by Vertical',
  description: 'FinTech 5 delivers specialized payment processing across 9+ industries — from retail and healthcare to high-risk merchants and B2B. Free consulting, zero cost to you.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

type IndustryMeta = { emoji: string; accentColor: string; tag: string }
const meta: Record<string, IndustryMeta> = {
  'retail-payments':   { emoji: '🛍️',  accentColor: '#6fc200', tag: 'In-Store' },
  'e-commerce':        { emoji: '💳',  accentColor: '#3b82f6', tag: 'Online' },
  'service':           { emoji: '🔧',  accentColor: '#f59e0b', tag: 'Service' },
  'higher-education':  { emoji: '🎓',  accentColor: '#8b5cf6', tag: 'Education' },
  'healthcare':        { emoji: '🏥',  accentColor: '#06b6d4', tag: 'Medical' },
  'petroleum':         { emoji: '⛽',  accentColor: '#f97316', tag: 'Fuel & Fleet' },
  'high-risk':         { emoji: '⚡',  accentColor: '#ef4444', tag: 'High-Risk' },
  'cbd':               { emoji: '🌿',  accentColor: '#22c55e', tag: 'Medium Risk' },
  'b2b':               { emoji: '🤝',  accentColor: '#a78bfa', tag: 'Enterprise' },
}

export default function IndustriesPage() {
  const entries = Object.entries(industriesData).filter(([slug]) => slug in meta)

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        {/* Cascading watermark */}
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['INDUSTRIES', 'WE SERVE'].map((word, i) => (
            <div key={i} className="text-[13vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.05 - i * 0.02})`, transform: `translateX(${i * 20}px)` }}>
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industry Solutions</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
                Every industry.<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  One network.
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              Payment processing isn&apos;t one-size-fits-all. We specialize in the unique requirements, compliance demands, and pricing dynamics of each vertical we serve.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                Get Your Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Fee Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INDUSTRY GRID ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-12">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>
                {entries.length} Industries
              </span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {entries.map(([slug, industry], i) => {
              const m = meta[slug]
              return (
                <Reveal key={slug} delay={i * 50}>
                  <Link
                    href={`/industries/${slug}`}
                    className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    {/* Colored top accent bar */}
                    <div className="h-1" style={{ background: m.accentColor }} />

                    <div className="flex-1 p-6 flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{m.emoji}</span>
                          <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${m.accentColor}18`, color: m.accentColor }}>
                            {m.tag}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-[#6fc200] group-hover:translate-x-0.5 transition-all" />
                      </div>

                      {/* Title + subtitle */}
                      <h2 className="text-lg font-black text-white mb-3 leading-snug group-hover:text-[#8cd627] transition-colors">
                        {industry.title}
                      </h2>
                      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                        {industry.subtitle}
                      </p>

                      {/* Stats row */}
                      {industry.stats && industry.stats.length > 0 && (
                        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                          {industry.stats.slice(0, 3).map((s: { value: string; label: string }) => (
                            <div key={s.label}>
                              <div className="text-sm font-black" style={{ color: m.accentColor }}>{s.value}</div>
                              <div className="text-[10px] text-slate-600 uppercase tracking-wider">{s.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── NOT SURE WHERE YOU FIT? ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Don&apos;t see your industry?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                  We work with any legitimate merchant who accepts card payments.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  These nine verticals represent our most common specializations — but if your business accepts payments, we can help. Just start a conversation and we&apos;ll tell you exactly what we can do.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    Start a Conversation <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/contact-us" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  'We&apos;ve worked with merchants in 40+ business categories',
                  'No industry minimum — we work with $10k/month and $1M/month',
                  'High-risk doesn&apos;t mean unworkable — we specialize in it',
                  'If you can accept a card, we can optimize it',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-2 h-2 rounded-full shrink-0 mt-1.5" style={{ background: '#4e9000' }} />
                    <p className="text-sm text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: item }} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-16 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Free. Zero obligation.</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">Find out what your industry&apos;s merchants actually pay.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg mb-8 max-w-xl mx-auto">Upload your statement and we&apos;ll return a line-by-line analysis with competitive bids same day or less — no pitch, no pressure.</p>
          <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-10 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
            Get My Free Statement Audit <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  )
}
