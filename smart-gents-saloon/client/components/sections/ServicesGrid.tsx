'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Clock, ArrowRight, Scissors, Star, Sparkles, Zap, Shield, Layers } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { Service } from '@/types'
import { CATEGORIES, type ServiceCategory } from '@/lib/services'
import Container from '@/components/ui/Container'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Haircut: Scissors,
  Beard: Star,
  Shave: Sparkles,
  Packages: Layers,
  Treatments: Shield,
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: 'easeIn' as const } },
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = CATEGORY_ICONS[service.category] ?? Zap
  return (
    <motion.div
      layout
      variants={cardVariant}
      className="group bg-card flex flex-col hover:bg-white/[0.02] transition-colors duration-300 border border-transparent hover:border-gold/10"
    >
      {/* Top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="p-7 flex flex-col flex-1">
        {/* Icon + category */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-11 h-11 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300 shrink-0">
            <Icon size={17} className="text-gold" />
          </div>
          <span className="text-white/25 text-[9px] tracking-[0.3em] uppercase mt-1">{service.category}</span>
        </div>

        {/* Title */}
        <h3 className="text-white text-sm font-semibold mb-3 group-hover:text-gold transition-colors duration-200">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/38 text-[13px] leading-relaxed flex-1 mb-6">
          {service.description}
        </p>

        {/* Footer */}
        <div className="pt-5 border-t border-white/[0.07]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-baseline gap-1.5">
              <span className="text-gold font-bold text-xl">£{service.price}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/28">
              <Clock size={11} />
              <span className="text-[11px] tracking-wide">{service.duration} min</span>
            </div>
          </div>

          <Link
            href={`/booking?service=${service.id}`}
            className="flex items-center justify-center gap-2 w-full py-2.5 border border-white/10 text-white/40 text-[10px] tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-all duration-200 group/btn"
          >
            Book Now
            <ArrowRight size={10} className="group-hover/btn:translate-x-0.5 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All')

  const filtered =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory)

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Our Services</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Every <span className="text-gold italic">Service.</span>
          </h1>
          <p className="text-white/35 max-w-md mx-auto text-sm leading-relaxed">
            From classic cuts to luxury grooming rituals — crafted for the discerning gentleman
            who expects nothing less than perfection.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-14"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-200 border ${
                activeCategory === cat
                  ? 'border-gold text-gold bg-gold/5'
                  : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/55'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={container}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
          >
            {filtered.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center text-white/18 text-[10px] tracking-[0.3em] uppercase mt-10"
        >
          {filtered.length} service{filtered.length !== 1 ? 's' : ''} available
          {activeCategory !== 'All' ? ` · ${activeCategory}` : ''}
        </motion.p>
      </Container>
    </section>
  )
}
