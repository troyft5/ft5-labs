'use client'

import { useState, useEffect } from 'react'
import { TrendingDown, AlertTriangle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CostOfWaitingWidget() {
  const [monthlyLoss, setMonthlyLoss] = useState(1500)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Calculate cumulative loss
  const yr1 = monthlyLoss * 12
  const yr3 = monthlyLoss * 12 * 3
  const yr5 = monthlyLoss * 12 * 5

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val)
  }

  // Max scale is $10k/month * 12 * 5 = $600k
  // To make bars relative, we use yr5 as the 100% width basis
  const progressPercent = (val: number, max: number) => {
    return Math.max(10, Math.min(100, (val / max) * 100))
  }
  
  // The absolute max we want the scale bar to ever represent in width is basically yr5 at current monthlyLoss
  // but to keep proportions nice, we just scale relative to yr5.
  const maxWidthBasis = Math.max(yr5, 100000)

  return (
    <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#0a1208', border: '1px solid rgba(239,68,68,0.2)' }}>
      {/* Header */}
      <div className="p-6 md:p-8 flex items-center justify-between gap-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(239,68,68,0.1)', color: '#ef4444' }}>
            <TrendingDown className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white leading-none mb-1">The Cost of Waiting</h3>
            <p className="text-sm text-slate-400">See how fast hidden fees destroy equity</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-8 grid md:grid-cols-[1fr_2fr] gap-10 lg:gap-16">
        
        {/* Left: Input */}
        <div>
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 block flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
            Estimated Monthly Overpayment
          </label>
          <div className="text-4xl font-black text-white mb-4">
            {formatCurrency(monthlyLoss)}<span className="text-xl text-slate-500">/mo</span>
          </div>

          <input 
            type="range"
            min="100"
            max="15000"
            step="100"
            value={monthlyLoss}
            onChange={(e) => setMonthlyLoss(parseInt(e.target.value))}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-6"
            style={{ 
              background: `linear-gradient(to right, #ef4444 ${(monthlyLoss/15000)*100}%, rgba(255,255,255,0.1) ${(monthlyLoss/15000)*100}%)`,
            }}
          />
          <style dangerouslySetInnerHTML={{__html: `
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              background: #fff;
              border: 2px solid #ef4444;
              box-shadow: 0 0 10px rgba(239,68,68,0.5);
              cursor: pointer;
            }
          `}} />

          <p className="text-xs text-slate-500 leading-relaxed mb-6">
            Even minor rate padding compounds heavily. Move the slider to match your estimated savings from the calculator.
          </p>

          <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 font-bold text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#ef4444', boxShadow: '0 8px 24px rgba(239,68,68,0.25)' }}>
            Stop the Bleeding <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Right: Charts */}
        <div className="flex flex-col justify-center gap-6">
          {[
            { label: 'Lost in 1 Year', val: yr1, color: '#fca5a5' },
            { label: 'Lost in 3 Years', val: yr3, color: '#f87171' },
            { label: 'Lost in 5 Years', val: yr5, color: '#ef4444' }
          ].map(row => (
            <div key={row.label}>
              <div className="flex items-end justify-between font-bold mb-2">
                <span className="text-sm text-slate-400">{row.label}</span>
                <span className="text-lg text-white font-black" style={{ color: row.color }}>{formatCurrency(row.val)}</span>
              </div>
              <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                <div 
                  className="h-full rounded-full transition-all duration-300 ease-out" 
                  style={{ 
                    width: `${progressPercent(row.val, maxWidthBasis)}%`, 
                    background: row.color,
                    boxShadow: `0 0 10px ${row.color}40`
                  }} 
                />
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </div>
  )
}
