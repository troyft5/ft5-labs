import Link from 'next/link'
import { ArrowRight, Users, Shield, TrendingUp, Phone, Zap, CheckCircle2 } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'
import { useTranslations } from 'next-intl'

export const metadata = {
  title: 'About Us | FinTech 5 — Payment Processing Consultants',
  description: 'Founded by a family of financial technology veterans with 30+ years of combined experience. We built payment infrastructure for universities and enterprises — then decided to put that expertise to work for you.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export default function AboutPage() {
  const t = useTranslations('AboutUs')

  const values = [
    { n: t('r1N'), icon: <Phone className="w-5 h-5" />, title: t('r1Title'), body: t('r1Body') },
    { n: t('r2N'), icon: <Shield className="w-5 h-5" />, title: t('r2Title'), body: t('r2Body') },
    { n: t('r3N'), icon: <Zap className="w-5 h-5" />, title: t('r3Title'), body: t('r3Body') },
    { n: t('r4N'), icon: <TrendingUp className="w-5 h-5" />, title: t('r4Title'), body: t('r4Body') },
  ]

  const timeline = [
    { era: t('h1Era'), title: t('h1Title'), body: t('h1Body') },
    { era: t('h2Era'), title: t('h2Title'), body: t('h2Body') },
    { era: t('h3Era'), title: t('h3Title'), body: t('h3Body') },
    { era: t('h4Era'), title: t('h4Title'), body: t('h4Body') },
  ]

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-28 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        {/* Background watermark */}
        <div className="absolute right-0 bottom-0 text-[18rem] font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(78,144,0,0.04)' }}>F5</div>

        {/* Blob glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }} dangerouslySetInnerHTML={{ __html: t('badge') }} />
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ScrollDepth3D delay={100} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] mb-8">
                {t('title1')}<br />{t('title2')}<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t('title3')}<br />{t('title4')}
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              {t('subtitle')}
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap gap-8">
              {[[t('stat1Val'), t('stat1Lbl')], [t('stat2Val'), t('stat2Lbl')], [t('stat3Val'), t('stat3Lbl')]].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-white">{val}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE PROBLEM STRIP ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <Reveal direction="left">
            <div>
              <div className="text-7xl md:text-8xl font-black leading-none mb-4" style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {t('probVal')}
              </div>
              <div className="text-base text-slate-400 max-w-xs leading-relaxed">
                {t('probSubtitle')}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="flex flex-col gap-5 text-slate-400 leading-relaxed">
              <p className="text-lg">{t('probBody1')}</p>
              <p>{t('probBody2')}</p>
              <p className="text-white font-bold text-lg">{t('probBody3')}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ORIGIN TIMELINE ── */}
      <section className="px-6 py-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-16">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('histBadge')}</span>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-3 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, rgba(78,144,0,0.5), transparent)' }} />

            <div className="flex flex-col gap-14">
              {timeline.map((item, i) => (
                <Reveal key={item.era} delay={i * 100}>
                  <div className="md:pl-10 relative">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full hidden md:block" style={{ background: '#4e9000', boxShadow: '0 0 12px rgba(78,144,0,0.6)' }} />
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#4e9000' }}>{item.era}</div>
                    <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('ruleBadge')}</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">{t('ruleTitle')}</h2>
              <p className="text-slate-400 max-w-lg mx-auto">{t('ruleSubtitle')}</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <div className="rounded-2xl p-8 h-full flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                      {v.icon}
                    </div>
                    <span className="text-3xl font-black" style={{ color: 'rgba(78,144,0,0.25)' }}>{v.n}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('indBadge')}</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
              {t('indTitle1')}<br />
              <span style={{ color: '#6fc200' }}>{t('indTitle2')}</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: t('indRetail'), href: '/industries/retail-payments', emoji: '🛍️' },
              { name: t('indEcom'), href: '/industries/e-commerce', emoji: '💳' },
              { name: t('indService'), href: '/industries/service', emoji: '✅' },
              { name: t('indHealth'), href: '/industries/healthcare', emoji: '🏥' },
              { name: t('indRest'), href: '/industries/restaurant', emoji: '🍴' },
              { name: t('indEdu'), href: '/industries/higher-education', emoji: '🎓' },
              { name: t('indNon'), href: '/industries/nonprofit', emoji: '🤝' },
              { name: t('indSpec'), href: '/industries/specialty-retail', emoji: '🛒' },
            ].map((ind, i) => (
              <Reveal key={ind.name} delay={i * 50}>
                <Link href={ind.href} className="group flex items-center gap-3 rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xl">{ind.emoji}</span>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{ind.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-6">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#6fc200' }}>
                {t('indLink')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BEFORE YOU REACH OUT (FAQ) ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('faqBadge')}</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">{t('faqTitle')}</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: t('q1'), a: t('a1') },
              { q: t('q2'), a: t('a2') },
              { q: t('q3'), a: t('a3') },
              { q: t('q4'), a: t('a4') },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="font-black text-white mb-3 leading-snug">{item.q}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{t('trustTitle1')}<br />{t('trustTitle2')}</h2>
                  <div className="flex flex-col gap-3">
                    {[
                      t('g1'),
                      t('g2'),
                      t('g3'),
                      t('g4'),
                      t('g5'),
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4e9000' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/get-your-savings-estimate" className="flex items-center justify-center gap-2 px-8 py-4 font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    {t('ctaAudit')} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-300 border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    {t('ctaTalk')}
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
