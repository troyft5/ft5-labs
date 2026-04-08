import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { CreditCard, Menu } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata = {
  title: 'FinTech 5 | Payment Processing Consultants',
  description: 'Stop losing profits to payment processors.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-blue-600 selection:text-white min-h-screen flex flex-col">
        
        {/* Global Navigation */}
        <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-slate-200 bg-white/90 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg shadow-md group-hover:bg-blue-700 transition-colors">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-black text-xl tracking-tight text-slate-900">FinTech 5</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
              <Link href="#solutions" className="hover:text-blue-600 transition-colors">Solutions</Link>
              <Link href="#industries" className="hover:text-blue-600 transition-colors">Industries</Link>
              <Link href="#resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            </div>

            <Link href="#contact" className="hidden md:inline-flex px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all">
              Get Your Estimate
            </Link>
            
            <button className="md:hidden text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <main className="flex-grow relative z-10 pt-20">
          {children}
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-slate-900 text-slate-400 py-12 px-6">
           <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
             <div className="col-span-2">
               <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-md">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <span className="font-black text-lg text-white">FinTech 5</span>
               </div>
               <p className="text-sm max-w-sm">Payment Processing Consultants. We design solutions that cut costs, strengthen security, and keep your payments running smoothly.</p>
             </div>
             <div>
                <h4 className="text-white font-bold mb-4">Contact</h4>
                <p className="text-sm">(646)-941-7853</p>
                <p className="text-sm">info@fintech5group.com</p>
             </div>
           </div>
        </footer>
      </body>
    </html>
  )
}
