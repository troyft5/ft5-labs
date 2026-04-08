'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight, TrendingDown, CheckCircle2, Zap } from 'lucide-react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const duration = 1800
        const steps = 60
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

  return <span ref={ref}>{count}{suffix}</span>
}

const processors = ['Worldpay', 'First Data', 'TSYS', 'Heartland', 'Paysafe', 'Priority', 'NMI', 'Shift4', 'Clearent', 'Payroc', 'Elavon', 'Global Payments']

export default function HeroSection() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-[#060d06] overflow-hidden min-h-[92vh] flex items-center">

        {/* Animated dot grid */}
        <div
          className="absolute inset-0 animate-dot-grid pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)', backgroundSize: '36px 36px' }}
        />

        {/* Animated green glow blobs */}
        <div className="absolute top-[-100px] right-[-100px] w-[700px] h-[700px] rounded-full bg-brand-600/15 blur-[140px] animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-[-100px] left-[-50px] w-[500px] h-[500px] rounded-full bg-brand-700/10 blur-[120px] animate-pulse-glow pointer-events-none" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-0 w-full grid md:grid-cols-2 gap-12 items-center">

          {/* Left — copy */}
          <div>
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 glass rounded-full text-xs font-bold uppercase tracking-widest text-brand-300 animate-fade-in-up">
              <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
              Trusted Payment Processing Consultants
            </div>

            <h1 className="text-5xl md:text-[4.5rem] font-black tracking-tight text-white leading-[1.04] mb-8 animate-fade-in-up delay-100">
              Stop losing profits<br />
              to processors.<br />
              <span className="gradient-text">We negotiate for you.</span>
            </h1>

            <p className="text-lg text-slate-400 max-w-lg leading-relaxed mb-10 animate-fade-in-up delay-200">
              FinTech 5 connects you to 10+ Tier-1 processors and delivers the white-glove consulting support that Stripe, Square, and PayPal never will. We cut costs, kill hidden fees, and stay on the phone with you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up delay-300">
              <Link
                href="/get-your-savings-estimate"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-500 rounded-2xl shadow-lg shadow-brand-900/40 hover:shadow-brand-600/30 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Free Savings Estimate <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white glass rounded-2xl hover:bg-white/10 transition-all duration-300"
              >
                Try the Calculator <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            <div className="flex flex-wrap gap-5 animate-fade-in-up delay-400">
              {['Free analysis', 'No consulting fees', '10+ processor quotes', 'Dedicated rep'].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-brand-500" /> {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating UI cards */}
          <div className="relative h-[520px] hidden md:block">

            {/* Main savings card */}
            <div className="absolute top-16 right-8 w-72 glass rounded-2xl p-6 animate-float-slow animate-slide-in-right delay-300 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-brand-600 rounded-xl flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Annual Savings</div>
                  <div className="text-white font-black text-lg">Statement Analysis</div>
                </div>
              </div>
              <div className="text-4xl font-black text-brand-400 mb-1">$18,420</div>
              <div className="text-xs text-slate-500 mb-4">Identified in hidden fees & overcharges</div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div className="bg-gradient-to-r from-brand-500 to-brand-300 h-2 rounded-full w-[76%]" />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1.5">
                <span>Current rate: 2.9%</span><span className="text-brand-400 font-bold">Optimized: 1.74%</span>
              </div>
            </div>

            {/* Processor connected card */}
            <div className="absolute top-4 left-4 w-64 glass rounded-2xl p-5 animate-float-med animate-slide-in-left delay-400 shadow-xl" style={{ animationDelay: '1.5s' }}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
                <span className="text-xs text-brand-300 font-bold uppercase tracking-wider">Live Match</span>
              </div>
              <div className="text-white font-bold text-sm mb-1">Best Processor Found</div>
              <div className="text-2xl font-black text-white mb-3">Heartland</div>
              <div className="flex gap-2">
                <div className="flex-1 bg-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-xs text-slate-400">Rate</div>
                  <div className="text-brand-400 font-black text-sm">1.74%</div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl p-2.5 text-center">
                  <div className="text-xs text-slate-400">Savings</div>
                  <div className="text-brand-400 font-black text-sm">$1,535/mo</div>
                </div>
              </div>
            </div>

            {/* Speed notification */}
            <div className="absolute bottom-24 right-4 w-56 glass rounded-2xl p-4 animate-float-slow animate-fade-in delay-500 shadow-xl" style={{ animationDelay: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-brand-600/30 border border-brand-500/30 rounded-xl flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm">Audit Complete</div>
                  <div className="text-slate-400 text-xs">48hr turnaround ✓</div>
                </div>
              </div>
            </div>

            {/* 10+ badge */}
            <div className="absolute bottom-8 left-8 glass rounded-2xl p-5 animate-float-med animate-fade-in delay-600" style={{ animationDelay: '2.5s' }}>
              <div className="text-4xl font-black text-white">10+</div>
              <div className="text-xs text-slate-400 mt-1">Tier-1 Processor<br />Relationships</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ANIMATED STATS ── */}
      <section className="bg-brand-600">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          <div>
            <div className="text-3xl md:text-4xl font-black mb-1"><Counter target={10} suffix="+" /></div>
            <div className="text-xs text-brand-100 uppercase tracking-wider font-semibold">Tier-1 Processor Partners</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black mb-1"><Counter target={30} suffix="+" /></div>
            <div className="text-xs text-brand-100 uppercase tracking-wider font-semibold">Years Combined Experience</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black mb-1"><Counter target={18} suffix="%" /></div>
            <div className="text-xs text-brand-100 uppercase tracking-wider font-semibold">Max Cost Reduction Year 1</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-black mb-1">$<Counter target={0} /></div>
            <div className="text-xs text-brand-100 uppercase tracking-wider font-semibold">Consulting Fees — Ever</div>
          </div>
        </div>
      </section>

      {/* ── PROCESSOR MARQUEE ── */}
      <section className="bg-[#060d06] border-y border-white/5 overflow-hidden py-5">
        <div className="flex gap-0 w-max animate-marquee">
          {[...processors, ...processors].map((p, i) => (
            <div key={i} className="flex items-center gap-8 px-8 text-slate-600 font-bold text-sm uppercase tracking-widest whitespace-nowrap">
              <span>{p}</span>
              <span className="text-brand-700">•</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
