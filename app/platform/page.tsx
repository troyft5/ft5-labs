import { Network, ScanLine, ShieldAlert } from 'lucide-react'

export default function Platform() {
  const protocols = [
    {
      id: "0x7F8C",
      title: "SYS.ARCH: Multi-Tenant",
      desc: "Secure, isolated data structures mapping horizontal scalability across global portfolios.",
      icon: <Network className="w-8 h-8" />
    },
    {
      id: "0x3A21",
      title: "DATA.SENSORS: AI Vision",
      desc: "Proprietary cognitive models executing real-time extraction protocols on unstructured streams.",
      icon: <ScanLine className="w-8 h-8" />
    },
    {
      id: "0x9B44",
      title: "CORE: Bank-Level Auth",
      desc: "Cryptographic ledger validation. Enforcing strict Row-Level Security (RLS) barriers.",
      icon: <ShieldAlert className="w-8 h-8" />
    }
  ]

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">Platform <span className="text-cyan-400">Protocols</span></h2>
      <p className="text-slate-400 text-sm max-w-2xl mb-16">Modular architecture designed for hostile data environments. We do not just process data; we weaponize it.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {protocols.map((p) => (
          <div key={p.id} className="border border-cyan-400/20 p-8 relative bg-black/40 backdrop-blur-md hover:-translate-y-2 transition-transform">
            <div className="absolute top-4 right-4 text-[10px] text-cyan-400/50">{p.id}</div>
            <div className="mb-8 text-cyan-400 bg-cyan-400/5 w-16 h-16 flex items-center justify-center rounded-sm border border-cyan-400/20">
              {p.icon}
            </div>
            <h3 className="text-sm font-bold text-white mb-3 tracking-widest uppercase">{p.title}</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
