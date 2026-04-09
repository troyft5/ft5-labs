'use client'

import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', fn, { passive: true })
    fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className={`
        fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full
        hidden md:flex items-center justify-center
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
      style={{
        background: 'rgba(78,144,0,0.9)',
        boxShadow: '0 4px 24px rgba(78,144,0,0.45)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <ChevronUp className="w-5 h-5 text-white" />
    </button>
  )
}
