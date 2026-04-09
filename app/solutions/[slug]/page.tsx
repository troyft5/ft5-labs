import { solutionsData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, ChevronRight, Zap } from 'lucide-react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return {}
  return {
    title: `${solution.title} | FinTech 5`,
    description: solution.subtitle,
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return notFound()

  const howItWorks = 'howItWorks' in solution ? (solution as typeof solution & { howItWorks: string[] }).howItWorks : []
  const challenge   = 'challenge' in solution ? (solution as typeof solution & { challenge: string }).challenge : ''
  const cta         = 'cta' in solution ? (solution as typeof solution & { cta: string }).cta : 'Get Your Free Estimate'

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Payment Solutions</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
              {solution.title}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">{solution.subtitle}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                {cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Try the Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      {challenge && (
        <section className="px-6 py-16 relative" style={{ background: BG }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
                <div className="text-5xl select-none">⚡</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#f59e0b' }}>The Problem We Solve</div>
                  <p className="text-slate-300 text-lg leading-relaxed">{challenge}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── SOLUTION + FEATURES ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Content */}
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>How We Do It</span>
                </div>
                <h2 className="text-3xl font-black text-white mb-6 leading-tight">Built for how your business actually operates.</h2>
                <p className="text-slate-400 leading-relaxed text-lg mb-8">{solution.content}</p>

                {howItWorks.length > 0 && (
                  <div className="flex flex-col gap-4">
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>How It Works</div>
                    {howItWorks.map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-black shrink-0" style={{ background: '#4e9000' }}>{i + 1}</div>
                        <p className="text-slate-400 pt-1 text-sm leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Features */}
            <Reveal direction="right" delay={100}>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#6fc200' }}>What&apos;s Included</div>
                <div className="flex flex-col gap-2.5 mb-8">
                  {solution.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#4e9000' }} />
                      <span className="text-sm text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-4 h-4" style={{ color: '#6fc200' }} />
                    <span className="text-sm font-black text-white">48-hour audit turnaround</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">Send us your statement and we&apos;ll analyze every line item and return a full competitive comparison.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(0,80,0,0.4)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ready to get started?<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Free. No obligation.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Our consulting is 100% free — funded by our processor partners, not by you. Get a data-driven analysis in 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-black rounded-xl hover:-translate-y-1 transition-all" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                {cta} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                Talk to a Specialist
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
