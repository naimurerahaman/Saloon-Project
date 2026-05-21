import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { AppointmentStatus } from '@prisma/client'
import { PrismaService } from '../../prisma/prisma.service.js'
import type { CreateAppointmentDto } from './dto/create-appointment.dto.js'
import type { GetAppointmentsQueryDto } from './dto/get-appointments-query.dto.js'
import type { GetAvailabilityQueryDto } from './dto/get-availability-query.dto.js'
import type { UpdateAppointmentStatusDto } from './dto/update-appointment-status.dto.js'

// ─── Business hours (day-of-week → open / close in HH:MM) ─────────────────

const BUSINESS_HOURS: Record<number, { open: string; close: string }> = {
  0: { open: '10:00', close: '18:00' }, // Sunday
  1: { open: '09:00', close: '21:00' }, // Monday
  2: { open: '09:00', close: '21:00' }, // Tuesday
  3: { open: '09:00', close: '21:00' }, // Wednesday
  4: { open: '09:00', close: '21:00' }, // Thursday
  5: { open: '09:00', close: '21:00' }, // Friday
  6: { open: '09:00', close: '22:00' }, // Saturday
}

// ─── Time helpers ──────────────────────────────────────────────────────────

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60).toString().padStart(2, '0')
  const m = (minutes % 60).toString().padStart(2, '0')
  return `${h}:${m}`
}

/** Parse a YYYY-MM-DD string in local time (avoids UTC-offset day shifts). */
function parseLocalDate(dateStr: string): Date {
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Generate 30-minute slots within business hours for a given day-of-week. */
function generateSlots(dayOfWeek: number): string[] {
  const hours = BUSINESS_HOURS[dayOfWeek]
  if (!hours) return []
  const slots: string[] = []
  const start = timeToMinutes(hours.open)
  const end = timeToMinutes(hours.close)
  for (let m = start; m < end; m += 30) {
    slots.push(minutesToTime(m))
  }
  return slots
}

// ─── Shared include shapes ─────────────────────────────────────────────────

const SERVICE_FIELDS = { select: { id: true, title: true, category: true, duration: true } } as const
const BARBER_FIELDS  = { select: { id: true, name: true, specialty: true } } as const

// ─── Service ───────────────────────────────────────────────────────────────

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // ── Read (admin) ──────────────────────────────────────────────────────────

  findAll(query: GetAppointmentsQueryDto) {
    return this.prisma.appointment.findMany({
      where: {
        ...(query.status   && { status:   query.status              }),
        ...(query.date     && { date:     new Date(query.date)      }),
        ...(query.barberId && { barberId: query.barberId            }),
      },
      include: { service: SERVICE_FIELDS, barber: BARBER_FIELDS },
      orderBy: [{ date: 'asc' }, { time: 'asc' }],
    })
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: { id },
      include: {
        service: { select: { id: true, title: true, category: true, duration: true, price: true } },
        barber:  BARBER_FIELDS,
      },
    })
    if (!appointment) throw new NotFoundException(`Appointment ${id} not found`)
    return appointment
  }

  // ── Create (public) ───────────────────────────────────────────────────────

  async create(dto: CreateAppointmentDto) {
    // ① Validate service
    const service = await this.prisma.service.findUnique({ where: { id: dto.serviceId } })
    if (!service || !service.isActive) {
      throw new NotFoundException(`Service ${dto.serviceId} not found`)
    }

    // ② Validate barber
    const barber = await this.prisma.barber.findUnique({ where: { id: dto.barberId } })
    if (!barber || !barber.isActive) {
      throw new NotFoundException(`Barber ${dto.barberId} not found`)
    }

    // ③ Date must not be in the past
    const appointmentDate = parseLocalDate(dto.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (appointmentDate < today) {
      throw new BadRequestException('Appointment date cannot be in the past')
    }

    // ④ Time must be within business hours for the requested day
    const dayOfWeek = appointmentDate.getDay()
    const businessHours = BUSINESS_HOURS[dayOfWeek]
    if (!businessHours) {
      throw new BadRequestException('The salon is closed on this day')
    }

    const slotStart = timeToMinutes(dto.time)
    const slotEnd   = slotStart + service.duration

    if (slotStart < timeToMinutes(businessHours.open) || slotEnd > timeToMinutes(businessHours.close)) {
      throw new BadRequestException(
        `Time ${dto.time} is outside business hours (${businessHours.open} – ${businessHours.close})`,
      )
    }

    // ⑤ Scheduling conflict check
    if (await this.hasConflict(dto.barberId, dto.date, dto.time, service.duration)) {
      throw new ConflictException('This time slot is already booked for the selected barber')
    }

    // ⑥ Create — snapshot service price at booking time
    return this.prisma.appointment.create({
      data: {
        customerName:  dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        date:          new Date(dto.date),
        time:          dto.time,
        notes:         dto.notes,
        price:         service.price,
        serviceId:     dto.serviceId,
        barberId:      dto.barberId,
      },
      include: {
        service: { select: { id: true, title: true, duration: true } },
        barber:  { select: { id: true, name: true } },
      },
    })
  }

  // ── Status management (admin) ─────────────────────────────────────────────

  async updateStatus(id: string, dto: UpdateAppointmentStatusDto) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } })
    if (!appointment) throw new NotFoundException(`Appointment ${id} not found`)

    return this.prisma.appointment.update({
      where: { id },
      data: { status: dto.status },
      include: { service: SERVICE_FIELDS, barber: BARBER_FIELDS },
    })
  }

  // ── Availability (public) ─────────────────────────────────────────────────

  async getAvailability(query: GetAvailabilityQueryDto) {
    // Validate barber & service exist
    const [barber, service] = await Promise.all([
      this.prisma.barber.findUnique({ where: { id: query.barberId } }),
      this.prisma.service.findUnique({ where: { id: query.serviceId } }),
    ])

    if (!barber || !barber.isActive)   throw new NotFoundException(`Barber ${query.barberId} not found`)
    if (!service || !service.isActive) throw new NotFoundException(`Service ${query.serviceId} not found`)

    const dateObj    = parseLocalDate(query.date)
    const dayOfWeek  = dateObj.getDay()
    const hours      = BUSINESS_HOURS[dayOfWeek]

    if (!hours) {
      return { date: query.date, barberId: query.barberId, serviceId: query.serviceId, availableSlots: [] }
    }

    const allSlots     = generateSlots(dayOfWeek)
    const closeMinutes = timeToMinutes(hours.close)

    // Existing non-cancelled appointments for this barber on this date
    const booked = await this.prisma.appointment.findMany({
      where: {
        barberId: query.barberId,
        date:     new Date(query.date),
        status:   { notIn: [AppointmentStatus.CANCELLED] },
      },
      include: { service: { select: { duration: true } } },
    })

    // Current time — skip past slots if the requested date is today
    const now      = new Date()
    const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const nowMins  = query.date === todayStr ? now.getHours() * 60 + now.getMinutes() : -1

    const availableSlots = allSlots.filter((slot) => {
      const slotStart = timeToMinutes(slot)
      const slotEnd   = slotStart + service.duration

      if (nowMins >= 0 && slotStart <= nowMins) return false // past slot
      if (slotEnd > closeMinutes)               return false // overruns business hours

      // Overlap check: [slotStart, slotEnd) vs [aptStart, aptEnd)
      return !booked.some((apt) => {
        const aptStart = timeToMinutes(apt.time)
        const aptEnd   = aptStart + apt.service.duration
        return slotStart < aptEnd && aptStart < slotEnd
      })
    })

    return { date: query.date, barberId: query.barberId, serviceId: query.serviceId, availableSlots }
  }

  // ── Private helpers ───────────────────────────────────────────────────────

  private async hasConflict(
    barberId: string,
    date: string,
    time: string,
    durationMinutes: number,
    excludeId?: string,
  ): Promise<boolean> {
    const booked = await this.prisma.appointment.findMany({
      where: {
        barberId,
        date:   new Date(date),
        status: { notIn: [AppointmentStatus.CANCELLED] },
        ...(excludeId && { id: { not: excludeId } }),
      },
      include: { service: { select: { duration: true } } },
    })

    const newStart = timeToMinutes(time)
    const newEnd   = newStart + durationMinutes

    return booked.some((apt) => {
      const aptStart = timeToMinutes(apt.time)
      const aptEnd   = aptStart + apt.service.duration
      return newStart < aptEnd && aptStart < newEnd
    })
  }
}
