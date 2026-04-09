'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-brand-50 border border-brand-200 rounded-2xl p-10 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h3 className="text-xl font-black text-brand-700 mb-2">Message Received</h3>
        <p className="text-brand-600 text-sm">A specialist will be in touch within one business day. For urgent inquiries, call (646) 941-7853.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">First Name</label>
          <input required type="text" placeholder="John" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Last Name</label>
          <input required type="text" placeholder="Smith" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Business Email</label>
        <input required type="email" placeholder="john@yourbusiness.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Phone Number</label>
        <input type="tel" placeholder="(555) 555-5555" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all" />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Business Type</label>
        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all">
          <option value="">Select your industry...</option>
          <option>Retail</option>
          <option>E-Commerce</option>
          <option>Healthcare</option>
          <option>Service Business</option>
          <option>B2B</option>
          <option>Higher Education</option>
          <option>Petroleum</option>
          <option>High-Risk</option>
          <option>CBD &amp; Hemp</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Message</label>
        <textarea required rows={4} placeholder="Tell us about your current payment setup and what you're looking to improve..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none" />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 disabled:opacity-60 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
      >
        {loading ? 'Sending...' : <><span>Send Message</span><ArrowRight className="w-5 h-5" /></>}
      </button>
      <p className="text-xs text-slate-400 text-center">We respond within 1 business day. No spam, ever.</p>
    </form>
  )
}
