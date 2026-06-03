'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { href: '/writing', label: 'Writing' },
  { href: '/publications', label: 'Publications' },
  { href: '/about', label: 'About' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  const active = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Omer Atli — home">
          <span className="dot" aria-hidden="true" />
          OMER ATLI
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={active(item.href) ? 'active' : ''}>
              {item.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/contact">
            Contact
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'open' : ''}`}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={active(item.href) ? 'active' : ''}>
            {item.label}
          </Link>
        ))}
        <Link href="/now" className={active('/now') ? 'active' : ''}>
          Now
        </Link>
        <Link href="/contact" className={active('/contact') ? 'active' : ''}>
          Contact
        </Link>
      </div>
    </nav>
  )
}
