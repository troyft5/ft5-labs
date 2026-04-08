import { Zap, ChevronRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col justify-center px-6 pt-20 pb-24 max-w-7xl mx-auto min-h-[80vh]">
      <div className="text-left max-w-3xl">
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-cyan-400/30 bg-cyan-400/5 rounded-full">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-cyan-400">v3.0 Core Online // Orbital Scale</span>
        </div>
        <h1 className="font-sans text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 uppercase leading-[0.9]">
          Operational<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-cyan-400">Dominance.</span>
        </h1>
        <p className="text-sm md:text-base text-slate-400 max-w-xl mb-10 leading-relaxed border-l-2 border-cyan-400/50 pl-6">
          <span className="text-white font-bold">&gt; SYSTEM_LOG:</span> FT5 Labs unifies sentient automation.<br/>
          <span className="text-white font-bold">&gt; OBJECTIVE:</span> Eliminate organizational entropy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/platform" className="px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase border border-orange-500 bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center justify-center gap-3">
            Deploy Infrastructure <Zap className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
