export interface GalleryEntry {
  id: string
  label: string
  category: string
  gradientClass: string
  aspectClass: string
  /** Cloudinary CDN URL — present for real uploaded images */
  url?: string
  /** Cloudinary public ID — used for admin deletion */
  publicId?: string
}

export const GALLERY_CATEGORIES = ['All', 'Haircuts', 'Beard', 'Shave', 'Styling', 'Luxury'] as const
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number]

// ─── Presentation arrays (assigned cyclically to API items) ────────────────

const GRADIENT_CLASSES = [
  'from-stone-900 to-neutral-950',
  'from-zinc-800 to-zinc-950',
  'from-neutral-800 to-stone-950',
  'from-stone-800 to-zinc-950',
  'from-zinc-900 to-neutral-950',
  'from-neutral-900 to-zinc-950',
  'from-stone-700 to-neutral-900',
  'from-zinc-700 to-stone-900',
]

const ASPECT_CLASSES = [
  'aspect-[3/4]',
  'aspect-square',
  'aspect-[2/3]',
  'aspect-[4/3]',
] as const

// ─── Raw API shape (from Gallery Prisma model) ─────────────────────────────

interface ApiGalleryItem {
  id: string
  url: string
  publicId: string
  caption?: string | null
  category?: string | null
  isActive: boolean
  sortOrder: number
}

export function mapApiGalleryItem(item: ApiGalleryItem, index: number): GalleryEntry {
  return {
    id:            item.id,
    label:         item.caption ?? 'Gallery',
    category:      item.category ?? 'Haircuts',
    url:           item.url,
    publicId:      item.publicId,
    gradientClass: GRADIENT_CLASSES[index % GRADIENT_CLASSES.length],
    aspectClass:   ASPECT_CLASSES[index % ASPECT_CLASSES.length],
  }
}

// ─── Static fallback (shown when API is unavailable) ──────────────────────

export const GALLERY_FALLBACK: GalleryEntry[] = [
  // Haircuts
  { id: '1',  label: 'Classic Taper',      category: 'Haircuts', gradientClass: 'from-stone-900 to-neutral-950',  aspectClass: 'aspect-[3/4]'  },
  { id: '2',  label: 'High Skin Fade',     category: 'Haircuts', gradientClass: 'from-zinc-800 to-zinc-950',      aspectClass: 'aspect-square' },
  { id: '3',  label: 'Textured Crop',      category: 'Haircuts', gradientClass: 'from-neutral-800 to-stone-950',  aspectClass: 'aspect-[2/3]'  },
  { id: '4',  label: 'Caesar Cut',         category: 'Haircuts', gradientClass: 'from-stone-800 to-zinc-950',     aspectClass: 'aspect-[4/3]'  },
  { id: '5',  label: 'Undercut Fade',      category: 'Haircuts', gradientClass: 'from-zinc-900 to-neutral-950',   aspectClass: 'aspect-[3/4]'  },
  { id: '6',  label: 'Buzz Cut',           category: 'Haircuts', gradientClass: 'from-neutral-900 to-zinc-950',   aspectClass: 'aspect-square' },
  // Beard
  { id: '7',  label: 'Full Beard Shape',   category: 'Beard',    gradientClass: 'from-stone-700 to-neutral-900',  aspectClass: 'aspect-square' },
  { id: '8',  label: 'Goatee Design',      category: 'Beard',    gradientClass: 'from-zinc-700 to-stone-900',     aspectClass: 'aspect-[3/4]'  },
  { id: '9',  label: 'Stubble Fade',       category: 'Beard',    gradientClass: 'from-neutral-700 to-zinc-950',   aspectClass: 'aspect-[2/3]'  },
  { id: '10', label: 'French Crop Beard',  category: 'Beard',    gradientClass: 'from-stone-800 to-neutral-950',  aspectClass: 'aspect-[4/3]'  },
  // Shave
  { id: '11', label: 'Straight Razor',     category: 'Shave',    gradientClass: 'from-zinc-900 to-stone-950',     aspectClass: 'aspect-[3/4]'  },
  { id: '12', label: 'Hot Towel Ritual',   category: 'Shave',    gradientClass: 'from-neutral-900 to-zinc-950',   aspectClass: 'aspect-square' },
  { id: '13', label: 'Classic Wet Shave',  category: 'Shave',    gradientClass: 'from-stone-900 to-zinc-950',     aspectClass: 'aspect-[2/3]'  },
  // Styling
  { id: '14', label: 'Pompadour',          category: 'Styling',  gradientClass: 'from-zinc-800 to-neutral-950',   aspectClass: 'aspect-square' },
  { id: '15', label: 'Slick Back',         category: 'Styling',  gradientClass: 'from-stone-800 to-zinc-950',     aspectClass: 'aspect-[4/3]'  },
  { id: '16', label: 'Waves & Texture',    category: 'Styling',  gradientClass: 'from-neutral-800 to-stone-950',  aspectClass: 'aspect-[3/4]'  },
  { id: '17', label: 'Hair Tonic Finish',  category: 'Styling',  gradientClass: 'from-zinc-900 to-stone-950',     aspectClass: 'aspect-square' },
  // Luxury
  { id: '18', label: 'Royal Ritual',       category: 'Luxury',   gradientClass: 'from-stone-700 to-zinc-950',     aspectClass: 'aspect-[2/3]'  },
  { id: '19', label: 'VIP Full Package',   category: 'Luxury',   gradientClass: 'from-neutral-700 to-stone-950',  aspectClass: 'aspect-[3/4]'  },
  { id: '20', label: 'Signature Groom',    category: 'Luxury',   gradientClass: 'from-zinc-700 to-neutral-950',   aspectClass: 'aspect-square' },
]

// ─── Data fetching ─────────────────────────────────────────────────────────

export async function getGallery(): Promise<GalleryEntry[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/gallery`, {
      next: { revalidate: 600 },
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const body = await res.json() as { data?: ApiGalleryItem[] } | ApiGalleryItem[]
    // Unwrap TransformInterceptor envelope if present
    const raw = Array.isArray(body) ? body : (body.data ?? [])
    if (raw.length === 0) return GALLERY_FALLBACK
    return raw.map(mapApiGalleryItem)
  } catch {
    return GALLERY_FALLBACK
  }
}
