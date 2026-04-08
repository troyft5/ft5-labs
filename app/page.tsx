import { ArrowRight, ChevronRight, Shield, Phone, TrendingUp, Zap, Users, CheckCircle2, Star } from 'lucide-react'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants — Stop Losing Profits',
  description: 'FinTech 5 negotiates across 10+ tier-1 processors to cut your processing costs 10–18%, eliminate hidden fees, and give you a dedicated expert who actually answers the phone.',
}

const solutions = [
  { title: 'In-Person Payments', desc: 'Smart terminals, free Clover hardware, offline mode, and unified reporting across every location.', href: '/solutions/in-person-payments' },
  { title: 'Mobile Payments', desc: 'Turn any iOS or Android device into a POS. Clover Flex, tap-to-pay, and offline sync.', href: '/solutions/mobile-payments' },
  { title: 'Online Payments', desc: 'Hosted checkout, embedded widgets, API-first gateways, and subscription billing.', href: '/solutions/online-payments' },
  { title: 'Transparent Pricing', desc: 'Interchange-plus, flat-rate, or custom. Rates locked in — no annual hikes.', href: '/solutions/pricing-models' },
  { title: 'Free Terminal Placement', desc: 'Clover Station, Mini or Flex placed at zero cost on qualifying agreements.', href: '/solutions/free-placement' },
]

const industries = [
  { name: 'Retail', href: '/industries/retail-payments' },
  { name: 'E-Commerce', href: '/industries/e-commerce' },
  { name: 'Healthcare', href: '/industries/healthcare' },
  { name: 'Service Businesses', href: '/industries/service' },
  { name: 'B2B Processing', href: '/industries/b2b' },
  { name: 'Higher Education', href: '/industries/higher-education' },
  { name: 'Petroleum', href: '/industries/petroleum' },
  { name: 'High-Risk', href: '/industries/high-risk' },
  { name: 'CBD & Hemp', href: '/industries/cbd' },
]

const differentiators = [
  { icon: <Shield className="w-6 h-6" />, title: 'Processor-Agnostic', body: "We're not owned by Square, Stripe, or any processor. We work exclusively for you — comparing 10+ options and recommending only what maximizes your margin." },
  { icon: <Phone className="w-6 h-6" />, title: 'A Real Human Picks Up', body: "Every FinTech 5 client gets a named, dedicated account representative. Not a ticket system. Not a chatbot. A person who knows your business." },
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Proven 10–18% Savings', body: 'Our clients consistently unlock 10–18% cost reductions in year one. We audit your statement, identify every hidden fee, and negotiate on your behalf.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Zero-Cost Consulting', body: 'Our expertise is funded by processor partners, never by you. No consulting fees, no retainers, and no hidden agenda.' },
  { icon: <Users className="w-6 h-6" />, title: '30+ Years Combined Experience', body: 'Founded by a family of fintech veterans who built complex payment systems for universities and enterprises.' },
  { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Full Compliance Coverage', body: 'Durbin Amendment routing, state surcharge laws, PCI DSS, HIPAA for healthcare — compliance is built in, not bolted on.' },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* Animated hero + stats + marquee */}
      <HeroSection />

      {/* ── WHY NOT STRIPE ── */}
      <section className="px-6 py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-bold uppercase tracking-widest">
                The Problem
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-6">
                Stripe sold you simplicity.<br />
                <span className="text-brand-600">You got isolation instead.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Aggregator platforms made payments easy to start — but as your volume grew, so did your fees. Account holds with no explanation. Flat rates that make no sense at scale. Support tickets that take three days to close.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We founded FinTech 5 to fix this. You deserve the technology of a top-tier platform <em>and</em> a dedicated expert who actually picks up the phone.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { bad: 'Flat 2.9% + $0.30 regardless of card type', good: 'Interchange-plus — pay the actual wholesale rate' },
                { bad: 'Account freezes with no human to call', good: 'Dedicated rep on your account from day one' },
                { bad: 'Statement you can\'t decipher', good: 'Line-by-line audit of every fee you\'re paying' },
                { bad: 'One-size-fits-all pricing', good: 'Model matched to your transaction mix and volume' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-sm text-red-700 font-medium">✗ {row.bad}</div>
                  <div className="bg-brand-50 border border-brand-100 rounded-xl p-4 text-sm text-brand-700 font-medium">✓ {row.good}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Your Path to a More Profitable Year</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Three steps. No risk. Usually done in 48 hours.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-200 via-brand-400 to-brand-200" />
            {[
              { n: '01', title: 'Schedule a Free 15-Min Audit', body: "Choose a slot. We review your current setup, pricing model, and goals. No sales pitch — just an honest look at what you're paying." },
              { n: '02', title: 'We Analyze Your Statement', body: 'Deep dive into your merchant statement — identifying every hidden fee, sub-optimal rate, and point of friction costing you money.' },
              { n: '03', title: 'Receive Your Action Plan', body: 'A clear, data-driven report: how much you can save, which pricing model fits your business, and a step-by-step optimization plan.' },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-600 text-white rounded-xl flex items-center justify-center mb-6 font-black text-sm tracking-widest">{step.n}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
              Schedule Your Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="px-6 py-24 bg-white" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-full text-xs font-bold uppercase tracking-widest">Solutions</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Every Way You Take Payments. Covered.</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From the counter to the cloud — we build payment stacks that eliminate friction and maximize margin.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {solutions.map((s) => (
              <Link key={s.href} href={s.href} className="group bg-slate-50 hover:bg-brand-600 border border-slate-200 hover:border-brand-600 rounded-2xl p-8 transition-all duration-300 glow-hover hover:-translate-y-1">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-white mb-3 transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-600 group-hover:text-brand-100 leading-relaxed mb-6 transition-colors">{s.desc}</p>
                <div className="flex items-center gap-2 text-brand-600 group-hover:text-white text-sm font-bold transition-colors">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FINTECH 5 (dark) ── */}
      <section className="px-6 py-24 bg-[#060d06]" id="why">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-600/10 text-brand-400 border border-brand-600/20 rounded-full text-xs font-bold uppercase tracking-widest">Why FinTech 5</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-4">Built Different. By Design.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">We're not a processor. We're not a software company. We're the experts negotiating on your side of the table.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {differentiators.map((d) => (
              <div key={d.title} className="glass rounded-2xl p-8 hover:bg-white/10 transition-colors hover:-translate-y-1 duration-300 group">
                <div className="w-10 h-10 bg-brand-600/20 text-brand-400 rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-600/30 transition-colors">{d.icon}</div>
                <h3 className="text-lg font-bold text-white mb-3">{d.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="px-6 py-24 bg-white" id="industries">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-full text-xs font-bold uppercase tracking-widest">Industries</div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Payment Expertise Across Every Industry</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From retail to high-risk, we've built specialized payment stacks for businesses just like yours.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <Link key={ind.href} href={ind.href} className="group flex items-center justify-between px-6 py-5 bg-slate-50 hover:bg-brand-600 border border-slate-200 hover:border-brand-600 rounded-2xl transition-all duration-300 hover:-translate-y-0.5">
                <span className="font-bold text-slate-800 group-hover:text-white transition-colors">{ind.name}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL / TRUST ── */}
      <section className="px-6 py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />)}
          </div>
          <blockquote className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed mb-8">
            &ldquo;FinTech 5 saved us over $14,000 in the first year alone. The audit took two days and we switched processors within a week. I wish we&apos;d found them sooner.&rdquo;
          </blockquote>
          <div className="text-slate-500 font-medium">— Business Owner, NJ Retail Chain</div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24 bg-brand-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Find Out Exactly What You&apos;re Overpaying.<br />In 48 Hours. Free.
          </h2>
          <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">
            Upload your merchant statement and we&apos;ll return a line-by-line audit with every hidden fee, the right pricing model for your volume, and competitive bids from 10+ processors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-brand-700 bg-white hover:bg-brand-50 rounded-xl shadow-lg transition-all hover:-translate-y-0.5">
              Get My Free Savings Estimate <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
              Talk to a Specialist
            </Link>
          </div>
          <p className="text-brand-200 text-sm mt-8">No contracts. No consulting fees. No pressure. Just answers.</p>
        </div>
      </section>

    </div>
  )
}
