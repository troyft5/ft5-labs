import { Phone, Mail, MapPin, ArrowRight, Clock, CheckCircle2 } from 'lucide-react'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'
import { useTranslations } from 'next-intl'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export const metadata = {
  title: 'Contact Us | FinTech 5 — Payment Processing Consultants',
  description: 'Talk to a real payment specialist. No bots, no tickets. Reach FinTech 5 by phone, email, or contact form.',
}

export default function ContactPage() {
  const t = useTranslations('ContactUs')

  const contactItems = [
    { href: 'tel:6469417853',             icon: <Phone className="w-5 h-5" />, label: t('s1Lbl'),         lines: ['(646) 941-7853', '(732) 300-1072'] },
    { href: 'mailto:info@fintech5group.com',icon: <Mail className="w-5 h-5" />,  label: t('s2Lbl'),       lines: ['info@fintech5group.com', 'sales@fintech5group.com'] },
    { href: undefined,                     icon: <MapPin className="w-5 h-5" />, label: t('s3Lbl'),       lines: [t('s3L1'), t('s3L2')] },
    { href: undefined,                     icon: <Clock className="w-5 h-5" />,  label: t('s4Lbl'),  lines: [t('s4L1'), t('s4L2')] },
  ]

  const nextSteps = [
    { n: t('n1N'), title: t('n1Title'), body: t('n1Body'), tag: t('n1Tag') },
    { n: t('n2N'), title: t('n2Title'), body: t('n2Body') },
    { n: t('n3N'), title: t('n3Title'), body: t('n3Body'), tag: t('n3Tag') },
  ]

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <Reveal>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('badge')}</span>
                </div>
              </Reveal>
              <Reveal delay={80}>
                <ScrollDepth3D delay={80} intensity={0.8}>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
                    {t('title1')}<br />{t('title2')}<br />
                    <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{t('title3')}</span>
                  </h1>
                </ScrollDepth3D>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                  {t('subtitle')}
                </p>
              </Reveal>
            </div>

            {/* Giant phone number — the signature element */}
            <Reveal direction="right" delay={120}>
              <div className="flex flex-col gap-5">
                <a href="tel:6469417853" className="group flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#6fc200' }}>{t('callBadge')}</span>
                  <span className="text-4xl md:text-5xl font-black text-white group-hover:text-[#8cd627] transition-colors tracking-tight">(646) 941-7853</span>
                  <span className="text-sm text-slate-600 mt-2">Mon – Fri, 9am – 6pm ET</span>
                </a>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                <a href="mailto:info@fintech5group.com" className="group">
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: '#6fc200' }}>{t('emailBadge')}</span>
                  <span className="text-lg font-bold text-slate-300 group-hover:text-white transition-colors">info@fintech5group.com</span>
                </a>
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.07)' }} />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] mb-2 block" style={{ color: '#6fc200' }}>{t('respBadge')}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: '#6fc200' }} />
                    <span className="text-sm font-bold text-white">{t('respText')}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[3fr_2fr] gap-16">

          {/* Form */}
          <Reveal direction="left">
            <div>
              <h2 className="text-2xl font-black text-white mb-2">{t('formTitle')}</h2>
              <p className="text-slate-500 text-sm mb-8">{t('formSub')}</p>
              <ContactForm />
            </div>
          </Reveal>

          {/* Info sidebar */}
          <div>
            <Reveal direction="right">
              <h2 className="text-2xl font-black text-white mb-6">{t('dirTitle')}</h2>
            </Reveal>
            <div className="flex flex-col gap-3 mb-8">
              {contactItems.map((item, i) => {
                const inner = (
                  <div className="flex items-center gap-4 p-5 rounded-2xl transition-all group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600 mb-0.5">{item.label}</div>
                      {item.lines.map((line, j) => (
                        <div key={j} className="font-bold text-slate-300 group-hover:text-white transition-colors text-sm">{line}</div>
                      ))}
                    </div>
                  </div>
                )
                return (
                  <Reveal key={i} delay={i * 60} direction="right">
                    {item.href ? <a href={item.href}>{inner}</a> : inner}
                  </Reveal>
                )
              })}
            </div>

            {/* Faster path CTA */}
            <Reveal direction="right" delay={250}>
              <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.25)' }}>
                <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>{t('laneBadge')}</div>
                <p className="text-sm text-slate-400 mb-4">{t('laneText')}</p>
                <a href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-black text-white px-5 py-2.5 rounded-xl transition-all hover:opacity-90" style={{ background: '#4e9000' }}>
                  {t('laneCta')} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS NEXT — vertical timeline ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('nextBadge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-16">{t('nextTitle')}</h2>
          </Reveal>

          <div className="relative">
            {/* Vertical connecting line */}
            <div className="absolute left-[18px] top-5 bottom-5 w-px" style={{ background: 'linear-gradient(180deg, #4e9000, rgba(78,144,0,0.1))' }} />

            <div className="flex flex-col gap-12">
              {nextSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 100}>
                  <div className="flex gap-8 items-start">
                    {/* Dot on the line */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white shrink-0 relative z-10" style={{ background: '#4e9000', boxShadow: '0 0 0 4px #0a1208, 0 0 0 5px rgba(78,144,0,0.3)' }}>
                      {i + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-black text-white">{step.title}</h3>
                        {step.tag && <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200' }}>{step.tag}</span>}
                      </div>
                      <p className="text-slate-400 leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={300}>
            <div className="mt-12 flex items-center gap-8 flex-wrap pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
              {[t('c1'), t('c2'), t('c3')].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4" style={{ color: '#4e9000' }} /> {item}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── WHY MERCHANTS REACH OUT ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('sceBadge')}</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t('sceTitle')}</h2>
              <p className="text-slate-400 max-w-lg mx-auto text-sm">{t('sceSub')}</p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                t('ss1'), t('ss2'), t('ss3'),
                t('ss4'), t('ss5'), t('ss6'),
                t('ss7'), t('ss8'), t('ss9'),
                t('ss10'), t('ss11'), t('ss12'),
              ].map(s => (
                <div key={s} className="px-4 py-2.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                  {s}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRE-ANSWERED QUESTIONS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('faqBadge')}</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: t('q1'), a: t('a1') },
              { q: t('q2'), a: t('a2') },
              { q: t('q3'), a: t('a3') },
              { q: t('q4'), a: t('a4') },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-sm font-black text-white mb-3 leading-snug">{item.q}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMITMENT PANEL ── */}
      <section className="px-6 py-16 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-6">{t('btmTitle')}</h2>
                  <div className="flex flex-col gap-3">
                    {[
                      t('b1'),
                      t('b2'),
                      t('b3'),
                      t('b4'),
                      t('b5'),
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4e9000' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <a href="/get-your-savings-estimate" className="flex items-center justify-center gap-2 px-8 py-4 font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    {t('cta1')} <ArrowRight className="w-5 h-5" />
                  </a>
                  <a href="tel:6469417853" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-300 border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    {t('cta2')}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
