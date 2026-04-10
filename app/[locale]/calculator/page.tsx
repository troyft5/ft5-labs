import { ShieldCheck, TrendingDown, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import CalculatorWidget from '@/components/CalculatorWidget'
import CostOfWaitingWidget from '@/components/CostOfWaitingWidget'
import { useTranslations } from 'next-intl'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export default function Calculator() {
  const t = useTranslations('Calculator')

  const benefits = [
    { icon: <TrendingDown className="w-6 h-6" />, title: t('b1Title'), body: t('b1Body') },
    { icon: <ShieldCheck className="w-6 h-6" />, title: t('b2Title'), body: t('b2Body') },
    { icon: <Clock className="w-6 h-6" />, title: t('b3Title'), body: t('b3Body') },
  ]

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-16 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('badge')}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
                {t('title1')}<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('title2')}</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {t('subtitle')}
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)', color: '#6fc200' }}>
                {t('freeBadge')}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map(b => (
                <div key={b.title} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200' }}>
                    {b.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{b.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="px-6 py-12 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto flex flex-col gap-10">
          <CalculatorWidget />
          <CostOfWaitingWidget />
        </div>
      </section>

      {/* ── WHAT YOUR RATE MEANS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#6fc200' }}>{t('rateMeaningBadge')}</div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 mt-1" style={{ color: '#6fc200' }}>{t('cpTitle')}</p>
                {[
                  { range: 'Below 1.8%', verdict: t('verdictHighlyCompetitive'), dot: '#22c55e' },
                  { range: '1.8% – 2.1%', verdict: t('verdictCompetitive'), dot: '#84cc16' },
                  { range: '2.1% – 2.5%', verdict: t('verdictOverpaying'), dot: '#f59e0b' },
                  { range: 'Above 2.5%', verdict: t('verdictSignificant'), dot: '#ef4444' },
                ].map(item => (
                  <div key={item.range} className="flex items-center justify-between py-2 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                      <span className="text-sm font-mono font-bold text-slate-300">{item.range}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.verdict}</span>
                  </div>
                ))}
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 mt-4" style={{ color: '#6fc200' }}>{t('cnpTitle')}</p>
                {[
                  { range: 'Below 2.3%', verdict: t('verdictHighlyCompetitive'), dot: '#22c55e' },
                  { range: '2.3% – 2.7%', verdict: t('verdictCompetitive'), dot: '#84cc16' },
                  { range: '2.7% – 3.1%', verdict: t('verdictOverpaying'), dot: '#f59e0b' },
                  { range: 'Above 3.1%', verdict: t('verdictSignificant'), dot: '#ef4444' },
                ].map(item => (
                  <div key={item.range} className="flex items-center justify-between py-2 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                      <span className="text-sm font-mono font-bold text-slate-300">{item.range}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.verdict}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-4">{t('cnpDisclaimer')}</p>
            </div>
            <div className="rounded-2xl p-8" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#6fc200' }}>{t('howToReadBadge')}</div>
              <div className="flex flex-col gap-4">
                {[
                  { label: t('read1Label'), body: t('read1Body') },
                  { label: t('read2Label'), body: t('read2Body') },
                  { label: t('read3Label'), body: t('read3Body') },
                  { label: t('read4Label'), body: t('read4Body') },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-sm font-black text-white mb-0.5">{item.label}</div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── RATE QUESTIONS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('questionsBadge')}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: t('q1'), a: t('a1') },
              { q: t('q2'), a: t('a2') },
              { q: t('q3'), a: t('a3') },
              { q: t('q4'), a: t('a4') },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-black text-white mb-3 leading-snug">{item.q}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>{t('ctaBadge')}</div>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">{t('ctaTitle')}</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed">{t('ctaSubtitle')}</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/get-your-savings-estimate" className="flex items-center justify-center gap-2 px-8 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                {t('ctaAudit')} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                {t('ctaTalk')}
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
