import { solutionsData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return notFound()

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <section className="px-6 py-24 max-w-4xl mx-auto text-center w-full">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-blue-50 text-blue-700 border border-blue-100 rounded-full text-sm font-bold uppercase tracking-wide">
          Payment Solutions
        </div>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-slate-900">{solution.title}</h1>
        <p className="text-xl text-slate-600 mb-12">{solution.subtitle}</p>
        
        <div className="bg-slate-50 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-left mb-12">
          <p className="text-lg text-slate-700 leading-relaxed mb-8">{solution.content}</p>
          <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Included Features</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {solution.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-600 bg-white p-3 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/get-your-savings-estimate" className="inline-flex px-8 py-4 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all items-center justify-center gap-2">
          Get Your Estimate <ArrowRight className="w-5 h-5" />
        </Link>
      </section>
    </div>
  )
}
