import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import CalculatorWidget from '@/components/CalculatorWidget'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export const metadata = {
  title: 'Processing Fee Calculator | Payment Processing Consultants',
  description: 'Free payment processing fee calculator. See your true effective rate, compare IC+ vs tiered vs flat rate, and estimate potential savings.',
}

export default function Calculator() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-16 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Tool</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
            Processing Fee<br />
            <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Calculator</span>
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            See what you&apos;re likely paying today, and what a competitive rate looks like. Free, no signup required.
          </p>
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <section className="px-6 py-12 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <CalculatorWidget />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>From estimate to certainty</div>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">Get the exact number, not an estimate.</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed">A free statement audit replaces this estimate with a line-by-line fee breakdown and real bids from 10+ processors. Most take about 15 minutes. A day is the max.</p>
            </div>
            <div className="flex flex-col gap-4">
              <Link href="/get-your-savings-estimate" className="flex items-center justify-center gap-2 px-8 py-4 font-black rounded-xl transition-all hover:-translate-y-1" style={{ background: '#0a1208', color: '#6fc200', boxShadow: '0 8px 40px rgba(0,0,0,0.4)' }}>
                Get Your Free Audit <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/contact-us" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-white border border-white/30 hover:border-white/60 rounded-xl transition-all">
                Talk to a Specialist
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
