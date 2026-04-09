'use client'

import { Calculator as CalcIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const BG  = '#0f1a0f'
const BG2 = '#131f13'

export default function Calculator() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [iframeHeight, setIframeHeight] = useState(900)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'resize' && typeof event.data.height === 'number') {
        // Add a small buffer so nothing gets clipped
        setIframeHeight(event.data.height + 32)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="flex flex-col w-full min-h-screen" style={{ background: BG }}>

      {/* Hero */}
      <section className="px-6 pt-40 pb-16 relative" style={{ background: BG2 }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(78,144,0,0.3),transparent)' }} />
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: '#6fc200' }}>Free Tool</span>
            <div className="h-px w-8" style={{ background: '#4e9000' }} />
          </div>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-6" style={{ background: 'rgba(78,144,0,0.15)', border: '1px solid rgba(78,144,0,0.25)' }}>
            <CalcIcon className="w-7 h-7" style={{ color: '#6fc200' }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Processing Fee <span style={{ color: '#6fc200' }}>Calculator</span>
          </h1>
          <p className="text-lg text-slate-400">See exactly how much you are losing to hidden markup fees every month.</p>
        </div>
      </section>

      {/* Calculator — seamlessly embedded, no internal scroll */}
      <section className="px-0 py-0" style={{ background: BG }}>
        <div className="max-w-5xl mx-auto px-6 py-10">
          <iframe
            ref={iframeRef}
            src="/calculator/index.html"
            className="w-full border-none block"
            title="FinTech 5 Payment Processing Calculator"
            scrolling="no"
            style={{
              height: iframeHeight,
              overflow: 'hidden',
              display: 'block',
            }}
          />
        </div>
      </section>

    </div>
  )
}
