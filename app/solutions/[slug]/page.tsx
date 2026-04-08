import { solutionsData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }))
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return notFound()

  const howItWorks = 'howItWorks' in solution ? (solution as typeof solution & { howItWorks: string[] }).howItWorks : []

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#0f1c0a] text-white px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full text-xs font-bold uppercase tracking-widest">
            Payment Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">{solution.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{solution.subtitle}</p>
        </div>
      </section>

      {/* Challenge */}
      {'challenge' in solution && (
        <section className="px-6 py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-3">The Problem We Solve</h2>
                <p className="text-slate-600 leading-relaxed">{(solution as typeof solution & { challenge: string }).challenge}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">How We Do It</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">{solution.content}</p>

          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">What&apos;s Included</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {solution.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* How It Works */}
          {howItWorks.length > 0 && (
            <>
              <h3 className="text-2xl font-black text-slate-900 mb-8">How It Works</h3>
              <div className="flex flex-col gap-4 mb-16">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center text-sm font-black shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-slate-700 pt-1 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-[#0f1c0a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 mb-8">
            Our consulting is 100% free — funded by our processor partners, never by you.
            Get a no-obligation analysis of your current costs in 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-your-savings-estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg transition-all"
            >
              {'cta' in solution ? (solution as typeof solution & { cta: string }).cta : 'Get Your Free Estimate'}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/calculator"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/20 hover:border-white/40 rounded-xl transition-all"
            >
              Use Fee Calculator <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-slate-500 text-sm mt-6">Free. No obligation. No high-pressure sales calls.</p>
        </div>
      </section>
    </div>
  )
}
