'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, TrendingDown, CheckCircle2, Zap, Shield } from 'lucide-react'

function Counter({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const steps = 80
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, 2000 / steps)
      }
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])
  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const processors = ['Worldpay', 'First Data', 'TSYS', 'Heartland', 'Paysafe', 'Priority', 'NMI', 'Shift4', 'Clearent', 'Payroc', 'Elavon', 'Global Payments', 'Fiserv', 'Nuvei']

export default function HeroSection() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#040b04] overflow-hidden min-h-screen flex items-center">

        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-40" style={{
          backgroundImage: `linear-gradient(rgba(51,102,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(51,102,0,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />

        {/* Noise grain */}
        <div className="noise absolute inset-0 pointer-events-none" />

        {/* Glow orbs — controlled positions */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-600/12 blur-[130px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-800/10 blur-[120px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2.5s' }} />

        {/* Content */}
        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16">
          <div className="grid lg:grid-cols-[1fr_440px] gap-12 xl:gap-20 items-center">

            {/* Left — Copy */}
            <div className="max-w-2xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 glass rounded-full text-[11px] font-bold uppercase tracking-widest text-brand-300 animate-fade-in">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
                </span>
                Trusted Payment Processing Consultants — NY & NJ
              </div>

              {/* Headline — controlled size */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.05] mb-7 animate-fade-in-up delay-100">
                Stop paying more<br className="hidden sm:block" /> than you owe.
                <br />
                <span className="gradient-text">We fix that.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-10 animate-fade-in-up delay-200 max-w-lg">
                FinTech 5 connects you to 10+ Tier-1 processors and delivers the dedicated consulting support that Stripe, Square, and PayPal never will. We audit your statement, kill hidden fees, and stay on the phone with you.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
                <Link
                  href="/get-your-savings-estimate"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-xl shadow-lg shadow-brand-900/40 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Free Savings Estimate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white glass rounded-xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Try the Calculator <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up delay-400">
                {[
                  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />, text: 'Free — no consulting fees ever' },
                  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-400" />, text: '10+ processor quotes in 48hrs' },
                  { icon: <Shield className="w-3.5 h-3.5 text-brand-400" />, text: 'Dedicated account rep' },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/8 rounded-full text-xs text-slate-400 font-medium">
                    {t.icon} {t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Card stack */}
            <div className="relative h-[460px] lg:h-[520px]">

              {/* Ambient glow behind cards */}
              <div className="absolute inset-8 bg-brand-600/8 rounded-3xl blur-3xl" />

              {/* Card 1 — Savings analysis (main, middle) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 glass rounded-2xl p-5 shadow-2xl shadow-black/60 z-20 animate-float-slow animate-fade-in delay-400">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Statement Analysis</div>
                      <div className="text-white font-bold text-xs">Annual Savings Found</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-1.5 py-0.5 bg-brand-600/30 text-brand-300 rounded-full border border-brand-600/30">LIVE</span>
                </div>
                <div className="text-[2.4rem] font-black text-white leading-none mb-1">$18,420</div>
                <div className="text-[10px] text-slate-500 mb-4">In hidden fees &amp; overcharges identified</div>
                <div className="space-y-2.5">
                  {[
                    { l: 'Interchange savings', v: '$9,840', pct: '76%' },
                    { l: 'PCI fee removed', v: '$1,200', pct: '36%' },
                    { l: 'Pricing model switch', v: '$7,380', pct: '90%' },
                  ].map(r => (
                    <div key={r.l}>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>{r.l}</span>
                        <span className="text-brand-400 font-bold">{r.v}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1">
                        <div className="bg-gradient-to-r from-brand-600 to-brand-300 h-1 rounded-full" style={{ width: r.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Processor match (top-left) */}
              <div className="absolute top-4 left-0 w-52 glass rounded-2xl p-4 shadow-xl shadow-black/50 z-10 animate-float-med animate-slide-in-left delay-500">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-400" />
                  </span>
                  <span className="text-[9px] text-brand-300 font-bold uppercase tracking-widest">Best Match</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-0.5">Optimal Processor</div>
                <div className="text-white font-black text-lg mb-3">Heartland</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[9px] text-slate-500">Eff. Rate</div>
                    <div className="text-brand-400 font-black text-sm">1.74%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-2 text-center">
                    <div className="text-[9px] text-slate-500">Monthly</div>
                    <div className="text-brand-400 font-black text-sm">-$1,535</div>
                  </div>
                </div>
              </div>

              {/* Card 3 — Audit complete (bottom-right) */}
              <div className="absolute bottom-12 right-0 w-52 glass rounded-2xl p-4 shadow-xl shadow-black/50 z-10 animate-float-slow animate-slide-in-right delay-600" style={{ animationDelay: '3s' }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-brand-600/20 border border-brand-500/20 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 text-brand-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-xs">Audit Complete</div>
                    <div className="text-slate-500 text-[10px]">48hr turnaround ✓</div>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-300 h-1 rounded-full w-full" />
                </div>
              </div>

              {/* Card 4 — Partner count (bottom-left) */}
              <div className="absolute bottom-4 left-4 glass rounded-xl px-5 py-4 shadow-lg z-10 animate-fade-in delay-700">
                <div className="text-3xl font-black text-white">10+</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Processor Partners</div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#040b04] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-brand-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '20px 20px' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { n: 10, s: '+', l: 'Tier-1 Processor Partners' },
            { n: 30, s: '+', l: 'Years Combined Experience' },
            { n: 18, s: '%', l: 'Max Cost Reduction Year 1' },
            { n: 0, p: '$', s: '', l: 'Consulting Fees — Ever' },
          ].map((item) => (
            <div key={item.l} className="group">
              <div className="text-3xl md:text-4xl font-black mb-1.5 group-hover:scale-110 transition-transform duration-300">
                <Counter target={item.n} prefix={item.p} suffix={item.s} />
              </div>
              <div className="text-[11px] text-brand-100 uppercase tracking-wider font-semibold">{item.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESSOR MARQUEE ── */}
      <section className="bg-[#040b04] border-y border-white/5 overflow-hidden py-4">
        <div className="flex gap-0 w-max animate-marquee">
          {[...processors, ...processors].map((p, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-slate-600 font-semibold text-[11px] uppercase tracking-widest whitespace-nowrap">
              <span className="hover:text-slate-400 transition-colors cursor-default">{p}</span>
              <span className="text-brand-900">◆</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
