'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Scissors, ZoomIn } from 'lucide-react'
import { GALLERY_CATEGORIES, type GalleryCategory, type GalleryEntry } from '@/lib/gallery'
import Container from '@/components/ui/Container'

// ─── Animation variants ────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const } },
}

// ─── Image area — real photo or gradient placeholder ───────────────────────

function GalleryImage({
  item,
  fill = false,
  className = '',
  priority = false,
}: {
  item: GalleryEntry
  fill?: boolean
  className?: string
  priority?: boolean
}) {
  if (item.url) {
    return (
      <Image
        src={item.url}
        alt={item.label}
        fill={fill}
        sizes={fill ? '(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw' : undefined}
        className={`object-cover ${className}`}
        priority={priority}
        placeholder="empty"
      />
    )
  }

  // Fallback gradient placeholder
  return (
    <>
      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradientClass}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <Scissors size={48} className="text-gold rotate-45" />
      </div>
    </>
  )
}

// ─── Single card ───────────────────────────────────────────────────────────

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: GalleryEntry
  index: number
  onOpen: (index: number) => void
}) {
  return (
    <motion.div
      variants={itemVariants}
      className="break-inside-avoid mb-1.5 cursor-pointer group relative overflow-hidden"
      onClick={() => onOpen(index)}
    >
      <div className={`relative ${item.aspectClass} overflow-hidden`}>
        {/* First 4 images are above the fold — load eagerly for LCP */}
        <GalleryImage item={item} fill priority={index < 4} />

        {/* category label */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/55 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <p className="text-white/45 text-[9px] tracking-[0.28em] uppercase">{item.category}</p>
        </div>

        {/* gold hover line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

        {/* hover overlay */}
        <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2.5">
          <div className="w-9 h-9 border border-gold/50 flex items-center justify-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
            <ZoomIn size={14} className="text-gold" />
          </div>
          <div className="text-center translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-[25ms]">
            <p className="text-white text-[10px] tracking-[0.22em] uppercase font-medium">{item.label}</p>
            <p className="text-white/35 text-[9px] tracking-wider mt-0.5">{item.category}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Modal ─────────────────────────────────────────────────────────────────

function GalleryModal({
  item,
  index,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  item: GalleryEntry
  index: number
  total: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-background/88 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 10 }}
        transition={{ duration: 0.28, ease: 'easeOut' as const }}
        className="relative w-full max-w-xl bg-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.label}
      >
        {/* top accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        {/* close */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 w-8 h-8 border border-white/12 flex items-center justify-center text-white/35 hover:border-gold/50 hover:text-gold transition-all duration-200"
          aria-label="Close"
        >
          <X size={13} />
        </button>

        {/* image area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <GalleryImage item={item} fill className="transition-transform duration-500 group-hover:scale-105" />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* info + nav */}
        <div className="p-6 flex items-center justify-between gap-4">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <p className="text-white text-sm font-semibold tracking-wide">{item.label}</p>
                <p className="text-white/32 text-[10px] tracking-[0.28em] uppercase mt-1">{item.category}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <span className="text-white/20 text-[10px] tracking-wider mr-2">
              {index + 1} / {total}
            </span>
            <button
              onClick={onPrev}
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:border-gold/50 hover:text-gold transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={onNext}
              className="w-8 h-8 border border-white/10 flex items-center justify-center text-white/35 hover:border-gold/50 hover:text-gold transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* bottom accent */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
      </motion.div>
    </motion.div>
  )
}

// ─── Main component ────────────────────────────────────────────────────────

export default function GalleryGrid({ items }: { items: GalleryEntry[] }) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const filtered =
    activeCategory === 'All' ? items : items.filter((i) => i.category === activeCategory)

  const selectedItem = selectedIndex !== null ? filtered[selectedIndex] ?? null : null

  const openModal  = useCallback((index: number) => setSelectedIndex(index), [])
  const closeModal = useCallback(() => setSelectedIndex(null), [])

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + filtered.length) % filtered.length,
    )
  }, [filtered.length])

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % filtered.length,
    )
  }, [filtered.length])

  useEffect(() => {
    if (selectedIndex === null) return
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      closeModal()
      if (e.key === 'ArrowLeft')   goPrev()
      if (e.key === 'ArrowRight')  goNext()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [selectedIndex, closeModal, goPrev, goNext])

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [selectedIndex])

  const handleCategoryChange = (cat: GalleryCategory) => {
    setSelectedIndex(null)
    setActiveCategory(cat)
  }

  const hasRealImages = items.some((i) => !!i.url)

  return (
    <>
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
              <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Our Work</span>
              <div className="h-px w-8 bg-gold/45" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
              The <span className="text-gold italic">Gallery.</span>
            </h1>
            <p className="text-white/35 max-w-sm mx-auto text-sm leading-relaxed">
              A showcase of the craft — each cut, shave, and sculpt a testament to
              precision and artistry.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-200 border ${
                  activeCategory === cat
                    ? 'border-gold text-gold bg-gold/5'
                    : 'border-white/10 text-white/35 hover:border-white/25 hover:text-white/55'
                }`}
              >
                {cat}
                {cat !== 'All' && (
                  <span className="ml-1.5 text-[8px] opacity-50">
                    {items.filter((i) => i.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* Masonry grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="columns-2 md:columns-3 lg:columns-4 gap-1.5"
            >
              {filtered.map((item, index) => (
                <GalleryCard
                  key={item.id}
                  item={item}
                  index={index}
                  onOpen={openModal}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center text-white/15 text-[10px] tracking-[0.35em] uppercase mt-10"
          >
            {hasRealImages
              ? `${items.length} image${items.length !== 1 ? 's' : ''} · Powered by Cloudinary`
              : 'Photography coming soon — visit us to see the craftsmanship firsthand'}
          </motion.p>
        </Container>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem !== null && selectedIndex !== null && (
          <GalleryModal
            item={selectedItem}
            index={selectedIndex}
            total={filtered.length}
            onClose={closeModal}
            onPrev={goPrev}
            onNext={goNext}
          />
        )}
      </AnimatePresence>
    </>
  )
}
