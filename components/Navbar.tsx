'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react'

const solutions = [
  { label: 'In-Person Payments', href: '/solutions/in-person-payments', desc: 'Smart terminals & POS systems' },
  { label: 'Mobile Payments', href: '/solutions/mobile-payments', desc: 'Accept payments anywhere' },
  { label: 'Online Payments', href: '/solutions/online-payments', desc: 'E-commerce gateways' },
  { label: 'Transparent Pricing', href: '/solutions/pricing-models', desc: 'Interchange-plus & flat rate' },
  { label: 'Free Terminal Placement', href: '/solutions/free-placement', desc: 'Hardware at zero cost' },
]

const industries = [
  { label: 'Retail', href: '/industries/retail-payments' },
  { label: 'E-Commerce', href: '/industries/e-commerce' },
  { label: 'Service Businesses', href: '/industries/service' },
  { label: 'Higher Education', href: '/industries/higher-education' },
  { label: 'Healthcare', href: '/industries/healthcare' },
  { label: 'Petroleum & C-Stores', href: '/industries/petroleum' },
  { label: 'High-Risk Merchants', href: '/industries/high-risk' },
  { label: 'CBD & Hemp', href: '/industries/cbd' },
  { label: 'B2B Processing', href: '/industries/b2b' },
]

function DropdownMenu({ label, children }: { label: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 text-sm font-semibold text-slate-300 hover:text-white transition-colors py-2"
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="bg-[#0d1a0d] rounded-2xl shadow-2xl border border-white/10 overflow-hidden min-w-[230px]">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileSolutions, setMobileSolutions] = useState(false)
  const [mobileIndustries, setMobileIndustries] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navBg = scrolled
    ? 'bg-[#080f08]/95 backdrop-blur-xl border-b border-white/8 shadow-lg'
    : 'bg-transparent border-b border-transparent'

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Logo — dark version for white navbar */}
        <Link href="/" className="flex items-center" onClick={() => setMobileOpen(false)}>
          <Image src="/Logos/FT5_White_Green.svg" alt="FinTech 5" width={160} height={120} className="h-14 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-7">
          <DropdownMenu label="Solutions">
            <div className="p-2">
              {solutions.map((s) => (
                <Link key={s.href} href={s.href} className="flex flex-col px-4 py-3 rounded-xl hover:bg-slate-50 transition-colors group">
                  <span className="text-sm font-bold text-slate-800 group-hover:text-brand-600 transition-colors">{s.label}</span>
                  <span className="text-xs text-slate-400 mt-0.5">{s.desc}</span>
                </Link>
              ))}
            </div>
          </DropdownMenu>

          <DropdownMenu label="Industries">
            <div className="p-2 grid grid-cols-1">
              {industries.map((i) => (
                <Link key={i.href} href={i.href} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-brand-600 transition-colors">
                  {i.label}
                </Link>
              ))}
            </div>
          </DropdownMenu>

          <Link href="/calculator" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Calculator</Link>
          <Link href="/blog" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Blog</Link>
          <Link href="/about-us" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">About</Link>
          <Link href="/contact-us" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* CTA + Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/get-your-savings-estimate"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md shadow-brand-100 transition-all duration-200 hover:-translate-y-0.5"
          >
            Get Estimate <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto shadow-xl">
          <button onClick={() => setMobileSolutions(!mobileSolutions)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-700 border-b border-slate-100">
            Solutions <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
          </button>
          {mobileSolutions && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {solutions.map((s) => (
                <Link key={s.href} href={s.href} className="py-2 text-sm text-slate-500 hover:text-brand-600 font-medium" onClick={() => setMobileOpen(false)}>{s.label}</Link>
              ))}
            </div>
          )}
          <button onClick={() => setMobileIndustries(!mobileIndustries)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-700 border-b border-slate-100">
            Industries <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileIndustries ? 'rotate-180' : ''}`} />
          </button>
          {mobileIndustries && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {industries.map((i) => (
                <Link key={i.href} href={i.href} className="py-2 text-sm text-slate-500 hover:text-brand-600 font-medium" onClick={() => setMobileOpen(false)}>{i.label}</Link>
              ))}
            </div>
          )}
          {[['Calculator', '/calculator'], ['Blog', '/blog'], ['About', '/about-us'], ['Contact', '/contact-us']].map(([l, h]) => (
            <Link key={h} href={h} className="py-3 text-sm font-bold text-slate-700 border-b border-slate-100" onClick={() => setMobileOpen(false)}>{l}</Link>
          ))}
          <Link href="/get-your-savings-estimate" className="mt-4 flex items-center justify-center gap-2 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all" onClick={() => setMobileOpen(false)}>
            Get Your Free Estimate <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </nav>
  )
}
