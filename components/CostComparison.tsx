'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const BARS = [
  { label: 'Flat Rate (typical)',       sub: '2.6%–2.9% flat',  mo: 2618, yr: 31416, w: 100, color: '#64748b' },
  { label: 'Tiered Pricing (typical)',  sub: 'Qual/MQ/NQ tiers', mo: 2238, yr: 26856, w: 85,  color: '#ef4444' },
  { label: 'Interchange Plus (market)', sub: 'IC + ~0.35%',      mo: 1893, yr: 22716, w: 72,  color: '#f59e0b' },
  { label: 'FT5 Competitive Bid',       sub: 'IC + 0.10%–0.18%',mo: 1603, yr: 19236, w: 61,  color: '#4e9000', best: true },
]

function fmt(n: number) { return '$' + n.toLocaleString() }

export default function CostComparison() {
  const [on, setOn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }, { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const annual_waste = BARS[0].yr - BARS[3].yr // $12,180

  return (
    <div ref={ref} className="w-full">

      {/* Volume pill */}
      <div className="flex flex-wrap items-center gap-4 mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)', color: '#6fc200' }}>
          ⚡ Based on $85,000/month volume
        </div>
        <span className="text-sm text-slate-500">Use our <Link href="/calculator" className="underline underline-offset-2 hover:text-slate-300 transition-colors">calculator</Link> to see your exact numbers</span>
      </div>

      {/* Bars */}
      <div className="flex flex-col gap-4 mb-10">
        {BARS.map((bar, i) => (
          <div key={bar.label} className="group">
            <div className="flex items-center gap-4 mb-1.5">
              <div className="flex-1 flex items-center gap-3">
                <div className="text-sm font-bold text-slate-200">{bar.label}</div>
                {bar.best && <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider" style={{ background: '#4e9000', color: 'white' }}>Target</span>}
              </div>
              <div className="text-right shrink-0">
                <span className="text-lg font-black" style={{ color: bar.best ? '#6fc200' : 'white' }}>{fmt(bar.mo)}</span>
                <span className="text-slate-600 text-sm">/mo</span>
              </div>
            </div>
            <div className="relative h-10 rounded-xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
              <div
                className="h-full rounded-xl transition-all ease-out"
                style={{
                  width: on ? `${bar.w}%` : '0%',
                  transitionDuration: '1200ms',
                  transitionDelay: `${i * 180}ms`,
                  background: bar.best
                    ? 'linear-gradient(90deg,#2d5500,#4e9000,#6fc200)'
                    : `linear-gradient(90deg,${bar.color}55,${bar.color})`,
                  boxShadow: bar.best ? '0 0 20px rgba(78,144,0,0.4)' : 'none',
                }}
              />
            </div>
            <div className="flex justify-between mt-1 px-0.5">
              <span className="text-[11px] text-slate-600">{bar.sub}</span>
              <span className="text-[11px] text-slate-600">{fmt(bar.yr)}/yr</span>
            </div>
          </div>
        ))}
      </div>

      {/* Waste callout */}
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-1">Potential Annual Overpayment</div>
          <div className="text-3xl font-black text-white">{fmt(annual_waste)}<span className="text-slate-500 text-base font-normal">/year</span></div>
          <div className="text-sm text-slate-500 mt-0.5">vs. a competitively bid interchange-plus rate</div>
        </div>
        <Link
          href="/get-your-savings-estimate"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5"
          style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.3)' }}
        >
          See My Numbers →
        </Link>
      </div>
    </div>
  )
}
