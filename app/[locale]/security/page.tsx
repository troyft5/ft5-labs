import Link from 'next/link'
import { ShieldCheck, Lock, FileKey2, FileX, Server, CheckCircle2, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'Data Security | FinTech 5 — Payment Processing Consultants',
  description: 'How we protect your financial data and merchant statements. Bank-level encryption, PII redaction, and Mutual NDAs available.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export default function SecurityPage() {
  const t = useTranslations('Security')

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
          {['ENTERPRISE', 'SECURITY'].map((word, i) => (
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('badge')}</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
              {t('title1')}<br />
              <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('title2')}
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              {t('subtitle')}
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                {t('cta')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECURITY PROTOCOLS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-16">
          
          <Reveal>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">{t('p1Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('p1Body')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <FileX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">{t('p2Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('p2Body')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">{t('p3Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('p3Body')}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <FileKey2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">{t('p4Title')}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {t('p4Body')}
                </p>
                <a href="mailto:legal@fintech5group.com" className="inline-flex items-center gap-1 mt-3 text-xs font-bold" style={{ color: '#6fc200' }}>
                  {t('p4Link')} <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── NO DATA BROKERING ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 shadow-2xl" style={{ background: '#0a1208', border: '1px solid #4e9000' }}>
            <ShieldCheck className="w-10 h-10" style={{ color: '#6fc200' }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('btmTitle1')}</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('btmSubtitle')}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            {[
              t('b1'),
              t('b2'),
              t('b3'),
            ].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#4e9000' }} />
                <span className="text-xs font-bold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
