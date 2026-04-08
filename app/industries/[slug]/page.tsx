import { industriesData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }))
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return notFound()

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#0f1c0a] text-white px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full text-xs font-bold uppercase tracking-widest">
            Industry Solutions
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">{industry.title}</h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{industry.subtitle}</p>
        </div>
      </section>

      {/* Stats bar */}
      {'stats' in industry && (
        <section className="bg-brand-600 text-white px-6 py-6">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
            {(industry as typeof industry & { stats: {value:string;label:string}[] }).stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-black">{s.value}</div>
                <div className="text-sm text-brand-100 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenge */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">The Challenge</h2>
              <p className="text-slate-600 leading-relaxed">{'challenge' in industry ? (industry as typeof industry & {challenge:string}).challenge : ''}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6">Our {industry.title.split(' ')[0]} Solution</h2>
          <p className="text-lg text-slate-600 leading-relaxed mb-12">{industry.content}</p>

          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">What&apos;s Included</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {industry.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-[#0f1c0a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
            Ready to See What You Could Save?
          </h2>
          <p className="text-slate-400 mb-8">
            Our consulting is 100% free — funded by our processor partners, never by hidden fees. 
            Get a data-driven analysis of your current processing costs in 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-your-savings-estimate"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg transition-all"
            >
              {'cta' in industry ? (industry as typeof industry & {cta:string}).cta : 'Get Your Free Analysis'}
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
