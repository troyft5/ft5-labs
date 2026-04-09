import Link from 'next/link'
import { ArrowRight, Users, Shield, TrendingUp } from 'lucide-react'

const BG  = '#0f1a0f'
const BG2 = '#131f13'

export const metadata = {
  title: 'About Us | FinTech 5 — Payment Processing Consultants',
  description: 'Founded by a family of financial technology veterans with 30+ years of combined experience. We fix the broken payment processing model.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Story</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
            The Expertise of an Institution.<br />
            <span style={{ color: '#6fc200' }}>The Dedication of a Family.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
            For decades, we saw the payment processing industry from the inside. We built complex systems for colleges and managed high-stakes accounts for major enterprises.
          </p>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 py-6" style={{ background: '#4e9000' }}>
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6 text-center">
          {[
            { val: '10+', label: 'Payment Partners' },
            { val: '30+', label: 'Years Combined Experience' },
            { val: '$0', label: 'Cost for Our Consulting' },
          ].map(s => (
            <div key={s.label}>
              <div className="text-3xl font-black text-white">{s.val}</div>
              <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Origin story */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white mb-8">Why We Built FinTech 5</h2>
          <div className="flex flex-col gap-6 text-slate-400 text-lg leading-relaxed">
            <p>
              We understood the rules, the players, and the technology that powered it all. We built complex payment systems for colleges. We managed high-stakes merchant accounts for major enterprises. We knew exactly where the money went — and more importantly, where it didn&apos;t have to.
            </p>
            <p>
              Then we watched as the aggregator revolution changed everything. Powerful platforms like Square, PayPal and Stripe sold a dream of simplicity. But we saw the reality it created for founders: frustration, isolation, and a constant, draining battle with the very systems that were supposed to make their lives easier.
            </p>
            <p className="text-white font-bold text-xl">
              We founded FinTech 5 to fix this broken model.
            </p>
            <p>
              Our mission is to bridge the gap between powerful, modern technology and the dedicated, expert human support that every serious business deserves. You shouldn&apos;t have to choose between a seamless customer experience and a profitable, transparent payment operation.
            </p>
            <p>With FinTech 5, you get both.</p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>What Sets Us Apart</span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: <Users className="w-5 h-5" />, title: 'White-Glove Service', body: "Every FinTech 5 client gets a dedicated account representative — a real human who answers the phone. Not a ticket system. Not a chatbot." },
              { icon: <Shield className="w-5 h-5" />, title: 'Processor-Agnostic', body: "We're not owned by any processor. We work for you — which means we compare 10+ options and recommend only what's best for your business." },
              { icon: <TrendingUp className="w-5 h-5" />, title: 'Proven Savings', body: "Clients consistently unlock 10–18% cost reductions in year one. Our consulting is funded by processor partners — never by you." },
            ].map((p) => (
              <div key={p.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                  {p.icon}
                </div>
                <h3 className="font-black text-white mb-2">{p.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Talk to a Real Person Today</h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>No bots, no tickets. A dedicated payment specialist who knows your industry.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#0f1a0f', color: '#6fc200' }}>
              Get a Free Savings Estimate <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-8 py-4 font-bold text-white border border-white/25 hover:border-white/50 rounded-xl transition-all">
              Contact Us Directly
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
