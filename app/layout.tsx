import './globals.css'
import { Inter, Space_Mono } from 'next/font/google'
import Link from 'next/link'
import { Terminal } from 'lucide-react'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'FT5 Labs | Enterprise Dominance',
  description: 'Operational dominance at infinite scale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceMono.variable} scroll-smooth`}>
      <body className="bg-[#050505] text-white font-mono antialiased selection:bg-cyan-400 selection:text-black min-h-screen flex flex-col">
        <div className="fixed inset-0 z-0 bg-[length:50px_50px] pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(to right, rgba(0, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 255, 255, 0.03) 1px, transparent 1px)',
               maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
             }}>
        </div>
        <nav className="fixed top-0 w-full z-50 px-6 py-4 border-b border-cyan-400/20 bg-[#050505]/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4 group">
              <div className="flex items-center justify-center w-10 h-10 border border-cyan-400 bg-cyan-400/5 group-hover:bg-cyan-400/20 transition-colors">
                <Terminal className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-sans font-black text-xl tracking-widest uppercase">FT5_Labs</span>
            </Link>
            <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest uppercase text-slate-400">
              <Link href="/platform" className="hover:text-cyan-400 transition-colors">Platform</Link>
            </div>
            <Link href="/auth" className="px-6 py-2 text-xs font-bold tracking-widest border border-white/30 text-white hover:border-cyan-400 hover:text-cyan-400 transition-all uppercase bg-white/5">
              Client_Auth
            </Link>
          </div>
        </nav>
        <main className="flex-grow relative z-10 pt-24">
          {children}
        </main>
      </body>
    </html>
  )
}
