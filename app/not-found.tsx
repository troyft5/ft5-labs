import Link from 'next/link'
import { ArrowRight, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center" style={{ background: '#0f1a0f' }}>
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,#4e9000,transparent)' }} />

      <div
        className="text-[9rem] font-black leading-none mb-4 select-none"
        style={{ color: 'rgba(78,144,0,0.15)', fontVariantNumeric: 'tabular-nums' }}
      >
        404
      </div>

      <div className="w-16 h-px mb-8" style={{ background: '#4e9000' }} />
      <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Page Not Found</h1>
      <p className="text-slate-400 max-w-md mb-10 leading-relaxed">
        This page doesn&apos;t exist or was moved. If you followed a link, it may be outdated.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-xl transition-all hover:-translate-y-0.5"
          style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.3)' }}
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
        <Link
          href="/get-your-savings-estimate"
          className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-slate-300 border border-white/10 hover:border-white/25 rounded-xl transition-all"
        >
          Get Savings Estimate <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
