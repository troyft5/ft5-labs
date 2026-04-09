import { ArrowRight, ChevronRight, Shield, Phone, TrendingUp, Zap, Users, CheckCircle2, Star, Quote, FileText, GitMerge, DollarSign, BookOpen, Clock } from 'lucide-react'
import Link from 'next/link'
import HeroSection from '@/components/HeroSection'
import CostComparison from '@/components/CostComparison'
import BidSimulation from '@/components/BidSimulation'
import { getSortedPostsData } from '@/lib/blog'

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants — Stop Losing Profits',
  description: 'FinTech 5 negotiates across 10+ tier-1 processors to cut your processing costs 10–18%, eliminate hidden fees, and give you a dedicated expert who actually answers the phone.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const industries = [
  { name: 'Retail', href: '/industries/retail-payments',          savings: 'Avg. $9,400/yr' },
  { name: 'E-Commerce', href: '/industries/e-commerce',          savings: 'Avg. $12,200/yr' },
  { name: 'Healthcare', href: '/industries/healthcare',           savings: 'Avg. $8,100/yr' },
  { name: 'Service Businesses', href: '/industries/service',      savings: 'Avg. $6,300/yr' },
  { name: 'B2B Processing', href: '/industries/b2b',             savings: 'Avg. $14,800/yr' },
  { name: 'Higher Education', href: '/industries/higher-education',savings: 'Avg. $22,000/yr' },
  { name: 'Petroleum', href: '/industries/petroleum',            savings: 'Avg. $18,500/yr' },
  { name: 'High-Risk', href: '/industries/high-risk',            savings: 'Custom bid' },
  { name: 'CBD & Hemp', href: '/industries/cbd',                 savings: 'Custom bid' },
]

const testimonials = [
  { quote: "FinTech 5 identified $18,400 in fees we didn't know we were paying. The audit took 48 hours. The savings are permanent.", name: 'Regional Retail Chain', location: 'NJ', savings: '$18,400/yr' },
  { quote: "We had been on tiered pricing for 6 years. Nobody told us. One statement analysis and we were switched to IC+ within a week.", name: 'E-Commerce Founder', location: 'NY', savings: '$9,800/yr' },
  { quote: "My rep answers the phone every single time. That alone is worth more than the rate savings — though those are real too.", name: 'Healthcare Practice', location: 'NJ', savings: '$11,400/yr' },
]

const steps = [
  {
    n: '01', icon: <FileText className="w-6 h-6" />,
    title: 'Send Your Statement',
    body: 'Upload your current processing statement or provide a few numbers. We read it so you don\'t have to. No obligation, no cost.',
    badge: '48-hr turnaround',
  },
  {
    n: '02', icon: <GitMerge className="w-6 h-6" />,
    title: 'We Negotiate for You',
    body: 'We take your data to 10+ competing tier-1 processors and run a blind competitive bid. Interchange and assessments pass through at cost.',
    badge: '10+ processors bid',
  },
  {
    n: '03', icon: <DollarSign className="w-6 h-6" />,
    title: 'Savings Locked In',
    body: 'You choose the best offer. New rates are locked in — no annual hikes. We stay on as your dedicated account advocate.',
    badge: 'Avg. $8,400/yr saved',
  },
]

export default function Home() {
  const posts = getSortedPostsData().slice(0, 3)
  return (
    <div className="flex flex-col w-full">

      <HeroSection />

      {/* ─────────────────────────────────────────
          COST REALITY
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.4),transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_3fr] gap-16 items-start">

            {/* Left: headline */}
            <div className="lg:sticky lg:top-32">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>The Math</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-5">
                You might be overpaying by{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #9de84a, #6fc200)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>$12,180<br />this year.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-base">Processor pricing is designed to be confusing. The difference between a bad rate and a good one is often your entire annual IT budget.</p>
            </div>

            {/* Right: animated bars */}
            <CostComparison />

          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          HOW IT WORKS
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />

        {/* Background number watermark */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(78,144,0,0.03)' }}>FT5</div>

        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>The Process</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Three steps.<br />Permanent savings.</h2>
            <p className="text-slate-400 max-w-lg mx-auto">We handle everything. You just review the offer and say yes.</p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="absolute top-16 left-[calc(16%+2rem)] right-[calc(16%+2rem)] h-px hidden md:block" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),rgba(78,144,0,0.3),transparent)', backgroundSize: '8px 1px' }} />

            {steps.map((step, i) => (
              <div key={step.n} className="flex flex-col" style={{ animationDelay: `${i * 200}ms` }}>
                {/* Step number + icon */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white relative z-10" style={{ background: 'linear-gradient(135deg,#2d5500,#4e9000)', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 text-[10px] font-black text-white px-1.5 py-0.5 rounded-md" style={{ background: '#0a1208', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>{step.n}</div>
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-5">{step.body}</p>

                <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full self-start" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                  <CheckCircle2 className="w-3 h-3" />
                  {step.badge}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          BID SIMULATION — what step 02 looks like
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_3fr] gap-16 items-start">
            <div className="lg:sticky lg:top-36">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Step 02 In Action</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight mb-5">
                This is what competing{' '}
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>looks like.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm mb-6">We submit your statement to every major tier-1 processor simultaneously. They compete. You win. No negotiation required on your end.</p>
              <div className="flex flex-col gap-2">
                {['Blind bidding — processors don\'t see competitor rates', '100% pass-through on interchange & assessments', 'We\'re compensated by the selected processor — not you'].map(item => (
                  <div key={item} className="flex items-start gap-2.5 text-sm text-slate-500">
                    <span className="text-[#4e9000] mt-0.5 shrink-0">✓</span> {item}
                  </div>
                ))}
              </div>
            </div>
            <BidSimulation />
          </div>
        </div>
      </section>

      <section className="px-6 py-28 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Why FT5</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Not a processor.<br />Your advocate.
              </h2>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm md:text-base">We sit exclusively on your side of the table — with no ownership stake in any processor.</p>
          </div>

          {/* Big two feature cards */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {[
              {
                icon: <Shield className="w-7 h-7" />,
                title: 'Processor-Agnostic',
                body: "We're not owned by Square, Stripe, Heartland, or any processor. We compare 10+ tier-1 options and recommend only what maximizes your margin — full stop.",
                stat: '10+',
                statLabel: 'Processors Compared',
              },
              {
                icon: <Phone className="w-7 h-7" />,
                title: 'A Real Human Picks Up',
                body: "Every FinTech 5 client gets a named, dedicated account representative. Not a ticket system. Not a chatbot. A person who knows your account and answers the phone.",
                stat: '< 2min',
                statLabel: 'Avg Response Time',
              },
            ].map(d => (
              <div key={d.title} className="rounded-3xl p-8 flex flex-col gap-6 group transition-all duration-300 hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-start justify-between">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                    {d.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black" style={{ color: '#6fc200' }}>{d.stat}</div>
                    <div className="text-[10px] text-slate-600 uppercase tracking-wider">{d.statLabel}</div>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-black text-white mb-3">{d.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{d.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Four small stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <TrendingUp className="w-5 h-5" />, stat: '10–18%', label: 'Savings in Year One' },
              { icon: <Zap className="w-5 h-5" />, stat: '$0', label: 'Consulting Fees — Ever' },
              { icon: <Users className="w-5 h-5" />, stat: '30+', label: 'Years Combined Experience' },
              { icon: <CheckCircle2 className="w-5 h-5" />, stat: 'PCI + HIPAA', label: 'Compliance Built In' },
            ].map(d => (
              <div key={d.label} className="rounded-2xl p-6 flex flex-col gap-3 hover:-translate-y-0.5 transition-all duration-200" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(78,144,0,0.1)', color: '#4e9000' }}>
                  {d.icon}
                </div>
                <div className="font-black text-xl text-white">{d.stat}</div>
                <div className="text-xs text-slate-500 leading-tight">{d.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          TESTIMONIALS — feature quote + cards
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center gap-1 mb-5">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4" style={{ fill: '#4e9000', color: '#4e9000' }} />)}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Real Businesses.<br />Real Savings.</h2>
          </div>

          {/* Feature quote */}
          <div className="relative rounded-3xl p-10 md:p-14 text-center mb-8" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
            <div className="absolute top-8 left-8 opacity-20">
              <Quote className="w-12 h-12" style={{ color: '#4e9000' }} />
            </div>
            <blockquote className="text-xl md:text-2xl font-bold text-white leading-relaxed max-w-3xl mx-auto mb-8">
              &ldquo;{testimonials[0].quote}&rdquo;
            </blockquote>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-px" style={{ background: '#4e9000' }} />
              <div className="font-bold text-white">{testimonials[0].name}</div>
              <div className="text-sm text-slate-500">{testimonials[0].location}</div>
              <div className="mt-2 px-4 py-1.5 rounded-full text-sm font-black" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.3)' }}>
                💰 {testimonials[0].savings} saved
              </div>
            </div>
          </div>

          {/* Supporting cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.slice(1).map((t, i) => (
              <div key={i} className="rounded-2xl p-8 flex flex-col" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <Quote className="w-6 h-6 mb-4 shrink-0" style={{ color: 'rgba(78,144,0,0.4)' }} />
                <blockquote className="text-slate-300 leading-relaxed flex-1 mb-6 font-medium">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                  <div>
                    <div className="font-bold text-white text-sm">{t.name}</div>
                    <div className="text-xs text-slate-500">{t.location}</div>
                  </div>
                  <div className="font-black text-lg" style={{ color: '#6fc200' }}>{t.savings}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          INDUSTRIES
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative" style={{ background: BG2 }} id="industries">
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industries</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Expertise across<br />every vertical.</h2>
            <p className="text-slate-400 max-w-xl mx-auto">From retail to high-risk, we&apos;ve built specialized payment stacks for businesses just like yours.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {industries.map((ind) => (
              <Link
                key={ind.href}
                href={ind.href}
                className="group flex items-center justify-between px-6 py-5 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div>
                  <div className="font-bold text-slate-200 group-hover:text-white transition-colors text-sm">{ind.name}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: '#4e9000' }}>{ind.savings}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-[#6fc200] group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          BLOG PREVIEW
      ───────────────────────────────────────── */}
      <section className="px-6 py-28 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Knowledge Base</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">The FT5 Playbook</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">
              All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Category header */}
                <div className="px-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(78,144,0,0.06)' }}>
                  <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4e9000' }}>{post.category}</span>
                </div>
                <div className="flex flex-col flex-1 px-6 py-5">
                  <h3 className="text-base font-black text-white leading-snug mb-3 group-hover:text-[#8cd627] transition-colors line-clamp-2">{post.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed flex-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                    <Clock className="w-3.5 h-3.5 text-slate-700" />
                    <span className="text-xs text-slate-600">{post.readTime}</span>
                    <span className="ml-auto text-xs font-bold" style={{ color: '#4e9000' }}>Read →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FINAL CTA
      ───────────────────────────────────────── */}
      <section className="px-6 py-32 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(111,194,0,0.3)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(0,80,0,0.4)' }} />

        <div className="relative max-w-3xl mx-auto text-center text-white">
          <div className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.15)' }}>
            Zero risk · Zero contracts · Zero consulting fees
          </div>
          <h2 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[0.95]">
            Find out what<br />you&apos;re overpaying.<br />
            <span style={{ color: 'rgba(255,255,255,0.55)' }}>In 48 hours. Free.</span>
          </h2>
          <p className="text-xl mb-12 max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Upload your merchant statement and we&apos;ll return a line-by-line audit with every hidden fee identified and competitive bids from 10+ processors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/get-your-savings-estimate"
              className="inline-flex items-center justify-center gap-2.5 px-10 py-5 text-base font-black rounded-2xl transition-all hover:-translate-y-1 group"
              style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}
            >
              Get My Free Savings Estimate <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 text-base font-bold text-white border border-white/25 hover:border-white/50 hover:bg-white/10 rounded-2xl transition-all"
            >
              Talk to a Specialist
            </Link>
          </div>
          <p className="text-sm mt-8" style={{ color: 'rgba(255,255,255,0.45)' }}>No spam. No obligation. No high-pressure sales calls.</p>
        </div>
      </section>

    </div>
  )
}
