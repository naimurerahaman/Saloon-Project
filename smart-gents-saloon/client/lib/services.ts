import type { Service } from '@/types'

export const SERVICES_FALLBACK: Service[] = [
  {
    id: '1',
    title: 'Signature Haircut',
    description:
      'Precision cut tailored to your face shape and lifestyle. Includes consultation, scalp massage, shampoo, and blow-dry styling by a master barber.',
    price: 45,
    duration: 60,
    category: 'Haircut',
  },
  {
    id: '2',
    title: 'Skin Fade',
    description:
      'Seamless taper faded to the skin — the gold standard of modern barbering. Clean lines, sharp edges, and immaculate finish.',
    price: 50,
    duration: 60,
    category: 'Haircut',
  },
  {
    id: '3',
    title: 'Textured Crop',
    description:
      'Contemporary disconnected crop with textured top. Ideal for thick hair. Includes styling consultation and premium product finish.',
    price: 48,
    duration: 60,
    category: 'Haircut',
  },
  {
    id: '4',
    title: 'Beard Sculpt & Design',
    description:
      'Expert beard shaping and sculpting to define your jawline. Includes hot towel prep, precision trim, and conditioning balm treatment.',
    price: 35,
    duration: 45,
    category: 'Beard',
  },
  {
    id: '5',
    title: 'Beard & Haircut Combo',
    description:
      'The most popular pairing — precision haircut followed by expert beard sculpting. Full grooming session for a sharp, complete look.',
    price: 70,
    duration: 90,
    category: 'Beard',
  },
  {
    id: '6',
    title: 'Royal Straight Razor Shave',
    description:
      'The ultimate shaving experience. Pre-shave oil, steam towel, premium lather, straight-razor shave, cold towel close, and aftershave balm.',
    price: 55,
    duration: 60,
    category: 'Shave',
  },
  {
    id: '7',
    title: 'Hot Towel Shave',
    description:
      'Classic hot-towel ritual for a perfectly smooth shave. Softening steam, precision safety-razor technique, and soothing aftercare finish.',
    price: 40,
    duration: 45,
    category: 'Shave',
  },
  {
    id: '8',
    title: 'The Full Works',
    description:
      'Haircut, beard sculpt, and luxury straight-razor shave combined. The definitive grooming session for the modern gentleman — nothing left out.',
    price: 110,
    duration: 120,
    category: 'Packages',
  },
  {
    id: '9',
    title: 'Groom Package',
    description:
      'Wedding-day ready — premium haircut, beard design, hot towel shave, and scalp treatment. Arrive looking your absolute best.',
    price: 130,
    duration: 150,
    category: 'Packages',
  },
  {
    id: '10',
    title: 'Scalp Treatment',
    description:
      'Deep-cleansing scalp detox with exfoliating scrub, nourishing masque, and invigorating massage. Promotes healthy hair growth.',
    price: 45,
    duration: 45,
    category: 'Treatments',
  },
  {
    id: '11',
    title: 'Grey Blending',
    description:
      'Subtle, natural-looking colour service to blend and soften grey. Includes consultation, application, and finish — seamless and undetectable.',
    price: 65,
    duration: 75,
    category: 'Treatments',
  },
  {
    id: '12',
    title: 'Kids\' Cut',
    description:
      'Patient, skilled barbers and a relaxed environment for younger clients. A clean, stylish cut they\'ll love — ages 12 and under.',
    price: 28,
    duration: 40,
    category: 'Haircut',
  },
]

export const CATEGORIES = ['All', 'Haircut', 'Beard', 'Shave', 'Packages', 'Treatments'] as const
export type ServiceCategory = (typeof CATEGORIES)[number]

export async function getServices(): Promise<Service[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/services`, {
      next: { revalidate: 300 },
    })
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  } catch {
    return SERVICES_FALLBACK
  }
}
