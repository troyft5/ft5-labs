import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Script from 'next/script'
import MobileCTA from '@/components/MobileCTA'
import ScrollToTop from '@/components/ScrollToTop'
import CookieConsent from '@/components/CookieConsent'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  metadataBase: new URL('https://fintech5group.com'),
  title: {
    default: 'FinTech 5 | Payment Processing Consultants',
    template: '%s | FinTech 5',
  },
  description: 'Stop overpaying on payment processing. FinTech 5 negotiates on your behalf across 10+ processors to lower your rates and eliminate hidden fees.',
  keywords: ['payment processing consultant', 'merchant services', 'lower processing fees', 'interchange optimization', 'payment processing NY NJ', 'FinTech 5'],
  authors: [{ name: 'FinTech 5 Group' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fintech5group.com',
    siteName: 'FinTech 5',
    title: 'FinTech 5 | Payment Processing Consultants',
    description: 'We negotiate across 10+ processors to lower your rates, eliminate junk fees, and protect your cash flow. Free consulting — no cost to you.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'FinTech 5 — Payment Processing Consultants' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FinTech 5 | Payment Processing Consultants',
    description: 'Stop overpaying on payment processing. Free consulting — we negotiate for you.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-[#0f1a0f] text-slate-900 font-sans antialiased selection:bg-[#4e9000] selection:text-white min-h-screen flex flex-col">

        {/* ── Global film grain overlay — the Plaid premium feel ── */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[999]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '192px 192px',
            opacity: 0.028,
            mixBlendMode: 'overlay',
          }}
        />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'LocalBusiness',
                '@id': 'https://fintech5group.com/#business',
                name: 'FinTech 5 Group',
                alternateName: 'FT5',
                description: 'Payment processing consultants. We negotiate across 10+ tier-1 processors to lower your rates and eliminate hidden fees — at zero cost to you.',
                url: 'https://fintech5group.com',
                telephone: '+1-646-941-7853',
                email: 'info@fintech5group.com',
                foundingDate: '2021',
                areaServed: ['New York', 'New Jersey', 'United States'],
                serviceType: 'Payment Processing Consulting',
                priceRange: 'Free',
                sameAs: ['https://app.fintech5group.com'],
              },
              {
                '@type': 'LocalBusiness',
                '@id': 'https://fintech5group.com/#aggregate-rating',
                name: 'FinTech 5 Group',
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  reviewCount: '3',
                  bestRating: '5',
                  worstRating: '1',
                },
                review: [
                  {
                    '@type': 'Review',
                    author: { '@type': 'Organization', name: 'Regional Retail Chain' },
                    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                    reviewBody: 'FinTech 5 identified $18,400 in fees we didn\'t know we were paying. The audit was same day. The savings are permanent.',
                    datePublished: '2025-11-01',
                  },
                  {
                    '@type': 'Review',
                    author: { '@type': 'Organization', name: 'E-Commerce Founder, NY' },
                    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                    reviewBody: 'We had been on tiered pricing for 6 years. Nobody told us. One statement analysis and we were switched to IC+ within a week.',
                    datePublished: '2025-09-15',
                  },
                  {
                    '@type': 'Review',
                    author: { '@type': 'Organization', name: 'Healthcare Practice, NJ' },
                    reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
                    reviewBody: 'My rep answers the phone every single time. That alone is worth more than the rate savings — though those are real too.',
                    datePublished: '2025-10-20',
                  },
                ],
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'How does FinTech 5 make money if consulting is free?',
                    acceptedAnswer: { '@type': 'Answer', text: 'When a merchant selects a processor through FinTech 5, that processor compensates us from their margin. There is no charge to the merchant — ever.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do I have to switch processors to work with FT5?',
                    acceptedAnswer: { '@type': 'Answer', text: 'No. We first audit your existing relationship. If your current processor is competitive, we tell you. If they are not, we present alternatives — and you choose.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'How long does a statement audit take?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Our standard turnaround is same day or less. We analyze your statement line by line and return a full breakdown of every fee and a competitive comparison.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'What is interchange-plus pricing?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Interchange-plus (IC+) pricing passes the card network interchange rate directly to the merchant, plus a fixed processor markup. It is the most transparent pricing model and typically the lowest cost for merchants processing over $15,000 per month.' },
                  },
                ],
              },
            ],
          })}}
        />

        <Navbar />

        <main className="flex-grow relative z-10">
          {children}
        </main>

        <MobileCTA />
        <ScrollToTop />
        <CookieConsent />

        {/* Google Analytics 4 — set NEXT_PUBLIC_GA_ID in env */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { page_path: window.location.pathname });
            `}</Script>
          </>
        )}

        {/* Tawk.to live chat — set NEXT_PUBLIC_TAWK_ID in env (format: PROPERTYID/WIDGETID) */}
        {process.env.NEXT_PUBLIC_TAWK_ID && (
          <Script id="tawk" strategy="afterInteractive">{`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/${process.env.NEXT_PUBLIC_TAWK_ID}';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}</Script>
        )}

        {/* Footer */}
        <footer className="bg-[#0f1c0a] text-slate-400 pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 pb-12 border-b border-white/10">

              {/* Brand */}
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-5">
                  <Image src="/Logos/FT5_White_Green.svg" alt="FinTech 5" width={130} height={95} className="h-10 w-auto" />
                </Link>
                <p className="text-sm leading-relaxed max-w-xs mb-6 text-slate-400">
                  Payment Processing Consultants. We negotiate across 10+ processors to lower your rates, eliminate junk fees, and protect your cash flow.
                </p>
                <div className="flex flex-col gap-2.5 text-sm">
                  <a href="tel:6469417853" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-brand-500 shrink-0" /> (646)-941-7853
                  </a>
                  <a href="tel:7323001072" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-brand-500 shrink-0" /> (732)-300-1072
                  </a>
                  <a href="mailto:info@fintech5group.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-brand-500 shrink-0" /> info@fintech5group.com
                  </a>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-500 shrink-0" /> NY & NJ — Serving clients nationwide
                  </span>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Solutions</h4>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {[
                    ['In-Person Payments', '/solutions/in-person-payments'],
                    ['Mobile Payments', '/solutions/mobile-payments'],
                    ['Online Payments', '/solutions/online-payments'],
                    ['Pricing Models', '/solutions/pricing-models'],
                    ['Free Terminal Placement', '/solutions/free-placement'],
                  ].map(([label, href]) => (
                    <li key={href}><Link href={href} className="hover:text-brand-400 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Industries */}
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Industries</h4>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {[
                    ['Retail', '/industries/retail-payments'],
                    ['E-Commerce', '/industries/e-commerce'],
                    ['Healthcare', '/industries/healthcare'],
                    ['B2B Processing', '/industries/b2b'],
                    ['High-Risk', '/industries/high-risk'],
                    ['Petroleum', '/industries/petroleum'],
                    ['CBD & Hemp', '/industries/cbd'],
                    ['Higher Education', '/industries/higher-education'],
                    ['Service Businesses', '/industries/service'],
                  ].map(([label, href]) => (
                    <li key={href}><Link href={href} className="hover:text-brand-400 transition-colors">{label}</Link></li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Resources</h4>
                <ul className="flex flex-col gap-2.5 text-sm">
                  {[
                    ['Our Process', '/process'],
                    ['Fee Calculator', '/calculator'],
                    ['Insights Blog', '/blog'],
                    ['Glossary', '/glossary'],
                    ['Get Your Free Audit', '/get-your-savings-estimate'],
                    ['Data Security', '/security'],
                    ['Contact Us', '/contact-us'],
                    ['Privacy Policy', '/privacy-policy'],
                    ['Terms of Service', '/terms-of-service'],
                  ].map(([label, href]) => (
                    <li key={href}><Link href={href} className="hover:text-brand-400 transition-colors">{label}</Link></li>
                  ))}
                </ul>

                {/* CTA block */}
                <div className="mt-8 p-4 rounded-xl bg-brand-600/20 border border-brand-600/30">
                  <p className="text-xs text-brand-300 font-semibold uppercase tracking-wider mb-2">Free Analysis</p>
                  <p className="text-sm text-slate-300 mb-3">See exactly what you&apos;re overpaying — no strings attached.</p>
                  <Link
                    href="/get-your-savings-estimate"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition-all"
                  >
                    Get Your Free Audit →
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-600">
              <p>© {new Date().getFullYear()} FinTech 5 Group LLC. All rights reserved.</p>
              {/* Social links */}
              <div className="flex items-center gap-4">
                <a href="https://linkedin.com/company/fintech5" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://instagram.com/fintech__5" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-slate-500 hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://facebook.com/FinTech5LLC" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-slate-500 hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="https://twitter.com/fintech__5" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="text-slate-500 hover:text-brand-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
              <p className="text-center">Processor-agnostic — we work for you, not the processors.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
