'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, Star, Sparkles, Zap, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Container from '@/components/ui/Container'

interface ServiceCard {
  id: string
  icon: LucideIcon
  title: string
  description: string
  price: number
  duration: number
}

const services: ServiceCard[] = [
  {
    id: '1',
    icon: Scissors,
    title: 'Signature Haircut',
    description:
      'Precision cut tailored to your face shape and lifestyle. Includes consultation, scalp massage, shampoo, and styling.',
    price: 45,
    duration: 60,
  },
  {
    id: '2',
    icon: Star,
    title: 'Beard & Shape Up',
    description:
      'Expert beard sculpting and sharp line-up to frame your face perfectly. Hot towel finish and conditioning balm included.',
    price: 35,
    duration: 45,
  },
  {
    id: '3',
    icon: Sparkles,
    title: 'Royal Shave',
    description:
      'The ultimate straight-razor experience. Pre-shave oil, steam towel, premium lather, and aftershave balm — pure ritual.',
    price: 55,
    duration: 60,
  },
  {
    id: '4',
    icon: Zap,
    title: 'The Full Works',
    description:
      'Haircut, beard trim, and luxury shave combined. The complete grooming session for the modern gentleman.',
    price: 110,
    duration: 120,
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function FeaturedServices() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>

        {/* Section header */}
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

        {/* Services grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.05]"
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                variants={card}
                className="group bg-card p-8 flex flex-col hover:bg-white/[0.02] transition-colors duration-300"
              >
                {/* Icon container */}
                <div className="mb-7">
                  <div className="w-11 h-11 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={18} className="text-gold" />
                  </div>
                </div>

                <h3 className="text-white text-sm font-semibold mb-3 group-hover:text-gold transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-white/38 text-[13px] leading-relaxed flex-1 mb-6">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-5 border-t border-white/[0.07]">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-gold font-bold text-lg">${service.price}</span>
                    <span className="text-white/28 text-xs">{service.duration}min</span>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-white/18 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View all CTA */}
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
