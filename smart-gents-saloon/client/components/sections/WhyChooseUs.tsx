'use client'

import { motion } from 'framer-motion'
import { Award, Scissors, Star, Clock, Users, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Feature {
  icon: LucideIcon
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: Award,
    title: 'Master Barbers',
    description:
      'Each team member holds advanced certifications and brings years of hands-on craft experience to every appointment.',
  },
  {
    icon: Scissors,
    title: 'Precision Technique',
    description:
      'We blend timeless barbering traditions with modern cutting methods to deliver a flawless finish, every time.',
  },
  {
    icon: Star,
    title: 'Premium Products',
    description:
      'Only the finest grooming products — from pre-shave oils to finishing pomades — are used on your hair and skin.',
  },
  {
    icon: Clock,
    title: 'On Your Schedule',
    description:
      'Extended hours, seven days a week. Easy online booking with real-time availability and instant confirmation.',
  },
  {
    icon: Users,
    title: 'Personalised Service',
    description:
      'Your barber learns your preferences over time, so every visit gets more tailored than the last.',
  },
  {
    icon: Shield,
    title: 'Hygiene Guaranteed',
    description:
      'Hospital-grade tool sterilisation and single-use supplies for every client — no exceptions, no shortcuts.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function WhyChooseUs() {
  return (
    <section className="bg-card py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Why Us</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
              The Smart Gents<br />
              <span className="text-gold italic">Difference.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/42 text-sm leading-[1.9]"
          >
            We&apos;re not just another barbershop. Every decision we make — from the tools
            we use to the training we invest in — is designed to deliver one thing: an
            exceptional experience that keeps you coming back.
          </motion.p>
        </div>

        {/* Features grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                variants={item}
                className="group bg-card p-8 hover:bg-background transition-colors duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-10 h-10 border border-gold/20 flex items-center justify-center group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                    <Icon size={17} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-semibold mb-2.5 group-hover:text-gold transition-colors duration-200">
                      {feature.title}
                    </h3>
                    <p className="text-white/38 text-[13px] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
