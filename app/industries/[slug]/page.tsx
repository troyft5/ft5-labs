import { industriesData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return {}
  return {
    title: `${industry.title} | FinTech 5`,
    description: industry.subtitle,
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return notFound()

  const stats = 'stats' in industry ? (industry as typeof industry & { stats: {value:string;label:string}[] }).stats : []
  const challenge = 'challenge' in industry ? (industry as typeof industry & { challenge: string }).challenge : ''
  const cta = 'cta' in industry ? (industry as typeof industry & { cta: string }).cta : 'Get Your Free Analysis'

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-0 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industry Solutions</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[3fr_2fr] gap-12 items-end pb-16">
            <div>
              <Reveal delay={80}>
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
                  {industry.title}
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="text-xl text-slate-400 leading-relaxed max-w-xl">{industry.subtitle}</p>
              </Reveal>
              <Reveal delay={240}>
                <div className="flex flex-wrap gap-4 mt-8">
                  <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    {cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    Fee Calculator <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            {/* Stats column */}
            {stats.length > 0 && (
              <Reveal delay={200} direction="right">
                <div className="flex flex-col gap-3">
                  {stats.map((s, i) => (
                    <div key={i} className="rounded-2xl px-6 py-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(78,144,0,0.2)' }}>
                      <div className="text-3xl font-black mb-1" style={{ color: '#6fc200' }}>{s.value}</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>
        </div>

        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
      </section>

      {/* ── CHALLENGE ── */}
      {challenge && (
        <section className="px-6 py-20 relative" style={{ background: BG }}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
              <Reveal direction="left">
                <div className="md:pt-1">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(251,191,36,0.08)', border: '1px solid rgba(251,191,36,0.2)' }}>
                    <AlertTriangle className="w-7 h-7" style={{ color: '#f59e0b' }} />
                  </div>
                </div>
              </Reveal>
              <Reveal delay={100}>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#f59e0b' }}>The Challenge</div>
                  <p className="text-lg md:text-xl text-slate-300 leading-relaxed font-medium">{challenge}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── SOLUTION + FEATURES ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Body copy */}
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Approach</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  How FinTech 5 solves it.
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">{industry.content}</p>

                <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5" style={{ color: '#6fc200' }} />
                    <span className="text-sm font-black text-white">Zero cost to you</span>
                  </div>
                  <p className="text-sm text-slate-400">Our consulting is funded by our processor partners. You pay nothing for our analysis, negotiation, or ongoing support.</p>
                </div>
              </div>
            </Reveal>

            {/* Features */}
            <Reveal direction="right" delay={100}>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#6fc200' }}>What&apos;s Included</div>
                <div className="flex flex-col gap-3">
                  {industry.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4e9000' }} />
                      <span className="text-sm text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(111,194,0,0.3)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              See what you could save.<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Free analysis in 48 hours.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Upload your merchant statement and get a line-by-line audit with competitive bids from 10+ processors. No consulting fees — ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-9 py-4.5 text-base font-black rounded-xl hover:-translate-y-1 transition-all" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                {cta} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-9 py-4.5 text-base font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                Talk to a Specialist
              </Link>
            </div>
            <p className="text-sm mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Free. No obligation. No high-pressure sales calls.</p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
