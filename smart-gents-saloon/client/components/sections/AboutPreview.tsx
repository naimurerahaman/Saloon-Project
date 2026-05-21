'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Scissors } from 'lucide-react'

const stats = [
  { value: '2014', label: 'Est.' },
  { value: '5K+', label: 'Clients Served' },
  { value: '8', label: 'Expert Barbers' },
  { value: '20+', label: 'Awards Won' },
]

export default function AboutPreview() {
  return (
    <section className="bg-card py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* Left: Visual block */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Decorative outer frames */}
            <div className="absolute -top-4 -left-4 right-4 bottom-4 border border-gold/8 pointer-events-none" />
            <div className="absolute -top-8 -left-8 right-8 bottom-8 border border-gold/4 pointer-events-none hidden sm:block" />

            {/* Main box */}
            <div className="relative aspect-[4/3] bg-background overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-stone-900 to-background" />

              {/* Interior decorative content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Scissors size={52} className="text-gold/20 rotate-45" />
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold/20" />
                  <span className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Est. 2014</span>
                  <div className="h-px w-8 bg-gold/20" />
                </div>
              </div>

              {/* Gold bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
            </div>

            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.82 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.45, ease: 'easeOut' }}
              className="absolute -bottom-6 -right-4 sm:-right-6 bg-gold px-6 py-5 min-w-[130px]"
            >
              <p className="text-background font-serif text-3xl font-bold leading-none">10+</p>
              <p className="text-background/65 text-[10px] tracking-[0.28em] uppercase mt-1.5">Years of Craft</p>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.12 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.4em] uppercase">Our Story</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6 leading-tight">
              More Than a Cut.<br />
              <span className="text-gold italic">An Experience.</span>
            </h2>

            <p className="text-white/45 text-sm leading-[1.85] mb-4">
              Since 2014, Smart Gents Saloon has been redefining what premium grooming means.
              Our master barbers bring decades of combined experience to every appointment,
              blending timeless techniques with modern precision.
            </p>
            <p className="text-white/45 text-sm leading-[1.85] mb-10">
              We believe a great haircut is more than aesthetics — it&apos;s confidence.
              Every client leaves not just looking their best, but feeling it.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] mb-10">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-card p-5">
                  <p className="font-serif text-2xl text-gold font-bold leading-none">{stat.value}</p>
                  <p className="text-white/35 text-[10px] tracking-[0.22em] uppercase mt-2">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.25em] uppercase font-semibold group"
            >
              Discover Our Story
              <ArrowRight
                size={13}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
