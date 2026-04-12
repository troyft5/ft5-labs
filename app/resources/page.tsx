import Link from 'next/link'
import { ArrowRight, BookOpen, Calculator, Users, Mail, FileText, TrendingUp, Shield } from 'lucide-react'
import { Metadata } from 'next'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata: Metadata = {
  title: 'Resources | FinTech 5 — Payment Insights, Tools & Guides',
  description: 'Free tools, expert articles, and industry insights from FinTech 5. Access our rate calculator, blog, statement audit, and more — all at zero cost.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const resources = [
  {
    icon: <BookOpen className="w-7 h-7" />,
    label: 'Insights Blog',
    tag: 'Knowledge Base',
    href: '/blog',
    color: '#6fc200',
    desc: 'Expert breakdowns of interchange, pricing models, and how to read your merchant statement. Written by industry veterans — no jargon.',
    cta: 'Read Articles',
    stat: '8+ Articles',
  },
  {
    icon: <Calculator className="w-7 h-7" />,
    label: 'Fee Calculator',
    tag: 'Free Tool',
    href: '/calculator',
    color: '#3b82f6',
    desc: 'Enter your monthly volume and transaction mix to instantly see your estimated effective rate, markup breakdown, and potential savings.',
    cta: 'Open Calculator',
    stat: 'Instant Results',
  },
  {
    icon: <FileText className="w-7 h-7" />,
    label: 'Free Statement Audit',
    tag: 'Most Popular',
    href: '/get-your-savings-estimate',
    color: '#f59e0b',
    desc: 'Upload your merchant statement and get a full line-by-line analysis with competitive bids from 14 processors — returned same day or less. No cost.',
    cta: 'Get My Audit',
    stat: 'Same-Day Turnaround',
  },
  {
    icon: <Users className="w-7 h-7" />,
    label: 'About Us',
    tag: 'Our Story',
    href: '/about-us',
    color: '#8b5cf6',
    desc: '30+ years of combined payment infrastructure experience. We built the systems — now we use that knowledge to work exclusively for merchants.',
    cta: 'Meet the Team',
    stat: '30+ Yrs Experience',
  },
  {
    icon: <Mail className="w-7 h-7" />,
    label: 'Contact',
    tag: 'Talk to Us',
    href: '/contact-us',
    color: '#06b6d4',
    desc: 'A real payment specialist picks up. No ticket queues, no bots. We respond within one business day — often within hours.',
    cta: 'Get in Touch',
    stat: '< 1 Day Response',
  },
]

const guides = [
  { emoji: '📊', title: 'How to Read Your Merchant Statement', href: '/blog/how-to-read-your-merchant-statement', desc: 'Most merchants never read their statement. Here\'s the line-by-line guide.' },
  { emoji: '💳', title: 'Interchange-Plus vs Flat Rate vs Tiered', href: '/blog/interchange-plus-vs-flat-rate-vs-tiered', desc: 'The three major pricing models explained — with real math.' },
  { emoji: '📈', title: 'Top Payment Trends 2026', href: '/blog/top-4-payment-trends-2026', desc: 'What\'s changing in the processing landscape this year.' },
]

export default function ResourcesPage() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Dot-grid background */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        {/* Glow */}
        <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(50px)' }} />

        {/* Watermark */}
        <div className="absolute right-0 top-16 text-[18vw] font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(78,144,0,0.04)' }}>
          FT5
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6fc200' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Resources & Tools</span>
            </div>
          </Reveal>
          <ScrollDepth3D delay={80} intensity={0.8}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
              Everything you need<br />to understand your<br />
              <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                payments.
              </span>
            </h1>
          </ScrollDepth3D>
          <Reveal delay={200}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              Free tools, expert articles, and direct access to payment specialists. No cost, no obligation, no hidden agenda.
            </p>
          </Reveal>
          <Reveal delay={280}>
            <div className="flex flex-wrap gap-3">
              {[
                { label: '5 Free Resources', color: '#6fc200' },
                { label: 'No Login Required', color: '#6fc200' },
                { label: '24hr Audit Turnaround', color: '#6fc200' },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-2 text-[12px] font-bold" style={{ color: item.color }}>
                  <div className="w-1 h-1 rounded-full" style={{ background: item.color }} />
                  {item.label}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── RESOURCE CARDS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-14">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>All Resources</span>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {resources.map((r, i) => (
              <Reveal key={r.href} delay={i * 60}>
                <Link
                  href={r.href}
                  className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {/* Color accent bar */}
                  <div className="h-0.5 w-full" style={{ background: r.color }} />

                  <div className="flex flex-col flex-1 p-7">
                    {/* Header row */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${r.color}18`, border: `1px solid ${r.color}33`, color: r.color }}>
                        {r.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shrink-0" style={{ background: `${r.color}15`, color: r.color, border: `1px solid ${r.color}25` }}>
                        {r.tag}
                      </span>
                    </div>

                    <h2 className="text-lg font-black text-white group-hover:text-[#8cd627] transition-colors mb-3">{r.label}</h2>
                    <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">{r.desc}</p>

                    <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                      <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>{r.stat}</span>
                      <div className="flex items-center gap-2 text-sm font-bold group-hover:translate-x-0.5 transition-transform" style={{ color: r.color }}>
                        {r.cta} <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── START READING ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Start Reading</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">Popular guides.</h2>
              </div>
              <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors whitespace-nowrap">
                All Articles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-4">
            {guides.map((g, i) => (
              <Reveal key={g.href} delay={i * 70}>
                <Link
                  href={g.href}
                  className="group grid md:grid-cols-[auto_1fr_auto] gap-6 items-center rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <span className="text-3xl">{g.emoji}</span>
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-[#8cd627] transition-colors mb-1">{g.title}</h3>
                    <p className="text-sm text-slate-500">{g.desc}</p>
                  </div>
                  <ArrowRight className="hidden md:block w-5 h-5 text-slate-600 group-hover:text-[#6fc200] group-hover:translate-x-1 transition-all" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FREE ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Why It's Free</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight">
                  We earn our fee from<br />the processor you choose.
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Every tool, article, and analysis on this site is free because our business model requires it to be. We only get paid when we find you a better deal. That means we have every reason to give you accurate, useful information — and zero reason to hide anything.
                </p>
                <Link href="/about-us" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#6fc200' }}>
                  How we operate <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Shield className="w-5 h-5" />, stat: '$0', label: 'Consulting cost', note: 'to merchants, ever' },
                  { icon: <TrendingUp className="w-5 h-5" />, stat: '10–18%', label: 'Avg savings', note: 'year one' },
                  { icon: <FileText className="w-5 h-5" />, stat: '24hr', label: 'Audit turnaround', note: 'guaranteed' },
                  { icon: <Users className="w-5 h-5" />, stat: '14', label: 'Processors bid', note: 'for your business' },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl p-5 flex flex-col gap-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'rgba(78,144,0,0.1)', color: '#4e9000' }}>
                      {s.icon}
                    </div>
                    <div className="text-2xl font-black text-white">{s.stat}</div>
                    <div>
                      <div className="text-xs font-bold text-slate-300">{s.label}</div>
                      <div className="text-[10px] text-slate-600">{s.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-16 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Ready to see your numbers?</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">The audit is free.<br />The savings are permanent.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg mb-8 max-w-xl mx-auto">
            Upload your statement — or just your contact info — and we&apos;ll return a full savings analysis with competitive bids same day or less.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-10 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
              Get My Free Audit <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact-us" className="inline-flex items-center gap-2 px-8 py-4 font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
              Talk to a Specialist
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
