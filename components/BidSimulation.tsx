'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const BIDS = [
  { name: 'Worldpay',          rate: 2.19, mo: 1861 },
  { name: 'First Data / Fiserv', rate: 2.31, mo: 1964 },
  { name: 'Elavon',            rate: 2.08, mo: 1768 },
  { name: 'TSYS',              rate: 1.93, mo: 1641 },
  { name: 'Heartland',         rate: 1.87, mo: 1590, best: true },
  { name: 'Priority Commerce', rate: 2.14, mo: 1819 },
  { name: 'Paysafe',           rate: 2.26, mo: 1921 },
  { name: 'Global Payments',   rate: 2.37, mo: 2015 },
]

const BASE = 2618 // Square/Stripe at $85k/mo

export default function BidSimulation() {
  const [visible, setVisible] = useState(0)
  const [complete, setComplete] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true; io.disconnect()
        BIDS.forEach((_, i) => {
          setTimeout(() => {
            setVisible(i + 1)
            if (i === BIDS.length - 1) setTimeout(() => setComplete(true), 700)
          }, 300 + i * 320)
        })
      }
    }, { threshold: 0.25 })
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  const annualSaved = (BASE - Math.min(...BIDS.map(b => b.mo))) * 12

  return (
    <div ref={ref}>
      <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ background: '#060c06', border: '1px solid rgba(255,255,255,0.09)', fontFamily: 'ui-monospace, monospace' }}>

        {/* macOS-style terminal titlebar */}
        <div className="flex items-center justify-between px-5 py-3.5" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,95,87,0.7)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(255,189,46,0.7)' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(39,201,63,0.7)' }} />
            </div>
            <span className="text-[11px] text-slate-600">ft5-bid-engine · live-request-2026</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4e9000] animate-pulse inline-block" />
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: '#4e9000' }}>Live</span>
          </div>
        </div>

        {/* Input summary */}
        <div className="px-5 py-4 text-[12px]" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(78,144,0,0.04)' }}>
          <span className="text-slate-600">$ </span>
          <span style={{ color: '#6fc200' }}>ft5 analyze</span>
          <span className="text-slate-500"> --statement=</span>
          <span className="text-slate-300">merchant_may2026.pdf</span>
          <span className="text-slate-600">  --volume=</span>
          <span className="text-slate-300">85000</span>
          <span className="text-slate-600">  --type=</span>
          <span className="text-slate-300">retail</span>
        </div>

        {/* Column headers */}
        <div className="hidden sm:flex px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-700" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="flex-1">Processor</div>
          <div className="w-20 text-right">Eff. Rate</div>
          <div className="w-24 text-right">Monthly</div>
          <div className="w-20 text-right">vs. Flat</div>
          <div className="w-20 text-right">Signal</div>
        </div>

        {/* Bid rows */}
        <div>
          {BIDS.map((bid, i) => {
            const show = i < visible
            const savePct = Math.round((BASE - bid.mo) / BASE * 100)
            return (
              <div
                key={bid.name}
                className="flex flex-col sm:flex-row sm:items-center px-5 py-3 transition-all duration-500"
                style={{
                  opacity: show ? 1 : 0,
                  transform: show ? 'none' : 'translateX(-12px)',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  background: bid.best && complete ? 'rgba(78,144,0,0.09)' : 'transparent',
                  boxShadow: bid.best && complete ? 'inset 2px 0 0 #4e9000' : 'none',
                }}
              >
                <div className="flex-1 text-sm font-bold" style={{ color: bid.best ? '#6fc200' : 'rgba(148,163,184,0.8)' }}>
                  {bid.name}
                </div>
                <div className="flex sm:contents gap-4 text-sm">
                  <span className="sm:w-20 sm:text-right font-mono" style={{ color: bid.best ? '#6fc200' : '#475569' }}>{bid.rate.toFixed(2)}%</span>
                  <span className="sm:w-24 sm:text-right font-bold" style={{ color: bid.best ? 'white' : '#475569' }}>${bid.mo.toLocaleString()}</span>
                  <span className="sm:w-20 sm:text-right text-xs font-bold text-emerald-500">-{savePct}%</span>
                  <span className="sm:w-20 sm:text-right text-[10px]">
                    {bid.best && complete ? (
                      <span className="px-2 py-0.5 rounded font-black" style={{ background: '#4e9000', color: 'white' }}>★ WINNER</span>
                    ) : show ? (
                      <span className="text-slate-600">received</span>
                    ) : (
                      <span className="text-slate-800">—</span>
                    )}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Completion footer */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-5 py-4 transition-all duration-700"
          style={{
            background: complete ? 'rgba(78,144,0,0.1)' : 'rgba(255,255,255,0.02)',
            borderTop: '1px solid rgba(78,144,0,0.2)',
            opacity: complete ? 1 : 0.3,
          }}
        >
          <div className="text-sm text-slate-400">
            {complete ? (
              <>Best bid selected · Annual savings identified: <span className="text-white font-black">${annualSaved.toLocaleString()}</span></>
            ) : 'Receiving bids…'}
          </div>
          <Link
            href="/get-your-savings-estimate"
            className="text-xs font-black uppercase tracking-wider transition-colors"
            style={{ color: complete ? '#6fc200' : '#2d4a1e' }}
          >
            Run This For My Business →
          </Link>
        </div>
      </div>
    </div>
  )
}
