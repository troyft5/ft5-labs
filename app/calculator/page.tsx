"use client"

import { useState } from 'react'
import { Calculator as CalcIcon, DollarSign, TrendingDown } from 'lucide-react'
import Link from 'next/link'

export default function Calculator() {
  const [volume, setVolume] = useState<number>(50000)
  const [currentRate, setCurrentRate] = useState<number>(2.9)
  
  // FinTech 5 estimated rate (example logic)
  const estimatedNewRate = 2.1
  
  const currentMonthlyFee = (volume * currentRate) / 100
  const newMonthlyFee = (volume * estimatedNewRate) / 100
  const monthlySavings = currentMonthlyFee - newMonthlyFee
  const yearlySavings = monthlySavings * 12

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl mb-6 shadow-sm">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
            Processing Fee <span className="text-blue-600">Calculator</span>
          </h1>
          <p className="text-lg text-slate-600">See exactly how much you are losing to hidden markup fees every month.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 grid md:grid-cols-2 gap-12 items-center">
          
          {/* Input Controls */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Monthly Processing Volume</label>
                <span className="font-mono font-bold text-blue-600">${volume.toLocaleString()}</span>
              </div>
              <input 
                type="range" 
                min="5000" max="500000" step="5000"
                value={volume} 
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wider">Current Average Rate (%)</label>
                <span className="font-mono font-bold text-slate-900">{currentRate.toFixed(2)}%</span>
              </div>
              <input 
                type="range" 
                min="1.0" max="4.5" step="0.1"
                value={currentRate} 
                onChange={(e) => setCurrentRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
            </div>
            
            <p className="text-xs text-slate-500 italic">
              * This calculator provides an estimate based on industry averages. True savings require a full statement analysis.
            </p>
          </div>

          {/* Results Dashboard */}
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex flex-col items-center text-center">
            <TrendingDown className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Estimated Yearly Savings</h3>
            <div className="text-5xl font-black text-green-500 mb-6 font-mono tracking-tighter">
              ${yearlySavings.toLocaleString(undefined, {maximumFractionDigits: 0})}
            </div>
            
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-xs text-slate-500 uppercase font-bold mb-1">You Pay Now</div>
                <div className="font-mono font-bold text-slate-900">${currentMonthlyFee.toLocaleString()}/mo</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm border-l-4 border-l-blue-500">
                <div className="text-xs text-blue-600 uppercase font-bold mb-1">With FinTech 5</div>
                <div className="font-mono font-bold text-blue-600">${newMonthlyFee.toLocaleString()}/mo</div>
              </div>
            </div>

            <Link href="/get-your-savings-estimate" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold shadow-md transition-all">
              Get a Precise Audit
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
