'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

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
  // Mouse parallax refs
  const heroRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const blobsRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const currentPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const hero = heroRef.current
    if (!hero) return

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      // Normalized -0.5 → 0.5
      mousePos.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5,
      }
    }

    const onLeave = () => {
      mousePos.current = { x: 0, y: 0 }
    }

    // Smooth lerp loop
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    function animate() {
      currentPos.current.x = lerp(currentPos.current.x, mousePos.current.x, 0.05)
      currentPos.current.y = lerp(currentPos.current.y, mousePos.current.y, 0.05)

      const cx = currentPos.current.x
      const cy = currentPos.current.y

      // Cards: faster (closer layer)
      if (cardsRef.current) {
        cardsRef.current.style.transform = `translate3d(${cx * 22}px, ${cy * 18}px, 0)`
      }
      // Blobs: mid speed, opposite direction for depth illusion
      if (blobsRef.current) {
        blobsRef.current.style.transform = `translate3d(${cx * 30}px, ${cy * 25}px, 0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    hero.addEventListener('mousemove', onMove)
    hero.addEventListener('mouseleave', onLeave)
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      hero.removeEventListener('mousemove', onMove)
      hero.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <>
      {/* ─────────────────────────────────────────
          HERO  —  Dark, bold, authoritative + Interactive
      ───────────────────────────────────────── */}
      <section ref={heroRef} className="relative bg-[#0f1a0f] min-h-screen flex flex-col justify-center overflow-hidden" style={{ cursor: 'default' }}>

        {/* ── Interactive particle canvas (replaces static grid) ── */}
        <ParticleCanvas />

        {/* ── Morphing blob glow layer — moves with mouse (slowest) ── */}
        <div ref={blobsRef} className="absolute inset-0 overflow-hidden pointer-events-none" style={{ filter: 'blur(70px)', transition: 'transform 0s', willChange: 'transform' }}>
          {/* Blob 1 — large, top-left anchor */}
          <div
            className="absolute animate-morph-1"
            style={{ width: '650px', height: '600px', top: '-10%', left: '-8%', background: 'radial-gradient(ellipse, rgba(78,144,0,0.55) 0%, rgba(78,144,0,0.2) 50%, transparent 75%)' }}
          />
          {/* Blob 2 — mid, bottom-right */}
          <div
            className="absolute animate-morph-2"
            style={{ width: '550px', height: '580px', bottom: '-15%', right: '-10%', background: 'radial-gradient(ellipse, rgba(111,194,0,0.45) 0%, rgba(78,144,0,0.18) 50%, transparent 75%)', animationDelay: '7s' }}
          />
          {/* Blob 3 — small, centre-right, lighter */}
          <div
            className="absolute animate-morph-3"
            style={{ width: '380px', height: '400px', top: '30%', left: '50%', background: 'radial-gradient(ellipse, rgba(163,230,53,0.25) 0%, rgba(78,144,0,0.1) 50%, transparent 75%)', animationDelay: '3s' }}
          />
        </div>

        {/* Thin top accent line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#4e9000] to-transparent opacity-60" style={{ zIndex: 2 }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-20 w-full" style={{ zIndex: 3 }}>
          <div className="grid lg:grid-cols-[1fr_420px] gap-16 items-center">

            {/* ── LEFT: headline — static ── */}
            <div>
              {/* Category label */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-[#4e9000]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4e9000]">
                  Payment Processing Consultants — NY & NJ
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl sm:text-6xl lg:text-[3.8rem] xl:text-[4.2rem] font-black tracking-tight text-white leading-[1.06] mb-8">
                We negotiate<br />
                your payment rates.<br />
                <span style={{ color: '#6fc200' }}>You keep the savings.</span>
              </h1>

              <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-lg">
                Send us your merchant statement. In 24 hours we&apos;ll return a line-by-line audit with every hidden fee identified and competitive bids from 10+ processors — at zero cost to you.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  href="/get-your-savings-estimate"
                  className="group inline-flex items-center gap-2.5 px-8 py-4 text-sm font-black text-white rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:opacity-90"
                  style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}
                >
                  Get Your Free Audit
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

            {/* ── RIGHT: Mobile impact block (mobile only) ── */}
            <div className="lg:hidden mt-2 mb-8">
              {/* Big savings number */}
              <div className="rounded-2xl p-6 mb-3" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
                <div className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#6fc200' }}>Real client result — NJ</div>
                <div className="text-5xl font-black text-white mb-1">$18,400</div>
                <div className="text-sm text-slate-400">in hidden fees identified — same day or less</div>
                <div className="mt-4 h-px" style={{ background: 'linear-gradient(90deg, rgba(78,144,0,0.5), transparent)' }} />
                <div className="mt-3 flex flex-col gap-2">
                  {[
                    { label: 'Interchange savings', amt: '$9,840' },
                    { label: 'PCI fee removed', amt: '$1,200' },
                    { label: 'Pricing model switch', amt: '$7,360' },
                  ].map(r => (
                    <div key={r.label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{r.label}</span>
                      <span className="font-bold" style={{ color: '#6fc200' }}>{r.amt}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Proof pills */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { val: '$0', label: 'Consulting Fees' },
                  { val: '24hr', label: 'Audit Turnaround' },
                ].map(s => (
                  <div key={s.label} className="rounded-xl p-3.5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-2xl font-black" style={{ color: '#6fc200' }}>{s.val}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Floating UI cards + hero image (desktop only) ── */}
            {/* This entire right column moves with the mouse at a faster rate */}
            <div ref={cardsRef} className="relative hidden lg:block h-[480px]" style={{ willChange: 'transform' }}>

              {/* Card 1 — back, "Best Match" — rotated, top-left */}
              <div className="animate-float-1 absolute top-0 left-0 w-56 rounded-2xl p-4 shadow-2xl z-10"
                style={{ background: 'rgba(15,26,15,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-[#4e9000]" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#6fc200]">Best Match</span>
                </div>
                <div className="text-[10px] text-slate-500 mb-1">Optimal Processor</div>
                <div className="text-base font-black text-white mb-3">Heartland</div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="rounded-lg p-2" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.2)' }}>
                    <div className="text-[9px] text-slate-500 mb-1">Eff. Rate</div>
                    <div className="text-sm font-black" style={{ color: '#6fc200' }}>1.74%</div>
                  </div>
                  <div className="rounded-lg p-2" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-[9px] text-slate-500 mb-1">Monthly</div>
                    <div className="text-sm font-black text-white">$985</div>
                  </div>
                </div>
              </div>

              {/* Card 2 — main, center, "$18,420" */}
              <div className="animate-float-2 absolute top-12 left-16 right-0 rounded-2xl shadow-2xl z-20"
                style={{ background: 'rgba(15,26,15,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(78,144,0,0.25)' }}>
                {/* Header */}
                <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm" style={{ background: '#4e9000' }}>↓</div>
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase tracking-widest">Statement Analysis</div>
                      <div className="text-xs font-black text-white">Annual Savings Found</div>
                    </div>
                  </div>
                  <div className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase" style={{ background: 'rgba(78,144,0,0.15)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.3)' }}>Live</div>
                </div>
                {/* Amount */}
                <div className="px-5 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="text-4xl font-black text-white mb-1">$18,420</div>
                  <div className="text-[10px] text-slate-500">In hidden fees & overcharges identified</div>
                </div>
                {/* Line items */}
                <div className="px-5 py-4 flex flex-col gap-3">
                  {[
                    { label: 'Interchange savings', amt: '$9,840', pct: 76 },
                    { label: 'PCI fee removed', amt: '$1,200', pct: 20 },
                    { label: 'Pricing model switch', amt: '$7,380', pct: 90 },
                  ].map(r => (
                    <div key={r.label}>
                      <div className="flex justify-between text-[10px] mb-1">
                        <span className="text-slate-400">{r.label}</span>
                        <span className="font-bold" style={{ color: '#6fc200' }}>{r.amt}</span>
                      </div>
                      <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: 'linear-gradient(90deg,#4e9000,#6fc200)' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card 3 — "Audit Complete" badge, bottom-right */}
              <div className="animate-float-3 absolute bottom-8 right-0 rounded-xl px-4 py-3 flex items-center gap-3 z-30 shadow-xl"
                style={{ background: 'rgba(15,26,15,0.9)', backdropFilter: 'blur(16px)', border: '1px solid rgba(78,144,0,0.2)' }}>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.2)' }}>
                  <span style={{ color: '#6fc200', fontSize: 14 }}>⚡</span>
                </div>
                <div>
                  <div className="text-xs font-black text-white">Audit Complete</div>
                  <div className="text-[9px] text-slate-500">same-day turnaround ✓</div>
                </div>
                <div className="ml-2 w-16 h-1 rounded-full" style={{ background: 'linear-gradient(90deg,#4e9000,#6fc200)' }} />
              </div>

              {/* Card 4 — "10+ Partners" mini, bottom-left */}
              <div className="animate-float-4 absolute bottom-0 left-0 rounded-2xl px-5 py-4 z-30 shadow-xl"
                style={{ background: 'rgba(15,26,15,0.88)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.09)' }}>
                <div className="text-2xl font-black text-white mb-0.5">10+</div>
                <div className="text-[10px] text-slate-500">Processor Partners</div>
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
          background: 'linear-gradient(to bottom, transparent, #080f08)',
          zIndex: 3,
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
