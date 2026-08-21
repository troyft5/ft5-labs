'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { MessageCircle } from 'lucide-react'
import { hasTrackingConsent } from '@/lib/consent'

export default function ThirdPartyScripts() {
  const [allowTrack, setAllowTrack] = useState(false)
  const [loadTawk, setLoadTawk] = useState(false)
  const ga = process.env.NEXT_PUBLIC_GA_ID
  const tawk = process.env.NEXT_PUBLIC_TAWK_ID

  useEffect(() => {
    const arm = () => {
      if (!hasTrackingConsent()) {
        setAllowTrack(false)
        return
      }
      const run = () => setAllowTrack(true)
      if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 4000 })
      else setTimeout(run, 2500)
    }
    arm()
    window.addEventListener('ft5-consent', arm)
    return () => window.removeEventListener('ft5-consent', arm)
  }, [])

  return (
    <>
      {allowTrack && ga && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="lazyOnload" />
          <Script id="ga4" strategy="lazyOnload">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ga}', { page_path: window.location.pathname, anonymize_ip: true });
          `}</Script>
        </>
      )}

      {allowTrack && tawk && !loadTawk && (
        <button
          type="button"
          onClick={() => setLoadTawk(true)}
          className="fixed bottom-20 right-4 z-40 md:bottom-6 hidden sm:flex items-center gap-2 px-3.5 py-2.5 rounded-full text-xs font-bold text-white shadow-lg"
          style={{ background: '#4e9000' }}
          aria-label="Open chat"
        >
          <MessageCircle className="w-4 h-4" /> Chat
        </button>
      )}

      {loadTawk && tawk && (
        <Script id="tawk" strategy="lazyOnload">{`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/${tawk}';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}</Script>
      )}
    </>
  )
}
