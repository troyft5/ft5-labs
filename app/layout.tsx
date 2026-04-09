import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants',
  description: 'Stop overpaying on payment processing. FinTech 5 negotiates on your behalf across 10+ processors to lower your rates and eliminate hidden fees.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 font-sans antialiased selection:bg-brand-600 selection:text-white min-h-screen flex flex-col">

        <Navbar />

        <main className="flex-grow relative z-10">
          {children}
        </main>

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
                    ['Insights Blog', '/blog'],
                    ['Fee Calculator', '/calculator'],
                    ['Get Your Estimate', '/get-your-savings-estimate'],
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
                    Get Started →
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
