"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, ShieldCheck, Fingerprint, AlertTriangle, CheckCircle2 } from 'lucide-react'

export default function Auth() {
  const router = useRouter()
  const [id, setId] = useState('')
  const [passkey, setPasskey] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate a backend network request
    setTimeout(() => {
      if (id === 'admin' && passkey === 'ft5-secure') {
        setStatus('success')
        // Redirect to architecture page after successful login
        setTimeout(() => router.push('/architecture'), 1500)
      } else {
        setStatus('error')
      }
    }, 1200)
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-12 pb-24 max-w-lg mx-auto min-h-[70vh]">
      <div className={`w-full border bg-black/50 backdrop-blur-xl p-8 relative transition-colors duration-300 ${
        status === 'error' ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]' : 
        status === 'success' ? 'border-green-500/50 shadow-[0_0_30px_rgba(34,197,94,0.1)]' : 
        'border-cyan-400/30 shadow-[0_0_30px_rgba(0,255,255,0.05)]'
      }`}>
        
        {/* Corner Accents */}
        <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : 'border-cyan-400'}`}></div>
        <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : 'border-cyan-400'}`}></div>
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : 'border-cyan-400'}`}></div>
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${status === 'error' ? 'border-red-500' : status === 'success' ? 'border-green-500' : 'border-cyan-400'}`}></div>

        <div className="flex flex-col items-center mb-8">
          <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-4 transition-colors ${
            status === 'error' ? 'bg-red-500/5 border-red-500/30' : 
            status === 'success' ? 'bg-green-500/5 border-green-500/30' : 
            'bg-cyan-400/5 border-cyan-400/30'
          }`}>
            {status === 'error' ? <AlertTriangle className="w-8 h-8 text-red-500" /> : 
             status === 'success' ? <CheckCircle2 className="w-8 h-8 text-green-500" /> : 
             <ShieldCheck className="w-8 h-8 text-cyan-400" />}
          </div>
          <h2 className="font-sans text-2xl font-black uppercase tracking-widest text-white">Client_Auth</h2>
          <p className="text-[10px] text-slate-500 tracking-[0.2em] uppercase mt-2">
            {status === 'error' ? <span className="text-red-500">Access Denied</span> :
             status === 'success' ? <span className="text-green-500">Handshake Verified</span> :
             'Level 5 Access Required'}
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Cryptographic ID</label>
            <input 
              type="text" 
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Try: admin" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-black border border-slate-700 text-white p-3 text-sm font-mono focus:border-cyan-400 focus:outline-none disabled:opacity-50 transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 tracking-widest uppercase">Passkey</label>
            <input 
              type="password" 
              value={passkey}
              onChange={(e) => setPasskey(e.target.value)}
              placeholder="Try: ft5-secure" 
              disabled={status === 'loading' || status === 'success'}
              className="w-full bg-black border border-slate-700 text-white p-3 text-sm font-mono focus:border-cyan-400 focus:outline-none disabled:opacity-50 transition-colors"
            />
          </div>
          <button 
            type="submit" 
            disabled={status === 'loading' || status === 'success' || !id || !passkey}
            className={`w-full py-4 mt-4 border font-bold tracking-[0.2em] uppercase text-xs transition-all flex items-center justify-center gap-2 ${
              status === 'error' ? 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white' :
              status === 'success' ? 'bg-green-500/10 border-green-500 text-green-500' :
              'bg-cyan-400/10 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black disabled:border-slate-700 disabled:text-slate-500 disabled:bg-transparent'
            }`}
          >
            <Lock className="w-4 h-4" /> 
            {status === 'loading' ? 'Verifying...' : 
             status === 'success' ? 'Routing...' : 
             'Initialize Handshake'}
          </button>
        </form>
      </div>
    </div>
  )
}
