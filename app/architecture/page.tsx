import { Cpu, Server, Activity, Database } from 'lucide-react'

export default function Architecture() {
  const metrics = [
    { label: "Global Uptime", value: "99.999%", icon: <Activity className="w-5 h-5" /> },
    { label: "Active Nodes", value: "14,204", icon: <Server className="w-5 h-5" /> },
    { label: "Query Latency", value: "< 12ms", icon: <Cpu className="w-5 h-5" /> },
    { label: "Data Integrity", value: "SHA-256", icon: <Database className="w-5 h-5" /> }
  ]

  return (
    <div className="px-6 py-24 max-w-7xl mx-auto">
      <div className="mb-16">
        <h2 className="font-sans text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">System <span className="text-cyan-400">Architecture</span></h2>
        <p className="text-slate-400 text-sm max-w-2xl border-l-2 border-cyan-400/50 pl-4">Live telemetry and structural overview of the FT5 orbital network. Data updates in real-time.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {metrics.map((m, i) => (
          <div key={i} className="border border-slate-800 bg-black/40 p-6 flex flex-col items-center text-center hover:border-cyan-400/50 transition-colors">
            <div className="text-cyan-400 mb-4">{m.icon}</div>
            <div className="font-sans text-2xl md:text-3xl font-black text-white mb-2">{m.value}</div>
            <div className="text-[10px] text-slate-500 tracking-widest uppercase">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="border border-cyan-400/20 bg-black/50 p-8 rounded-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        <h3 className="text-xs font-bold text-cyan-400 mb-6 tracking-widest uppercase">Live Terminal Stream</h3>
        <div className="font-mono text-sm text-slate-400 space-y-2 opacity-80">
          <p>&gt; Root connection established...</p>
          <p>&gt; Syncing distributed ledger across 14 zones...</p>
          <p className="text-white">&gt; [SUCCESS] Block height verified: #894921</p>
          <p>&gt; Awaiting incoming data payloads...</p>
          <p className="text-cyan-400 animate-pulse">_</p>
        </div>
      </div>
    </div>
  )
}
