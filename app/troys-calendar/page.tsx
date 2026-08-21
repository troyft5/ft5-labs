import Link from 'next/link'
import TroyCalendarEmbed from '@/components/TroyCalendarEmbed'

export const metadata = {
  title: "Troy's Calendar | Book a Call | FinTech 5",
  description: 'Pick a time with Troy at FinTech 5. 15 minutes. Free. Bring a statement if you have one.',
  robots: { index: false, follow: false },
}

const BG = '#0f1a0f'
const BG2 = '#0a1208'

export default function TroysCalendarPage() {
  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>
      <section className="relative px-6 pt-32 pb-8 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>
              Book Troy
            </span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-none mb-3">
            Grab 15 minutes
            <span
              className="block mt-1"
              style={{
                background: 'linear-gradient(135deg,#9de84a,#4e9000)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              on Troy&apos;s calendar.
            </span>
          </h1>
          <p className="text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Pick a slot. Bring a statement if you have one. Call (732) 300-1072 if you would rather talk now.
          </p>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-4 relative" style={{ background: BG }}>
        <div className="max-w-4xl mx-auto">
          <TroyCalendarEmbed />

          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {[
              { title: 'What you get', body: 'A straight look at what you pay now and what a better rate looks like. If staying put is the right call, he will say so.' },
              { title: 'What to bring', body: 'A recent statement helps. A screenshot of last month is enough. Nothing is also fine.' },
              { title: 'Rather talk now?', body: 'Skip the calendar. Call (732) 300-1072 or write troy@fintech5group.com.' },
            ].map(item => (
              <div key={item.title} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <h3 className="font-black text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Prefer email?{' '}
            <Link href="/contact-us" className="font-bold" style={{ color: '#6fc200' }}>
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
