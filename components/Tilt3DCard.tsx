'use client'
import { useRef, ReactNode, CSSProperties } from 'react'

interface Tilt3DCardProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  intensity?: number  // 0–1, default 0.7
}

export default function Tilt3DCard({
  children,
  className = '',
  style,
  intensity = 0.7,
}: Tilt3DCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef<number>(0)

  // Respect reduced-motion preference
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced) return
    const card = cardRef.current
    if (!card) return

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect()
      // Normalized -0.5 → 0.5
      const nx = (e.clientX - rect.left) / rect.width - 0.5
      const ny = (e.clientY - rect.top) / rect.height - 0.5

      const MAX_DEG = 10 * intensity
      const rotY = nx * MAX_DEG
      const rotX = -ny * MAX_DEG

      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02,1.02,1.02)`
      card.style.transition = 'transform 0.1s ease-out'

      // Subtle highlight shift
      const glowX = 50 + nx * 30
      const glowY = 50 + ny * 30
      card.style.background = card.dataset.baseBg
        ? `${card.dataset.baseBg}, radial-gradient(circle at ${glowX}% ${glowY}%, rgba(111,194,0,0.07) 0%, transparent 60%)`
        : ''
    })
  }

  function handleMouseLeave() {
    const card = cardRef.current
    if (!card) return
    cancelAnimationFrame(rafRef.current)
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
    card.style.background = ''
  }

  return (
    <div
      ref={cardRef}
      className={className}
      style={{
        willChange: 'transform',
        transformStyle: 'preserve-3d',
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
