'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Eye, Scissors } from 'lucide-react'
import Container from '@/components/ui/Container'

interface GalleryItem {
  id: string
  label: string
  category: string
  gradientClass: string
}

const items: GalleryItem[] = [
  { id: '1', label: 'Classic Taper', category: 'Haircut', gradientClass: 'from-stone-900 to-neutral-950' },
  { id: '2', label: 'Skin Fade', category: 'Haircut', gradientClass: 'from-zinc-800 to-zinc-950' },
  { id: '3', label: 'Beard Design', category: 'Beard', gradientClass: 'from-neutral-800 to-stone-950' },
  { id: '4', label: 'Straight Razor', category: 'Shave', gradientClass: 'from-stone-800 to-zinc-950' },
  { id: '5', label: 'Textured Crop', category: 'Haircut', gradientClass: 'from-zinc-900 to-neutral-950' },
  { id: '6', label: 'Hot Towel Ritual', category: 'Luxury', gradientClass: 'from-neutral-900 to-stone-950' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}

const galleryItem = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' as const } },
}

export default function GalleryPreview() {
  return (
    <section className="bg-card py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Our Work</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl text-white">
              The <span className="text-gold italic">Gallery.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-white/45 text-[11px] tracking-[0.25em] uppercase hover:text-gold transition-colors duration-200 group"
            >
              View Full Gallery
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.05]"
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              variants={galleryItem}
              className="group relative aspect-square overflow-hidden cursor-pointer"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradientClass}`} />

              {/* Subtle inner highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/[0.02]" />

              {/* Decorative scissors watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
                <Scissors size={64} className="text-gold rotate-45" />
              </div>

              {/* Bottom label (default) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-white/50 text-[9px] tracking-[0.3em] uppercase">{item.category}</p>
              </div>

              {/* Gold accent bottom line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-10 h-10 border border-gold/50 flex items-center justify-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                  <Eye size={15} className="text-gold" />
                </div>
                <div className="text-center transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-[30ms]">
                  <p className="text-white text-[11px] tracking-[0.25em] uppercase font-medium">{item.label}</p>
                  <p className="text-white/38 text-[9px] tracking-wider mt-1">{item.category}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-center text-white/18 text-[10px] tracking-[0.35em] uppercase mt-8"
        >
          Photography coming soon — visit us to see the craftsmanship firsthand
        </motion.p>
      </Container>
    </section>
  )
}
