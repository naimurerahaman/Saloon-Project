'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Scissors, ArrowRight, AtSign } from 'lucide-react'
import type { TeamMember } from '@/lib/team'
import Container from '@/components/ui/Container'

// ─── variants ──────────────────────────────────────────────────────────────

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

// ─── card ──────────────────────────────────────────────────────────────────

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <motion.article
      variants={cardVariant}
      className="group bg-card flex flex-col hover:bg-white/[0.02] transition-colors duration-300"
    >
      {/* top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/22 to-transparent group-hover:via-gold/45 transition-all duration-500" />

      {/* avatar */}
      <div className="relative aspect-square overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradientClass} group-hover:scale-[1.03] transition-transform duration-700 ease-out`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        {/* scissors watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.055] group-hover:opacity-[0.08] transition-opacity duration-500">
          <Scissors size={56} className="text-gold rotate-45" />
        </div>

        {/* featured badge */}
        {member.featured && (
          <div className="absolute top-3.5 right-3.5 border border-gold/55 px-2.5 py-1 bg-background/30 backdrop-blur-sm">
            <span className="text-gold text-[8px] tracking-[0.3em] uppercase font-semibold">Founder</span>
          </div>
        )}

        {/* experience badge */}
        <div className="absolute bottom-3.5 left-3.5 bg-gold px-3 py-1.5">
          <span className="text-background text-[9px] font-bold tracking-[0.22em] uppercase">
            {member.experience} yrs
          </span>
        </div>
      </div>

      {/* content */}
      <div className="p-6 flex flex-col flex-1">
        {/* name + role */}
        <div className="mb-4">
          <h3 className="font-serif text-[1.35rem] leading-snug text-white group-hover:text-gold transition-colors duration-250">
            {member.name}
          </h3>
          <p className="text-gold/60 text-[9.5px] tracking-[0.32em] uppercase mt-1.5">{member.role}</p>
        </div>

        {/* bio */}
        <p className="text-white/38 text-[13px] leading-relaxed flex-1 mb-5">{member.bio}</p>

        {/* specialty tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {member.specialties.map((s) => (
            <span
              key={s}
              className="text-white/25 text-[8.5px] tracking-[0.2em] uppercase border border-white/[0.07] px-2 py-[3px]"
            >
              {s}
            </span>
          ))}
        </div>

        {/* footer */}
        <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
          {member.instagram ? (
            <a
              href={`https://instagram.com/${member.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/25 hover:text-gold transition-colors duration-200 min-w-0"
              aria-label={`${member.name} on Instagram`}
            >
              <AtSign size={11} className="shrink-0" />
              <span className="text-[10px] tracking-wide truncate">{member.instagram}</span>
            </a>
          ) : (
            <div />
          )}

          <Link
            href={`/booking?barber=${member.id}`}
            className="flex items-center gap-1.5 text-white/35 text-[10px] tracking-[0.22em] uppercase hover:text-gold transition-colors duration-200 shrink-0 group/book"
          >
            Book
            <ArrowRight
              size={10}
              className="group-hover/book:translate-x-0.5 transition-transform duration-200"
            />
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

// ─── featured founder strip ────────────────────────────────────────────────

function FounderStrip({ member }: { member: TeamMember }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center py-10 px-8 bg-card border-y border-white/[0.05] mb-14 group"
    >
      <div className="flex items-center gap-6 md:gap-8 min-w-0">
        {/* small avatar */}
        <div className="relative shrink-0 w-16 h-16 overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${member.gradientClass}`} />
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.1]">
            <Scissors size={22} className="text-gold rotate-45" />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
        </div>

        <div className="min-w-0">
          <p className="text-white/22 text-[9px] tracking-[0.38em] uppercase mb-1.5">Meet the Founder</p>
          <h3 className="font-serif text-xl text-white">{member.name}</h3>
          <p className="text-gold/60 text-[9.5px] tracking-[0.28em] uppercase mt-1">{member.role}</p>
        </div>
      </div>

      <div className="flex items-center gap-5 shrink-0">
        <div className="hidden sm:block text-right">
          <p className="font-serif text-2xl text-gold font-bold leading-none">{member.experience}+</p>
          <p className="text-white/28 text-[9px] tracking-[0.22em] uppercase mt-1">Years of Craft</p>
        </div>
        <Link
          href={`/booking?barber=${member.id}`}
          className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold/35 text-gold/80 text-[10px] tracking-[0.25em] uppercase hover:border-gold hover:text-gold hover:bg-gold/5 transition-all duration-200"
        >
          Book James
          <ArrowRight size={10} />
        </Link>
      </div>
    </motion.div>
  )
}

// ─── main export ───────────────────────────────────────────────────────────

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  const founder = members.find((m) => m.featured)
  const rest = members.filter((m) => !m.featured)

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>

        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">The Team</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            The <span className="text-gold italic">Barbers.</span>
          </h1>
          <p className="text-white/35 max-w-sm mx-auto text-sm leading-relaxed">
            Every member of our team is a master of their craft — trained, certified,
            and dedicated to giving you the finest grooming experience.
          </p>
        </motion.div>

        {/* founder highlight */}
        {founder && <FounderStrip member={founder} />}

        {/* team grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {/* include founder in grid too so the grid is complete */}
          {members.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </motion.div>

        {/* footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-white/18 text-[10px] tracking-[0.35em] uppercase mt-10"
        >
          {members.length} barbers · combined {members.reduce((sum, m) => sum + m.experience, 0)}+ years of experience
        </motion.p>
      </Container>
    </section>
  )
}
