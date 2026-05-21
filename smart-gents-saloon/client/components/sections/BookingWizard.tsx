'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Scissors,
  User,
  CalendarDays,
  FileText,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
} from 'lucide-react'
import type { Service } from '@/types'
import type { BookingBarber, CreatedAppointment } from '@/lib/booking'
import { useAvailability, useCreateAppointment } from '@/hooks/api'
import Container from '@/components/ui/Container'
import { cn } from '@/lib/utils'

// ─── Step config ────────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: 'Service',  Icon: Scissors },
  { id: 2, label: 'Barber',   Icon: User },
  { id: 3, label: 'Schedule', Icon: CalendarDays },
  { id: 4, label: 'Details',  Icon: FileText },
  { id: 5, label: 'Confirm',  Icon: CheckCircle },
] as const

// ─── Slide animation ────────────────────────────────────────────────────────

function makeSlide(direction: 1 | -1) {
  return {
    initial:  { opacity: 0, x: direction * 40 },
    animate:  { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' as const } },
    exit:     { opacity: 0, x: direction * -28, transition: { duration: 0.22, ease: 'easeIn' as const } },
  }
}

// ─── Progress bar ────────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-12">
      {/* Step labels */}
      <div className="flex items-start justify-between mb-4 relative">
        {STEPS.map((s) => {
          const done    = step > s.id
          const current = step === s.id
          const Icon    = s.Icon
          return (
            <div key={s.id} className="flex flex-col items-center gap-1.5 w-1/5">
              <div
                className={cn(
                  'w-8 h-8 flex items-center justify-center border transition-all duration-300',
                  done    ? 'bg-gold border-gold text-background' :
                  current ? 'border-gold text-gold bg-gold/8' :
                            'border-white/12 text-white/22',
                )}
              >
                <Icon size={13} />
              </div>
              <span
                className={cn(
                  'text-[9px] tracking-[0.22em] uppercase hidden sm:block transition-colors duration-300',
                  done || current ? 'text-gold/70' : 'text-white/20',
                )}
              >
                {s.label}
              </span>
            </div>
          )
        })}
        {/* Connector lines (behind icons) */}
        <div className="absolute top-4 left-[10%] right-[10%] h-px bg-white/8 -z-10">
          <motion.div
            className="h-full bg-gold/50"
            animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' as const }}
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 1 — Service selection ──────────────────────────────────────────────

function StepService({
  services,
  selectedId,
  onSelect,
}: {
  services: Service[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <StepHeader eyebrow="Step 1 of 5" title="Choose a Service" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              'text-left p-5 border transition-all duration-200 group',
              selectedId === s.id
                ? 'border-gold bg-gold/5'
                : 'border-white/8 hover:border-white/18 hover:bg-white/[0.015]',
            )}
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <span
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  selectedId === s.id ? 'text-gold' : 'text-white group-hover:text-white/85',
                )}
              >
                {s.title}
              </span>
              <span className="text-gold font-semibold text-sm shrink-0">${s.price}</span>
            </div>
            <p className="text-white/32 text-[12px] leading-relaxed line-clamp-2 mb-3">
              {s.description}
            </p>
            <div className="flex items-center gap-1 text-white/28">
              <Clock size={10} />
              <span className="text-[10px] tracking-wide">{s.duration} min</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 2 — Barber selection ───────────────────────────────────────────────

function StepBarber({
  barbers,
  selectedId,
  onSelect,
}: {
  barbers: BookingBarber[]
  selectedId: string
  onSelect: (id: string) => void
}) {
  return (
    <div>
      <StepHeader eyebrow="Step 2 of 5" title="Choose a Barber" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {barbers.map((b) => (
          <button
            key={b.id}
            onClick={() => onSelect(b.id)}
            className={cn(
              'text-left p-5 border transition-all duration-200 group',
              selectedId === b.id
                ? 'border-gold bg-gold/5'
                : 'border-white/8 hover:border-white/18 hover:bg-white/[0.015]',
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                'w-12 h-12 bg-gradient-to-br rounded-none mb-4 flex items-center justify-center text-white/30 font-serif text-lg border',
                b.gradientClass,
                selectedId === b.id ? 'border-gold/30' : 'border-white/8',
              )}
            >
              {b.name.charAt(0)}
            </div>
            <div
              className={cn(
                'font-medium text-sm mb-0.5 transition-colors duration-200',
                selectedId === b.id ? 'text-gold' : 'text-white group-hover:text-white/85',
              )}
            >
              {b.name}
            </div>
            <div className="text-white/32 text-[11px] mb-2">{b.specialty}</div>
            <div className="text-white/22 text-[10px] tracking-widest uppercase">
              {b.experience} yrs experience
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

// ─── Step 3 — Date + time slots ──────────────────────────────────────────────

const SLOT_GROUPS = [
  { label: 'Morning',   test: (h: number) => h < 12 },
  { label: 'Afternoon', test: (h: number) => h >= 12 && h < 17 },
  { label: 'Evening',   test: (h: number) => h >= 17 },
]

function StepSchedule({
  barberId,
  serviceId,
  date,
  time,
  onDateChange,
  onTimeChange,
}: {
  barberId: string
  serviceId: string
  date: string
  time: string
  onDateChange: (d: string) => void
  onTimeChange: (t: string) => void
}) {
  const {
    data: slots = [],
    isLoading: loading,
    isError: hasFetchErr,
  } = useAvailability(barberId, serviceId, date)

  // Tomorrow as min date (YYYY-MM-DD)
  const minDate = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toISOString().slice(0, 10)
  })()

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDateChange(e.target.value)
    onTimeChange('')
  }

  const grouped = SLOT_GROUPS.map(({ label, test }) => ({
    label,
    slots: slots.filter((s) => test(parseInt(s.split(':')[0], 10))),
  })).filter(g => g.slots.length > 0)

  const formatTime = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    const hour   = h % 12 || 12
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`
  }

  return (
    <div>
      <StepHeader eyebrow="Step 3 of 5" title="Pick a Date & Time" />

      {/* Date picker */}
      <div className="mb-8">
        <label htmlFor="booking-date" className="block text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
          Date
        </label>
        <input
          id="booking-date"
          type="date"
          min={minDate}
          value={date}
          onChange={handleDateChange}
          style={{ colorScheme: 'dark' }}
          className="bg-card border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/50 w-full sm:w-auto transition-colors duration-200"
        />
      </div>

      {/* Slots */}
      {date && (
        <div>
          <p className="text-white/40 text-[10px] tracking-[0.25em] uppercase mb-4">Available Times</p>

          {loading && (
            <div className="flex items-center gap-2 text-white/35 text-sm">
              <Loader2 size={14} className="animate-spin" />
              Checking availability…
            </div>
          )}

          {hasFetchErr && !loading && (
            <div className="flex items-center gap-2 text-white/40 text-[12px] mb-4">
              <AlertCircle size={12} className="text-gold/50 shrink-0" />
              Could not load availability — showing typical hours.
            </div>
          )}

          {!loading && slots.length === 0 && !hasFetchErr && (
            <p className="text-white/30 text-sm">No available slots for this date.</p>
          )}

          {!loading && slots.length > 0 && (
            <div className="space-y-6">
              {grouped.map(({ label, slots: groupSlots }) => (
                <div key={label}>
                  <p className="text-white/25 text-[9px] tracking-[0.3em] uppercase mb-3">{label}</p>
                  <div className="flex flex-wrap gap-2">
                    {groupSlots.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => onTimeChange(slot)}
                        className={cn(
                          'px-3.5 py-2 text-[11px] tracking-wide border transition-all duration-150',
                          time === slot
                            ? 'border-gold bg-gold/8 text-gold'
                            : 'border-white/10 text-white/45 hover:border-white/25 hover:text-white/70',
                        )}
                      >
                        {formatTime(slot)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Step 4 — Customer details ───────────────────────────────────────────────

type DetailsFields = {
  customerName: string
  customerEmail: string
  customerPhone: string
  notes: string
}

type DetailsErrors = Partial<Record<keyof DetailsFields, string>>
type DetailsTouched = Partial<Record<keyof DetailsFields, boolean>>

function validateDetails(values: DetailsFields): DetailsErrors {
  const errors: DetailsErrors = {}
  if (!values.customerName.trim())  errors.customerName  = 'Name is required'
  if (!values.customerEmail.trim()) {
    errors.customerEmail = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.customerEmail)) {
    errors.customerEmail = 'Enter a valid email address'
  }
  if (!values.customerPhone.trim()) {
    errors.customerPhone = 'Phone number is required'
  } else if (!/^[+\d\s\-().]{7,20}$/.test(values.customerPhone)) {
    errors.customerPhone = 'Enter a valid phone number'
  }
  return errors
}

function StepDetails({
  values,
  onChange,
}: {
  values: DetailsFields
  onChange: (v: DetailsFields) => void
}) {
  const [touched, setTouched] = useState<DetailsTouched>({})
  const errors = validateDetails(values)

  const field = (key: keyof DetailsFields) => ({
    id: `booking-${key}`,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...values, [key]: e.target.value }
      onChange(next)
    },
    onBlur: () => setTouched((t) => ({ ...t, [key]: true })),
    'aria-invalid': touched[key] && !!errors[key] ? ('true' as const) : undefined,
    'aria-describedby': touched[key] && errors[key] ? `${key}-error` : undefined,
  })

  const inputClass = (key: keyof DetailsFields) =>
    cn(
      'w-full bg-card border text-white text-sm px-4 py-3 focus:outline-none transition-colors duration-200 placeholder:text-white/18',
      touched[key] && errors[key]
        ? 'border-red-500/50 focus:border-red-500/80'
        : 'border-white/10 focus:border-gold/50',
    )

  return (
    <div>
      <StepHeader eyebrow="Step 4 of 5" title="Your Details" />
      <div className="space-y-5 max-w-lg">
        {/* Name */}
        <div>
          <label htmlFor="booking-customerName" className="block text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
            Full Name <span className="text-gold">*</span>
          </label>
          <input
            type="text"
            autoComplete="name"
            placeholder="James Whitmore"
            className={inputClass('customerName')}
            {...field('customerName')}
          />
          {touched.customerName && errors.customerName && (
            <p id="customerName-error" role="alert" className="mt-1.5 text-red-400/80 text-[11px]">
              {errors.customerName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="booking-customerEmail" className="block text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
            Email Address <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            autoComplete="email"
            placeholder="james@example.com"
            className={inputClass('customerEmail')}
            {...field('customerEmail')}
          />
          {touched.customerEmail && errors.customerEmail && (
            <p id="customerEmail-error" role="alert" className="mt-1.5 text-red-400/80 text-[11px]">
              {errors.customerEmail}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="booking-customerPhone" className="block text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
            Phone Number <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="+44 20 7123 4567"
            className={inputClass('customerPhone')}
            {...field('customerPhone')}
          />
          {touched.customerPhone && errors.customerPhone && (
            <p id="customerPhone-error" role="alert" className="mt-1.5 text-red-400/80 text-[11px]">
              {errors.customerPhone}
            </p>
          )}
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="booking-notes" className="block text-white/40 text-[10px] tracking-[0.25em] uppercase mb-2">
            Notes <span className="text-white/20">(optional)</span>
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            placeholder="Any preferences or special requests…"
            value={values.notes}
            onChange={(e) => onChange({ ...values, notes: e.target.value })}
            className="w-full bg-card border border-white/10 text-white text-sm px-4 py-3 focus:outline-none focus:border-gold/50 resize-none transition-colors duration-200 placeholder:text-white/18"
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 5 — Summary + confirm ──────────────────────────────────────────────

function StepConfirm({
  service,
  barber,
  date,
  time,
  details,
  onConfirm,
  loading,
  error,
}: {
  service: Service
  barber: BookingBarber
  date: string
  time: string
  details: DetailsFields
  onConfirm: () => void
  loading: boolean
  error: string
}) {
  const formatDate = (d: string) => {
    const [y, m, day] = d.split('-').map(Number)
    return new Date(y, m - 1, day).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  const formatTime = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`
  }

  const rows: [string, string][] = [
    ['Service',  service.title],
    ['Barber',   barber.name],
    ['Date',     formatDate(date)],
    ['Time',     formatTime(time)],
    ['Duration', `${service.duration} min`],
    ['Price',    `$${service.price}`],
    ['Name',     details.customerName],
    ['Email',    details.customerEmail],
    ['Phone',    details.customerPhone],
    ...(details.notes ? [['Notes', details.notes] as [string, string]] : []),
  ]

  return (
    <div>
      <StepHeader eyebrow="Step 5 of 5" title="Confirm Booking" />

      <div className="mb-8 border border-white/8 divide-y divide-white/[0.05] max-w-lg">
        {rows.map(([label, value]) => (
          <div key={label} className="flex gap-4 px-5 py-3">
            <span className="text-white/30 text-[10px] tracking-[0.22em] uppercase w-20 shrink-0 pt-0.5">
              {label}
            </span>
            <span className="text-white/80 text-sm">{value}</span>
          </div>
        ))}
      </div>

      {error && (
        <div className="flex items-start gap-2 mb-5 text-red-400/80 text-sm max-w-lg">
          <AlertCircle size={14} className="shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <button
        onClick={onConfirm}
        disabled={loading}
        className="flex items-center gap-2.5 px-8 py-3.5 bg-gold text-background text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-gold/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={13} className="animate-spin" />
            Booking…
          </>
        ) : (
          <>
            Confirm Appointment
            <ChevronRight size={13} />
          </>
        )}
      </button>
    </div>
  )
}

// ─── Success view ────────────────────────────────────────────────────────────

function SuccessView({ booking }: { booking: CreatedAppointment }) {
  const formatDate = (d: string) => {
    const [y, m, day] = d.split('-').map(Number)
    return new Date(y, m - 1, day).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
  }

  const formatTime = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const period = h >= 12 ? 'PM' : 'AM'
    return `${h % 12 || 12}:${m.toString().padStart(2, '0')} ${period}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' as const }}
      className="text-center py-12 max-w-md mx-auto"
    >
      {/* Icon */}
      <div className="w-16 h-16 border border-gold/30 bg-gold/5 flex items-center justify-center mx-auto mb-8">
        <CheckCircle size={28} className="text-gold" />
      </div>

      <div className="flex items-center justify-center gap-3 mb-4">
        <div className="h-px w-6 bg-gold/40" />
        <span className="text-gold text-[9px] tracking-[0.4em] uppercase">Confirmed</span>
        <div className="h-px w-6 bg-gold/40" />
      </div>

      <h2 className="font-serif text-3xl text-white mb-3">You&apos;re Booked</h2>
      <p className="text-white/35 text-sm leading-relaxed mb-8">
        Your appointment has been confirmed. We&apos;ve sent a confirmation to{' '}
        <span className="text-white/55">{booking.customerEmail}</span>.
      </p>

      {/* Booking card */}
      <div className="border border-white/8 text-left divide-y divide-white/[0.05] mb-10">
        {[
          ['Service',  booking.service.title],
          ['Barber',   booking.barber.name],
          ['Date',     formatDate(booking.date)],
          ['Time',     formatTime(booking.time)],
          ['Total',    `$${booking.price}`],
          ['Ref',      booking.id.slice(0, 8).toUpperCase()],
        ].map(([label, value]) => (
          <div key={label} className="flex gap-4 px-5 py-3">
            <span className="text-white/28 text-[10px] tracking-[0.22em] uppercase w-16 shrink-0 pt-0.5">
              {label}
            </span>
            <span className="text-white/75 text-sm">{value}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <a
          href="/booking"
          className="px-6 py-2.5 border border-white/12 text-white/40 text-[10px] tracking-[0.22em] uppercase hover:border-white/25 hover:text-white/65 transition-all duration-200"
        >
          Book Again
        </a>
        <a
          href="/"
          className="px-6 py-2.5 bg-gold text-background text-[10px] tracking-[0.22em] uppercase font-semibold hover:bg-gold/90 transition-colors duration-200"
        >
          Home
        </a>
      </div>
    </motion.div>
  )
}

// ─── Shared helper ────────────────────────────────────────────────────────────

function StepHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="text-gold text-[9px] tracking-[0.4em] uppercase mb-2">{eyebrow}</p>
      <h2 className="font-serif text-2xl sm:text-3xl text-white">{title}</h2>
    </div>
  )
}

// ─── Main wizard ──────────────────────────────────────────────────────────────

interface BookingWizardProps {
  services: Service[]
  barbers: BookingBarber[]
  initialServiceId?: string
  initialBarberId?: string
}

export default function BookingWizard({
  services,
  barbers,
  initialServiceId,
  initialBarberId,
}: BookingWizardProps) {
  const [step, setStep]           = useState(1)
  const [direction, setDirection] = useState<1 | -1>(1)
  const [confirmed, setConfirmed] = useState<CreatedAppointment | null>(null)
  const apptMutation = useCreateAppointment()

  // Booking state
  const [serviceId, setServiceId] = useState(initialServiceId ?? '')
  const [barberId,  setBarberId]  = useState(initialBarberId  ?? '')
  const [date,      setDate]      = useState('')
  const [time,      setTime]      = useState('')
  const [details, setDetails]     = useState<DetailsFields>({
    customerName: '', customerEmail: '', customerPhone: '', notes: '',
  })

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const canAdvance: Record<number, boolean> = {
    1: !!serviceId,
    2: !!barberId,
    3: !!date && !!time,
    4: Object.keys(validateDetails(details)).length === 0,
  }

  const handleConfirm = () => {
    apptMutation.mutate(
      {
        serviceId,
        barberId,
        date,
        time,
        customerName:  details.customerName,
        customerEmail: details.customerEmail,
        customerPhone: details.customerPhone,
        ...(details.notes.trim() ? { notes: details.notes } : {}),
      },
      { onSuccess: (data) => setConfirmed(data) },
    )
  }

  const selectedService = services.find((s) => s.id === serviceId)
  const selectedBarber  = barbers.find((b) => b.id === barberId)

  const slide = makeSlide(direction)

  return (
    <section className="bg-background min-h-screen py-16 md:py-24">
      <Container>
        {/* Page header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Book Now</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl text-white mb-4">
            Reserve Your <span className="text-gold italic">Chair</span>
          </h1>
          <p className="text-white/32 text-sm max-w-md mx-auto leading-relaxed">
            Select your service, choose a barber, and pick a time — we&apos;ll handle the rest.
          </p>
        </div>

        {confirmed ? (
          <SuccessView booking={confirmed} />
        ) : (
          <div className="max-w-3xl mx-auto">
            <ProgressBar step={step} />

            {/* Step content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={slide.initial}
                animate={slide.animate}
                exit={slide.exit}
              >
                {step === 1 && (
                  <StepService
                    services={services}
                    selectedId={serviceId}
                    onSelect={setServiceId}
                  />
                )}
                {step === 2 && (
                  <StepBarber
                    barbers={barbers}
                    selectedId={barberId}
                    onSelect={setBarberId}
                  />
                )}
                {step === 3 && selectedService && (
                  <StepSchedule
                    barberId={barberId}
                    serviceId={serviceId}
                    date={date}
                    time={time}
                    onDateChange={setDate}
                    onTimeChange={setTime}
                  />
                )}
                {step === 4 && (
                  <StepDetails values={details} onChange={setDetails} />
                )}
                {step === 5 && selectedService && selectedBarber && (
                  <StepConfirm
                    service={selectedService}
                    barber={selectedBarber}
                    date={date}
                    time={time}
                    details={details}
                    onConfirm={handleConfirm}
                    loading={apptMutation.isPending}
                    error={apptMutation.error?.message ?? ''}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            {step < 5 && (
              <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.07]">
                <button
                  onClick={() => go(step - 1)}
                  disabled={step === 1}
                  className="flex items-center gap-1.5 text-white/30 text-[10px] tracking-[0.22em] uppercase hover:text-white/55 transition-colors duration-200 disabled:opacity-0 disabled:pointer-events-none"
                >
                  <ChevronLeft size={12} />
                  Back
                </button>

                <button
                  onClick={() => go(step + 1)}
                  disabled={!canAdvance[step]}
                  className="flex items-center gap-1.5 px-6 py-2.5 border border-gold/40 text-gold text-[10px] tracking-[0.22em] uppercase hover:bg-gold/5 hover:border-gold transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {step === 4 ? 'Review' : 'Next'}
                  <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
