import { solutionsData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const BG  = '#0f1a0f'
const BG2 = '#131f13'

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }))
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return notFound()

  const howItWorks = 'howItWorks' in solution ? (solution as typeof solution & { howItWorks: string[] }).howItWorks : []

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Payment Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">{solution.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">{solution.subtitle}</p>
        </div>
      </section>

      {/* Challenge */}
      {'challenge' in solution && (
        <section className="px-6 py-16 relative" style={{ background: BG }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 rounded-2xl p-8" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
                <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white mb-3">The Problem We Solve</h2>
                <p className="text-slate-400 leading-relaxed">{(solution as typeof solution & { challenge: string }).challenge}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6">How We Do It</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-12">{solution.content}</p>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#6fc200' }}>What&apos;s Included</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {solution.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#4e9000' }} />
                <span className="text-sm text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* How It Works */}
          {howItWorks.length > 0 && (
            <>
              <h3 className="text-2xl font-black text-white mb-8">How It Works</h3>
              <div className="flex flex-col gap-4">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-black shrink-0" style={{ background: '#4e9000' }}>
                      {i + 1}
                    </div>
                    <p className="text-slate-400 pt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Ready to Get Started?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>Our consulting is 100% free — funded by our processor partners, never by you. Get a no-obligation analysis in 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#0f1a0f', color: '#6fc200' }}>
              {'cta' in solution ? (solution as typeof solution & { cta: string }).cta : 'Get Your Free Estimate'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/25 hover:border-white/50 rounded-xl transition-all">
              Use Fee Calculator <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-sm mt-6" style={{ color: 'rgba(255,255,255,0.6)' }}>Free. No obligation. No high-pressure sales calls.</p>
        </div>
      </section>

    </div>
  )
}
