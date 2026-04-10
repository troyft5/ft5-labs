import Link from 'next/link'
import { ArrowRight, Users, Shield, TrendingUp, Phone, Zap, CheckCircle2 } from 'lucide-react'
import Reveal from '@/components/Reveal'
import ScrollDepth3D from '@/components/ScrollDepth3D'

export const metadata = {
  title: 'About Us | FinTech 5 — Payment Processing Consultants',
  description: 'Founded by a family of financial technology veterans with 30+ years of combined experience. We built payment infrastructure for universities and enterprises — then decided to put that expertise to work for you.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const values = [
  {
    n: '01', icon: <Phone className="w-5 h-5" />,
    title: 'We Answer the Phone',
    body: 'Every FinTech 5 client gets a named account representative. Not a ticket system or a chatbot — a real person who knows your account and picks up when you call.',
  },
  {
    n: '02', icon: <Shield className="w-5 h-5" />,
    title: 'We Represent You, Not the Processor',
    body: "We're not owned by any processing company. We have no quota to fill for any particular partner. Our only obligation is to the merchant sitting across from us.",
  },
  {
    n: '03', icon: <Zap className="w-5 h-5" />,
    title: 'Our Revenue Comes from Processors',
    body: "When you select a processor through FT5, that processor compensates us — not you. Our consulting is free to merchants, full stop. No retainers, no consulting fees, no hidden charges.",
  },
  {
    n: '04', icon: <TrendingUp className="w-5 h-5" />,
    title: 'We Stay With You After the Switch',
    body: "The relationship doesn't end at signing. We review your statements, catch rate creep, escalate billing disputes, and re-bid your account if a better option emerges.",
  },
]

const timeline = [
  { era: '30+ Years Ago', title: 'Built from the inside out', body: 'We spent decades building and managing payment infrastructure for universities, healthcare systems, and mid-market enterprises — seeing exactly how the money moved and where it was wasted.' },
  { era: 'The Aggregator Era', title: 'Watched merchants get left behind', body: "When flat-rate aggregators promised simplicity, we watched the fine print. Convenience disguised cost. Each transaction, each batch, each 'service fee' added up. The merchants who needed help most got it least." },
  { era: '2021 — FinTech 5 Founded', title: 'We decided to fix it', body: "Taking the institutional knowledge we'd built over decades and deploying it exclusively for merchants — we launched FinTech 5 with one rule: zero consulting fees, ever." },
  { era: 'Today', title: 'Serving merchants across NY, NJ and beyond', body: 'Our network of 10+ tier-1 processor partners now competes for every client we represent. The expertise that once only Fortune 500 companies could access is now available to any serious business.' },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-28 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        {/* Background watermark */}
        <div className="absolute right-0 bottom-0 text-[18rem] font-black leading-none select-none pointer-events-none" style={{ color: 'rgba(78,144,0,0.04)' }}>F5</div>

        {/* Blob glow */}
        <div className="absolute top-0 left-0 w-[600px] h-[500px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.12) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Founded 2021 · New York &amp; New Jersey</span>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <ScrollDepth3D delay={100} intensity={0.8}>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[0.95] mb-8">
                The expertise of<br />an institution.<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  The dedication<br />of a family.
                </span>
              </h1>
            </ScrollDepth3D>
          </Reveal>

          <Reveal delay={200}>
            <p className="text-xl text-slate-400 max-w-2xl leading-relaxed mb-12">
              We spent decades building payment infrastructure for universities and managing high-stakes merchant accounts for enterprises. We saw exactly where the money went — and where it didn&apos;t have to. Then we decided to put that knowledge to work for you.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-wrap gap-8">
              {[['30+', 'Years combined experience'], ['10+', 'Tier-1 processor partners'], ['$0', 'Consulting cost to you']].map(([val, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-white">{val}</div>
                  <div className="text-sm text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── THE PROBLEM STRIP ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          <Reveal direction="left">
            <div>
              <div className="text-7xl md:text-8xl font-black leading-none mb-4" style={{ background: 'linear-gradient(135deg,#ef4444,#f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                $18B+
              </div>
              <div className="text-base text-slate-400 max-w-xs leading-relaxed">
                In unnecessary payment processing fees are paid by US merchants every year — most of them without ever knowing.
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <div className="flex flex-col gap-5 text-slate-400 leading-relaxed">
              <p className="text-lg">The payment processing industry is intentionally complex. Tiered pricing, junk fees, regulatory markups, PCI surcharges — the model is designed to obscure the true cost of accepting a card.</p>
              <p>Large enterprises employ internal compliance teams and payment operations staff to fight this. Small and mid-size businesses don&apos;t. That&apos;s the gap we exist to close.</p>
              <p className="text-white font-bold text-lg">FinTech 5 brings enterprise-grade payment expertise to every business we work with — at zero cost to the merchant.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ORIGIN TIMELINE ── */}
      <section className="px-6 py-24 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-16">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our History</span>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-0 top-3 bottom-3 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom, rgba(78,144,0,0.5), transparent)' }} />

            <div className="flex flex-col gap-14">
              {timeline.map((item, i) => (
                <Reveal key={item.era} delay={i * 100}>
                  <div className="md:pl-10 relative">
                    <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full hidden md:block" style={{ background: '#4e9000', boxShadow: '0 0 12px rgba(78,144,0,0.6)' }} />
                    <div className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#4e9000' }}>{item.era}</div>
                    <h3 className="text-xl font-black text-white mb-3">{item.title}</h3>
                    <p className="text-slate-400 leading-relaxed">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE OPERATE ── */}
      <section className="px-6 py-24 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Commitments</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">Four rules we never break.</h2>
              <p className="text-slate-400 max-w-lg mx-auto">The entire FinTech 5 model is built around these principles. They aren&apos;t values on a poster — they&apos;re the terms under which we operate.</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <Reveal key={v.n} delay={i * 80}>
                <div className="rounded-2xl p-8 h-full flex flex-col gap-5 hover:-translate-y-1 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)', color: '#6fc200' }}>
                      {v.icon}
                    </div>
                    <span className="text-3xl font-black" style={{ color: 'rgba(78,144,0,0.25)' }}>{v.n}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white mb-2">{v.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{v.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES WE SERVE ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-10">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Our Verticals</span>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-10 leading-tight">
              Every industry. One playbook.<br />
              <span style={{ color: '#6fc200' }}>Your rules.</span>
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { name: 'Retail', href: '/industries/retail-payments', emoji: '🛍️' },
              { name: 'E-Commerce', href: '/industries/e-commerce', emoji: '💳' },
              { name: 'Service Business', href: '/industries/service', emoji: '✅' },
              { name: 'Healthcare', href: '/industries/healthcare', emoji: '🏥' },
              { name: 'Restaurants', href: '/industries/restaurant', emoji: '🍴' },
              { name: 'Higher Education', href: '/industries/higher-education', emoji: '🎓' },
              { name: 'Nonprofits', href: '/industries/nonprofit', emoji: '🤝' },
              { name: 'Specialty Retail', href: '/industries/specialty-retail', emoji: '🛒' },
            ].map((ind, i) => (
              <Reveal key={ind.name} delay={i * 50}>
                <Link href={ind.href} className="group flex items-center gap-3 rounded-xl p-4 transition-all hover:-translate-y-0.5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-xl">{ind.emoji}</span>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white transition-colors">{ind.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-6">
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 text-sm font-bold" style={{ color: '#6fc200' }}>
                View all industries we serve <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── BEFORE YOU REACH OUT (FAQ) ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Common Questions</span>
                <div className="h-px w-8" style={{ background: '#4e9000' }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white">What merchants ask before working with us.</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: 'How do you make money if you don\'t charge merchants?', a: 'The processor we place you with compensates us from their existing margin. Our incentive aligns with yours: we only receive compensation if we find you a deal that genuinely benefits you.' },
              { q: 'What size businesses do you work with?', a: 'We work with merchants processing from $10,000 to several million per month. Our sweet spot is $30k–$500k, but there is no ceiling and no minimum to get started.' },
              { q: 'What is your processor network?', a: 'We have established relationships with 10+ tier-1 processors including some of the largest acquiring banks and payment networks in the United States. We never steer you toward any single partner.' },
              { q: 'What happens after the switch?', a: 'You get a dedicated account rep. We monitor your statements monthly, flag any rate creep, handle disputes, and renegotiate on your behalf when better options emerge. The relationship doesn\'t end at the signature.' },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 70}>
                <div className="rounded-2xl p-7" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="font-black text-white mb-3 leading-snug">{item.q}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ── */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="rounded-2xl p-8 md:p-12" style={{ background: 'rgba(78,144,0,0.07)', border: '1px solid rgba(78,144,0,0.2)' }}>
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white mb-4">Working with FT5 is<br />risk-free by design.</h2>
                  <div className="flex flex-col gap-3">
                    {[
                      'No contracts required — month-to-month always',
                      'No consulting fees charged to merchants, ever',
                      'No pressure to switch if your current rate is competitive',
                      'No ownership stake in any processor partner',
                      'Full transparency on every fee, every month',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-3 text-sm text-slate-300">
                        <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: '#4e9000' }} />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <Link href="/get-your-savings-estimate" className="flex items-center justify-center gap-2 px-8 py-4 font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
                    Get a Free Savings Estimate <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-slate-300 border border-white/10 hover:border-white/25 rounded-xl transition-all">
                    Talk to a Specialist
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
