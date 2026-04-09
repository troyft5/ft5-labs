import { ArrowRight, ChevronRight, Shield, Phone, TrendingUp, Zap, Users, CheckCircle2, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants — Stop Losing Profits',
  description: 'FinTech 5 negotiates across 10+ tier-1 processors to cut your processing costs 10–18%, eliminate hidden fees, and give you a dedicated expert who actually answers the phone.',
}

const solutions = [
  { title: 'In-Person Payments', desc: 'Smart terminals, free Clover hardware, offline mode, and unified reporting across every location.', href: '/solutions/in-person-payments' },
  { title: 'Mobile Payments', desc: 'Turn any iOS or Android device into a full POS. Clover Flex, tap-to-pay, offline sync.', href: '/solutions/mobile-payments' },
  { title: 'Online Payments', desc: 'Hosted checkout, embedded widgets, API-first gateways, and subscription billing.', href: '/solutions/online-payments' },
  { title: 'Transparent Pricing', desc: 'Interchange-plus, flat-rate, or custom. Rates locked in — no annual hikes.', href: '/solutions/pricing-models' },
  { title: 'Free Terminal Placement', desc: 'Clover Station, Mini or Flex at zero cost on qualifying agreements.', href: '/solutions/free-placement' },
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
  { icon: <TrendingUp className="w-6 h-6" />, title: 'Proven 10–18% Savings', body: 'Clients consistently unlock 10–18% cost reductions in year one. We audit your statement, identify every hidden fee, and negotiate on your behalf.' },
  { icon: <Zap className="w-6 h-6" />, title: 'Zero-Cost Consulting', body: 'Our expertise is funded by processor partners, never by you. No consulting fees, no retainers, and no hidden agenda — ever.' },
  { icon: <Users className="w-6 h-6" />, title: '30+ Years Combined Experience', body: 'Founded by a family of fintech veterans who built complex payment systems for universities and enterprises before starting FinTech 5.' },
  { icon: <CheckCircle2 className="w-6 h-6" />, title: 'Full Compliance Coverage', body: 'Durbin Amendment routing, state surcharge laws, PCI DSS, HIPAA for healthcare — compliance is built in, not bolted on.' },
]

const testimonials = [
  { quote: "FinTech 5 saved us over $14,000 in the first year alone. The audit took two days and we switched processors within a week.", name: "Retail Chain Owner", location: "NJ", savings: "$14,200/yr" },
  { quote: "We had no idea we were being overcharged. They found fees we'd been paying for years that shouldn't have been there at all.", name: "E-Commerce Founder", location: "NY", savings: "$9,800/yr" },
  { quote: "The white-glove service is real. My rep actually answers the phone when I call — something I'd never experienced with Stripe.", name: "Healthcare Practice Manager", location: "NJ", savings: "$11,400/yr" },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      {/* Animated hero + stats + marquee */}
      <HeroSection />

      {/* ── WHY NOT STRIPE ── */}
      <section className="px-6 py-28 bg-white relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-full text-xs font-bold uppercase tracking-widest">
                The Real Cost of Aggregators
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6">
                Stripe sold you<br />simplicity.
                <span className="block text-brand-600">You got isolation instead.</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Aggregator platforms made payments easy to start — but as your volume grew, so did your fees. Account holds with no explanation. Flat rates that make no sense at scale. Support tickets that take three days to close.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                We founded FinTech 5 to fix this. You deserve the technology of a top-tier platform <em>and</em> a dedicated expert who picks up the phone.
              </p>
              <Link href="/about-us" className="inline-flex items-center gap-2 text-brand-600 font-bold hover:text-brand-700 transition-colors group">
                Our story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { bad: 'Flat 2.9% + $0.30 regardless of card type', good: 'Interchange-plus — pay the actual wholesale rate' },
                { bad: 'Account freezes with no human to call', good: 'Dedicated rep on your account from day one' },
                { bad: "Statement you can't decipher", good: 'Line-by-line audit of every fee you\'re paying' },
                { bad: 'One-size-fits-all pricing for all businesses', good: 'Model matched to your transaction mix and volume' },
                { bad: 'Take it or leave it — no negotiation', good: 'Competitive bids from 10+ processors in 48 hours' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div className="bg-red-50 border border-red-100/80 rounded-2xl p-4 text-sm text-red-700 font-medium leading-snug">
                    <span className="text-red-400 font-black mr-2">✗</span>{row.bad}
                  </div>
                  <div className="bg-brand-50 border border-brand-100/80 rounded-2xl p-4 text-sm text-brand-700 font-medium leading-snug">
                    <span className="text-brand-500 font-black mr-2">✓</span>{row.good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-slate-50 px-6 py-24 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-full text-xs font-bold uppercase tracking-widest">Process</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Your Path to a More<br />Profitable Year</h2>
            <p className="text-slate-500 text-lg max-w-lg mx-auto">Three steps. No risk. Usually done in 48 hours. Free.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-px bg-gradient-to-r from-brand-200 via-brand-500 to-brand-200" />
            {[
              { n: '01', title: 'Schedule a Free 15-Min Audit', body: "Choose a slot. We review your current setup, pricing model, and goals. No sales pitch — just an honest look at what you're paying." },
              { n: '02', title: 'We Analyze Your Statement', body: 'Deep dive into your merchant statement — identifying every hidden fee, sub-optimal rate, and point of friction costing you money every month.' },
              { n: '03', title: 'Receive Your Action Plan', body: 'A clear, data-driven report: exactly how much you can save, which pricing model fits your business, and a step-by-step optimization plan.' },
            ].map((step) => (
              <div key={step.n} className="relative bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 gradient-border group">
                <div className="w-14 h-14 bg-brand-600 text-white rounded-2xl flex items-center justify-center mb-6 font-black text-sm tracking-widest shadow-lg shadow-brand-900/20">{step.n}</div>
                <h3 className="text-xl font-black mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-2xl shadow-xl shadow-brand-900/20 transition-all hover:-translate-y-1">
              Schedule Your Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-slate-400 text-sm mt-4">No obligation. No contracts. Just clarity.</p>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="px-6 py-24 bg-white" id="solutions">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-50 text-brand-700 border border-brand-100 rounded-full text-xs font-bold uppercase tracking-widest">Solutions</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Every Way You Take Payments.<br />Covered.</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">From the counter to the cloud — we build payment stacks that eliminate friction and maximize margin at every touchpoint.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`group bg-slate-50 hover:bg-[#030906] border border-slate-200 hover:border-brand-600/30 rounded-2xl p-8 transition-all duration-500 glow-hover ${i === 0 ? 'md:col-span-2' : ''}`}
              >
                <h3 className="text-lg font-black text-slate-900 group-hover:text-white mb-3 transition-colors duration-300">{s.title}</h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-400 leading-relaxed mb-6 transition-colors duration-300">{s.desc}</p>
                <div className="flex items-center gap-2 text-brand-600 group-hover:text-brand-400 text-sm font-bold transition-colors duration-300">
                  Learn more <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FINTECH 5 (dark noise) ── */}
      <section className="px-6 py-24 bg-[#030906] noise" id="why">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-brand-600/10 text-brand-400 border border-brand-600/20 rounded-full text-xs font-bold uppercase tracking-widest">Why FinTech 5</div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Built Different.<br />By Design.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">We&apos;re not a processor. We&apos;re not a software company. We&apos;re the experts who sit on your side of the table.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {differentiators.map((d, i) => (
              <div key={d.title} className={`glass rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 group cursor-default ${i === 0 ? 'md:col-span-1 border-brand-600/20' : ''}`}>
                <div className="w-12 h-12 bg-brand-600/15 text-brand-400 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600/25 transition-colors border border-brand-600/20">{d.icon}</div>
                <h3 className="text-lg font-black text-white mb-3">{d.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 py-24 bg-slate-50 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-brand-500 text-brand-500" />)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Real Businesses.<br />Real Savings.</h2>
            <p className="text-slate-500 max-w-lg mx-auto">These aren&apos;t estimates. These are actual savings identified in our clients&apos; statements.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <Quote className="w-8 h-8 text-brand-200 mb-4 shrink-0" />
                <blockquote className="text-slate-700 leading-relaxed flex-1 mb-6 font-medium">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.location}</div>
                  </div>
                  <div className="txt-right">
                    <div className="text-xs text-slate-400 mb-0.5">Verified savings</div>
                    <div className="text-brand-600 font-black text-lg">{t.savings}</div>
                  </div>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Payment Expertise Across<br />Every Industry</h2>
            <p className="text-slate-500 max-w-xl mx-auto">From retail to high-risk, we&apos;ve built specialized payment stacks for businesses just like yours.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {industries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group flex items-center justify-between px-6 py-5 bg-slate-50 hover:bg-[#030906] border border-slate-200 hover:border-brand-600/30 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="font-bold text-slate-800 group-hover:text-white transition-colors">{ind.name}</span>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-28 bg-brand-600 noise relative overflow-hidden">
        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-brand-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-800/30 blur-[100px] pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest text-brand-100">
            Zero risk. Zero contracts.
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Find Out What You&apos;re<br />Overpaying.<br />
            <span className="text-brand-100">In 48 Hours. Free.</span>
          </h2>
          <p className="text-brand-100 text-xl mb-12 max-w-xl mx-auto leading-relaxed">
            Upload your merchant statement and we&apos;ll return a line-by-line audit with every hidden fee, the right pricing model for your volume, and competitive bids from 10+ processors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-brand-700 bg-white hover:bg-brand-50 rounded-2xl shadow-2xl shadow-brand-900/20 transition-all hover:-translate-y-1 group">
              Get My Free Savings Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 rounded-2xl transition-all">
              Talk to a Specialist
            </Link>
          </div>
          <p className="text-brand-200/70 text-sm mt-8">No contracts. No consulting fees. No pressure.</p>
        </div>
      </section>

    </div>
  )
}
