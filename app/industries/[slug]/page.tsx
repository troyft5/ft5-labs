import { industriesData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const BG  = '#0f1a0f'
const BG2 = '#131f13'

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }))
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return notFound()

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industry Solutions</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">{industry.title}</h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">{industry.subtitle}</p>
        </div>
      </section>

      {/* Stats bar */}
      {'stats' in industry && (
        <section className="px-6 py-6" style={{ background: '#4e9000' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
            {(industry as typeof industry & { stats: {value:string;label:string}[] }).stats.map((s, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-black text-white">{s.value}</div>
                <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.75)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Challenge */}
      <section className="px-6 py-16 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4 rounded-2xl p-8" style={{ background: 'rgba(251,191,36,0.06)', border: '1px solid rgba(251,191,36,0.15)' }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(251,191,36,0.1)', border: '1px solid rgba(251,191,36,0.2)' }}>
              <AlertTriangle className="w-5 h-5" style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-3">The Challenge</h2>
              <p className="text-slate-400 leading-relaxed">{'challenge' in industry ? (industry as typeof industry & {challenge:string}).challenge : ''}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6">Our {industry.title.split(' ')[0]} Solution</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-12">{industry.content}</p>

          <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#6fc200' }}>What&apos;s Included</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-16">
            {industry.features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#4e9000' }} />
                <span className="text-sm text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Ready to See What You Could Save?</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>Our consulting is 100% free — funded by our processor partners, never by you. Get a data-driven analysis in 48 hours.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#0f1a0f', color: '#6fc200' }}>
              {'cta' in industry ? (industry as typeof industry & {cta:string}).cta : 'Get Your Free Analysis'}
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
