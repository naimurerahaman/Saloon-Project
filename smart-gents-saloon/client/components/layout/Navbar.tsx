'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Scissors } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/team', label: 'Team' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/95 backdrop-blur-md border-b border-white/5 shadow-xl shadow-black/30'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Smart Gents Saloon home">
            <Scissors
              size={20}
              className="text-gold rotate-45 group-hover:rotate-[225deg] transition-transform duration-500"
            />
            <div className="flex flex-col leading-none">
              <span className="text-gold font-bold text-base tracking-[0.2em] uppercase">Smart Gents</span>
              <span className="text-white/40 text-[10px] tracking-[0.35em] uppercase">Saloon</span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative text-xs tracking-[0.15em] uppercase transition-colors duration-200 py-1',
                  'after:absolute after:bottom-0 after:left-0 after:h-px after:bg-gold',
                  'after:transition-all after:duration-300',
                  pathname === link.href
                    ? 'text-gold after:w-full'
                    : 'text-white/60 hover:text-white after:w-0 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <Link
              href="/booking"
              className={cn(
                'hidden lg:inline-flex items-center px-5 py-2.5',
                'border border-gold text-gold text-xs font-semibold tracking-[0.15em] uppercase',
                'hover:bg-gold hover:text-background transition-all duration-200'
              )}
            >
              Book Appointment
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-gold transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden bg-card/98 backdrop-blur-md border-t border-white/10',
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-hidden={!isOpen}
      >
        <nav className="px-4 py-6 space-y-1" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'block py-3.5 px-4 text-xs tracking-[0.15em] uppercase border-b border-white/5 transition-colors duration-200',
                pathname === link.href
                  ? 'text-gold'
                  : 'text-white/60 hover:text-white'
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/booking"
              className="block py-3.5 text-center bg-gold text-background text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book Appointment
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
