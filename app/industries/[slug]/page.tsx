import { industriesData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, ChevronRight, AlertTriangle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export async function generateStaticParams() {
  return Object.keys(industriesData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return {}
  return {
    title: `${industry.title} | FinTech 5`,
    description: industry.subtitle,
  }
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const industry = industriesData[slug as keyof typeof industriesData]
  if (!industry) return notFound()

  const stats = 'stats' in industry ? (industry as typeof industry & { stats: {value:string;label:string}[] }).stats : []
  const challenge = 'challenge' in industry ? (industry as typeof industry & { challenge: string }).challenge : ''
  const cta = 'cta' in industry ? (industry as typeof industry & { cta: string }).cta : 'Get Your Free Analysis'

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-0 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Giant watermark — all title words cascading down */}
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none leading-none" aria-hidden="true">
          {industry.title.split(' ').map((word, i) => (
            <div
              key={i}
              className="text-[14vw] font-black uppercase leading-none"
              style={{
                color: `rgba(78,144,0,${0.045 - i * 0.008})`,
                transform: `translateX(${i * 12}px)`,
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Industry Solutions</span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-8 max-w-3xl">
              {industry.title}
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl mb-10">{industry.subtitle}</p>
          </Reveal>

          {/* Stats as inline big numbers */}
          {stats.length > 0 && (
            <Reveal delay={180}>
              <div className="flex flex-wrap gap-x-12 gap-y-4 mb-12 pl-1">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-4xl md:text-5xl font-black leading-none" style={{ color: '#6fc200' }}>{s.value}</div>
                    <div className="text-[11px] text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal delay={240}>
            <div className="flex flex-wrap gap-4 pb-16">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                {cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Fee Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
      </section>

      {/* ── CHALLENGE ── — full-bleed pull-quote style */}
      {challenge && (
        <section className="relative overflow-hidden" style={{ background: BG }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.15),transparent)' }} />
          <div className="flex">
            {/* Thick amber left bar */}
            <div className="w-1.5 shrink-0" style={{ background: 'linear-gradient(180deg,#f59e0b,#d97706)' }} />
            <div className="flex-1 px-8 md:px-16 py-20">
              <Reveal>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#f59e0b' }}>The Challenge</div>
                <p className="text-2xl md:text-3xl text-slate-200 leading-snug font-semibold max-w-4xl" style={{ fontStyle: 'italic' }}>
                  &ldquo;{challenge}&rdquo;
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* ── SOLUTION + FEATURES ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">

            {/* Body copy */}
            <Reveal direction="left">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Approach</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                  How FinTech 5 solves it.
                </h2>
                <p className="text-slate-400 leading-relaxed text-lg">{industry.content}</p>

                <div className="mt-8 p-6 rounded-2xl" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.2)' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5" style={{ color: '#6fc200' }} />
                    <span className="text-sm font-black text-white">Zero cost to you</span>
                  </div>
                  <p className="text-sm text-slate-400">Our consulting is funded by our processor partners. You pay nothing for our analysis, negotiation, or ongoing support.</p>
                </div>
              </div>
            </Reveal>

            {/* Features — numbered ribbons */}
            <Reveal direction="right" delay={100}>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: '#6fc200' }}>What&apos;s Included</div>
                <div className="flex flex-col gap-0">
                  {industry.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-5 py-4" style={{ borderBottom: i < industry.features.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                      <span className="text-[11px] font-black w-7 shrink-0 text-right" style={{ color: 'rgba(78,144,0,0.5)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm text-slate-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THE FT5 PROCESS ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>How It Works</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3">Three steps to better rates.</h2>
              <p className="text-slate-400 max-w-lg mx-auto text-sm">From statement to savings — with zero disruption and zero cost to you.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: '01', title: 'Share your statement', body: 'Upload your most recent processing statement. We analyze every line item — interchange, processor markups, monthly minimums, and every fee in between.' },
              { n: '02', title: 'We run a competitive bid', body: 'Your profile goes to 14 tier-1 processors simultaneously in a blind bid. They compete. You don\'t negotiate — we do.' },
              { n: '03', title: 'Choose and lock in savings', body: 'We present the winning offer with full transparency on every rate component. You decide. New rates are live within 5–10 business days.' },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 100}>
                <div className="rounded-2xl p-8 h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-5xl font-black mb-6 leading-none" style={{ color: 'rgba(78,144,0,0.22)' }}>{step.n}</div>
                  <h3 className="text-lg font-black text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO BENEFITS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Who This Is For</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">Built for any business that takes payments seriously.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Whether you\'re a single-location operator or a multi-site enterprise, the same hidden fees are draining your margin. We fix that — at any scale, with zero upfront cost.</p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="flex flex-wrap gap-3">
              {[
                'Processing $10k–$50k/month', 'Processing $50k–$500k/month',
                'Multi-location operators', 'High card-not-present volume',
                'Currently on flat-rate pricing', 'No long-term contracts wanted',
                'Need dedicated account support', 'Recently acquired a business',
              ].map(tag => (
                <div key={tag} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.2)', color: '#8cd627' }}>
                  {tag}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMMON QUESTIONS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Common Questions</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q: 'Do we need to change our hardware or software?', a: 'Usually not. Our processor partners support all major POS systems and payment gateways. We find the best option that works with your existing infrastructure.' },
              { q: 'How quickly can we expect to see savings?', a: 'The audit is same day or less. If you choose to switch, new rates are typically live within 5–10 business days — some programs are same-week.' },
              { q: 'What does FinTech 5 charge for this?', a: 'Nothing. Our consulting is funded entirely by the processor you select. You pay zero for the analysis, negotiation, and ongoing account support. No hidden charges.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="rounded-2xl p-6 h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="text-sm font-black text-white mb-3 leading-snug">{item.q}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED INDUSTRIES ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Also Explore</span>
                </div>
                <h2 className="text-3xl font-black text-white">Adjacent verticals we serve.</h2>
              </div>
              <Link href="/get-your-savings-estimate" className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white transition-colors">
                Get Estimate <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {Object.entries(industriesData)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, ind], i) => (
                <Reveal key={s} delay={i * 70}>
                  <Link href={`/industries/${s}`} className="group flex flex-col rounded-2xl p-6 h-full transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 className="font-black text-white group-hover:text-[#8cd627] transition-colors mb-2">{ind.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">{ind.subtitle}</p>
                    <div className="text-xs font-bold" style={{ color: '#4e9000' }}>Learn More →</div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(111,194,0,0.3)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              See what you could save.<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Free analysis same day or less.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Upload your merchant statement and get a line-by-line audit with competitive bids from 14 processors. No consulting fees — ever.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-9 py-4.5 text-base font-black rounded-xl hover:-translate-y-1 transition-all" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                {cta} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-9 py-4.5 text-base font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                Talk to a Specialist
              </Link>
            </div>
            <p className="text-sm mt-6" style={{ color: 'rgba(255,255,255,0.5)' }}>Free. No obligation. No high-pressure sales calls.</p>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
