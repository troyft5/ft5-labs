'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Menu, X, ArrowRight, Phone } from 'lucide-react'

const solutions = [
  { label: 'In-Person Payments',     href: '/solutions/in-person-payments', desc: 'Smart terminals & free hardware' },
  { label: 'Mobile Payments',        href: '/solutions/mobile-payments',     desc: 'Accept payments anywhere' },
  { label: 'Online Payments',        href: '/solutions/online-payments',     desc: 'Hosted checkout & gateways' },
  { label: 'Transparent Pricing',    href: '/solutions/pricing-models',      desc: 'Interchange-plus, locked-in rates' },
  { label: 'Free Terminal Placement',href: '/solutions/free-placement',      desc: 'Clover hardware at zero cost' },
]

const industries = [
  { label: 'Retail',               href: '/industries/retail-payments' },
  { label: 'E-Commerce',           href: '/industries/e-commerce' },
  { label: 'Healthcare',           href: '/industries/healthcare' },
  { label: 'Service Businesses',   href: '/industries/service' },
  { label: 'Higher Education',     href: '/industries/higher-education' },
  { label: 'Petroleum & C-Stores', href: '/industries/petroleum' },
  { label: 'High-Risk Merchants',  href: '/industries/high-risk' },
  { label: 'CBD & Hemp',           href: '/industries/cbd' },
  { label: 'B2B Processing',       href: '/industries/b2b' },
]

const resources = [
  { label: 'Calculator', href: '/calculator', desc: 'Estimate your savings instantly' },
  { label: 'Blog',       href: '/blog',        desc: 'Payment industry insights' },
  { label: 'About Us',  href: '/about-us',    desc: 'Our team and mission' },
  { label: 'Contact',   href: '/contact-us',  desc: 'Get in touch with us' },
]

function Dropdown({ label, href, width = 280, children }: {
  label: string; href?: string; width?: number; children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])
  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-1 text-sm font-semibold text-slate-400 hover:text-white transition-colors py-2 px-3.5 rounded-lg hover:bg-white/5 whitespace-nowrap"
      >
        {href
          ? <Link href={href} onClick={e => e.stopPropagation()} className="hover:text-white transition-colors">{label}</Link>
          : label
        }
        <ChevronDown className={`w-3.5 h-3.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50" style={{ width }}>
          <div
            className="rounded-2xl shadow-2xl overflow-hidden"
            style={{ background: '#0a1208', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(24px)' }}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [mobileSolutions, setMobileSolutions]   = useState(false)
  const [mobileIndustries, setMobileIndustries] = useState(false)
  const [mobileResources, setMobileResources]   = useState(false)
  const [scrolled, setScrolled]             = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const closeMenu = () => setMobileOpen(false)

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'shadow-xl shadow-black/50' : ''}`}
      style={{
        background: scrolled ? 'rgba(8,15,8,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px) saturate(160%)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      {/* ── Slim announcement bar ── */}
      <div className="w-full py-1 px-4 text-center text-[10.5px] font-semibold" style={{ background: 'rgba(78,144,0,0.12)', borderBottom: '1px solid rgba(78,144,0,0.18)', color: '#8cd627' }}>
        <span className="mr-2 opacity-50">◆</span>
        April 2026 interchange rates are live —{' '}
        <Link href="/get-your-savings-estimate" className="underline underline-offset-2 hover:text-white transition-colors font-bold">
          see if yours changed →
        </Link>
      </div>

      {/* ── Main bar: 1fr | auto | 1fr — true centering with no overlap ── */}
      <div className="max-w-7xl mx-auto px-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-6">

        {/* Logo — left edge of the 1fr zone */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
          <Image src="/Logos/FT5_White_Green.svg" alt="FinTech 5" width={150} height={120} className="h-11 w-auto" priority />
        </Link>

        {/* ── Desktop nav — auto-width, guaranteed center ── */}
        <div className="hidden md:flex items-center gap-1">

          <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition-colors px-3.5 py-2 rounded-lg hover:bg-white/5">
            Home
          </Link>

          <Dropdown label="Solutions" href="/solutions" width={320}>
            <div className="p-2">
              {solutions.map(s => (
                <Link
                  key={s.href} href={s.href}
                  className="flex flex-col px-3 py-2.5 rounded-xl transition-all group"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">{s.label}</span>
                  <span className="text-[11px] mt-0.5 text-slate-600">{s.desc}</span>
                </Link>
              ))}
              <div className="mt-1 pt-1 mx-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link href="/solutions"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap"
                  style={{ color: '#6fc200' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(78,144,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  View all solutions <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Industries" href="/industries" width={360}>
            <div className="p-2">
              {/* 2-col grid — wide enough so nothing wraps */}
              <div className="grid grid-cols-2 gap-0.5">
                {industries.map(i => (
                  <Link
                    key={i.href} href={i.href}
                    className="px-3 py-2 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-white transition-all whitespace-nowrap"
                    onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    {i.label}
                  </Link>
                ))}
              </div>
              <div className="mt-1 pt-1 mx-1" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Link href="/industries"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-bold rounded-xl transition-all whitespace-nowrap"
                  style={{ color: '#6fc200' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(78,144,0,0.08)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  View all industries <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Resources" width={260}>
            <div className="p-2">
              {resources.map(r => (
                <Link
                  key={r.href} href={r.href}
                  className="flex flex-col px-3 py-2.5 rounded-xl transition-all group"
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span className="text-[13px] font-bold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">{r.label}</span>
                  <span className="text-[11px] mt-0.5 text-slate-600">{r.desc}</span>
                </Link>
              ))}
            </div>
          </Dropdown>

          <Link
            href="/get-your-savings-estimate"
            className="text-sm font-semibold px-3.5 py-2 rounded-lg transition-all whitespace-nowrap hover:bg-white/5"
            style={{ color: '#6fc200' }}
          >
            Get Estimate
          </Link>
        </div>

        {/* ── Desktop CTAs — right edge of the 1fr zone ── */}
        <div className="hidden md:flex items-center justify-end gap-2.5">
          <a href="tel:6469417853" className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap">
            <Phone className="w-3.5 h-3.5 shrink-0" /> (646) 941-7853
          </a>
          <a
            href="https://app.fintech5group.com" target="_blank" rel="noopener noreferrer"
            className="px-4 py-2.5 text-sm font-bold text-slate-400 hover:text-white border border-white/10 hover:border-white/25 rounded-xl transition-all whitespace-nowrap"
          >
            Client Portal
          </a>
          <Link
            href="/get-your-savings-estimate"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-black text-white rounded-xl transition-all hover:-translate-y-0.5 whitespace-nowrap"
            style={{ background: '#4e9000', boxShadow: '0 4px 14px rgba(78,144,0,0.35)' }}
          >
            Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMobileOpen(v => !v)} className="md:hidden col-start-3 flex justify-end p-2 text-slate-400 hover:text-white transition-colors">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden px-6 py-4 flex flex-col gap-1 max-h-[80vh] overflow-y-auto" style={{ background: '#080f08', borderTop: '1px solid rgba(255,255,255,0.07)' }}>

          <Link href="/" className="py-3 text-sm font-bold text-slate-300 hover:text-white transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }} onClick={closeMenu}>
            Home
          </Link>

          <button onClick={() => setMobileSolutions(v => !v)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            Solutions <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${mobileSolutions ? 'rotate-180' : ''}`} />
          </button>
          {mobileSolutions && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {solutions.map(s => (
                <Link key={s.href} href={s.href} className="py-2 text-sm text-slate-500 hover:text-slate-200 font-medium transition-colors" onClick={closeMenu}>{s.label}</Link>
              ))}
            </div>
          )}

          <button onClick={() => setMobileIndustries(v => !v)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            Industries <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${mobileIndustries ? 'rotate-180' : ''}`} />
          </button>
          {mobileIndustries && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {industries.map(i => (
                <Link key={i.href} href={i.href} className="py-2 text-sm text-slate-500 hover:text-slate-200 font-medium transition-colors" onClick={closeMenu}>{i.label}</Link>
              ))}
            </div>
          )}

          <button onClick={() => setMobileResources(v => !v)} className="flex items-center justify-between py-3 text-sm font-bold text-slate-300" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            Resources <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${mobileResources ? 'rotate-180' : ''}`} />
          </button>
          {mobileResources && (
            <div className="pl-4 flex flex-col gap-1 pb-2">
              {resources.map(r => (
                <Link key={r.href} href={r.href} className="py-2 text-sm text-slate-500 hover:text-slate-200 font-medium transition-colors" onClick={closeMenu}>{r.label}</Link>
              ))}
            </div>
          )}

          <Link href="/get-your-savings-estimate" className="py-3 text-sm font-bold transition-colors" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', color: '#6fc200' }} onClick={closeMenu}>
            Get Your Estimate →
          </Link>

          <Link href="/get-your-savings-estimate" className="mt-4 flex items-center justify-center gap-2 py-3.5 text-sm font-black text-white rounded-xl" style={{ background: '#4e9000' }} onClick={closeMenu}>
            Free Audit <ArrowRight className="w-4 h-4" />
          </Link>
          <a href="tel:6469417853" className="mt-2 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-slate-500 hover:text-slate-300 transition-colors">
            <Phone className="w-4 h-4" /> (646) 941-7853
          </a>
        </div>
      )}
    </nav>
  )
}
