"use client"

import { Calculator as CalcIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'

export default function Calculator() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Simple script to ensure the iframe resizes correctly if the content changes height
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'resize' && iframeRef.current) {
        iframeRef.current.style.height = `${event.data.height}px`
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <div className="flex flex-col w-full bg-slate-50 min-h-screen">
      <section className="px-6 py-24 max-w-6xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 text-brand-600 rounded-2xl mb-6 shadow-sm">
            <CalcIcon className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
            Processing Fee <span className="text-brand-600">Calculator</span>
          </h1>
          <p className="text-lg text-slate-600">See exactly how much you are losing to hidden markup fees every month.</p>
        </div>

        <div className="w-full bg-transparent rounded-3xl overflow-hidden shadow-xl border border-slate-200">
          <iframe 
            ref={iframeRef}
            src="/calculator/index.html" 
            className="w-full border-none min-h-[1200px]"
            title="FinTech 5 Payment Processing Calculator"
            scrolling="yes"
          />
        </div>
      </section>
    </div>
  )
}
