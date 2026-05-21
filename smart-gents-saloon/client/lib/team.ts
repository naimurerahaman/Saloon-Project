export interface TeamMember {
  id: string
  name: string
  role: string
  specialties: string[]
  experience: number
  bio: string
  instagram?: string
  gradientClass: string
  featured?: boolean
}

export const TEAM_FALLBACK: TeamMember[] = [
  {
    id: '1',
    name: 'James Whitmore',
    role: 'Master Barber · Co-Founder',
    specialties: ['Classic Taper', 'Straight Razor', 'Hair Design'],
    experience: 15,
    bio: 'With 15 years behind the chair, James has mastered every facet of the craft. His precision and passion for the industry shaped Smart Gents Saloon from day one.',
    instagram: 'jwhitmore.sg',
    gradientClass: 'from-stone-700 to-neutral-900',
    featured: true,
  },
  {
    id: '2',
    name: 'Ethan Cole',
    role: 'Creative Director',
    specialties: ['Textured Crops', 'Pompadour', 'Hair Tonic'],
    experience: 12,
    bio: 'Ethan pushes the boundaries of modern barbering. Equal parts artist and technician, he brings a creative eye to every appointment and loves collaborating on bold new styles.',
    instagram: 'ethancole.cuts',
    gradientClass: 'from-zinc-700 to-zinc-900',
    featured: false,
  },
  {
    id: '3',
    name: 'Marcus Reid',
    role: 'Senior Barber',
    specialties: ['Skin Fade', 'Beard Sculpt', 'Line-Ups'],
    experience: 10,
    bio: 'Marcus is the fade specialist your hair deserves. Clean, seamless, and always on point — his work speaks louder than words and his client list proves it.',
    instagram: 'marcusreid.sg',
    gradientClass: 'from-neutral-700 to-stone-900',
    featured: false,
  },
  {
    id: '4',
    name: 'Nathan Park',
    role: 'Razor Specialist',
    specialties: ['Hot Towel Shave', 'Straight Razor', 'Neck Shave'],
    experience: 9,
    bio: 'Nathan trained under renowned shaving masters across Europe. His hot-towel ritual is the closest thing to a spa experience in a traditional barbershop.',
    instagram: 'nathan.shaves',
    gradientClass: 'from-stone-800 to-zinc-950',
    featured: false,
  },
  {
    id: '5',
    name: 'Daniel Cruz',
    role: 'Fade Specialist',
    specialties: ['High Fade', 'Caesar Cut', 'Buzz Cut'],
    experience: 8,
    bio: "Daniel's fades are crisp, clean, and consistently perfect. A favourite among clients who want a modern look with sharp, precise edges that hold up all week.",
    instagram: 'daniel.fadecraft',
    gradientClass: 'from-zinc-800 to-neutral-950',
    featured: false,
  },
  {
    id: '6',
    name: 'Oliver Bennett',
    role: 'Beard Artisan',
    specialties: ['Beard Design', 'Goatee', 'Stubble Fade'],
    experience: 7,
    bio: 'Oliver sculpts beards with the patience and eye of a fine artist. Every beard he shapes is a deliberate, bespoke creation built around your face and style.',
    instagram: 'oliver.beards',
    gradientClass: 'from-neutral-800 to-stone-950',
    featured: false,
  },
]

export async function getTeam(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/barbers`, {
      next: { revalidate: 3600 },
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const body = await res.json() as { data?: TeamMember[] } | TeamMember[]
    const list = Array.isArray(body) ? body : (body.data ?? [])
    return list.length ? list : TEAM_FALLBACK
  } catch {
    return TEAM_FALLBACK
  }
}
