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
  { icon: <Shield className="w-5 h-5" />, title: 'Processor-Agnostic', body: "We're not owned by Square, Stripe, or any processor. We work exclusively for you — comparing 10+ options and recommending only what maximizes your margin." },
  { icon: <Phone className="w-5 h-5" />, title: 'A Real Human Picks Up', body: "Every FinTech 5 client gets a named, dedicated account representative. Not a ticket system. Not a chatbot. A person who knows your business." },
  { icon: <TrendingUp className="w-5 h-5" />, title: 'Proven 10–18% Savings', body: 'Clients consistently unlock 10–18% cost reductions in year one. We audit your statement, identify every hidden fee, and negotiate on your behalf.' },
  { icon: <Zap className="w-5 h-5" />, title: 'Zero-Cost Consulting', body: 'Our expertise is funded by processor partners, never by you. No consulting fees, no retainers, and no hidden agenda — ever.' },
  { icon: <Users className="w-5 h-5" />, title: '30+ Years Combined Experience', body: 'Founded by a family of fintech veterans who built complex payment systems for universities and enterprises before starting FinTech 5.' },
  { icon: <CheckCircle2 className="w-5 h-5" />, title: 'Full Compliance Coverage', body: 'Durbin Amendment routing, state surcharge laws, PCI DSS, HIPAA for healthcare — compliance is built in, not bolted on.' },
]

const testimonials = [
  { quote: "FinTech 5 saved us over $14,000 in the first year alone. The audit took two days and we switched processors within a week.", name: "Retail Chain Owner", location: "NJ", savings: "$14,200/yr" },
  { quote: "We had no idea we were being overcharged. They found fees we'd been paying for years that shouldn't have been there at all.", name: "E-Commerce Founder", location: "NY", savings: "$9,800/yr" },
  { quote: "The white-glove service is real. My rep actually answers the phone when I call — something I'd never experienced with Stripe.", name: "Healthcare Practice Manager", location: "NJ", savings: "$11,400/yr" },
]

// Shared dark-theme tokens
const BG  = '#0f1a0f'   // primary dark
const BG2 = '#131f13'   // slightly lighter alternate

export default function Home() {
  return (
    <div className="flex flex-col w-full">

      <HeroSection />

      {/* ── WHY NOT STRIPE ── */}
      <section className="px-6 py-28 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>The Real Cost of Aggregators</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-6">
                Stripe sold you simplicity.<br />
                <span style={{ color: '#6fc200' }}>You got isolation instead.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed mb-5 text-lg">
                Aggregator platforms made payments easy to start — but as your volume grew, so did your fees. Account holds with no explanation. Flat rates that make no sense at scale.
              </p>
              <p className="text-slate-400 leading-relaxed mb-10 text-lg">
                We founded FinTech 5 to fix this. You deserve the technology of a top-tier platform <em>and</em> a dedicated expert who picks up the phone.
              </p>
              <Link href="/about-us" className="inline-flex items-center gap-2 font-bold text-sm hover:opacity-80 transition-opacity group" style={{ color: '#6fc200' }}>
                Our story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {[
                { bad: 'Flat 2.9% + $0.30 regardless of card type', good: 'Interchange-plus — pay the actual wholesale rate' },
                { bad: 'Account freezes with no human to call', good: 'Dedicated rep on your account from day one' },
                { bad: "Statement you can't decipher", good: 'Line-by-line audit of every fee you\'re paying' },
                { bad: 'One-size-fits-all pricing', good: 'Model matched to your transaction mix and volume' },
                { bad: 'Take it or leave it — no negotiation', good: 'Competitive bids from 10+ processors in 48 hours' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl p-4 text-sm font-medium leading-snug" style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: '#fca5a5' }}>
                    <span className="font-black mr-2" style={{ color: '#f87171' }}>✗</span>{row.bad}
                  </div>
                  <div className="rounded-xl p-4 text-sm font-medium leading-snug" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)', color: '#86efac' }}>
                    <span className="font-black mr-2" style={{ color: '#4e9000' }}>✓</span>{row.good}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Process</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Your Path to a More<br />Profitable Year</h2>
            <p className="text-slate-400 text-lg max-w-lg mx-auto">Three steps. No risk. Usually done in 48 hours. Free.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-10 left-[22%] right-[22%] h-px" style={{ background: 'linear-gradient(90deg, rgba(78,144,0,0.2), #4e9000, rgba(78,144,0,0.2))' }} />
            {[
              { n: '01', title: 'Schedule a Free 15-Min Audit', body: "Choose a slot. We review your current setup, pricing model, and goals. No sales pitch — just an honest look at what you're paying." },
              { n: '02', title: 'We Analyze Your Statement', body: 'Deep dive into your merchant statement — identifying every hidden fee, sub-optimal rate, and friction point costing you money every month.' },
              { n: '03', title: 'Receive Your Action Plan', body: 'A clear, data-driven report: exactly how much you can save, which pricing model fits your business, and a step-by-step optimization plan.' },
            ].map((step) => (
              <div key={step.n} className="relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 group" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 font-black text-sm tracking-widest text-white" style={{ background: '#4e9000' }}>{step.n}</div>
                <h3 className="text-lg font-black mb-3 text-white">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-10 py-4 text-base font-bold text-white rounded-2xl transition-all hover:-translate-y-1 group" style={{ background: '#4e9000', boxShadow: '0 8px 30px rgba(78,144,0,0.3)' }}>
              Schedule Your Free Audit <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-slate-600 text-sm mt-4">No obligation. No contracts. Just clarity.</p>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ── */}
      <section className="px-6 py-24 relative" style={{ background: BG2 }} id="solutions">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Solutions</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Every Way You Take Payments.<br />Covered.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">From the counter to the cloud — we build payment stacks that eliminate friction and maximize margin at every touchpoint.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {solutions.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`dark-card group rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${i === 0 ? 'md:col-span-2' : ''}`}
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid' }}
              >
                <h3 className="text-lg font-black text-white mb-3 group-hover:text-[#6fc200] transition-colors">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                <div className="flex items-center gap-2 text-sm font-bold group-hover:translate-x-1 transition-transform" style={{ color: '#4e9000' }}>
                  Learn more <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FINTECH 5 ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }} id="why">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Why FinTech 5</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Built Different.<br />By Design.</h2>
            <p className="text-slate-400 max-w-xl mx-auto text-lg">We&apos;re not a processor. We&apos;re not a software company. We&apos;re the experts who sit on your side of the table.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {differentiators.map((d) => (
              <div key={d.title} className="rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 group cursor-default" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 transition-all" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                  {d.icon}
                </div>
                <h3 className="text-base font-black text-white mb-3">{d.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 py-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: '#4e9000', color: '#4e9000' }} />)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Real Businesses.<br />Real Savings.</h2>
            <p className="text-slate-400 max-w-lg mx-auto">These aren&apos;t estimates. These are actual savings identified in our clients&apos; statements.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-2xl p-8 flex flex-col" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Quote className="w-7 h-7 mb-4 shrink-0" style={{ color: 'rgba(78,144,0,0.4)' }} />
                <blockquote className="text-slate-300 leading-relaxed flex-1 mb-6 font-medium">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 mb-0.5">Verified savings</div>
                    <div className="font-black text-lg" style={{ color: '#6fc200' }}>{t.savings}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }} id="industries">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industries</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Payment Expertise Across<br />Every Industry</h2>
            <p className="text-slate-400 max-w-xl mx-auto">From retail to high-risk, we&apos;ve built specialized payment stacks for businesses just like yours.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="dark-card group flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid' }}
              >
                <span className="font-bold text-slate-300 group-hover:text-white transition-colors">{ind.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#6fc200] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(111,194,0,0.25)' }} />
        <div className="relative max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}>
            Zero risk. Zero contracts. Zero consulting fees.
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-white">
            Find out what you&apos;re<br />overpaying.<br />
            <span style={{ color: 'rgba(255,255,255,0.7)' }}>In 48 hours. Free.</span>
          </h2>
          <p className="text-xl mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Upload your merchant statement and we&apos;ll return a line-by-line audit with every hidden fee, the right pricing model, and competitive bids from 10+ processors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold rounded-2xl transition-all hover:-translate-y-1 group" style={{ background: '#0f1a0f', color: '#6fc200' }}>
              Get My Free Savings Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 rounded-2xl transition-all">
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
