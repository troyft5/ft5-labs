'use client'

import { useEffect, useRef, useState } from 'react'

const TROY_CAL_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ2uErWLpZVp1c5yyW65cJgq1ZNm2fOtnUXPuMxjOpeQn5NCxkumfScY9FnP28W_7mLaSciVIn6U?gv=true'

export default function TroyCalendarEmbed() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(720)

  useEffect(() => {
    const measure = () => {
      const el = wrapRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top
      const next = Math.max(520, Math.floor(window.innerHeight - top - 12))
      setHeight(next)
    }

    measure()
    const id = window.setTimeout(measure, 80)
    window.addEventListener('resize', measure)
    window.addEventListener('orientationchange', measure)
    return () => {
      window.clearTimeout(id)
      window.removeEventListener('resize', measure)
      window.removeEventListener('orientationchange', measure)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className="rounded-2xl overflow-hidden"
      style={{
        border: '1px solid rgba(255,255,255,0.08)',
        background: '#0a1208',
        minHeight: height,
      }}
    >
      <iframe
        src={TROY_CAL_URL}
        title="Book a time with Troy"
        width="100%"
        height={height}
        className="block w-full"
        style={{
          border: 0,
          height,
          background: '#111',
          filter: 'invert(0.92) hue-rotate(180deg) brightness(0.92)',
        }}
      />
    </div>
  )
}
