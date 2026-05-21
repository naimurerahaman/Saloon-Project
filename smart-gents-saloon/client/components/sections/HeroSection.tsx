'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Scissors, ChevronDown } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0 },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
}

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '28%'])
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-background">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_28%,rgba(200,169,107,0.09)_0%,transparent_58%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,169,107,1) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,1) 1px, transparent 1px)',
            backgroundSize: '90px 90px',
          }}
        />
      </div>

      {/* Decorative vertical lines */}
      <motion.div
        className="absolute left-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent hidden xl:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.5 }}
        style={{ transformOrigin: 'top' }}
      />
      <motion.div
        className="absolute right-[8%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/15 to-transparent hidden xl:block"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.6, ease: 'easeOut', delay: 0.7 }}
        style={{ transformOrigin: 'top' }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
            <Scissors size={13} className="text-gold rotate-45 shrink-0" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase font-medium">
              Premium Men&apos;s Grooming Experience
            </span>
            <div className="h-px w-10 bg-gold/35 shrink-0" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] leading-[1.04] text-white mb-6"
          >
            Where Style{' '}
            <span className="text-gold italic">Meets</span>
            <br />
            Precision.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp}
            className="text-white/50 text-base sm:text-lg max-w-lg leading-relaxed mb-10"
          >
            Experience the art of master grooming. Every cut, every shave —
            crafted with expertise, delivered with luxury.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Link
              href="/booking"
              className="inline-flex items-center px-8 py-3.5 bg-gold text-background text-[11px] font-bold tracking-[0.22em] uppercase hover:bg-gold-light transition-colors duration-200"
            >
              Book Appointment
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-3.5 border border-white/18 text-white/80 text-[11px] font-semibold tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-all duration-200"
            >
              Explore Services
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-x-10 gap-y-5 mt-16 pt-10 border-t border-white/[0.07]"
          >
            {[
              { value: '10+', label: 'Years of Excellence' },
              { value: '5K+', label: 'Happy Clients' },
              { value: '8', label: 'Master Barbers' },
              { value: '15+', label: 'Premium Services' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-gold font-serif text-2xl font-bold leading-none">{stat.value}</p>
                <p className="text-white/35 text-[10px] tracking-[0.22em] uppercase mt-1.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-label="Scroll down"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-white/25 text-[9px] tracking-[0.45em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.7, ease: 'easeInOut' }}
        >
          <ChevronDown size={13} className="text-gold/45" />
        </motion.div>
      </motion.button>
    </section>
  )
}
