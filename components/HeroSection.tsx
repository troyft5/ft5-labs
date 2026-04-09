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
      {/* ── HERO — bright, welcoming, Stripe-style ── */}
      <section className="relative bg-white overflow-hidden min-h-screen flex items-center">

        {/* Soft gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-brand-50 pointer-events-none" />

        {/* Green color orbs — Stripe style, very soft */}
        <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] rounded-full bg-brand-100/60 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] rounded-full bg-brand-50 blur-[100px] pointer-events-none" />

        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-30" style={{
          backgroundImage: `radial-gradient(circle, #336600 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.04,
        }} />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 pb-16">
          <div className="grid lg:grid-cols-[1fr_460px] gap-12 xl:gap-16 items-center">

            {/* Left — Copy */}
            <div className="max-w-2xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 bg-brand-50 border border-brand-100 rounded-full text-[11px] font-bold uppercase tracking-widest text-brand-700 animate-fade-in">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-50" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
                </span>
                Trusted Payment Processing Consultants — NY & NJ
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-slate-900 leading-[1.05] mb-7 animate-fade-in-up delay-100">
                Stop paying more<br className="hidden sm:block" /> than you owe.<br />
                <span className="text-brand-600">We fix that.</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 animate-fade-in-up delay-200 max-w-lg">
                FinTech 5 connects you to 10+ Tier-1 processors and delivers the white-glove consulting support that Stripe, Square, and PayPal never will. We cut costs, kill hidden fees, and we pick up the phone.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
                <Link
                  href="/get-your-savings-estimate"
                  className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-200 transition-all duration-300 hover:-translate-y-0.5"
                >
                  Get Free Savings Estimate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 rounded-xl transition-all duration-300 hover:-translate-y-0.5 shadow-sm"
                >
                  Try the Calculator <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-3 animate-fade-in-up delay-400">
                {[
                  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />, text: 'Free — no consulting fees ever' },
                  { icon: <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />, text: '10+ processor quotes in 48hrs' },
                  { icon: <Shield className="w-3.5 h-3.5 text-brand-600" />, text: 'Dedicated account rep' },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-xs text-slate-600 font-medium shadow-sm">
                    {t.icon} {t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Card stack on light bg */}
            <div className="relative h-[460px] lg:h-[520px] hidden lg:block">

              {/* Card 1 — Main savings analysis */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-2xl p-5 shadow-2xl shadow-slate-200 border border-slate-100 z-20 animate-float-slow animate-fade-in delay-400">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                      <TrendingDown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Statement Analysis</div>
                      <div className="text-slate-900 font-bold text-xs">Annual Savings Found</div>
                    </div>
                  </div>
                  <span className="text-[9px] font-black px-1.5 py-0.5 bg-brand-50 text-brand-700 rounded-full border border-brand-100">LIVE</span>
                </div>
                <div className="text-[2.4rem] font-black text-slate-900 leading-none mb-1">$18,420</div>
                <div className="text-[10px] text-slate-400 mb-4">In hidden fees & overcharges identified</div>
                <div className="space-y-2.5">
                  {[
                    { l: 'Interchange savings', v: '$9,840', pct: '76%' },
                    { l: 'PCI fee removed', v: '$1,200', pct: '36%' },
                    { l: 'Pricing model switch', v: '$7,380', pct: '90%' },
                  ].map(r => (
                    <div key={r.l}>
                      <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                        <span>{r.l}</span>
                        <span className="text-brand-600 font-bold">{r.v}</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-brand-600 to-brand-400 h-1.5 rounded-full" style={{ width: r.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 2 — Processor match */}
              <div className="absolute top-4 left-0 w-52 bg-white rounded-2xl p-4 shadow-xl shadow-slate-150 border border-slate-100 z-10 animate-float-med animate-slide-in-left delay-500">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-50" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
                  </span>
                  <span className="text-[9px] text-brand-600 font-bold uppercase tracking-widest">Best Match</span>
                </div>
                <div className="text-[10px] text-slate-400 mb-0.5">Optimal Processor</div>
                <div className="text-slate-900 font-black text-lg mb-3">Heartland</div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-brand-50 rounded-lg p-2 text-center">
                    <div className="text-[9px] text-slate-400">Eff. Rate</div>
                    <div className="text-brand-700 font-black text-sm">1.74%</div>
                  </div>
                  <div className="bg-brand-50 rounded-lg p-2 text-center">
                    <div className="text-[9px] text-slate-400">Monthly</div>
                    <div className="text-brand-700 font-black text-sm">-$1,535</div>
                  </div>
                </div>
              </div>

              {/* Card 3 — Audit complete */}
              <div className="absolute bottom-16 right-2 w-52 bg-white rounded-2xl p-4 shadow-xl shadow-slate-150 border border-slate-100 z-10 animate-float-slow animate-slide-in-right delay-600">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 bg-brand-50 border border-brand-100 rounded-lg flex items-center justify-center shrink-0">
                    <Zap className="w-3.5 h-3.5 text-brand-600" />
                  </div>
                  <div>
                    <div className="text-slate-900 font-bold text-xs">Audit Complete</div>
                    <div className="text-slate-400 text-[10px]">48hr turnaround ✓</div>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div className="bg-gradient-to-r from-brand-600 to-brand-400 h-1.5 rounded-full w-full" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl px-5 py-4 shadow-lg border border-slate-100 z-10 animate-fade-in delay-700">
                <div className="text-3xl font-black text-slate-900">10+</div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">Processor Partners</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-brand-600">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { n: 10, s: '+', l: 'Tier-1 Processor Partners' },
            { n: 30, s: '+', l: 'Years Combined Experience' },
            { n: 18, s: '%', l: 'Max Cost Reduction Year 1' },
            { n: 0, p: '$', s: '', l: 'Consulting Fees — Ever' },
          ].map((item) => (
            <div key={item.l}>
              <div className="text-3xl md:text-4xl font-black mb-1.5">
                <Counter target={item.n} prefix={item.p} suffix={item.s} />
              </div>
              <div className="text-[11px] text-brand-100 uppercase tracking-wider font-semibold">{item.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESSOR MARQUEE ── */}
      <section className="bg-slate-50 border-y border-slate-100 overflow-hidden py-4">
        <div className="flex gap-0 w-max animate-marquee">
          {[...processors, ...processors].map((p, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-slate-400 font-semibold text-[11px] uppercase tracking-widest whitespace-nowrap">
              <span className="hover:text-slate-600 transition-colors cursor-default">{p}</span>
              <span className="text-slate-200">◆</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
