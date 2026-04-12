import Link from 'next/link'
import { solutionsData } from '@/lib/data'
import { ArrowRight, Monitor, Smartphone, Globe, BarChart3, Gift } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata = {
  title: 'Payment Solutions | In-Person, Mobile, Online & More',
  description: 'FinTech 5 delivers end-to-end payment solutions — in-person terminals, mobile payments, online checkout, transparent pricing, and free hardware placement. Zero cost to you.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

type SolutionMeta = { Icon: React.ElementType; accentColor: string; tag: string }
const meta: Record<string, SolutionMeta> = {
  'in-person-payments': { Icon: Monitor,    accentColor: '#6fc200', tag: 'Hardware' },
  'mobile-payments':    { Icon: Smartphone, accentColor: '#3b82f6', tag: 'On-the-Go' },
  'online-payments':    { Icon: Globe,      accentColor: '#8b5cf6', tag: 'E-Commerce' },
  'pricing-models':     { Icon: BarChart3,  accentColor: '#f59e0b', tag: 'Pricing' },
  'free-placement':     { Icon: Gift,       accentColor: '#22c55e', tag: 'Free Hardware' },
}

export default function SolutionsPage() {
  const entries = Object.entries(solutionsData).filter(([slug]) => slug in meta)

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['PAYMENT', 'SOLUTIONS'].map((word, i) => (
            <div key={i} className="text-[13vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.055 - i * 0.02})`, transform: `translateX(${i * 20}px)` }}>
              {word}
            </div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#6fc200' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Payment Solutions</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <ScrollDepth3D delay={80} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
                How you take<br />payments is how<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  you grow.
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              From free hardware placement to transparent interchange-plus pricing — each solution is designed to reduce your cost, not just move it around.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-4">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                Get Your Free Estimate <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/calculator" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
                Fee Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SOLUTIONS LIST ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-14">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>
                {entries.length} Solutions
              </span>
            </div>
          </Reveal>

          <div className="flex flex-col gap-5">
            {entries.map(([slug, solution], i) => {
              const m = meta[slug]
              const { Icon } = m
              return (
                <Reveal key={slug} delay={i * 60}>
                  <Link
                    href={`/solutions/${slug}`}
                    className="group grid md:grid-cols-[auto_1fr_auto] gap-8 items-center rounded-2xl p-8 transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                  >
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ background: `${m.accentColor}18`, border: `1px solid ${m.accentColor}33` }}>
                      <Icon className="w-8 h-8" style={{ color: m.accentColor }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-xl font-black text-white group-hover:text-[#8cd627] transition-colors">{solution.title}</h2>
                        <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full shrink-0" style={{ background: `${m.accentColor}18`, color: m.accentColor }}>
                          {m.tag}
                        </span>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-4 max-w-2xl">{solution.subtitle}</p>
                      <div className="flex flex-wrap gap-2">
                        {solution.features.slice(0, 4).map((f: string) => (
                          <span key={f} className="text-xs px-3 py-1 rounded-full text-slate-500" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            {f}
                          </span>
                        ))}
                        {solution.features.length > 4 && (
                          <span className="text-xs px-3 py-1 rounded-full text-slate-600" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            +{solution.features.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all group-hover:translate-x-1" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-[#6fc200] transition-colors" />
                    </div>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW WE PICK YOUR SOLUTION ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-14 leading-tight max-w-2xl">
              We don&apos;t push you toward a product. We find what actually fits.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: '01', title: 'Audit your current setup', body: "We review your existing processor, pricing model, hardware, and effective rate. Most merchants don't know what they're actually paying." },
              { n: '02', title: 'Map your business needs', body: 'Do you need mobile capability? Are you primarily card-present or CNP? Do you want free hardware? We build a requirements picture before recommending anything.' },
              { n: '03', title: 'Present the right stack', body: 'We recommend the combination of solution(s) that lowers your total cost, fits your workflow, and gives you room to grow — with the processor bids to back it up.' },
            ].map((step, i) => (
              <Reveal key={step.n} delay={i * 80}>
                <div className="p-7 rounded-2xl h-full" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="text-4xl font-black mb-5" style={{ color: 'rgba(78,144,0,0.25)' }}>{step.n}</div>
                  <h3 className="font-black text-white mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE ALL ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Quick Compare</span>
            </div>
          </Reveal>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-[1fr_auto_auto_auto] px-6 py-3" style={{ background: 'rgba(78,144,0,0.08)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Solution</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center px-4">Hardware</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center px-4">Online</span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center px-4">Mobile</span>
            </div>
            {[
              { slug: 'in-person-payments',  label: 'In-Person Payments',    hw: true,  ol: false, mob: false },
              { slug: 'mobile-payments',     label: 'Mobile Payments',       hw: true,  ol: false, mob: true  },
              { slug: 'online-payments',     label: 'Online Payments',       hw: false, ol: true,  mob: false },
              { slug: 'pricing-models',      label: 'Transparent Pricing',   hw: true,  ol: true,  mob: true  },
              { slug: 'free-placement',      label: 'Free Terminal Placement',hw: true, ol: false, mob: false },
            ].map((row, i) => (
              <Reveal key={row.slug} delay={i * 40}>
                <Link href={`/solutions/${row.slug}`} className="group grid grid-cols-[1fr_auto_auto_auto] px-6 py-4 items-center transition-colors hover:bg-white/[0.02]" style={{ borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-[#8cd627] transition-colors">{row.label}</span>
                  <span className="text-center px-4 text-base">{row.hw ? '✅' : '—'}</span>
                  <span className="text-center px-4 text-base">{row.ol ? '✅' : '—'}</span>
                  <span className="text-center px-4 text-base">{row.mob ? '✅' : '—'}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-16 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>Not sure which solution fits?</div>
          <h2 className="text-4xl font-black text-white mb-4 leading-tight">We&apos;ll figure it out together — in one call.</h2>
          <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg mb-8 max-w-xl mx-auto">
            Submit your statement or just your contact info. We&apos;ll map out the right solution stack and return your savings analysis within 24 hours or less.
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
