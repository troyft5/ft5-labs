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
        const duration = 2000
        const steps = 80
        const increment = target / steps
        let current = 0
        const timer = setInterval(() => {
          current += increment
          if (current >= target) { setCount(target); clearInterval(timer) }
          else setCount(Math.floor(current))
        }, duration / steps)
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
      <section className="relative bg-[#030906] overflow-hidden min-h-screen flex items-center noise">

        {/* Animated grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(51,102,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(51,102,0,0.06) 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute top-[-200px] right-[-200px] w-[900px] h-[900px] rounded-full bg-brand-600/10 blur-[180px] animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-[-200px] left-[-100px] w-[600px] h-[600px] rounded-full bg-brand-800/15 blur-[140px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] rounded-full bg-brand-500/5 blur-[100px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '4s' }} />

        {/* Rotating ring decoration */}
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-brand-600/10 animate-spin-slow pointer-events-none" />
        <div className="absolute top-20 right-[15%] w-48 h-48 m-8 rounded-full border border-brand-500/8 animate-spin-slow pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '14s' }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10 w-full grid md:grid-cols-[1fr_480px] gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-10 px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-brand-300 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
              </span>
              Trusted Payment Processing Consultants — NY & NJ
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] font-black tracking-tight text-white leading-[1.02] mb-8 animate-fade-in-up delay-100">
              Stop losing profits<br />
              to your processor.<br />
              <span className="gradient-text">We</span>
              <span className="text-white"> negotiate</span><br />
              <span className="gradient-text">for you.</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed mb-10 animate-fade-in-up delay-200">
              FinTech 5 connects you to 10+ Tier-1 processors and gives you the white-glove consulting and dedicated support that Stripe, Square, and PayPal never will. We cut costs, kill hidden fees, and we actually pick up the phone.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-14 animate-fade-in-up delay-300">
              <Link
                href="/get-your-savings-estimate"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-2xl shadow-xl shadow-brand-900/40 hover:shadow-brand-600/30 transition-all duration-300 hover:-translate-y-1"
              >
                Get Free Savings Estimate
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white glass rounded-2xl hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                Try the Calculator <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-6 animate-fade-in-up delay-400">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 text-brand-400" />, text: 'Free analysis' },
                { icon: <CheckCircle2 className="w-4 h-4 text-brand-400" />, text: 'No consulting fees ever' },
                { icon: <CheckCircle2 className="w-4 h-4 text-brand-400" />, text: '10+ processor quotes' },
                { icon: <Shield className="w-4 h-4 text-brand-400" />, text: 'Dedicated account rep' },
              ].map((t) => (
                <div key={t.text} className="flex items-center gap-2 text-sm text-slate-500">
                  {t.icon} {t.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: Floating UI cards ── */}
          <div className="relative h-[580px] hidden md:block">

            {/* Decorative background blur */}
            <div className="absolute inset-0 bg-brand-600/5 rounded-3xl blur-2xl" />

            {/* Main savings card */}
            <div className="absolute top-12 right-0 w-80 glass rounded-2xl p-6 animate-float-slow animate-slide-in-right delay-400 shadow-2xl shadow-black/50">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                    <TrendingDown className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Statement Analysis</div>
                    <div className="text-white font-black text-sm">Annual Savings Found</div>
                  </div>
                </div>
                <div className="text-[10px] font-bold text-brand-400 bg-brand-600/20 px-2 py-1 rounded-full">LIVE</div>
              </div>
              <div className="text-5xl font-black text-white mb-1">$18,420</div>
              <div className="text-xs text-slate-500 mb-5">Identified in hidden fees & overcharges</div>
              <div className="space-y-2">
                {[
                  { label: 'Interchange savings', val: '$9,840', pct: '76%' },
                  { label: 'PCI fee removed', val: '$1,200', pct: '35%' },
                  { label: 'Pricing model switch', val: '$7,380', pct: '90%' },
                ].map((r) => (
                  <div key={r.label} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>{r.label}</span><span className="text-brand-400 font-bold">{r.val}</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-1.5">
                        <div className="bg-gradient-to-r from-brand-600 to-brand-300 h-1.5 rounded-full transition-all duration-1000" style={{ width: r.pct }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Processor match card */}
            <div className="absolute top-4 left-0 w-60 glass rounded-2xl p-5 animate-float-med animate-slide-in-left delay-500 shadow-xl shadow-black/40">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-400" />
                </span>
                <span className="text-[10px] text-brand-300 font-bold uppercase tracking-widest">Best Match</span>
              </div>
              <div className="text-slate-400 text-xs mb-1">Optimal Processor</div>
              <div className="text-white font-black text-xl mb-4">Heartland</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 mb-0.5">Eff. Rate</div>
                  <div className="text-brand-400 font-black text-sm">1.74%</div>
                </div>
                <div className="bg-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-[10px] text-slate-500 mb-0.5">Monthly</div>
                  <div className="text-brand-400 font-black text-sm">-$1,535</div>
                </div>
              </div>
            </div>

            {/* Speed card */}
            <div className="absolute bottom-28 right-0 w-56 glass rounded-2xl p-4 animate-float-slow animate-fade-in delay-600 shadow-xl" style={{ animationDelay: '3.5s' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-brand-600/30 border border-brand-500/30 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Audit Complete</div>
                  <div className="text-slate-400 text-xs">48hr turnaround</div>
                </div>
              </div>
              <div className="w-full bg-white/10 rounded-full h-1.5">
                <div className="bg-gradient-to-r from-brand-600 to-brand-300 h-1.5 rounded-full w-full" />
              </div>
            </div>

            {/* Partners badge */}
            <div className="absolute bottom-8 left-4 glass rounded-2xl p-5 animate-float-med animate-fade-in delay-700" style={{ animationDelay: '2s' }}>
              <div className="text-5xl font-black text-white">10+</div>
              <div className="text-[11px] text-slate-400 mt-1 font-medium">Tier-1 Processor<br />Relationships</div>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030906] to-transparent pointer-events-none" />
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-brand-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)', backgroundSize: '24px 24px' }} />
        <div className="relative max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { n: 10, suffix: '+', label: 'Tier-1 Processor Partners' },
            { n: 30, suffix: '+', label: 'Years Combined Experience' },
            { n: 18, suffix: '%', label: 'Max Cost Reduction Year 1' },
            { n: 0, prefix: '$', suffix: '', label: 'Consulting Fees — Ever' },
          ].map((s) => (
            <div key={s.label} className="group">
              <div className="text-4xl md:text-5xl font-black mb-2 group-hover:scale-110 transition-transform duration-300">
                <Counter target={s.n} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <div className="text-xs text-brand-100 uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESSOR MARQUEE ── */}
      <section className="bg-[#030906] border-y border-white/5 overflow-hidden py-5">
        <div className="flex gap-0 w-max animate-marquee">
          {[...processors, ...processors].map((p, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-slate-600 font-bold text-xs uppercase tracking-widest whitespace-nowrap">
              <span className="hover:text-slate-400 transition-colors">{p}</span>
              <span className="text-brand-800">•</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
