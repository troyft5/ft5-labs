import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CreditCard, Phone, Mail, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants',
  description: 'Stop overpaying on payment processing. FinTech 5 negotiates on your behalf across 10+ processors to lower your rates and eliminate hidden fees.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">

        <Navbar />

        {/* Page Content */}
        <main className="flex-grow relative z-10 pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
              
              {/* Brand */}
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-9 h-9 bg-blue-600 text-white rounded-lg">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="font-black text-lg text-white">FinTech 5</span>
                </Link>
                <p className="text-sm leading-relaxed max-w-xs mb-6">
                  Payment Processing Consultants. We negotiate across 10+ processors to lower your rates, eliminate junk fees, and keep your cash flow protected.
                </p>
                <div className="flex flex-col gap-2 text-sm">
                  <a href="tel:6469417853" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-blue-500" /> (646)-941-7853
                  </a>
                  <a href="tel:7323001072" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 text-blue-500" /> (732)-300-1072
                  </a>
                  <a href="mailto:info@fintech5group.com" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 text-blue-500" /> info@fintech5group.com
                  </a>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" /> NY & NJ — Serving clients nationwide
                  </span>
                </div>
              </div>

              {/* Solutions */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Solutions</h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><Link href="/solutions/in-person-payments" className="hover:text-white transition-colors">In-Person Payments</Link></li>
                  <li><Link href="/solutions/mobile-payments" className="hover:text-white transition-colors">Mobile Payments</Link></li>
                  <li><Link href="/solutions/online-payments" className="hover:text-white transition-colors">Online Payments</Link></li>
                  <li><Link href="/solutions/pricing-models" className="hover:text-white transition-colors">Pricing Models</Link></li>
                  <li><Link href="/solutions/free-placement" className="hover:text-white transition-colors">Free Terminal Placement</Link></li>
                </ul>
              </div>

              {/* Industries */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Industries</h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><Link href="/industries/retail-payments" className="hover:text-white transition-colors">Retail</Link></li>
                  <li><Link href="/industries/e-commerce" className="hover:text-white transition-colors">E-Commerce</Link></li>
                  <li><Link href="/industries/healthcare" className="hover:text-white transition-colors">Healthcare</Link></li>
                  <li><Link href="/industries/b2b" className="hover:text-white transition-colors">B2B Processing</Link></li>
                  <li><Link href="/industries/high-risk" className="hover:text-white transition-colors">High-Risk Merchants</Link></li>
                  <li><Link href="/industries/petroleum" className="hover:text-white transition-colors">Petroleum</Link></li>
                  <li><Link href="/industries/cbd" className="hover:text-white transition-colors">CBD & Hemp</Link></li>
                  <li><Link href="/industries/higher-education" className="hover:text-white transition-colors">Higher Education</Link></li>
                  <li><Link href="/industries/service" className="hover:text-white transition-colors">Service Businesses</Link></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
                <ul className="flex flex-col gap-2 text-sm">
                  <li><Link href="/blog" className="hover:text-white transition-colors">Insights Blog</Link></li>
                  <li><Link href="/calculator" className="hover:text-white transition-colors">Fee Calculator</Link></li>
                  <li><Link href="/get-your-savings-estimate" className="hover:text-white transition-colors">Get Your Estimate</Link></li>
                  <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Us</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                  <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <p>© {new Date().getFullYear()} FinTech 5 Group LLC. All rights reserved.</p>
              <p className="text-center">Payment Processing Consulting — Not a payment processor. We are processor-agnostic advisors.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
