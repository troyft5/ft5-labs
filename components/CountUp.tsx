'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  decimals?: number
  className?: string
}

export default function CountUp({
  to,
  prefix = '',
  suffix = '',
  duration = 2000,
  decimals = 0,
  className = '',
}: CountUpProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          const startTime = Date.now()

          const tick = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // Ease out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(parseFloat((eased * to).toFixed(decimals)))
            if (progress < 1) requestAnimationFrame(tick)
          }

          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? value.toFixed(decimals) : Math.round(value)}{suffix}
    </span>
  )
}
