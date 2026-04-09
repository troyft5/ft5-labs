'use client'
import { useEffect, useRef, ReactNode, useState } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

export default function Reveal({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const show = () => setRevealed(true)

    // Already in / near viewport on mount — reveal immediately (accounts for page load scroll pos)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight + 200) {
      const t = setTimeout(show, 40)
      return () => clearTimeout(t)
    }

    // Otherwise watch with a generous rootMargin (reveals 150px before element enters view)
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { show(); io.disconnect() } },
      { threshold: 0.04, rootMargin: '0px 0px 150px 0px' }
    )
    io.observe(el)

    // Safety net — never leave content invisible after 2.5 s
    const fallback = setTimeout(show, 2500)

    return () => { io.disconnect(); clearTimeout(fallback) }
  }, [])

  const transforms: Record<string, string> = {
    up:    'translateY(28px)',
    left:  'translateX(-28px)',
    right: 'translateX(28px)',
    none:  'none',
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:   revealed ? 1 : 0,
        transform: revealed ? 'none' : transforms[direction],
        transition: revealed
          ? `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
          : 'none',
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </div>
  )
}
