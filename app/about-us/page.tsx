import Link from 'next/link'
import { ArrowRight, Users, Shield, TrendingUp } from 'lucide-react'

export const metadata = {
  title: 'About Us | FinTech 5 — Payment Processing Consultants',
  description: 'Founded by a family of financial technology veterans with 30+ years of combined experience. We fix the broken payment processing model.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-white min-h-screen">

      {/* Hero */}
      <section className="bg-[#0f1c0a] text-white px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 bg-brand-600/20 text-brand-300 border border-brand-600/30 rounded-full text-xs font-bold uppercase tracking-widest">
            Our Story
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            The Expertise of an Institution.<br />The Dedication of a Family.
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">
            For decades, we saw the payment processing industry from the inside. We built complex systems for colleges and managed high-stakes accounts for major enterprises.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-brand-600 text-white px-6 py-6">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div><div className="text-3xl font-black">10+</div><div className="text-sm text-brand-100 mt-0.5">Payment Partners</div></div>
          <div><div className="text-3xl font-black">30+</div><div className="text-sm text-brand-100 mt-0.5">Years Combined Experience</div></div>
          <div><div className="text-3xl font-black">$0</div><div className="text-sm text-brand-100 mt-0.5">Cost for Our Consulting</div></div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 mb-8">Why We Built FinTech 5</h2>
          <div className="prose prose-lg text-slate-600 space-y-6">
            <p className="text-lg leading-relaxed">
              We understood the rules, the players, and the technology that powered it all. We built the complex payment systems for colleges. We managed high-stakes merchant accounts for major enterprises. We knew exactly where the money went — and more importantly, where it didn&apos;t have to.
            </p>
            <p className="text-lg leading-relaxed">
              Then we watched as the aggregator revolution changed everything. Powerful platforms like Square, PayPal and Stripe sold a dream of simplicity. But we saw the reality it created for founders: frustration, isolation, and a constant, draining battle with the very systems that were supposed to make their lives easier. We saw brilliant entrepreneurs becoming the unpaid support agents for their own payment processors.
            </p>
            <p className="text-lg leading-relaxed font-semibold text-slate-800">
              We founded FinTech 5 to fix this broken model.
            </p>
            <p className="text-lg leading-relaxed">
              Our mission is to bridge the gap between powerful, modern technology and the dedicated, expert human support that every serious business deserves. We believe you shouldn&apos;t have to choose between a seamless customer experience and a profitable, transparent payment operation.
            </p>
            <p className="text-lg leading-relaxed">
              With FinTech 5, you get both.
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-black text-slate-900 mb-10 text-center">What Sets Us Apart</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6 text-brand-600" />,
                title: "White-Glove Service",
                body: "Every FinTech 5 client gets a dedicated account representative — a real human who answers the phone. Not a ticket system. Not a chatbot."
              },
              {
                icon: <Shield className="w-6 h-6 text-brand-600" />,
                title: "Processor-Agnostic",
                body: "We're not owned by any processor. We work for you — which means we compare 10+ options and recommend only what's best for your business."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-brand-600" />,
                title: "Proven Savings",
                body: "Clients consistently unlock 10–18% cost reductions in year one. Our consulting is funded by processor partners — never by you."
              }
            ].map((p, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center mb-4">{p.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{p.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-16 bg-[#0f1c0a]">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Talk to a Real Person Today</h2>
          <p className="text-slate-400 mb-8">No bots, no tickets. A dedicated payment specialist who knows your industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg transition-all">
              Get a Free Savings Estimate <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/20 hover:border-white/40 rounded-xl transition-all">
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
