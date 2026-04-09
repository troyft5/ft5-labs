'use client'
import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }
const inputClass = "w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all placeholder:text-slate-600"
const labelClass = "block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2"

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', businessType: '', message: '',
  })

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData(prev => ({ ...prev, [k]: e.target.value }))

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl p-10 text-center" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.25)' }}>
        <div className="text-4xl mb-4" style={{ color: '#6fc200' }}>✓</div>
        <h3 className="text-xl font-black text-white mb-2">Message Received</h3>
        <p className="text-slate-400 text-sm">A specialist will be in touch within one business day. For urgent inquiries, call (646) 941-7853.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>First Name *</label>
          <input required type="text" placeholder="John" value={formData.firstName} onChange={set('firstName')} className={inputClass} style={inputStyle} />
        </div>
        <div>
          <label className={labelClass}>Last Name</label>
          <input type="text" placeholder="Smith" value={formData.lastName} onChange={set('lastName')} className={inputClass} style={inputStyle} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Business Email *</label>
        <input required type="email" placeholder="john@yourbusiness.com" value={formData.email} onChange={set('email')} className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label className={labelClass}>Phone Number</label>
        <input type="tel" placeholder="(555) 555-5555" value={formData.phone} onChange={set('phone')} className={inputClass} style={inputStyle} />
      </div>
      <div>
        <label className={labelClass}>Business Type</label>
        <select value={formData.businessType} onChange={set('businessType')} className={inputClass} style={inputStyle}>
          <option value="" style={{ background: '#0f1a0f' }}>Select your industry...</option>
          {['Retail','E-Commerce','Healthcare','Service Business','B2B','Higher Education','Petroleum','High-Risk','CBD & Hemp','Other'].map(o => (
            <option key={o} style={{ background: '#0f1a0f' }}>{o}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Message *</label>
        <textarea required rows={4} placeholder="Tell us about your current payment setup and what you're looking to improve..." value={formData.message} onChange={set('message')} className={`${inputClass} resize-none`} style={inputStyle} />
      </div>
      {status === 'error' && (
        <div className="text-sm rounded-xl px-4 py-3" style={{ background: 'rgba(185,28,28,0.1)', border: '1px solid rgba(185,28,28,0.3)', color: '#fca5a5' }}>
          Something went wrong. Please try again or call us at (646) 941-7853.
        </div>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 text-base font-bold text-white disabled:opacity-60 rounded-xl transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
        style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.3)' }}
      >
        {status === 'loading' ? 'Sending...' : <><span>Send Message</span><ArrowRight className="w-5 h-5" /></>}
      </button>
      <p className="text-xs text-slate-500 text-center">We respond within 1 business day. No spam, ever.</p>
    </form>
  )
}
