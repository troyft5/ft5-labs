import { ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section */}
      <section className="relative px-6 py-24 md:py-32 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-50 text-brand-700 rounded-full text-sm font-semibold border border-brand-100">
          <TrendingUp className="w-4 h-4" /> Trusted Payment Processing Consultants
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-slate-900 max-w-4xl leading-[1.1]">
          Stop Losing Profits to <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-cyan-500">Payment Processors.</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
          FinTech 5 blends complementary expertise with access to 10+ leading processors, building payment stacks that eliminate hidden fees, streamline checkout, and reclaim your profit margins.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="#contact" className="px-8 py-4 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-lg hover:shadow-brand-600/20 transition-all flex items-center justify-center gap-2">
            Schedule Free Savings Audit <ArrowRight className="w-5 h-5" />
          </Link>
          <Link href="#solutions" className="px-8 py-4 text-base font-bold bg-white border border-slate-200 hover:border-blue-200 hover:bg-brand-50 text-slate-700 rounded-lg transition-all flex items-center justify-center gap-2">
            Explore Solutions
          </Link>
        </div>
      </section>

      {/* Stats/About Strip */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">
            <div className="flex-1 p-6 text-center">
                <div className="text-4xl font-black text-brand-600 mb-2">10+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Tier-1 Payment Partners</div>
            </div>
            <div className="flex-1 p-6 text-center">
                <div className="text-4xl font-black text-brand-600 mb-2">30+</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Years Combined Experience</div>
            </div>
            <div className="flex-1 p-6 text-center">
                <div className="text-4xl font-black text-brand-600 mb-2">24/7</div>
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">White-Glove Support</div>
            </div>
        </div>
      </section>

      {/* 3 Step Process */}
      <section className="px-6 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Your Path to a More Profitable Year</h2>
            <p className="text-slate-600">Get the tech of a platform with the support of real human consultants.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 font-black text-xl">1</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Schedule Free Audit</h3>
              <p className="text-slate-600 leading-relaxed">Choose a convenient 15-minute slot. We'll have a brief, no-obligation chat about your current setup and goals.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 font-black text-xl">2</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">We Analyze Your Stack</h3>
              <p className="text-slate-600 leading-relaxed">Our team performs a deep analysis of your merchant statements to identify hidden fees and points of friction.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center mb-6 font-black text-xl">3</div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">Receive Action Plan</h3>
              <p className="text-slate-600 leading-relaxed">We present a clear, data-driven report showing exactly how much you can save and a step-by-step optimization plan.</p>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  )
}
