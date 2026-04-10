'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import LeadMagnetModal from './LeadMagnetModal'

export default function BlogLeadMagnetTrigger() {
  const [magnetOpen, setMagnetOpen] = useState(false)

  return (
    <>
      <button 
        onClick={() => setMagnetOpen(true)}
        className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5" 
        style={{ background: '#4e9000', boxShadow: '0 8px 20px rgba(78,144,0,0.3)' }}
      >
        Get the Free PDF <ArrowRight className="w-4 h-4" />
      </button>
      <LeadMagnetModal isOpen={magnetOpen} onClose={() => setMagnetOpen(false)} />
    </>
  )
}
