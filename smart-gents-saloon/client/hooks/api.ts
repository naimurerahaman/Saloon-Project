import { useMutation, useQuery } from '@tanstack/react-query'
import { toast } from 'sonner'
import { api } from '@/lib/api'
import { queryKeys } from '@/lib/queryKeys'
import { generateFallbackSlots } from '@/lib/booking'
import { mapApiGalleryItem } from '@/lib/gallery'
import type { Service } from '@/types'
import type { BookingBarber, CreateAppointmentPayload, CreatedAppointment } from '@/lib/booking'
import type { GalleryEntry } from '@/lib/gallery'

// ─── Services ─────────────────────────────────────────────────────────────

export function useServices(category?: string) {
  return useQuery({
    queryKey: queryKeys.services.list(category),
    queryFn:  () =>
      api.get<Service[]>('/api/v1/services', {
        params: category ? { category } : {},
      }).then((r) => r.data),
    staleTime: 5 * 60 * 1000,
  })
}

// ─── Barbers ──────────────────────────────────────────────────────────────

const GRADIENT_CLASSES = [
  'from-stone-700 to-neutral-900',
  'from-zinc-700 to-zinc-900',
  'from-neutral-700 to-stone-900',
  'from-stone-800 to-zinc-950',
  'from-zinc-800 to-neutral-950',
  'from-neutral-800 to-stone-950',
]

export function useBarbers() {
  return useQuery({
    queryKey: queryKeys.barbers.list(),
    queryFn:  () =>
      api.get<BookingBarber[]>('/api/v1/barbers').then((r) =>
        r.data.map((b, i) => ({
          ...b,
          gradientClass: GRADIENT_CLASSES[i % GRADIENT_CLASSES.length],
        })),
      ),
    staleTime: 60 * 60 * 1000, // barbers change rarely
  })
}

// ─── Gallery ──────────────────────────────────────────────────────────────

interface ApiGalleryItem {
  id: string
  url: string
  publicId: string
  caption?: string | null
  category?: string | null
  isActive: boolean
  sortOrder: number
}

export function useGallery(category?: string) {
  return useQuery({
    queryKey: queryKeys.gallery.list(category),
    queryFn:  () =>
      api.get<ApiGalleryItem[]>('/api/v1/gallery', {
        params: category ? { category } : {},
      }).then((r) => r.data.map((item, i) => mapApiGalleryItem(item, i))),
    staleTime: 10 * 60 * 1000,
  })
}

// ─── Availability slots ───────────────────────────────────────────────────

interface AvailabilityResponse {
  availableSlots: string[]
}

export function useAvailability(barberId: string, serviceId: string, date: string) {
  return useQuery({
    queryKey: queryKeys.availability.slots(barberId, serviceId, date),
    queryFn:  async () => {
      const res = await api.get<AvailabilityResponse | string[]>(
        '/api/v1/appointments/availability',
        { params: { barberId, serviceId, date } },
      )
      // Handle both direct array and wrapped { availableSlots } shapes
      const data = res.data
      return Array.isArray(data)
        ? (data as string[])
        : ((data as AvailabilityResponse).availableSlots ?? generateFallbackSlots(date))
    },
    enabled:   !!(barberId && serviceId && date),
    staleTime: 30 * 1000, // 30 seconds — slots change frequently
    gcTime:    60 * 1000,
    retry:     1,
  })
}

// ─── Create appointment ───────────────────────────────────────────────────

export function useCreateAppointment() {
  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      api.post<CreatedAppointment>('/api/v1/appointments', payload).then((r) => r.data),
    onSuccess: (data) => {
      toast.success('Appointment confirmed!', {
        description: `Ref: ${data.id.slice(0, 8).toUpperCase()} · Check your email for details.`,
        duration: 6000,
      })
    },
    onError: (err) => {
      toast.error('Booking failed', {
        description: err instanceof Error ? err.message : 'Please try again.',
        duration: 5000,
      })
    },
  })
}

// ─── Re-export shared types for convenience ───────────────────────────────

export type { GalleryEntry }
