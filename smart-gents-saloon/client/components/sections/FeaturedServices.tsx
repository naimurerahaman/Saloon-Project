'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, Star, Sparkles, Zap, ArrowRight, Layers, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useServices } from '@/hooks/api'
import type { Service } from '@/types'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

// ─── Category → icon (matches both DB enum and display strings) ────────────

const ICON_MAP: [string, LucideIcon][] = [
  ['haircut', Scissors],
  ['beard',   Star],
  ['shave',   Sparkles],
  ['package', Layers],
  ['groom',   Layers],
  ['treat',   Shield],
  ['facial',  Shield],
  ['spa',     Shield],
]

function categoryIcon(category: string): LucideIcon {
  const lower = category.toLowerCase()
  for (const [key, Icon] of ICON_MAP) {
    if (lower.includes(key)) return Icon
  }
  return Zap
}

// ─── Animations ────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

// ─── Skeleton card ─────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-card p-8 flex flex-col animate-pulse">
      <div className="w-11 h-11 border border-white/[0.06] bg-white/[0.04] mb-7" />
      <div className="h-3.5 w-3/4 bg-white/[0.06] rounded-sm mb-3" />
      <div className="space-y-1.5 flex-1 mb-6">
        <div className="h-2.5 w-full  bg-white/[0.04] rounded-sm" />
        <div className="h-2.5 w-11/12 bg-white/[0.04] rounded-sm" />
        <div className="h-2.5 w-4/5  bg-white/[0.04] rounded-sm" />
      </div>
      <div className="flex items-center justify-between pt-5 border-t border-white/[0.07]">
        <div className="h-4 w-14 bg-white/[0.06] rounded-sm" />
        <div className="h-3 w-10 bg-white/[0.04] rounded-sm" />
      </div>
    </div>
  )
}

// ─── Service card ──────────────────────────────────────────────────────────

function ServiceCard({ service }: { service: Service }) {
  const Icon = categoryIcon(service.category)
  return (
    <motion.div
      variants={card}
      className="group bg-card p-8 flex flex-col hover:bg-white/[0.02] transition-colors duration-300"
    >
      <div className="mb-7">
        <div className="w-11 h-11 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
          <Icon size={18} className="text-gold" />
        </div>
      </div>

      <h3 className="text-white text-sm font-semibold mb-3 group-hover:text-gold transition-colors duration-200 line-clamp-1">
        {service.title}
      </h3>
      <p className={cn('text-white/38 text-[13px] leading-relaxed flex-1 mb-6', 'line-clamp-3')}>
        {service.description}
      </p>

      <div className="flex items-center justify-between pt-5 border-t border-white/[0.07]">
        <div className="flex items-baseline gap-1.5">
          <span className="text-gold font-bold text-lg">${service.price}</span>
          <span className="text-white/28 text-xs">{service.duration}min</span>
        </div>
        <Link href={`/booking?service=${service.id}`} aria-label={`Book ${service.title}`}>
          <ArrowRight
            size={13}
            className="text-white/18 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200"
          />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────

export default function FeaturedServices() {
  const { data: services, isLoading, isError } = useServices()

  // Cap at 4 for the homepage preview
  const featured = services?.slice(0, 4)

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">What We Offer</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-4">
            Featured <span className="text-gold italic">Services</span>
          </h2>
          <p className="text-white/35 max-w-md mx-auto text-sm leading-relaxed">
            From classic cuts to luxury grooming rituals — every service is crafted
            for the discerning gentleman.
          </p>
        </motion.div>

        {/* Grid — skeleton while loading, cards when ready */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]">
            {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : isError || !featured?.length ? (
          <p className="text-center text-white/20 text-sm py-12">Services unavailable — check back soon.</p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
          >
            {featured.map((s) => <ServiceCard key={s.id} service={s} />)}
          </motion.div>
        )}

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/12 text-white/50 text-[11px] tracking-[0.22em] uppercase hover:border-gold hover:text-gold transition-all duration-200"
          >
            View All Services
            <ArrowRight size={11} />
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
