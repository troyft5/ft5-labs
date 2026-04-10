'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function MobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 350)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
      style={{ background: 'linear-gradient(to top, #0a1208 60%, rgba(10,18,8,0))' }}
    >
      <div className="px-4 pb-6 pt-8">
        <Link
          href="/get-your-savings-estimate"
          className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-black text-white text-base"
          style={{ background: '#4e9000', boxShadow: '0 -2px 32px rgba(78,144,0,0.5)' }}
        >
          Get My Free Savings Audit <ArrowRight className="w-5 h-5" />
        </Link>
        <p className="text-center text-[10px] text-slate-700 mt-2">No cost. No obligation. same-day turnaround.</p>
      </div>
    </div>
  )
}
