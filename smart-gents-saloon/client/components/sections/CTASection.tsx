'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'

const hours = [
  { days: 'Mon – Fri', time: '9:00 – 21:00' },
  { days: 'Saturday', time: '9:00 – 22:00' },
  { days: 'Sunday', time: '10:00 – 18:00' },
]

export default function CTASection() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(200,169,107,0.07)_0%,transparent_65%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>

      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-10 bg-gold/38" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Reserve Your Chair</span>
            <div className="h-px w-10 bg-gold/38" />
          </div>

          {/* Headline */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5 leading-tight">
            Ready to Look Your<br />
            <span className="text-gold italic">Absolute Best?</span>
          </h2>

          {/* Subtext */}
          <p className="text-white/38 max-w-md mx-auto text-sm leading-relaxed mb-12">
            Online booking is quick and easy. Choose your service, pick your barber,
            and secure your spot in minutes.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
            <Link
              href="/booking"
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-gold text-background text-[11px] font-bold tracking-[0.26em] uppercase hover:bg-gold-light transition-colors duration-200"
            >
              <Calendar size={13} />
              Book Your Appointment
            </Link>
            <a
              href="tel:+1234567890"
              className="inline-flex items-center gap-2.5 px-10 py-4 border border-white/14 text-white/55 text-[11px] font-semibold tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-all duration-200"
            >
              <Phone size={13} />
              Call to Book
            </a>
          </div>

          {/* Hours strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="inline-flex flex-wrap justify-center gap-x-8 gap-y-4 py-5 px-6 sm:px-10 border border-white/[0.07] bg-card/40 w-full max-w-lg mx-auto sm:w-auto"
          >
            {hours.map((h) => (
              <div key={h.days} className="flex flex-col items-center gap-1.5">
                <span className="text-white/28 text-[9px] tracking-[0.3em] uppercase">{h.days}</span>
                <span className="text-white/65 text-sm font-medium tracking-wide">{h.time}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}
