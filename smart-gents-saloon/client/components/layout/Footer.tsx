import Link from 'next/link'
import { Phone, MapPin, Clock, Scissors } from 'lucide-react'

const quickLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/team', label: 'Our Team' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Book Appointment' },
]

const socialLinks = [
  {
    href: '#',
    label: 'Instagram',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'Facebook',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    href: '#',
    label: 'YouTube',
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
]

const businessHours = [
  { day: 'Mon – Fri', hours: '9:00 AM – 9:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 10:00 PM' },
  { day: 'Sunday', hours: '10:00 AM – 6:00 PM' },
]

export default function Footer() {
  return (
    <footer className="bg-card border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5" aria-label="Smart Gents Saloon home">
              <Scissors size={18} className="text-gold rotate-45" />
              <div className="flex flex-col leading-none">
                <span className="text-gold font-bold text-base tracking-[0.2em] uppercase">Smart Gents</span>
                <span className="text-white/40 text-[10px] tracking-[0.35em] uppercase">Saloon</span>
              </div>
            </Link>

            <p className="text-muted text-sm leading-relaxed mb-6">
              Crafting confidence for modern gentlemen. Premium grooming services in an elegant, luxurious environment.
            </p>

            <div className="flex gap-3">
              {socialLinks.map(({ href, svg, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-white/40 hover:border-gold hover:text-gold transition-all duration-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6 pb-3 border-b border-white/10">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-gold text-sm tracking-wide transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-3 h-px bg-muted group-hover:bg-gold group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Business hours */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6 pb-3 border-b border-white/10">
              Business Hours
            </h3>
            <ul className="space-y-3">
              {businessHours.map(({ day, hours }) => (
                <li key={day} className="flex items-start gap-2">
                  <Clock size={14} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white text-sm">{day}</p>
                    <p className="text-muted text-xs mt-0.5">{hours}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-xs tracking-[0.2em] uppercase mb-6 pb-3 border-b border-white/10">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                <span className="text-muted text-sm leading-relaxed">
                  15 Savile Row,<br />
                  London W1S 3PJ
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={14} className="text-gold mt-0.5 shrink-0" />
                <a
                  href="tel:+442071234567"
                  className="text-muted hover:text-gold text-sm transition-colors duration-200"
                >
                  +44 20 7123 4567
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/booking"
                className="inline-flex items-center px-5 py-2.5 bg-gold text-background text-xs font-semibold tracking-[0.15em] uppercase hover:bg-gold-light transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-muted text-xs tracking-wide">
            &copy; {new Date().getFullYear()} Smart Gents Saloon. All rights reserved.
          </p>
          <p className="text-white/20 text-xs tracking-widest uppercase">
            Crafted with elegance
          </p>
        </div>
      </div>
    </footer>
  )
}
