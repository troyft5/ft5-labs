import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule a Free Rate Review | FinTech 5',
  description: 'Book a free 15-minute call with a FinTech 5 payment specialist. We\'ll review your current rates, answer your questions, and tell you exactly how much you can save.',
}

const BG  = '#0f1a0f'
const BG2 = '#0a1208'

const SCHEDULE_URL = process.env.NEXT_PUBLIC_SCHEDULE_URL ?? ''

export default function SchedulePage() {
  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-40 pb-16 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(78,144,0,0.08) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to top, #0a1208, transparent)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Rate Review</span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
            {'Schedule a'}<br />
            <span style={{ background: 'linear-gradient(135deg,#9de84a,#4e9000)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {'free call.'}
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed mb-10">
            {'Book a free 15-minute call with a payment specialist. We\'ll review your current rates and tell you exactly how much you can save — no prep needed.'}
          </p>

          {/* Quick trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-600">
            {[
              { icon: '⏱', text: '15 minutes' },
              { icon: '💸', text: '100% free' },
              { icon: '🚫', text: 'No pressure' },
              { icon: '📊', text: 'Real numbers' },
            ].map(item => (
              <div key={item.text} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="font-semibold">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CALENDLY EMBED ── */}
      <section className="px-6 py-12 relative" style={{ background: BG }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          {SCHEDULE_URL ? (
            <div className="rounded-2xl overflow-hidden product-frame">
              <iframe
                src={SCHEDULE_URL}
                width="100%"
                height="700"
                frameBorder="0"
                title="Schedule a meeting"
                className="block w-full"
                style={{ minHeight: '700px', background: '#0f1a0f' }}
              />
            </div>
          ) : (
            <div className="rounded-2xl p-16 text-center glass-card">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="text-lg font-black text-white mb-3">Booking link coming soon</h3>
              <p className="text-sm text-slate-500 mb-2 leading-relaxed">
                Set your Google Calendar Appointment Schedule URL in <code className="text-[#6fc200] text-xs">NEXT_PUBLIC_SCHEDULE_URL</code> to activate booking.
              </p>
              <p className="text-xs text-slate-600 mb-6">Google Calendar → Appointment Schedules → Open Booking Page → Copy URL</p>
              <a href="tel:6469417853" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white" style={{ background: '#4e9000' }}>
                {'Call Us Now — (646) 941-7853'}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── PREP TIPS ── */}
      <section className="px-6 py-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.2),transparent)' }} />
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Before Your Call</span>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '📄', title: 'Have a statement ready', body: 'A recent merchant processing statement gives us the most to work with. Even a screenshot of your monthly totals is helpful.' },
              { icon: '💳', title: 'Know your monthly volume', body: 'Rough monthly card volume is enough. We\'ll work with whatever you have.' },
              { icon: '🤝', title: 'No prep required', body: 'You don\'t need to know the right questions. Just show up — we\'ll guide the conversation.' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-black text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-8 flex items-center justify-between gap-6 flex-wrap" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <p className="text-sm text-slate-600">{'Prefer to reach out directly?'}</p>
            <Link href="/contact-us" className="inline-flex items-center gap-2 text-sm font-bold transition-colors" style={{ color: '#6fc200' }}>
              {'Contact Us'} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
