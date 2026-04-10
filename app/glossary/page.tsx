import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { Metadata } from 'next'
import { glossaryData, glossaryCategories } from '@/lib/glossary'
import type { GlossaryTerm } from '@/lib/glossary'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata: Metadata = {
  title: 'Payment Processing Glossary | Terms Every Merchant Should Know',
  description: 'Clear definitions for every payment processing term — interchange, effective rate, chargebacks, PCI DSS, and more. Written for merchants, not processors.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const categoryOrder: GlossaryTerm['category'][] = [
  'pricing', 'fees', 'processing', 'fraud', 'compliance', 'infrastructure',
]

const categoryColor: Record<GlossaryTerm['category'], string> = {
  pricing:        '#6fc200',
  fees:           '#ef4444',
  processing:     '#3b82f6',
  fraud:          '#f59e0b',
  compliance:     '#8b5cf6',
  infrastructure: '#06b6d4',
}

export default function GlossaryIndex() {
  const grouped = categoryOrder.map(cat => ({
    cat,
    terms: glossaryData.filter(t => t.category === cat),
  }))

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        {/* Cascading watermark */}
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['PAYMENT', 'GLOSSARY'].map((word, i) => (
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Merchant Education</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
                The terms your<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  processor hopes you don&apos;t know.
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              Payment processing has its own language — and when merchants don&apos;t speak it, processors profit from the gap. Every definition here is written to put you on equal footing.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                Get Your Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Fee Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CALLOUT ── */}
      <section className="px-6 py-10 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 grid md:grid-cols-3 gap-8" style={{ background: 'rgba(78,144,0,0.06)', border: '1px solid rgba(78,144,0,0.2)' }}>
            {[
              { stat: `${glossaryData.length}`, label: 'Terms defined', sub: 'Covering every line of your statement' },
              { stat: '6', label: 'Categories', sub: 'Pricing, fees, fraud, compliance, and more' },
              { stat: '0', label: 'Industry jargon', sub: 'Written for merchants, not processors' },
            ].map(item => (
              <div key={item.label} className="text-center md:text-left">
                <div className="text-4xl font-black mb-1" style={{ color: '#6fc200' }}>{item.stat}</div>
                <div className="text-sm font-black text-white mb-0.5">{item.label}</div>
                <div className="text-xs text-slate-500">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS BY CATEGORY ── */}
      {grouped.map(({ cat, terms }) => (
        <section key={cat} className="px-6 py-16 relative" style={{ background: cat === 'fees' || cat === 'compliance' ? BG2 : BG }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
          <div className="max-w-5xl mx-auto">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8" style={{ background: categoryColor[cat] }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: categoryColor[cat] }}>
                  {glossaryCategories[cat]}
                </span>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {terms.map((term, i) => (
                <Reveal key={term.slug} delay={i * 40}>
                  <Link
                    href={`/glossary/${term.slug}`}
                    className="group flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${categoryColor[cat]}18`, color: categoryColor[cat] }}>
                        {glossaryCategories[cat]}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-[#6fc200] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    <h2 className="text-base font-black text-white mb-2 leading-snug group-hover:text-[#8cd627] transition-colors">
                      {term.term}
                    </h2>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1">
                      {term.shortDef}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* ── CTA ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Knowledge is step one</div>
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            Now put it to work.<br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>See exactly what your statement says about you.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Upload your statement and we&apos;ll return a line-by-line breakdown — every fee named, every overcharge identified, competitive bids from 10+ processors — same day or less — free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              Get My Free Statement Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-10 py-4 font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
              Try the Calculator
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
