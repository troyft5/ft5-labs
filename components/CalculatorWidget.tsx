'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BarChart2 } from 'lucide-react'

type Results = {
  vol: number
  ft5: { moLow: number; moHigh: number; moMid: number; rateLow: number; rateHigh: number }
  flat:   { mo: number; eff: number }
  ic:     { mo: number; eff: number }
  tiered: { mo: number; eff: number }
  current: { mo: number | null; eff: number | null; overpayAnnual: number | null }
  industry: string
}

const fmt = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const pct = (n: number) => n.toFixed(2) + '%'

const INDUSTRIES = [
  { value: 'retail',     label: 'Retail / In-Store' },
  { value: 'restaurant', label: 'Restaurant / Food Service' },
  { value: 'ecommerce',  label: 'E-Commerce / Online' },
  { value: 'service',    label: 'Professional Services' },
  { value: 'healthcare', label: 'Healthcare / Medical' },
  { value: 'b2b',        label: 'B2B / Wholesale' },
  { value: 'gas',        label: 'Gas Station / Convenience' },
  { value: 'education',  label: 'Education' },
  { value: 'other',      label: 'Other' },
]

const inputClass = "w-full rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:ring-1 focus:ring-[#4e9000]"
const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

export default function CalculatorWidget() {
  const [vol, setVol]           = useState(25000)
  const [avgTx, setAvgTx]       = useState(75)
  const [cp, setCp]             = useState<'in-person' | 'online' | 'mixed'>('in-person')
  const [industry, setIndustry] = useState('retail')
  const [currentFees, setCurrentFees] = useState('')

  const [loading, setLoading]   = useState(false)
  const [results, setResults]   = useState<Results | null>(null)
  const [error, setError]       = useState('')

  async function handleCalculate() {
    if (vol <= 0) { setError('Enter your monthly card sales volume.'); return }
    if (avgTx <= 0) { setError('Enter your average transaction amount.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vol, avgTx, debitPct: 30, cp, industry,
          currentFees: currentFees ? Number(currentFees) : undefined,
        }),
      })
      if (!res.ok) { setError('Calculation failed. Please try again.'); return }
      setResults(await res.json() as Results)
      setTimeout(() => document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const annualSavings = results ? Math.round((results.ic.mo - results.ft5.moMid) * 12) : 0
  const baselineMo = results ? Math.round(results.ic.mo) : 0

  return (
    <div>
      {/* ── FORM ── */}
      <div className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="grid md:grid-cols-2 gap-5">

          {/* Volume */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Monthly Card Volume</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">$</span>
              <input type="number" min={1000} max={10000000} step={1000} value={vol}
                onChange={e => setVol(Number(e.target.value))}
                className={`${inputClass} pl-7`} style={inputStyle} />
            </div>
          </div>

          {/* Avg transaction */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Average Transaction</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">$</span>
              <input type="number" min={1} max={50000} step={1} value={avgTx}
                onChange={e => setAvgTx(Number(e.target.value))}
                className={`${inputClass} pl-7`} style={inputStyle} />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className={inputClass} style={inputStyle}>
              {INDUSTRIES.map(i => <option key={i.value} value={i.value} style={{ background: '#0f1a0f' }}>{i.label}</option>)}
            </select>
          </div>

          {/* Card method */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">How You Accept Cards</label>
            <div className="flex gap-2">
              {([['in-person', 'In-Person'], ['online', 'Online'], ['mixed', 'Both']] as const).map(([v, l]) => (
                <button key={v} onClick={() => setCp(v)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-all ${cp === v ? 'text-white border-[#4e9000]' : 'text-slate-500 border-white/10 hover:border-white/20'}`}
                  style={{ background: cp === v ? 'rgba(78,144,0,0.15)' : 'rgba(255,255,255,0.03)' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Current fees (optional) */}
          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">
              Current Monthly Processing Fees <span className="text-slate-600 normal-case font-normal">(optional, shows your exact overpayment)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">$</span>
              <input type="number" min={0} max={500000} value={currentFees}
                onChange={e => setCurrentFees(e.target.value)}
                placeholder="e.g. 850"
                className={`${inputClass} pl-7`} style={inputStyle} />
            </div>
          </div>

        </div>

        {error && (
          <div className="mt-4 text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        <button onClick={handleCalculate} disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-60"
          style={{ background: '#4e9000', boxShadow: '0 8px 32px rgba(78,144,0,0.35)' }}>
          {loading
            ? <><div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Calculating...</>
            : <>Estimate My Savings <BarChart2 className="w-5 h-5" /></>}
        </button>
      </div>

      {/* ── RESULTS ── */}
      {results && (
        <div id="calc-results" className="mt-8 flex flex-col gap-5">

          {/* Headline result */}
          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.3)' }}>
            <div className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: '#6fc200' }}>
              {results.current.mo ? 'Based on your current fees' : 'FT5 Competitive Bid Estimate'}
            </div>
            <div className="text-4xl font-black text-white mb-6">
              {results.current.overpayAnnual !== null && results.current.overpayAnnual > 0
                ? <>Estimated savings: {fmt(results.current.overpayAnnual)}<span className="text-lg text-slate-500 font-normal"> /year</span></>
                : <>Estimated savings: up to {fmt(annualSavings)}<span className="text-lg text-slate-500 font-normal"> /year</span></>}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <div>
                <div className="text-2xl font-black text-white">{fmt(results.ft5.moMid)}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                <div className="text-xs text-slate-500 mt-0.5">FT5 estimated cost</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{pct(results.ft5.rateLow)}–{pct(results.ft5.rateHigh)}</div>
                <div className="text-xs text-slate-500 mt-0.5">Target effective rate</div>
              </div>
              {results.current.mo ? (
                <div>
                  <div className="text-2xl font-black text-red-400">{fmt(results.current.mo)}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">What you pay now</div>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-black text-slate-400">{fmt(baselineMo)}<span className="text-sm text-slate-500 font-normal">/mo</span></div>
                  <div className="text-xs text-slate-500 mt-0.5">Typical processor cost</div>
                </div>
              )}
            </div>
            <p className="text-[10px] text-slate-600 mt-6 leading-relaxed">
              Estimate based on published interchange tables and real partner pricing. A free statement analysis gives exact figures.
            </p>
          </div>

          {/* CTA */}
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)' }}>
            <div>
              <div className="text-lg font-black text-white mb-1">Want the exact number?</div>
              <div className="text-sm text-slate-400">Send us your statement. Full line-by-line audit, usually in about 15 minutes. Free.</div>
            </div>
            <Link
              href={`/get-your-savings-estimate?source=calculator&industry=${industry}&volume=${vol}&avg_tx=${avgTx}&card_method=${cp}`}
              className="flex items-center gap-2 px-8 py-4 text-sm font-black text-white rounded-xl whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5"
              style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.4)' }}>
              Get Your Free Audit <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}
    </div>
  )
}
