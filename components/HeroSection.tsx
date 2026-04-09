'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, TrendingDown, CheckCircle2, Zap, Shield, Lock } from 'lucide-react'

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

// Animated live ticker items
const tickerItems = [
  { merchant: 'Retail Chain — NJ', saved: '$14,200', rate: '→ 1.74%' },
  { merchant: 'E-Commerce — NY', saved: '$9,800', rate: '→ 1.68%' },
  { merchant: 'Healthcare Group — NJ', saved: '$11,400', rate: '→ 1.82%' },
  { merchant: 'Restaurant Group — NY', saved: '$7,600', rate: '→ 1.71%' },
  { merchant: 'Auto Dealer — NJ', saved: '$18,200', rate: '→ 1.65%' },
]

export default function HeroSection() {
  const [tickerIdx, setTickerIdx] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setTickerIdx(i => (i + 1) % tickerItems.length)
        setFade(true)
      }, 400)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const item = tickerItems[tickerIdx]

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-white overflow-hidden min-h-screen flex flex-col justify-center">

        {/* Extremely subtle financial grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `linear-gradient(rgba(51,102,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(51,102,0,0.04) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }} />

        {/* Very subtle right-side brand accent */}
        <div className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{ background: 'linear-gradient(135deg, transparent 60%, rgba(240,253,244,0.8) 100%)' }} />

        {/* Narrow green accent bar — left edge */}
        <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-gradient-to-b from-transparent via-brand-500 to-transparent opacity-40 pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-16">
          <div className="grid lg:grid-cols-[1fr_500px] gap-16 items-center">

            {/* ── LEFT: Authority copy ── */}
            <div>
              {/* Live ticker badge */}
              <div className="inline-flex items-center gap-3 mb-10 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600" />
                </span>
                <span className="text-xs text-slate-500 font-medium">Recent client:</span>
                <span
                  className="text-xs font-bold text-slate-800 transition-opacity duration-400"
                  style={{ opacity: fade ? 1 : 0 }}
                >
                  {item.merchant} — saved <span className="text-brand-600">{item.saved}/yr</span> at <span className="text-brand-600">{item.rate}</span>
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black tracking-tight text-slate-900 leading-[1.06] mb-7 animate-fade-in-up delay-100">
                Your payment processor<br />
                is overcharging you.<br />
                <span className="text-brand-600">We prove it in 48 hours.</span>
              </h1>

              <p className="text-lg text-slate-500 leading-relaxed mb-10 max-w-xl animate-fade-in-up delay-200">
                FinTech 5 are independent payment processing consultants. We audit your merchant statement, compare quotes from 10+ Tier-1 processors, and put a real specialist on your account — at zero cost to you.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up delay-300">
                <Link
                  href="/get-your-savings-estimate"
                  className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg shadow-brand-100 transition-all duration-200 hover:-translate-y-0.5"
                >
                  Get My Free Savings Estimate
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/calculator"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:border-brand-300 hover:bg-brand-50 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                >
                  Rate Calculator <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Trust grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in-up delay-400">
                {[
                  { icon: <CheckCircle2 className="w-4 h-4" />, text: 'No consulting fees' },
                  { icon: <Shield className="w-4 h-4" />, text: 'Processor-agnostic' },
                  { icon: <Zap className="w-4 h-4" />, text: '48hr audit turnaround' },
                  { icon: <Lock className="w-4 h-4" />, text: 'No long-term contract' },
                ].map((t) => (
                  <div key={t.text} className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-brand-600 shrink-0">{t.icon}</span> {t.text}
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Rate comparison table (authoritative data view) ── */}
            <div className="hidden lg:block animate-fade-in delay-300">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-100 overflow-hidden">
                {/* Table header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">Statement Analysis</div>
                    <div className="text-sm font-black text-slate-900">Processor Rate Comparison</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse inline-block" />
                    LIVE AUDIT
                  </div>
                </div>

                {/* Current vs. optimal */}
                <div className="px-6 py-4 border-b border-slate-100 bg-red-50/40">
                  <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest mb-2">Current Processor</div>
                  <div className="flex items-center justify-between">
                    <div className="text-slate-700 font-bold text-sm">Stripe (flat rate)</div>
                    <div className="text-red-500 font-black text-lg">2.90% + $0.30</div>
                  </div>
                  <div className="text-[10px] text-red-400 mt-1">Est. annual cost at $500k volume: <span className="font-bold">$16,050</span></div>
                </div>

                {/* Processor list */}
                <div className="divide-y divide-slate-50">
                  {[
                    { name: 'Heartland', rate: '1.74%', saving: '$5,800', best: true },
                    { name: 'Worldpay', rate: '1.81%', saving: '$5,450', best: false },
                    { name: 'First Data', rate: '1.88%', saving: '$5,100', best: false },
                    { name: 'Elavon', rate: '1.92%', saving: '$4,900', best: false },
                  ].map((p) => (
                    <div key={p.name} className={`px-6 py-3.5 flex items-center justify-between ${p.best ? 'bg-brand-50/60' : ''}`}>
                      <div className="flex items-center gap-3">
                        {p.best && <div className="w-1.5 h-5 bg-brand-500 rounded-full" />}
                        {!p.best && <div className="w-1.5 h-5 rounded-full" />}
                        <div>
                          <div className="text-sm font-bold text-slate-800">{p.name}</div>
                          {p.best && <div className="text-[9px] font-bold text-brand-600 uppercase tracking-wider">Best match for your profile</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-black text-base ${p.best ? 'text-brand-600' : 'text-slate-600'}`}>{p.rate}</div>
                        <div className="text-[10px] text-slate-400">saves <span className="font-bold text-brand-600">{p.saving}/yr</span></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTA */}
                <div className="px-6 py-4 bg-brand-600 flex items-center justify-between">
                  <div>
                    <div className="text-white font-black text-sm">Total identifiable savings</div>
                    <div className="text-brand-200 text-[10px]">Based on your current statement</div>
                  </div>
                  <div className="text-white font-black text-2xl">$5,800/yr</div>
                </div>
              </div>

              {/* Below card micro-label */}
              <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
                Sample analysis — your results will vary. <Link href="/get-your-savings-estimate" className="text-brand-600 underline underline-offset-2">Get yours free →</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
          {[
            { n: 10, s: '+', l: 'Tier-1 Processor Partners' },
            { n: 30, s: '+', l: 'Years Combined Experience' },
            { n: 18, s: '%', l: 'Max Cost Reduction Year 1' },
            { n: 0, p: '$', s: '', l: 'Consulting Fees — Ever' },
          ].map((item) => (
            <div key={item.l}>
              <div className="text-3xl md:text-4xl font-black mb-1.5 text-brand-400">
                <Counter target={item.n} prefix={item.p} suffix={item.s} />
              </div>
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">{item.l}</div>
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
