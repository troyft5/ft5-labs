import Link from 'next/link'

export const metadata = {
  title: "Troy's Calendar | Book a Call | FinTech 5",
  description: 'Pick a time with Troy at FinTech 5. 15 minutes. Free. Bring a statement if you have one.',
  robots: { index: false, follow: false },
}

const BG = '#0f1a0f'
const BG2 = '#0a1208'

const TROY_CAL_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2uErWLpZVp1c5yyW65cJgq1ZNm2fOtnUXPuMxjOpeQn5NCxkumfScY9FnP28W_7mLaSciVIn6U?gv=true'

export default function TroysCalendarPage() {

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>
      <section className="relative px-6 pt-40 pb-12 overflow-hidden" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.5),transparent)' }} />

        <div className="relative max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>
              Book Troy
            </span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-none mb-6">
            Grab 15 minutes
            <br />
            <span
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
          <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed mb-8">
            Pick a slot that works. If you have a recent processing statement, bring it. If not, just show up. Most first looks take about 15 minutes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-slate-500 font-semibold">
            <span>15 minutes</span>
            <span>Free</span>
            <span>No pitch</span>
            <span>You can call instead: (732) 300-1072</span>
          </div>
        </div>
      </section>

      <section className="px-6 py-10 relative" style={{ background: BG }}>
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl overflow-hidden bg-white" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            <iframe
              src={TROY_CAL_URL}
              title="Book a time with Troy"
              width="100%"
              height="600"
              className="block w-full"
              style={{ border: 0, minHeight: 600 }}
            />
          </div>

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
