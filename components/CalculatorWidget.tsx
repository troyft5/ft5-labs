'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingDown, BarChart2, Info, ChevronDown, ChevronUp } from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────────────────────────

type Results = {
  vol: number; avgTx: number; debitPct: number; cp: string; industry: string
  bench: { name: string; avgRate: { low: number; mid: number; high: number }; avgTicket: number; debitMix: number; netMargin: number; dpFit: string; dpNote: string; percentile: number }
  flat:   { mo: number; annual: number; eff: number }
  ic:     { mo: number; annual: number; eff: number; effectiveIC: number; ASSESSMENT: number; markup: number }
  tiered: { mo: number; annual: number; eff: number; tq: number; tmq: number; tnq: number }
  ft5:    { moLow: number; moHigh: number; moMid: number; rateLow: number; rateHigh: number; markupLow: number; markupHigh: number }
  dual:   { mo: number; eff: number; customer: number; fit: string; note: string }
  current: { mo: number | null; eff: number | null; overpayMo: number | null; overpayAnnual: number | null }
  winner: { key: string; mo: number; eff: number }
  loser:  { key: string; mo: number; eff: number }
  profit: { margin: number; processCostPctProfit: number; ft5SaveAnnual: number; ft5SavePctProfit: number; estAnnualProfit: number }
  junkFees: { id: string; name: string; range: string; note: string }[]
  intelTips: { key: string; title: string; body: string; badge: string }[]
  b2b: { l2SaveMo: number; l3SaveMo: number } | null
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const fmt  = (n: number) => '$' + Math.round(n).toLocaleString('en-US')
const pct  = (n: number) => n.toFixed(3) + '%'
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

// ─── INPUT ───────────────────────────────────────────────────────────────────

function NumInput({ label, value, onChange, prefix = '', suffix = '', min = 0, max = 10000000, step = 1, help }: {
  label: string; value: number; onChange: (v: number) => void
  prefix?: string; suffix?: string; min?: number; max?: number; step?: number; help?: string
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</label>
        {help && <span className="text-[10px] text-slate-600">{help}</span>}
      </div>
      <div className="relative">
        {prefix && <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">{prefix}</span>}
        <input
          type="number" min={min} max={max} step={step} value={value}
          onChange={e => onChange(Number(e.target.value))}
          className={`w-full rounded-xl py-3 text-white text-sm font-bold outline-none focus:ring-1 focus:ring-[#4e9000] ${prefix ? 'pl-7 pr-4' : suffix ? 'pl-4 pr-7' : 'px-4'}`}
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
        />
        {suffix && <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 text-sm font-bold">{suffix}</span>}
      </div>
    </div>
  )
}

// ─── RESULTS PANELS ──────────────────────────────────────────────────────────

function ModelCard({ name, mo, eff, isWinner, label }: { name: string; mo: number; eff: number; isWinner: boolean; label?: string }) {
  return (
    <div className={`rounded-2xl p-5 flex flex-col gap-3 relative ${isWinner ? 'ring-1 ring-[#4e9000]' : ''}`}
      style={{ background: isWinner ? 'rgba(78,144,0,0.08)' : 'rgba(255,255,255,0.03)', border: isWinner ? '1px solid rgba(78,144,0,0.3)' : '1px solid rgba(255,255,255,0.07)' }}>
      {isWinner && (
        <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[10px] font-black uppercase"
          style={{ background: '#4e9000', color: '#fff' }}>Best traditional</div>
      )}
      {label && !isWinner && (
        <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full text-[10px] font-black uppercase"
          style={{ background: '#0a1208', color: '#6fc200', border: '1px solid rgba(78,144,0,0.4)' }}>{label}</div>
      )}
      <div className="text-sm font-black text-white">{name}</div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Monthly</span><span className="font-bold text-slate-200">{fmt(mo)}</span>
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Annual</span><span className="font-bold text-slate-200">{fmt(mo * 12)}</span>
      </div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>Eff. Rate</span><span className="font-bold" style={{ color: '#6fc200' }}>{pct(eff)}</span>
      </div>
    </div>
  )
}

function BarRow({ label, cost, maxCost, cls, chip }: { label: string; cost: number; maxCost: number; cls: string; chip?: string }) {
  const w = Math.max(18, (cost / maxCost) * 100)
  const barColors: Record<string, string> = {
    flat: '#475569', ic: '#3b82f6', tiered: '#f59e0b', ft5: '#4e9000', current: '#ef4444'
  }
  return (
    <div className="flex items-center gap-3">
      <div className="w-28 text-xs text-slate-500 shrink-0 text-right">{label}</div>
      <div className="flex-1 relative h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
          style={{ width: `${w}%`, background: barColors[cls] ?? '#4e9000', opacity: 0.85 }}>
          <span className="text-xs font-black text-white">{fmt(cost)}</span>
        </div>
      </div>
      {chip && <div className="text-[10px] font-black px-2 py-0.5 rounded-full shrink-0" style={{ background: 'rgba(78,144,0,0.2)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.3)' }}>{chip}</div>}
    </div>
  )
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function CalculatorWidget() {
  // Form state
  const [vol, setVol]             = useState(25000)
  const [avgTx, setAvgTx]         = useState(75)
  const [debitPct, setDebitPct]   = useState(30)
  const [cp, setCp]               = useState<'in-person' | 'online' | 'mixed'>('in-person')
  const [industry, setIndustry]   = useState('retail')
  const [mode, setMode]           = useState<'estimate' | 'analyze'>('estimate')
  const [currentFees, setCurrentFees] = useState(0)

  const [loading, setLoading]     = useState(false)
  const [results, setResults]     = useState<Results | null>(null)
  const [error, setError]         = useState('')

  // Junk fee checker state
  const [checkedFees, setCheckedFees] = useState<Set<string>>(new Set())
  const [showIntel, setShowIntel] = useState(false)

  async function handleCalculate() {
    if (vol <= 0) { setError('Enter your monthly card sales volume.'); return }
    if (avgTx <= 0) { setError('Enter your average transaction amount.'); return }
    if (mode === 'analyze' && currentFees <= 0) { setError('Enter your current monthly processing fees.'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vol, avgTx, debitPct, cp, industry, currentFees: mode === 'analyze' ? currentFees : undefined }),
      })
      if (!res.ok) { setError('Calculation failed. Please try again.'); return }
      const data = await res.json() as Results
      setResults(data)
      setTimeout(() => {
        document.getElementById('calc-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full rounded-xl px-4 py-3 text-white text-sm font-bold outline-none focus:ring-1 focus:ring-[#4e9000]"
  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }

  return (
    <div>
      {/* ── FORM ─────────────────────────────────────── */}
      <div className="rounded-2xl p-6 md:p-8" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.08)' }}>

        {/* Mode toggle */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {(['estimate', 'analyze'] as const).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-sm font-black rounded-lg transition-all ${mode === m ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
              style={mode === m ? { background: '#4e9000' } : {}}>
              {m === 'estimate' ? 'Estimate My Costs' : 'Analyze Overpayment'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <NumInput label="Monthly Card Volume" value={vol} onChange={setVol} prefix="$" help="cards only" min={1000} max={10000000} step={1000} />
          <NumInput label="Average Transaction" value={avgTx} onChange={setAvgTx} prefix="$" min={1} max={50000} step={1} />
          <NumInput label="Debit Card Mix" value={debitPct} onChange={v => setDebitPct(Math.min(80, Math.max(0, v)))} suffix="%" min={0} max={80} help="% of volume" />

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 block">Industry</label>
            <select value={industry} onChange={e => setIndustry(e.target.value)} className={inputClass} style={inputStyle}>
              {INDUSTRIES.map(i => <option key={i.value} value={i.value} style={{ background: '#0f1a0f' }}>{i.label}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Card Acceptance Method</label>
            <div className="flex gap-2">
              {([['in-person', 'In-Person'], ['online', 'Online / E-Commerce'], ['mixed', 'Both']] as const).map(([v, l]) => (
                <button key={v} onClick={() => setCp(v)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-xl border transition-all ${cp === v ? 'text-white border-[#4e9000]' : 'text-slate-500 border-white/10 hover:border-white/20'}`}
                  style={{ background: cp === v ? 'rgba(78,144,0,0.15)' : 'rgba(255,255,255,0.03)' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {mode === 'analyze' && (
            <>
              <NumInput label="Current Monthly Processing Fees" value={currentFees} onChange={setCurrentFees} prefix="$" help="from your statement" min={0} max={500000} />
              {currentFees > 0 && vol > 0 && (
                <div className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">Your Current Eff. Rate</div>
                    <div className={`text-2xl font-black ${(currentFees/vol)*100 > 3.2 ? 'text-red-400' : (currentFees/vol)*100 > 2.5 ? 'text-amber-400' : 'text-green-400'}`}>
                      {((currentFees / vol) * 100).toFixed(3)}%
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {error && (
          <div className="mt-4 text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)', color: '#fca5a5' }}>
            {error}
          </div>
        )}

        <button onClick={handleCalculate} disabled={loading}
          className="w-full mt-6 flex items-center justify-center gap-3 py-4 rounded-xl font-black text-white text-base transition-all hover:-translate-y-0.5 disabled:opacity-60"
          style={{ background: '#4e9000', boxShadow: '0 8px 32px rgba(78,144,0,0.35)' }}>
          {loading ? (
            <><div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />Calculating...</>
          ) : (
            <>{mode === 'analyze' ? 'Analyze My Overpayment' : 'Analyze My Costs'}<BarChart2 className="w-5 h-5" /></>
          )}
        </button>
      </div>

      {/* ── RESULTS ──────────────────────────────────── */}
      {results && (
        <div id="calc-results" className="mt-8 flex flex-col gap-6">

          {/* Overpay banner (analyze mode) */}
          {results.current.mo && results.current.overpayAnnual !== null && results.current.overpayAnnual > 0 && (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-2">Statement Analysis</div>
              <div className="text-2xl font-black text-white mb-1">
                You&apos;re overpaying ~{fmt(results.current.overpayAnnual)}/year
              </div>
              <div className="text-sm text-slate-400">
                Current eff. rate: <strong className="text-red-400">{pct(results.current.eff!)}</strong> vs. FT5 estimated: <strong className="text-green-400">{pct(results.ft5.rateLow)}–{pct(results.ft5.rateHigh)}</strong>
              </div>
            </div>
          )}

          {/* Bar chart */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-5">Monthly Cost Comparison</div>
            <div className="flex flex-col gap-3">
              {(() => {
                const rows = [
                  { label: 'Flat Rate',       cost: results.flat.mo,    cls: 'flat' },
                  { label: 'Interchange+',    cost: results.ic.mo,      cls: 'ic' },
                  { label: 'Tiered',          cost: results.tiered.mo,  cls: 'tiered' },
                  { label: 'FT5 Bid Est.',    cost: results.ft5.moMid,  cls: 'ft5', chip: 'FT5 Est.' },
                  ...(results.current.mo ? [{ label: 'Currently Paying', cost: results.current.mo, cls: 'current' }] : []),
                ].sort((a, b) => b.cost - a.cost)
                const maxCost = Math.max(...rows.map(r => r.cost)) * 1.08
                return rows.map(r => <BarRow key={r.label} {...r} maxCost={maxCost} />)
              })()}
            </div>
          </div>

          {/* Model cards */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Pricing Model Breakdown</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <ModelCard name="Flat Rate"        mo={results.flat.mo}   eff={results.flat.eff}   isWinner={results.winner.key === 'flat'} />
              <ModelCard name="Interchange Plus" mo={results.ic.mo}     eff={results.ic.eff}     isWinner={results.winner.key === 'ic'} />
              <ModelCard name="Tiered"           mo={results.tiered.mo} eff={results.tiered.eff} isWinner={results.winner.key === 'tiered'} />
            </div>
            {/* FT5 card */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.3)' }}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#6fc200' }}>FinTech 5 Competitive Bid Estimate</div>
                  <div className="text-lg font-black text-white">What 10+ processors competing looks like</div>
                  <div className="text-sm text-slate-400 mt-1">
                    Market markup: ~{results.ic.markup.toFixed(2)}% → FT5 target: {results.ft5.markupLow.toFixed(2)}–{results.ft5.markupHigh.toFixed(2)}%
                  </div>
                </div>
                <div className="flex gap-6 shrink-0">
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: '#6fc200' }}>{fmt(results.ft5.moMid)}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Est. Monthly</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black" style={{ color: '#6fc200' }}>{fmt((results.ic.mo - results.ft5.moMid) * 12)}</div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider">Est. Annual Savings vs. IC+</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Est. Eff. Rate Range', val: `${pct(results.ft5.rateLow)} – ${pct(results.ft5.rateHigh)}` },
                  { label: 'Est. Monthly Range',   val: `${fmt(results.ft5.moLow)} – ${fmt(results.ft5.moHigh)}` },
                  { label: 'Est. Annual Savings',  val: `${fmt((results.ic.mo - results.ft5.moMid) * 12)} – ${fmt((results.ic.mo - results.ft5.moLow) * 12)}` },
                ].map(c => (
                  <div key={c.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">{c.label}</div>
                    <div className="text-sm font-black text-white">{c.val}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-600 mt-4 leading-relaxed">
                Interchange and assessments pass through at cost. FT5 compresses the processor markup through blind competitive bidding. These estimates use published interchange tables and real partner pricing. A free statement analysis delivers exact figures.
              </p>
            </div>
          </div>

          {/* Benchmark */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">{results.bench.name} — Industry Benchmarks</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
              {[
                { label: 'Rate Range',     val: `${results.bench.avgRate.low}%–${results.bench.avgRate.high}%` },
                { label: 'Industry Avg',   val: `${results.bench.avgRate.mid}%` },
                { label: 'Typical Ticket', val: `$${results.bench.avgTicket}` },
                { label: 'Typical Debit',  val: `${results.bench.debitMix}%` },
              ].map(s => (
                <div key={s.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className="text-xs font-black text-white">{s.val}</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-slate-400">
              {results.bench.percentile >= 70
                ? <><strong className="text-green-400">Your best estimated rate beats {results.bench.percentile}%</strong> of {results.bench.name} businesses.</>
                : results.bench.percentile >= 40
                ? <>Your rate is <strong className="text-amber-400">near the industry average</strong> for {results.bench.name}. Significant improvement is likely.</>
                : <>Your estimated rate is <strong className="text-red-400">in the costliest {100 - results.bench.percentile}%</strong> of {results.bench.name} businesses.</>
              }
            </div>
          </div>

          {/* Profitability impact */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Profitability Impact — {results.bench.name} (~{results.bench.netMargin}% net margin)</div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Processing Cost % of Revenue', val: `${((results.ic.mo * 12) / (results.vol * 12) * 100).toFixed(2)}%`, color: 'text-slate-300' },
                { label: 'Processing Cost % of Profit',  val: `${results.profit.processCostPctProfit.toFixed(1)}%`,              color: 'text-amber-400' },
                { label: 'FT5 Savings = Profit Increase', val: `+${results.profit.ft5SavePctProfit.toFixed(1)}%`,                color: 'text-green-400' },
              ].map(c => (
                <div key={c.label} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <div className={`text-2xl font-black mb-1 ${c.color}`}>{c.val}</div>
                  <div className="text-xs text-slate-500 leading-tight">{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3-year projection */}
          {(results.ic.mo - results.ft5.moMid) * 12 > 0 && (() => {
            const annSav = (results.ic.mo - results.ft5.moMid) * 12
            const y3 = annSav * 3
            return (
              <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Cumulative Savings Projection</div>
                <div className="flex items-end gap-4 h-28 mb-3">
                  {[1, 2, 3].map(yr => {
                    const h = Math.round((yr / 3) * 100)
                    return (
                      <div key={yr} className="flex-1 flex flex-col items-center gap-2">
                        <div className="text-sm font-black" style={{ color: '#6fc200' }}>{fmt(annSav * yr)}</div>
                        <div className="w-full rounded-t-lg" style={{ height: `${h}%`, background: 'linear-gradient(to top, #2d5500, #4e9000)', minHeight: 20 }} />
                        <div className="text-[10px] text-slate-500">Year {yr}</div>
                      </div>
                    )
                  })}
                </div>
                <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <span className="text-sm text-slate-400">3-Year Total Estimated Savings</span>
                  <span className="text-xl font-black" style={{ color: '#6fc200' }}>{fmt(y3)}</span>
                </div>
              </div>
            )
          })()}

          {/* B2B Level II/III */}
          {results.b2b && (
            <div className="rounded-2xl p-6" style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.2)' }}>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-4">B2B Level II / III — Additional Savings Opportunity</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Level II Savings Est.',     val: `${fmt(results.b2b.l2SaveMo)}/mo`,                           sub: '~0.50–1.00% off interchange on corporate cards' },
                  { label: 'Level III Savings Est.',    val: `${fmt(results.b2b.l3SaveMo)}/mo`,                           sub: 'Additional 0.40–0.70% on purchasing/govt cards' },
                  { label: 'Combined Annual Potential', val: `${fmt((results.b2b.l2SaveMo + results.b2b.l3SaveMo) * 12)}/yr`, sub: 'If Level II/III data not currently being sent' },
                  { label: 'ACH Alternative',           val: '~$0.50/tx',                                                 sub: 'For large B2B invoices vs. 2–3% card cost' },
                ].map(c => (
                  <div key={c.label} className="rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="text-base font-black text-white mb-0.5">{c.val}</div>
                    <div className="text-[10px] text-slate-500 leading-tight">{c.label}</div>
                    <div className="text-[10px] text-blue-400 mt-1 leading-tight">{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Junk fee scanner */}
          <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Junk Fee Scanner</div>
            <p className="text-xs text-slate-600 mb-4">Check any fees appearing on your statement. Most of these are negotiable or removable.</p>
            <div className="flex flex-col gap-2 mb-4">
              {results.junkFees.map(f => {
                const checked = checkedFees.has(f.id)
                return (
                  <button key={f.id}
                    onClick={() => setCheckedFees(prev => { const n = new Set(prev); checked ? n.delete(f.id) : n.add(f.id); return n })}
                    className="flex items-start gap-3 p-3 rounded-xl text-left transition-all"
                    style={{ background: checked ? 'rgba(78,144,0,0.1)' : 'rgba(255,255,255,0.02)', border: `1px solid ${checked ? 'rgba(78,144,0,0.3)' : 'rgba(255,255,255,0.06)'}` }}>
                    <div className={`w-5 h-5 rounded-md mt-0.5 shrink-0 flex items-center justify-center border ${checked ? 'border-[#4e9000]' : 'border-white/20'}`}
                      style={{ background: checked ? '#4e9000' : 'transparent' }}>
                      {checked && <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="white" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-slate-200">{f.name}</div>
                      <div className="text-[11px] text-slate-600 mt-0.5">{f.note}</div>
                    </div>
                    <div className="text-xs font-bold shrink-0" style={{ color: '#6fc200' }}>{f.range}</div>
                  </button>
                )
              })}
            </div>
            {checkedFees.size >= 2 && (
              <div className="rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)' }}>
                <div>
                  <div className="text-sm font-black text-white mb-0.5">You flagged {checkedFees.size} potential hidden fees</div>
                  <div className="text-xs text-slate-400">Send us your statement — we&apos;ll identify the exact dollar amounts and what&apos;s negotiable.</div>
                </div>
                <Link href={`/get-your-savings-estimate?source=calculator&fees_flagged=${checkedFees.size}&industry=${industry}&volume=${vol}`}
                  className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-white rounded-xl whitespace-nowrap shrink-0 transition-all hover:-translate-y-0.5"
                  style={{ background: '#4e9000' }}>
                  Get Your Free Audit <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Industry intel */}
          {results.intelTips.length > 0 && (
            <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
              <button onClick={() => setShowIntel(v => !v)}
                className="w-full flex items-center justify-between p-5"
                style={{ background: 'rgba(255,255,255,0.025)' }}>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-0.5">Industry Intelligence</div>
                  <div className="text-sm font-black text-white">{results.bench.name} — Cost Reduction Opportunities</div>
                </div>
                {showIntel ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
              </button>
              {showIntel && (
                <div className="flex flex-col divide-y" style={{ borderTop: '1px solid rgba(255,255,255,0.06)', divideColor: 'rgba(255,255,255,0.04)' }}>
                  {results.intelTips.map(t => (
                    <div key={t.key} className="flex items-start gap-4 p-5" style={{ background: 'rgba(255,255,255,0.01)' }}>
                      <div className="w-5 h-5 rounded-full shrink-0 mt-0.5 flex items-center justify-center" style={{ background: 'rgba(78,144,0,0.2)' }}>
                        <Info className="w-3 h-3" style={{ color: '#6fc200' }} />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-black text-white mb-1">{t.title}</div>
                        <div className="text-xs text-slate-400 leading-relaxed">{t.body}</div>
                      </div>
                      <div className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0 whitespace-nowrap"
                        style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200', border: '1px solid rgba(78,144,0,0.2)' }}>{t.badge}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)' }}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: '#6fc200' }}>Want the exact number?</div>
              <div className="text-xl font-black text-white mb-1">Send us your statement. 48 hours. Free.</div>
              <div className="text-sm text-slate-400">These are estimates. A real audit gives you exact figures with competitive bids from 10+ processors.</div>
            </div>
            <Link
              href={`/get-your-savings-estimate?source=calculator&industry=${industry}&volume=${vol}&avg_tx=${avgTx}&card_method=${cp}&est_rate=${results.ic.eff.toFixed(3)}&est_savings=${Math.round((results.ic.mo - results.ft5.moMid) * 12)}`}
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
