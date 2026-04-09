'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Menu, X, ArrowRight, Phone } from 'lucide-react'

const solutions = [
  { label: 'In-Person Payments',    href: '/solutions/in-person-payments', desc: 'Smart terminals & free Clover hardware' },
  { label: 'Mobile Payments',       href: '/solutions/mobile-payments',     desc: 'Accept payments anywhere on any device' },
  { label: 'Online Payments',       href: '/solutions/online-payments',     desc: 'Hosted checkout & API-first gateways' },
  { label: 'Transparent Pricing',   href: '/solutions/pricing-models',      desc: 'Interchange-plus, locked-in rates' },
  { label: 'Free Terminal Placement',href: '/solutions/free-placement',     desc: 'Clover hardware at zero cost' },
]

const industries = [
  { label: 'Retail',             href: '/industries/retail-payments' },
  { label: 'E-Commerce',         href: '/industries/e-commerce' },
  { label: 'Healthcare',         href: '/industries/healthcare' },
  { label: 'Service Businesses', href: '/industries/service' },
  { label: 'Higher Education',   href: '/industries/higher-education' },
  { label: 'Petroleum & C-Stores',href: '/industries/petroleum' },
  { label: 'High-Risk Merchants',href: '/industries/high-risk' },
  { label: 'CBD & Hemp',         href: '/industries/cbd' },
  { label: 'B2B Processing',     href: '/industries/b2b' },
]

function DropdownMenu({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button onClick={() => setOpen(!open)} className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2">
        {href ? (
          <Link href={href} className="hover:text-white transition-colors" onClick={e => e.stopPropagation()}>{label}</Link>
        ) : label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <div className="rounded-2xl shadow-2xl overflow-hidden min-w-[260px]" style={{ background: '#0a1208', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)' }}>
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
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-lg shadow-black/40' : ''}`}
      style={{ background: scrolled ? 'rgba(8,15,8,0.96)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent' }}>

      {/* Announcement bar — slim */}
      <div className="w-full py-1 px-4 text-center text-[10.5px] font-semibold" style={{ background: 'rgba(78,144,0,0.12)', borderBottom: '1px solid rgba(78,144,0,0.18)', color: '#8cd627' }}>
        <span className="mr-2 opacity-50">◆</span>
        April 2026 interchange rates are live —{' '}
        <Link href="/get-your-savings-estimate" className="underline underline-offset-2 hover:text-white transition-colors font-bold">see if yours changed →</Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-2 grid grid-cols-[auto_1fr_auto] items-center gap-8">

        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={() => setMobileOpen(false)}>
          <Image src="/Logos/FT5_White_Green.svg" alt="FinTech 5" width={130} height={100} className="h-9 w-auto" priority />
        </Link>

        {/* Desktop nav — truly centered in the 1fr column */}
        <div className="hidden md:flex items-center justify-center gap-5">
          <DropdownMenu label="Solutions" href="/solutions">
            <div className="p-1.5">
              {solutions.map(s => (
                <Link key={s.href} href={s.href} className="flex flex-col px-3 py-2.5 rounded-xl transition-all group" style={{ borderBottom: 'none' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <span className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors">{s.label}</span>
                  <span className="text-[11px] mt-0.5" style={{ color: '#4a6a30' }}>{s.desc}</span>
                </Link>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} className="mt-1 pt-1">
                <Link href="/solutions" className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all" style={{ color: '#6fc200' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(78,144,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  View all solutions <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </DropdownMenu>

          <DropdownMenu label="Industries" href="/industries">
            <div className="p-1.5 grid grid-cols-1">
              {industries.map(i => (
                <Link key={i.href} href={i.href} className="px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-white transition-all"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  {i.label}
                </Link>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} className="mt-1 pt-1">
                <Link href="/industries" className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all" style={{ color: '#6fc200' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(78,144,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  View all industries <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </DropdownMenu>

          <Link href="/calculator" className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">Calculator</Link>
          <Link href="/blog" className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/about-us" className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">About</Link>
          <Link href="/contact-us" className="text-[13px] font-semibold text-slate-400 hover:text-white transition-colors">Contact</Link>
        </div>

        {/* Desktop CTAs — matched sizes */}
        <div className="hidden md:flex items-center gap-2">
          <a href="tel:6469417853" className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-300 transition-colors mr-1">
            <Phone className="w-3 h-3" /> (646) 941-7853
          </a>
          <a href="https://app.fintech5group.com" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2 text-[13px] font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all">
            Client Portal
          </a>
          <Link
            href="/get-your-savings-estimate"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-black text-white rounded-xl transition-all hover:-translate-y-0.5"
            style={{ background: '#4e9000', boxShadow: '0 4px 14px rgba(78,144,0,0.35)' }}
          >
            Free Audit <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-400 hover:text-white transition-colors">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu — dark */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto" style={{ background: '#080f08', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={() => setMobileSolutions(!mobileSolutions)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            Solutions <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
          </button>
          {mobileSolutions && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {solutions.map(s => (
                <Link key={s.href} href={s.href} className="py-2 text-sm text-slate-500 hover:text-slate-200 font-medium transition-colors" onClick={() => setMobileOpen(false)}>{s.label}</Link>
              ))}
            </div>
          )}

          <button onClick={() => setMobileIndustries(!mobileIndustries)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            Industries <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${mobileIndustries ? 'rotate-180' : ''}`} />
          </button>
          {mobileIndustries && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {industries.map(i => (
                <Link key={i.href} href={i.href} className="py-2 text-sm text-slate-500 hover:text-slate-200 font-medium transition-colors" onClick={() => setMobileOpen(false)}>{i.label}</Link>
              ))}
            </div>
          )}

          {[['Calculator', '/calculator'], ['Blog', '/blog'], ['About', '/about-us'], ['Contact', '/contact-us']].map(([l, h]) => (
            <Link key={h} href={h} className="py-3 text-sm font-bold text-slate-400 hover:text-white transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} onClick={() => setMobileOpen(false)}>{l}</Link>
          ))}

          <Link href="/get-your-savings-estimate" className="mt-4 flex items-center justify-center gap-2 py-3.5 text-sm font-black text-white rounded-xl transition-all" style={{ background: '#4e9000' }} onClick={() => setMobileOpen(false)}>
            Get Your Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:6469417853" className="mt-2 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors">
            <Phone className="w-4 h-4" /> (646) 941-7853
          </a>
        </div>
      )}
    </nav>
  )
}
