'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'

function Counter({ target, prefix = '', suffix = '', decimals = 0 }: { target: number; prefix?: string; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 60
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(parseFloat(current.toFixed(decimals)))
        }, 2000 / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, decimals])
  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>
}

const processors = ['Worldpay', 'First Data', 'TSYS', 'Heartland', 'Paysafe', 'Priority', 'NMI', 'Shift4', 'Clearent', 'Payroc', 'Elavon', 'Global Payments', 'Fiserv', 'Nuvei']

export default function HeroSection() {
  return (
    <>
      {/* ─────────────────────────────────────────
          HERO  —  Dark, bold, authoritative
      ───────────────────────────────────────── */}
      <section className="relative bg-[#0f1a0f] min-h-screen flex flex-col justify-center overflow-hidden">

        {/* Layered background: green gradient wash (mirrors their photo-overlay brand aesthetic) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Deep green vignette from top-left */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 90% 70% at 0% 0%, rgba(78,144,0,0.25) 0%, transparent 65%)',
          }} />
          {/* Lighter bloom — bottom right */}
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(ellipse 70% 60% at 100% 100%, rgba(78,144,0,0.12) 0%, transparent 60%)',
          }} />
          {/* Very subtle grid */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(78,144,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(78,144,0,0.06) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>

        {/* Thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4e9000] to-transparent opacity-60" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* ── LEFT ── */}
            <div>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#4e9000]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4e9000]">
                  Payment Processing Consultants — NY & NJ
                </span>
              </div>

              {/* Headline — their actual copy, elevated */}
              <h1 className="text-5xl sm:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tight text-white leading-[1.06] mb-8">
                Stop losing profits<br />
                to payment<br />
                <span style={{ color: '#6fc200' }}>processors.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-4 max-w-lg">
                FinTech 5 blends 30+ years of combined expertise with access to 10+ leading processors — building payment stacks that eliminate hidden fees, streamline checkout, and reclaim your margins.
              </p>

              <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-md font-medium">
                We make processors compete for your business. At zero cost to you.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  href="/get-your-savings-estimate"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-black text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}
                >
                  Schedule Your Free Savings Audit
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-xl transition-all duration-200 hover:-translate-y-0.5"
                >
                  Rate Calculator <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Proof strip */}
              <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                {[
                  'No consulting fees — ever',
                  'Processor-agnostic advice',
                  '10+ Tier-1 partners',
                  'We answer the phone',
                ].map(t => (
                  <div key={t} className="flex items-center gap-2 text-[12px] text-slate-500 font-medium">
                    <div className="w-1 h-1 rounded-full bg-[#4e9000]" />
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Savings breakdown card ── */}
            <div className="relative hidden lg:block">
              {/* Glow behind card */}
              <div className="absolute inset-0 rounded-3xl blur-2xl opacity-20" style={{ background: '#4e9000' }} />

              <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(16px)' }}>
                {/* Card header */}
                <div className="px-6 py-4 border-b border-white/8 flex justify-between items-center">
                  <div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-0.5">Real Client • NJ Retail Chain</div>
                    <div className="text-sm font-black text-white">Annual Savings Identified</div>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-black uppercase tracking-wider" style={{ borderColor: 'rgba(78,144,0,0.4)', color: '#6fc200', background: 'rgba(78,144,0,0.08)' }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: '#4e9000' }} />
                    Verified
                  </div>
                </div>

                {/* Big number */}
                <div className="px-6 py-8 text-center border-b border-white/8">
                  <div className="text-[3.5rem] font-black text-white leading-none mb-1">$18,420</div>
                  <div className="text-[11px] text-slate-500">saved in year one • effective rate dropped 1.16%</div>
                </div>

                {/* Line items */}
                <div className="divide-y divide-white/5">
                  {[
                    { label: 'Interchange optimization', amount: '$9,840', pct: 76 },
                    { label: 'PCI compliance fee removed', amount: '$1,200', pct: 22 },
                    { label: 'Pricing model switch', amount: '$7,380', pct: 90 },
                  ].map(row => (
                    <div key={row.label} className="px-6 py-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] text-slate-400 font-medium">{row.label}</span>
                        <span className="text-[11px] font-black" style={{ color: '#6fc200' }}>{row.amount}</span>
                      </div>
                      <div className="w-full h-1 bg-white/8 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${row.pct}%`, background: 'linear-gradient(90deg, #4e9000, #6fc200)' }} />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Card footer */}
                <div className="px-6 py-4 flex items-center justify-between" style={{ background: 'rgba(78,144,0,0.12)' }}>
                  <span className="text-[11px] text-slate-400">What does your statement show?</span>
                  <Link href="/get-your-savings-estimate" className="text-[11px] font-black flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: '#6fc200' }}>
                    Find out free <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* ── STATS ROW ── */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/8">
            {[
              { n: 10, s: '+', label: 'Processor Partners' },
              { n: 30, s: '+', label: 'Years Combined Experience' },
              { n: 18, s: '%', label: 'Max Rate Reduction' },
              { n: 0, p: '$', s: '', label: 'Consulting Cost to You' },
            ].map((stat) => (
              <div key={stat.label} className="px-8 py-6 text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-3xl font-black mb-1 text-white">
                  <Counter target={stat.n} prefix={stat.p} suffix={stat.s} />
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, transparent, #080f08)'
        }} />
      </section>

      {/* ── PROCESSOR MARQUEE ── */}
      <section className="bg-[#0f1a0f] border-t border-white/5 overflow-hidden py-4">
        <div className="flex gap-0 w-max animate-marquee">
          {[...processors, ...processors].map((p, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-[#2a3a1a] font-bold text-[11px] uppercase tracking-widest whitespace-nowrap">
              <span className="hover:text-slate-500 transition-colors cursor-default">{p}</span>
              <span className="opacity-30" style={{ color: '#4e9000' }}>◆</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
