import type { Service } from '@/types'

// ─── Types ─────────────────────────────────────────────────────────────────

export interface BookingBarber {
  id: string
  name: string
  specialty: string
  experience: number
  gradientClass: string
  isActive?: boolean
}

export interface AvailabilityResponse {
  date: string
  barberId: string
  serviceId: string
  availableSlots: string[]
}

export interface CreateAppointmentPayload {
  serviceId: string
  barberId: string
  date: string
  time: string
  customerName: string
  customerEmail: string
  customerPhone: string
  notes?: string
}

export interface CreatedAppointment {
  id: string
  customerName: string
  customerEmail: string
  date: string
  time: string
  price: number
  service: { id: string; title: string; duration: number }
  barber: { id: string; name: string }
}

// ─── Fallback data ─────────────────────────────────────────────────────────

export const BARBERS_FALLBACK: BookingBarber[] = [
  { id: '1', name: 'James Whitmore', specialty: 'Classic Taper · Straight Razor', experience: 15, gradientClass: 'from-stone-700 to-neutral-900' },
  { id: '2', name: 'Ethan Cole',     specialty: 'Textured Crops · Pompadour',    experience: 12, gradientClass: 'from-zinc-700 to-zinc-900' },
  { id: '3', name: 'Marcus Reid',    specialty: 'Skin Fade · Beard Sculpt',       experience: 10, gradientClass: 'from-neutral-700 to-stone-900' },
  { id: '4', name: 'Nathan Park',    specialty: 'Hot Towel Shave · Straight Razor', experience: 9, gradientClass: 'from-stone-800 to-zinc-950' },
  { id: '5', name: 'Daniel Cruz',    specialty: 'High Fade · Caesar Cut',         experience: 8,  gradientClass: 'from-zinc-800 to-neutral-950' },
  { id: '6', name: 'Oliver Bennett', specialty: 'Beard Design · Stubble Fade',    experience: 7,  gradientClass: 'from-neutral-800 to-stone-950' },
]

// ─── Gradient class map for API barbers (no gradientClass from server) ────

const GRADIENT_CLASSES = [
  'from-stone-700 to-neutral-900',
  'from-zinc-700 to-zinc-900',
  'from-neutral-700 to-stone-900',
  'from-stone-800 to-zinc-950',
  'from-zinc-800 to-neutral-950',
  'from-neutral-800 to-stone-950',
]

// ─── API functions ─────────────────────────────────────────────────────────

export async function getBookingBarbers(): Promise<BookingBarber[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/barbers`, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    const barbers: BookingBarber[] = (Array.isArray(data) ? data : data.data ?? []).map(
      (b: BookingBarber & { sortOrder?: number }, i: number) => ({
        id: b.id,
        name: b.name,
        specialty: b.specialty,
        experience: b.experience,
        gradientClass: GRADIENT_CLASSES[i % GRADIENT_CLASSES.length],
      }),
    )
    return barbers.length ? barbers : BARBERS_FALLBACK
  } catch {
    return BARBERS_FALLBACK
  }
}

/** Returns slots from the API; falls back to locally-generated slots on error. */
export async function getAvailableSlots(
  barberId: string,
  serviceId: string,
  date: string,
): Promise<string[]> {
  try {
    const params = new URLSearchParams({ barberId, serviceId, date })
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/appointments/availability?${params}`,
      { cache: 'no-store' },
    )
    if (!res.ok) throw new Error('Failed to fetch availability')
    const body = await res.json() as { data?: AvailabilityResponse } | AvailabilityResponse
    // Unwrap TransformInterceptor envelope if present
    const data: AvailabilityResponse = ('data' in body && body.data) ? body.data : (body as AvailabilityResponse)
    return data.availableSlots ?? []
  } catch {
    return generateFallbackSlots(date)
  }
}

/** Generates 30-min slots within standard business hours when API is unavailable. */
export function generateFallbackSlots(date: string): string[] {
  const [year, month, day] = date.split('-').map(Number)
  const d = new Date(year, month - 1, day)
  const dow = d.getDay()

  const hours: Record<number, [string, string]> = {
    0: ['10:00', '18:00'],
    1: ['09:00', '21:00'],
    2: ['09:00', '21:00'],
    3: ['09:00', '21:00'],
    4: ['09:00', '21:00'],
    5: ['09:00', '21:00'],
    6: ['09:00', '22:00'],
  }
  const range = hours[dow]
  if (!range) return []

  const toMins = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    return h * 60 + m
  }
  const toTime = (mins: number) =>
    `${Math.floor(mins / 60).toString().padStart(2, '0')}:${(mins % 60).toString().padStart(2, '0')}`

  const slots: string[] = []
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const nowMins = date === todayStr ? now.getHours() * 60 + now.getMinutes() : -1

  for (let m = toMins(range[0]); m < toMins(range[1]); m += 30) {
    if (nowMins < 0 || m > nowMins) slots.push(toTime(m))
  }
  return slots
}

export async function createAppointment(payload: CreateAppointmentPayload): Promise<CreatedAppointment> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { message?: string }).message ?? 'Failed to create appointment')
  }

  const data = await res.json()
  return data.data ?? data
}
