'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Container from '@/components/ui/Container'

interface TestimonialData {
  id: string
  name: string
  title: string
  comment: string
  rating: number
  date: string
}

const testimonials: TestimonialData[] = [
  {
    id: '1',
    name: 'James Whitmore',
    title: 'Loyal Client since 2019',
    comment:
      "Best barbershop I've ever been to. The attention to detail is unmatched — my barber took the time to understand exactly what I wanted and delivered flawlessly. The hot towel shave was an experience in itself.",
    rating: 5,
    date: 'March 2025',
  },
  {
    id: '2',
    name: 'Marcus Reid',
    title: 'Regular Client',
    comment:
      "I've been coming here for three years now. The atmosphere is premium, the service is consistent, and I always leave looking sharp. My colleagues ask where I get my hair done every single time.",
    rating: 5,
    date: 'February 2025',
  },
  {
    id: '3',
    name: 'Daniel Osei',
    title: 'Featured Review',
    comment:
      "The Full Works package is worth every penny. An hour and a half of pure relaxation and expert grooming. I went in for a trim and came out with a completely new level of confidence.",
    rating: 5,
    date: 'April 2025',
  },
  {
    id: '4',
    name: 'Ryan Chesterfield',
    title: 'Premium Member',
    comment:
      "Impeccable cleanliness, skilled barbers, and an atmosphere that makes you feel like you're getting the VIP treatment every single time. This is the gold standard of barbershops.",
    rating: 5,
    date: 'January 2025',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={11} className="text-gold fill-gold" />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setDir(1)
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6500)
    return () => clearInterval(id)
  }, [])

  const go = (index: number) => {
    setDir(index > active ? 1 : -1)
    setActive(index)
  }

  const prev = () => {
    setDir(-1)
    setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  }

  const next = () => {
    setDir(1)
    setActive((a) => (a + 1) % testimonials.length)
  }

  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-hidden">
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
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Client Reviews</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-white">
            What Gentlemen <span className="text-gold italic">Say.</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Quote decoration */}
          <div className="absolute -top-5 -left-2 sm:-left-6 text-gold/8 pointer-events-none select-none">
            <Quote size={88} />
          </div>

          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 55 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -55 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
              className="bg-card border border-white/[0.06] p-9 sm:p-12"
            >
              <Stars count={testimonials[active].rating} />

              <blockquote className="font-serif text-xl sm:text-2xl text-white/82 leading-relaxed mt-6 mb-8 italic">
                &ldquo;{testimonials[active].comment}&rdquo;
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t border-white/[0.07]">
                {/* Avatar initial */}
                <div className="shrink-0 w-10 h-10 bg-gold/10 border border-gold/22 flex items-center justify-center text-gold font-bold text-sm">
                  {testimonials[active].name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold">{testimonials[active].name}</p>
                  <p className="text-white/30 text-[11px] tracking-wider mt-0.5">{testimonials[active].title}</p>
                </div>
                <span className="text-white/22 text-[11px] shrink-0">{testimonials[active].date}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-px transition-all duration-300 ${
                    i === active ? 'w-8 bg-gold' : 'w-4 bg-white/18 hover:bg-white/35'
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-2">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/35 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/35 hover:border-gold hover:text-gold transition-all duration-200"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
