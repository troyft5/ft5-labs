'use client'
import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

interface ScrollDepth3DProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number      // ms, stagger delay
  intensity?: number  // 0–1, controls translateZ distance (default 0.6)
}

export default function ScrollDepth3D({
  children,
  className = '',
  style,
  delay = 0,
  intensity = 0.6,
}: ScrollDepth3DProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Just fade in immediately, no motion
      if (ref.current) {
        ref.current.style.opacity = '1'
        ref.current.style.transform = 'none'
      }
      return
    }

    const el = ref.current
    if (!el) return

    const Z_START = -50 * intensity
    const SCALE_START = 0.94

    // Initial hidden state
    el.style.opacity = '0'
    el.style.transform = `perspective(1000px) translateZ(${Z_START}px) scale(${SCALE_START})`
    el.style.transition = 'none'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (!el) return
            el.style.transition = `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
            el.style.opacity = '1'
            el.style.transform = 'perspective(1000px) translateZ(0px) scale(1)'
          }, 50)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, intensity])

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform, opacity', ...style }}
    >
      {children}
    </div>
  )
}
