import Link from 'next/link'
import { ShieldCheck, Lock, FileKey2, FileX, Server, CheckCircle2, ArrowRight } from 'lucide-react'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'Data Security | FinTech 5 — Payment Processing Consultants',
  description: 'How we protect your financial data and merchant statements. Bank-level encryption, PII redaction, and Mutual NDAs available.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

export default function SecurityPage() {
  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-20 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.1) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />
        <div className="absolute right-0 top-16 flex flex-col items-end select-none pointer-events-none" aria-hidden="true">
          {['ENTERPRISE', 'SECURITY'].map((word, i) => (
            <div key={i} className="text-[13vw] font-black uppercase leading-none"
              style={{ color: `rgba(78,144,0,${0.05 - i * 0.02})`, transform: `translateX(${i * 20}px)` }}>
              {word}
            </div>
          ))}
        </div>
        <div className="relative max-w-5xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Platform Security</span>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-none mb-6 max-w-3xl">
              Your financial data is<br />
              <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                locked down.
              </span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-xl text-slate-400 max-w-xl leading-relaxed mb-10">
              We know that asking for a merchant statement is asking for immense trust. Here is exactly how we securely ingest, analyze, and protect your processing volume data.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.35)' }}>
              Upload Statement Securely <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── SECURITY PROTOCOLS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-x-12 gap-y-16">

          <Reveal>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Encryption at Rest &amp; Transit</h3>
                <p className="text-sm text-slate-400 leading-relaxed">All statements uploaded via our secure portal are encrypted in transit using TLS 1.3 and encrypted at rest utilizing AES-256 bit encryption on enterprise-grade AWS infrastructure.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <FileX className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Auto-Redaction of PII</h3>
                <p className="text-sm text-slate-400 leading-relaxed">Our internal ingestion tools look for pricing tables, transaction volume, and fee markup. We do not store full primary account numbers (PAN) or customer DDA bank routing details found on some localized statements.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Limited Retention Policy</h3>
                <p className="text-sm text-slate-400 leading-relaxed">We use your statements strictly to perform the rate audit. Once the competitive bidding process concludes and a pricing model is locked in (or you choose not to proceed), raw statement PDFs are purged from our active processing servers.</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)', color: '#6fc200' }}>
                <FileKey2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-2">Mutual Non-Disclosure (MNDA)</h3>
                <p className="text-sm text-slate-400 leading-relaxed">For enterprise clients, government contractors, and healthcare organizations (HIPAA), we are ready to sign a Mutual Non-Disclosure Agreement prior to the exchange of any financial documentation.</p>
                <a href="mailto:legal@fintech5group.com" className="inline-flex items-center gap-1 mt-3 text-xs font-bold" style={{ color: '#6fc200' }}>
                  Request MNDA Execution <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── NO DATA BROKERING ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-8 shadow-2xl" style={{ background: '#0a1208', border: '1px solid #4e9000' }}>
            <ShieldCheck className="w-10 h-10" style={{ color: '#6fc200' }} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">We don&apos;t sell your data. Every bid is blind.</h2>
          <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            When we run a competitive bid across our 14 processor network, we anonymize your business entity. Processors see your industry, volume, and current hardware setup — but your business name and contact info are stripped out until you explicitly choose a winning bid. They bid on your volume, not your name.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto text-left">
            {['Zero unsolicited marketing', 'Anonymized processor bidding', 'Data only shared explicitly'].map(item => (
              <div key={item} className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: '#4e9000' }} />
                <span className="text-xs font-bold text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
