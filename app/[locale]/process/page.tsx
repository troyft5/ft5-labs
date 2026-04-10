import Link from 'next/link'
import { FileText, Calculator, Gavel, Cog, CheckCircle2, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'
import { useTranslations } from 'next-intl'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export default function ProcessPage() {
  const t = useTranslations('Process')

  const processSteps = [
    {
      day: t('step1Day'),
      icon: <FileText className="w-8 h-8" />,
      title: t('step1Title'),
      body: t('step1Body'),
      checks: [t('step1Checks.0'), t('step1Checks.1'), t('step1Checks.2')],
      color: '#3b82f6'
    },
    {
      day: t('step2Day'),
      icon: <Gavel className="w-8 h-8" />,
      title: t('step2Title'),
      body: t('step2Body'),
      checks: [t('step2Checks.0'), t('step2Checks.1'), t('step2Checks.2')],
      color: '#f59e0b'
    },
    {
      day: t('step3Day'),
      icon: <Calculator className="w-8 h-8" />,
      title: t('step3Title'),
      body: t('step3Body'),
      checks: [t('step3Checks.0'), t('step3Checks.1'), t('step3Checks.2')],
      color: '#8b5cf6'
    },
    {
      day: t('step4Day'),
      icon: <Cog className="w-8 h-8" />,
      title: t('step4Title'),
      body: t('step4Body'),
      checks: [t('step4Checks.0'), t('step4Checks.1'), t('step4Checks.2')],
      color: '#6fc200'
    }
  ]

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {[t('bgText1'), t('bgText2')].map((word, i) => (
            <div key={i} className="text-[14vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.05 - i * 0.02})`, transform: `translateX(${i * 20}px)` }}>
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>{t('badge')}</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
                {t('title1')}<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {t('title2')}
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              {t('subtitle')}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical Track Line */}
          <div className="hidden md:block absolute left-[50%] top-10 bottom-10 w-1 -ml-0.5" style={{ background: 'linear-gradient(180deg, transparent, rgba(78,144,0,0.2) 10%, rgba(78,144,0,0.2) 90%, transparent)' }} />

          <div className="flex flex-col gap-12 md:gap-24">
            {processSteps.map((step, i) => {
              const isEven = i % 2 === 0
              return (
                <Reveal key={step.day} delay={i * 100}>
                  <div className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    
                    {/* Content Side */}
                    <div className={`flex-1 w-full ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4 text-xs font-bold uppercase tracking-widest`} style={{ background: `${step.color}15`, color: step.color }}>
                        {step.day}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white mb-4">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed mb-6">
                        {step.body}
                      </p>
                      <div className={`flex flex-col gap-2 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                        {step.checks.map(chk => (
                          <div key={chk} className="flex items-center gap-2 text-sm text-slate-300">
                            {!isEven && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: step.color }} />}
                            {chk}
                            {isEven && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: step.color }} />}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Center Node */}
                    <div className="hidden md:flex flex-col items-center justify-center relative z-10 shrink-0">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl" 
                           style={{ background: '#0a1208', border: `2px solid ${step.color}`, color: step.color }}>
                        {step.icon}
                      </div>
                    </div>

                    {/* Opposite empty space for alignment */}
                    <div className="hidden md:block flex-1" />
                    
                  </div>
                </Reveal>
              )
            })}
          </div>

        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 leading-tight">
            {t('ctaTitle')}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <div className="flex justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              {t('ctaBtn')} <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
