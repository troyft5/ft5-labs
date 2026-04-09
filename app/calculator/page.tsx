'use client'

import { ShieldCheck, TrendingDown, Clock, ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const benefits = [
  { icon: <TrendingDown className="w-6 h-6" />, title: 'See your actual effective rate', body: 'Most merchants don\'t know their true rate. This calculator shows you exactly what you\'re paying — and what you should be.' },
  { icon: <ShieldCheck className="w-6 h-6" />, title: 'Compare IC+ vs tiered vs flat rate', body: 'Enter your volume and transaction details to see a side-by-side cost comparison across every pricing model.' },
  { icon: <Clock className="w-6 h-6" />, title: 'Get a real audit in 48 hours', body: 'The calculator gives you an estimate. For exact numbers with competitive bids from 10+ processors, request your free audit.' },
]

export default function Calculator() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(900)

  useEffect(() => {
    const handler = (event: MessageEvent) => {
      if (event.data?.type === 'resize' && typeof event.data.height === 'number') {
        setIframeHeight(event.data.height + 32)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className="flex flex-col w-full" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-44 pb-16 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(78,144,0,0.1) 0%, transparent 65%)', filter: 'blur(40px)' }} />

        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Tool</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
                Processing Fee<br />
                <span style={{ background: 'linear-gradient(135deg,#9de84a,#6fc200)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Calculator</span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Enter your monthly volume and transaction details to see exactly what you&apos;re paying — and what a competitive rate looks like.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold" style={{ background: 'rgba(78,144,0,0.12)', border: '1px solid rgba(78,144,0,0.25)', color: '#6fc200' }}>
                ⚡ Free — No signup required
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {benefits.map(b => (
                <div key={b.title} className="flex items-start gap-4 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(78,144,0,0.12)', color: '#6fc200' }}>
                    {b.icon}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm mb-1">{b.title}</div>
                    <div className="text-xs text-slate-500 leading-relaxed">{b.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CALCULATOR IFRAME ── */}
      <section className="px-6 py-10 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <iframe
            ref={iframeRef}
            src="/calculator/index.html"
            className="w-full border-none block rounded-2xl overflow-hidden"
            title="FinTech 5 Payment Processing Calculator"
            style={{ height: iframeHeight, overflow: 'hidden', display: 'block' }}
          />
        </div>
      </section>

      {/* ── POST-CALCULATOR CONVERSION HOOK — highest-intent moment ── */}
      <section className="px-6 py-10 relative" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8"
            style={{ background: 'rgba(78,144,0,0.1)', border: '1px solid rgba(78,144,0,0.3)' }}>
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: '#6fc200' }}>
                Your estimate is ready — want the exact number?
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2">
                Send us your statement.<br />We&apos;ll find what they&apos;re hiding.
              </h2>
              <p className="text-slate-400 text-sm">
                The calculator is an estimate. A real audit gives you exact figures — plus competitive bids from 10+ processors. Takes 48 hours. Costs nothing.
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/get-your-savings-estimate"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-sm font-black text-white rounded-xl whitespace-nowrap transition-all hover:-translate-y-0.5"
                style={{ background: '#4e9000', boxShadow: '0 8px 24px rgba(78,144,0,0.4)' }}
              >
                Get Your Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-center text-[11px] text-slate-600">No signup. No obligation. No sales pressure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BELOW CALCULATOR CTA ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl p-8" style={{ background: 'rgba(78,144,0,0.08)', border: '1px solid rgba(78,144,0,0.25)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#6fc200' }}>Next step</div>
              <h2 className="text-2xl font-black text-white mb-4">Get real numbers from real bids.</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">The calculator gives you a competitive estimate. For exact rates with 10+ processors competing for your business, upload your statement and we&apos;ll do the full analysis — free.</p>
              <Link href="/get-your-savings-estimate" className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" style={{ background: '#4e9000', boxShadow: '0 8px 20px rgba(78,144,0,0.3)' }}>
                Get Your Free Audit <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: '#6fc200' }}>What your rate means</div>
              <div className="flex flex-col gap-3">
                {[
                  { range: 'Below 1.8%', verdict: 'Highly competitive', dot: '#22c55e' },
                  { range: '1.8% – 2.1%', verdict: 'Competitive with room', dot: '#84cc16' },
                  { range: '2.1% – 2.5%', verdict: 'Likely overpaying', dot: '#f59e0b' },
                  { range: 'Above 2.5%', verdict: 'Significant overpayment', dot: '#ef4444' },
                ].map(item => (
                  <div key={item.range} className="flex items-center justify-between py-2.5 px-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="flex items-center gap-2.5">
                      <div className="w-2 h-2 rounded-full" style={{ background: item.dot }} />
                      <span className="text-sm font-mono font-bold text-slate-300">{item.range}</span>
                    </div>
                    <span className="text-xs text-slate-500">{item.verdict}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-600 mt-4">Effective rate benchmarks for card-present retail. E-commerce and card-not-present typically run 0.4%–0.6% higher.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO READ YOUR RESULTS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Understanding Your Output</span>
              <div className="h-px w-8" style={{ background: '#4e9000' }} />
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">How to read your results.</h2>
            <p className="text-slate-400 max-w-lg mx-auto text-sm">The calculator produces four key numbers. Here&apos;s exactly what each one means.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { label: 'Effective Rate', icon: '%', color: '#6fc200', body: 'Your total processing cost divided by gross sales volume. This single number is the most honest way to compare any two pricing structures — regardless of how they\'re marketed.' },
              { label: 'Interchange Cost', icon: '🔀', color: '#3b82f6', body: 'The non-negotiable fee set by Visa, Mastercard, and Discover. This flows through every processor — the only difference is whether it\'s buried in your flat rate or passed through at cost.' },
              { label: 'Processor Markup', icon: '📈', color: '#f59e0b', body: 'The margin your processor earns on top of interchange. This is the number we negotiate. FT5 clients consistently see this drop by 30–60% after our competitive bid process.' },
              { label: 'Annual Savings Estimate', icon: '💰', color: '#22c55e', body: 'The conservative projection of what you could keep per year by switching to a competitive IC+ pricing model. Based on your submitted volume and industry average data.' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-5 rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 font-black" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>{item.icon}</div>
                <div>
                  <div className="font-black text-white mb-2" style={{ color: item.color }}>{item.label}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMMON RATE QUESTIONS ── */}
      <section className="px-6 py-20 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Rate Questions</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { q: 'Is this calculator accurate?', a: 'It produces a well-researched estimate based on typical interchange tables and processor markup ranges. The only way to get exact figures is a full statement analysis — which we do for free.' },
              { q: 'What is a good effective rate?', a: 'For most card-present retail, below 2.1% is competitive. E-commerce and keyed-entry typically run 0.4–0.6% higher. Above 2.5% almost always indicates significant overpayment.' },
              { q: 'What is interchange, exactly?', a: 'Interchange is the per-transaction fee set by Visa and Mastercard and paid to the card-issuing bank. It varies by card type (rewards, premium, corporate). IC+ pricing passes it through at cost, making it fully transparent.' },
              { q: 'My rate looks high. What now?', a: 'Upload your statement and request a free audit. We analyze every line, identify where the excess is going, and within 48 hours return a report with a competitive benchmark and your estimated savings.' },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-sm font-black text-white mb-3 leading-snug">{item.q}</div>
                <p className="text-sm text-slate-400 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FROM ESTIMATE TO REAL SAVINGS ── */}
      <section className="px-6 py-24 relative overflow-hidden" style={{ background: '#4e9000' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.6)' }}>From estimate to verified numbers</div>
              <h2 className="text-4xl font-black text-white mb-6 leading-tight">The real audit takes 48 hours.<br />The cost is zero.</h2>
              <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-lg leading-relaxed">The calculator gives you direction. The statement audit gives you proof — with line-by-line fee breakdown and competitive bids from 10+ processors.</p>
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
