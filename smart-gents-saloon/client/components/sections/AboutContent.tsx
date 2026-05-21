'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, Heart, Users, Award, ArrowRight, Star, Shield } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import Container from '@/components/ui/Container'

// ─── data ──────────────────────────────────────────────────────────────────

const TIMELINE = [
  {
    year: '2014',
    title: 'The Beginning',
    body: 'James Whitmore opened our first two chairs in Mayfair with one conviction: London deserved a barbershop where craft came before convenience.',
  },
  {
    year: '2016',
    title: 'Industry Recognition',
    body: 'Named Best New Barbershop at the London Grooming Excellence Awards — the first of more than twenty accolades earned over the decade.',
  },
  {
    year: '2018',
    title: 'The Royal Shave',
    body: 'Launched our signature straight-razor ritual and welcomed three new master barbers, doubling capacity without compromising the experience.',
  },
  {
    year: '2020',
    title: 'Reimagined Space',
    body: 'A full interior redesign brought the refined, intimate atmosphere that defines Smart Gents today — every detail considered, nothing accidental.',
  },
  {
    year: '2022',
    title: '5,000 Clients',
    body: 'Reached a milestone of 5,000 loyal clients and introduced online booking — making premium grooming even easier without losing the personal touch.',
  },
  {
    year: '2024',
    title: 'A Decade of Craft',
    body: 'Celebrated ten years with a flagship services rebrand, a new treatment menu, and a renewed commitment to setting the standard in London grooming.',
  },
]

const STATS = [
  { value: '10+', label: 'Years of Craft'        },
  { value: '5K+', label: 'Clients Served'        },
  { value: '8',   label: 'Master Barbers'        },
  { value: '20+', label: 'Industry Awards'       },
  { value: '61+', label: 'Combined Yrs of Exp.'  },
  { value: '98%', label: 'Client Satisfaction'   },
]

const PILLARS: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Scissors,
    title: 'The Craft',
    body: 'Barbering is a discipline. Every cut, fade, and shave is the result of years of training and an uncompromising attention to detail that no shortcut can replicate.',
  },
  {
    icon: Heart,
    title: 'The Experience',
    body: 'From the moment you sit down, every element is intentional — the service, the atmosphere, the product. An appointment here should feel like a ritual, not a routine.',
  },
  {
    icon: Users,
    title: 'The People',
    body: 'Our barbers are craftsmen who genuinely care about the person in their chair. That relationship — built appointment by appointment — is what keeps clients coming back.',
  },
]

const STORY_STATS = [
  { value: '2014', label: 'Est.'           },
  { value: '5K+',  label: 'Clients Served' },
  { value: '8',    label: 'Expert Barbers' },
  { value: '20+',  label: 'Awards Won'     },
]

// ─── shared animation variants ─────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

// ─── 1 · intro ─────────────────────────────────────────────────────────────

function IntroSection() {
  return (
    <section className="relative bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
      {/* radial glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_60%,rgba(200,169,107,0.06)_0%,transparent_65%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <Container className="relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Our Story</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6">
            A Decade of Craft.<br />
            <span className="text-gold italic">A Legacy of Excellence.</span>
          </h1>
          <p className="text-white/38 max-w-lg mx-auto text-sm leading-relaxed">
            Since 2014, Smart Gents Saloon has set the standard for premium grooming in London —
            one appointment, one client, one perfectly executed cut at a time.
          </p>
        </motion.div>
      </Container>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />
    </section>
  )
}

// ─── 2 · story ─────────────────────────────────────────────────────────────

function StorySection() {
  return (
    <section className="bg-card py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 xl:gap-24 items-center">

          {/* visual block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' as const }}
            className="relative"
          >
            <div className="absolute -top-4 -left-4 right-4 bottom-4 border border-gold/8 pointer-events-none" />
            <div className="absolute -top-8 -left-8 right-8 bottom-8 border border-gold/4 pointer-events-none hidden lg:block" />

            <div className="relative aspect-[4/3] bg-background overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-stone-900 to-background" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Scissors size={52} className="text-gold/20 rotate-45" />
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-gold/20" />
                  <span className="text-white/15 text-[10px] tracking-[0.4em] uppercase">Est. 2014</span>
                  <div className="h-px w-8 bg-gold/20" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: 'easeOut' as const, delay: 0.12 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.4em] uppercase">Who We Are</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6 leading-tight">
              More Than a Cut.<br />
              <span className="text-gold italic">An Experience.</span>
            </h2>

            <p className="text-white/45 text-sm leading-[1.85] mb-4">
              Smart Gents Saloon was founded by James Whitmore in 2014 with a single belief: that
              exceptional grooming should feel exceptional from start to finish. Not just the cut —
              the entire experience. The atmosphere, the conversation, the product, the attention.
            </p>
            <p className="text-white/45 text-sm leading-[1.85] mb-4">
              Our master barbers bring decades of combined experience to every appointment, blending
              timeless barbering traditions with modern precision and a genuine passion for the craft.
            </p>
            <p className="text-white/45 text-sm leading-[1.85] mb-10">
              We believe a great cut is more than aesthetics — it&apos;s confidence. Every client
              leaves not just looking their best, but feeling it.
            </p>

            {/* mini stats */}
            <div className="grid grid-cols-2 gap-px bg-white/[0.06] mb-10">
              {STORY_STATS.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <p className="font-serif text-2xl text-gold font-bold leading-none">{s.value}</p>
                  <p className="text-white/35 text-[10px] tracking-[0.22em] uppercase mt-2">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              href="/team"
              className="inline-flex items-center gap-2 text-gold text-[11px] tracking-[0.25em] uppercase font-semibold group"
            >
              Meet Our Team
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

// ─── 3 · timeline ──────────────────────────────────────────────────────────

function TimelineSection() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Milestones</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">
            Ten Years in the <span className="text-gold italic">Making.</span>
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {TIMELINE.map((item) => (
            <motion.div
              key={item.year}
              variants={fadeUp}
              className="group bg-card p-8 hover:bg-white/[0.02] transition-colors duration-300"
            >
              <p className="font-serif text-4xl text-gold font-bold leading-none mb-4">{item.year}</p>
              <div className="h-px w-8 bg-gold/25 mb-5 group-hover:w-14 transition-all duration-300" />
              <h3 className="text-white text-sm font-semibold mb-3 group-hover:text-gold transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-white/38 text-[13px] leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

// ─── 4 · philosophy ────────────────────────────────────────────────────────

function PhilosophySection() {
  return (
    <section className="bg-card py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-end mb-14">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Our Philosophy</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white leading-tight">
              What We Stand<br />
              <span className="text-gold italic">For.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/42 text-sm leading-[1.9]"
          >
            Every decision we make — from the tools we use to the training we invest in — flows
            from three core convictions that have guided us since day one.
          </motion.p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={pillar.title}
                variants={fadeUp}
                className="group bg-card p-10 hover:bg-background transition-colors duration-300"
              >
                <div className="w-12 h-12 border border-gold/20 flex items-center justify-center mb-7 group-hover:border-gold/50 group-hover:bg-gold/5 transition-all duration-300">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="text-white text-base font-semibold mb-4 group-hover:text-gold transition-colors duration-200">
                  {pillar.title}
                </h3>
                <p className="text-white/38 text-[13px] leading-relaxed">{pillar.body}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </Container>
    </section>
  )
}

// ─── 5 · stats bar ─────────────────────────────────────────────────────────

function StatsSection() {
  return (
    <section className="bg-background py-16 md:py-20 overflow-x-hidden">
      <Container>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px bg-white/[0.05]"
        >
          {STATS.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="group bg-card px-6 py-8 text-center hover:bg-white/[0.02] transition-colors duration-300"
            >
              <p className="font-serif text-3xl text-gold font-bold leading-none mb-2">{s.value}</p>
              <p className="text-white/28 text-[9px] tracking-[0.22em] uppercase">{s.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Awards strip */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-10"
        >
          {['London Grooming Awards', 'Best Barbershop UK', 'Luxury Lifestyle Awards', 'GQ Grooming Guide'].map((award) => (
            <div key={award} className="flex items-center gap-2 text-white/20">
              <Star size={10} className="text-gold/40 shrink-0" />
              <span className="text-[9px] tracking-[0.28em] uppercase">{award}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

// ─── default export ─────────────────────────────────────────────────────────

export default function AboutContent() {
  return (
    <>
      <IntroSection />
      <StorySection />
      <TimelineSection />
      <PhilosophySection />
      <StatsSection />
    </>
  )
}
