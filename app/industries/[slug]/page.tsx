import { industriesData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return notFound()

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-4xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold uppercase tracking-wide">
          Industry Solutions
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">{industry.title}</h1>
        <p className="text-xl text-slate-600 mb-12">{industry.subtitle}</p>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-left mb-12">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">{industry.content}</p>
          <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Core Capabilities</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {industry.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/get-your-savings-estimate" className="inline-flex px-8 py-4 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all items-center justify-center gap-2">
          Get a Custom Estimate <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
