import { solutionsData } from '@/lib/data'
import { notFound } from 'next/navigation'
import { CheckCircle2, ArrowRight, ChevronRight, Zap } from 'lucide-react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export async function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return {}
  return {
    title: `${solution.title} | FinTech 5`,
    description: solution.subtitle,
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = solutionsData[slug as keyof typeof solutionsData]
  if (!solution) return notFound()

  const howItWorks = 'howItWorks' in solution ? (solution as typeof solution & { howItWorks: string[] }).howItWorks : []
  const challenge   = 'challenge' in solution ? (solution as typeof solution & { challenge: string }).challenge : ''
  const cta         = 'cta' in solution ? (solution as typeof solution & { cta: string }).cta : 'Get Your Free Estimate'

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        {/* Circuit-board dot pattern */}
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.12) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />
        {/* Cascading watermark — solutions on the right */}
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none leading-none" aria-hidden="true">
          {solution.title.split(' ').map((word, i) => (
            <div
              key={i}
              className="text-[12vw] font-black uppercase leading-none"
              style={{
                color: `rgba(78,144,0,${0.06 - i * 0.01})`,
                transform: `translateX(${i * 10}px)`,
              }}
            >
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6fc200' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Payment Solution</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
              {solution.title}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-10">{solution.subtitle}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                {cta} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Try the Calculator <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CHALLENGE ── */}
      {challenge && (
        <section className="px-6 py-16 relative" style={{ background: BG }}>
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
          <Reveal>
            <div className="max-w-5xl mx-auto">
              <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start" style={{ background: 'rgba(251,191,36,0.05)', border: '1px solid rgba(251,191,36,0.15)' }}>
                <div className="text-5xl select-none">⚡</div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#f59e0b' }}>The Problem We Solve</div>
                  <p className="text-slate-300 text-lg leading-relaxed">{challenge}</p>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      )}

      {/* ── SOLUTION + HOW IT WORKS (connected flow) ── */}
      <section className="px-6 py-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>How We Do It</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight max-w-2xl">Built for how your business actually operates.</h2>
            <p className="text-slate-400 leading-relaxed text-lg mb-16 max-w-2xl">{solution.content}</p>
          </Reveal>

          {/* Features as two-col table */}
          <div className="grid md:grid-cols-2 gap-0 mb-16" style={{ border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px', overflow: 'hidden' }}>
            {solution.features.map((feature, i) => (
              <Reveal key={i} delay={i * 40}>
                <div className="flex items-center gap-4 px-6 py-4" style={{
                  borderBottom: i < solution.features.length - 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent'
                }}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4e9000' }} />
                  <span className="text-sm text-slate-300 font-medium">{feature}</span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Connected step flow */}
          {howItWorks.length > 0 && (
            <Reveal delay={100}>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-8" style={{ color: '#6fc200' }}>How It Works</div>
              <div className="flex flex-col md:flex-row gap-0 md:gap-0">
                {howItWorks.map((step, i) => (
                  <div key={i} className="flex md:flex-col flex-1 gap-4 md:gap-0">
                    <div className="flex md:flex-col items-center gap-4 md:gap-0">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-black text-white shrink-0" style={{ background: '#4e9000' }}>{i + 1}</div>
                      {i < howItWorks.length - 1 && (
                        <div className="flex-1 md:hidden h-px" style={{ background: 'rgba(78,144,0,0.3)' }} />
                      )}
                    </div>
                    <div className="pb-8 md:pt-5 md:pr-8">
                      <p className="text-sm text-slate-400 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* ── EXPECTED RESULTS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>What to Expect</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { val: '10–18%', label: 'Average savings in year one', detail: 'Consistently across all merchant categories' },
              { val: '24 hrs', label: 'Audit turnaround', detail: 'From statement submission to full analysis' },
              { val: '10+', label: 'Processors in our network', detail: 'Tier-1 banks and payment networks' },
              { val: '$0', label: 'Cost to you', detail: 'Funded entirely by the selected processor' },
            ].map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="rounded-2xl p-6 h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(78,144,0,0.15)' }}>
                  <div className="text-3xl font-black mb-2" style={{ color: '#6fc200' }}>{stat.val}</div>
                  <div className="text-sm font-bold text-white mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-600 leading-relaxed">{stat.detail}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <Reveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Ideal For</span>
              </div>
              <h2 className="text-3xl font-black text-white mb-4 leading-tight">Who gets the most from this solution.</h2>
              <p className="text-slate-400 text-sm leading-relaxed">Every business is different. Here&apos;s the profile of merchants who see the strongest results from this particular solution — though we customize for every situation.</p>
            </div>
          </Reveal>
          <Reveal direction="right" delay={100}>
            <div className="flex flex-wrap gap-3">
              {[
                'Monthly volume $30k+', '$500k+ enterprise',
                'Multi-location operators', 'E-commerce businesses',
                'High average ticket ($75+)', 'Recurring billing',
                'B2B / card-not-present heavy', 'Switching from flat-rate',
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
              { q: 'Are there setup fees or minimums?', a: 'No setup fees and no volume minimums. We work with merchants at every scale, and our consulting is always free to you — funded by the selected processor.' },
              { q: 'What if my current setup is already competitive?', a: 'We\'ll tell you. If your current processor is giving you a fair deal, we say so — and we never push a switch without clear evidence of meaningful savings.' },
              { q: 'What happens if rates increase after switching?', a: 'Rate creep is common. As your ongoing account advocate, we monitor your statements monthly and address any unauthorized markups with the processor directly.' },
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

      {/* ── MORE SOLUTIONS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8" style={{ background: '#4e9000' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>More Solutions</span>
                </div>
                <h2 className="text-3xl font-black text-white">Other ways FT5 can help.</h2>
              </div>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {Object.entries(solutionsData)
              .filter(([s]) => s !== slug)
              .slice(0, 3)
              .map(([s, sol], i) => (
                <Reveal key={s} delay={i * 70}>
                  <Link href={`/solutions/${s}`} className="group flex flex-col rounded-2xl p-6 h-full transition-all hover:-translate-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <h3 className="font-black text-white group-hover:text-[#8cd627] transition-colors mb-2">{sol.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed flex-1 mb-4">{sol.subtitle}</p>
                    <div className="text-xs font-bold" style={{ color: '#4e9000' }}>Explore →</div>
                  </Link>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="px-6 py-28 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(0,80,0,0.4)' }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ready to get started?<br />
              <span style={{ color: 'rgba(255,255,255,0.6)' }}>Free. No obligation.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Our consulting is 100% free — funded by our processor partners, not by you. Get a data-driven analysis in 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-black rounded-xl hover:-translate-y-1 transition-all" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                {cta} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="inline-flex items-center justify-center gap-2 px-9 py-4 text-base font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                Talk to a Specialist
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
