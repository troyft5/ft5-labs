"use client"

import { useState } from 'react'
import { Calculator, ArrowRight, ShieldCheck } from 'lucide-react'

export default function Estimate() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate form submission to database
    setTimeout(() => setStatus('success'), 1500)
  }

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl mb-6 shadow-sm">
            <Calculator className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
            Get Your <span className="text-brand-600">Savings Estimate</span>
          </h1>
          <p className="text-lg text-slate-600">Upload your statement or provide a few details, and our consultants will calculate exactly how much you can save.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200">
          {status === 'success' ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 text-green-600 rounded-full mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Request Received</h3>
              <p className="text-slate-600">Our consultants are reviewing your details and will reach out shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">First Name *</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-slate-700">Last Name *</label>
                  <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" />
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Business Name *</label>
                <input type="text" required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700">Estimated Monthly Processing Volume</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-900 focus:border-brand-600 focus:ring-1 focus:ring-brand-600 outline-none transition-all">
                  <option>Under $10,000</option>
                  <option>$10,000 - $50,000</option>
                  <option>$50,000 - $250,000</option>
                  <option>$250,000+</option>
                </select>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 mt-4 bg-brand-600 hover:bg-brand-700 text-white rounded-lg font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {status === 'loading' ? 'Submitting...' : 'Request Estimate'} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
