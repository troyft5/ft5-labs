import Link from 'next/link'
import { FileText, Calculator, Gavel, Cog, CheckCircle2, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata: Metadata = {
  title: 'Our Process | FinTech 5 — Payment Processing Consultants',
  description: 'How FinTech 5 negotiates lower payment processing rates. Step-by-step from statement analysis to processor bidding to final implementation.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const processSteps = [
  {
    day: 'Day 1',
    icon: <FileText className="w-8 h-8" />,
    title: 'Ingestion & Normalization',
    body: 'You upload your merchant statement securely. Our analysts break it down line-by-line using proprietary extraction tools. We identify your true interchange costs, strip out junk assessment fees, and calculate your exact processor markup.',
    checks: ['PII auto-redacted', 'Effective rate calculated', 'Hidden fees flagged'],
    color: '#3b82f6'
  },
  {
    day: 'Day 2',
    icon: <Gavel className="w-8 h-8" />,
    title: 'Blind Processor Bidding',
    body: 'We take your anonymized statement parameters (volume, average ticket size, industry MCC) to our network of 10+ Tier-1 processors. We force them to compete for your business through a blind bidding process, entirely on Interchange-Plus (IC+) pricing.',
    checks: ['Anonymized bidding', '10+ Tier-1 processors', 'IC+ pricing mandated'],
    color: '#f59e0b'
  },
  {
    day: 'Day 3',
    icon: <Calculator className="w-8 h-8" />,
    title: 'Savings Presentation',
    body: 'We return to you with a comprehensive audit report. We show you exactly what you are paying now, what you should be paying, and the top 3 bids from the network. We give our recommendation, but the final choice is always yours.',
    checks: ['Side-by-side comparison', 'Zero obligation to switch', 'Permanent savings locked in'],
    color: '#8b5cf6'
  },
  {
    day: 'Week 2',
    icon: <Cog className="w-8 h-8" />,
    title: 'Implementation & Swap',
    body: 'If you choose to switch, we handle the entire migration. We work with the winning processor to ship pre-programmed terminals, integrate with your existing POS or e-commerce gateway, and ensure zero downtime during the transition.',
    checks: ['Zero downtime guaranteed', 'Free terminal placement', 'Existing POS integration'],
    color: '#6fc200'
  }
]

export default function ProcessPage() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['OUR', 'METHOD'].map((word, i) => (
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
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>How It Works</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6">
                From statement to savings<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  in under a week.
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              We handle the heavy lifting of auditing, negotiating, and migrating your payment stack. You just review the numbers and make the call.
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
            Kick off Day 1 right now.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Upload your statement today, and you&apos;ll have competitive bids in hand by tomorrow. We don&apos;t charge a dime for the audit.
          </p>
          <div className="flex justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              Start My Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
