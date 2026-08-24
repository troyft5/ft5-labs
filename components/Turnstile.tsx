'use client'

import Script from 'next/script'
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
    }
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ''

export type TurnstileHandle = { reset: () => void }

const Turnstile = forwardRef<TurnstileHandle, { action: string; onVerify: (token: string) => void }>(
  function Turnstile({ action, onVerify }, ref) {
    const containerRef = useRef<HTMLDivElement>(null)
    const widgetIdRef = useRef<string | null>(null)

    useImperativeHandle(ref, () => ({
      reset() {
        if (widgetIdRef.current && window.turnstile) window.turnstile.reset(widgetIdRef.current)
      },
    }))

    const renderWidget = useCallback(() => {
      if (!containerRef.current || !window.turnstile || widgetIdRef.current) return
      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        action,
        callback: onVerify,
      })
    }, [action, onVerify])

    useEffect(() => {
      if (window.turnstile) renderWidget()
      return () => {
        if (widgetIdRef.current && window.turnstile) window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }, [renderWidget])

    return (
      <>
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" onLoad={renderWidget} />
        <div ref={containerRef} />
      </>
    )
  },
)

export default Turnstile
