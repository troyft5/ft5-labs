import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import LogoMark from '@/components/Logo'

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

        <main className="flex-grow relative z-10 pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-[#0f1c0a] text-slate-400 pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 pb-12 border-b border-white/10">

              {/* Brand */}
              <div className="md:col-span-2">
                <Link href="/" className="inline-block mb-5">
                  <LogoMark className="h-10 w-auto" showText={true} textColor="#ffffff" markColor="#336600" />
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
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <p>© {new Date().getFullYear()} FinTech 5 Group LLC. All rights reserved.</p>
              <p className="text-center">Processor-agnostic payment consulting — we work for you, not the processors.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
