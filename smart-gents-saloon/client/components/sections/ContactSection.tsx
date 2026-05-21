'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, MessageCircle,
  Send, CheckCircle, ChevronDown, ArrowRight,
} from 'lucide-react'
import Container from '@/components/ui/Container'

// ─── constants ─────────────────────────────────────────────────────────────

const ADDRESS  = '15 Savile Row, London W1S 3PJ'
const PHONE    = '+44 20 7123 4567'
const EMAIL    = 'hello@smartgentssaloon.com'
const WA_HREF  = 'https://wa.me/442071234567?text=Hello%20Smart%20Gents%20Saloon%2C%20I%27d%20like%20to%20enquire%20about%20your%20services.'

// Replace with actual Google Maps / OpenStreetMap embed URL for the real address
const MAP_SRC  =
  process.env.NEXT_PUBLIC_MAP_EMBED_URL ??
  'https://www.openstreetmap.org/export/embed.html?bbox=-0.1612%2C51.5006%2C-0.1252%2C51.5186&layer=mapnik&marker=51.5096%2C-0.1432'

const HOURS = [
  { label: 'Monday – Friday', time: '09:00 – 21:00', days: [1, 2, 3, 4, 5] },
  { label: 'Saturday',        time: '09:00 – 22:00', days: [6]              },
  { label: 'Sunday',          time: '10:00 – 18:00', days: [0]              },
]

const SUBJECTS = [
  'General Enquiry',
  'Appointment Booking',
  'Service Information',
  'Feedback & Reviews',
  'Corporate & Events',
  'Other',
]

// ─── form types & validation ────────────────────────────────────────────────

interface FormValues {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

function validate(v: FormValues): FormErrors {
  const e: FormErrors = {}

  if (!v.name.trim())
    e.name = 'Name is required'
  else if (v.name.trim().length < 2)
    e.name = 'Name must be at least 2 characters'

  if (!v.email.trim())
    e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = 'Enter a valid email address'

  if (v.phone.trim() && !/^[+\d\s\-().]{7,20}$/.test(v.phone.trim()))
    e.phone = 'Enter a valid phone number'

  if (!v.subject)
    e.subject = 'Please select a subject'

  if (!v.message.trim())
    e.message = 'Message is required'
  else if (v.message.trim().length < 20)
    e.message = `Message too short (${v.message.trim().length}/20 characters)`

  return e
}

// ─── field wrapper ─────────────────────────────────────────────────────────

function Field({
  id, label, required, error, children,
}: {
  id: string; label: string; required?: boolean; error?: string; children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-white/45 text-[10px] tracking-[0.28em] uppercase mb-2">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-red-400/80 text-[10px] tracking-wide mt-1.5">
          {error}
        </p>
      )}
    </div>
  )
}

const base =
  'w-full bg-background border text-white text-sm px-4 py-3 outline-none ' +
  'placeholder:text-white/18 transition-colors duration-200 focus:border-gold/50'
const err = 'border-red-400/40 focus:border-red-400/60'
const ok  = 'border-white/10'

// ─── contact form ──────────────────────────────────────────────────────────

function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [errors, setErrors]   = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({})
  const [status, setStatus]   = useState<FormStatus>('idle')

  function field(key: keyof FormValues) {
    return {
      id: key,
      value: values[key],
      onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const next = { ...values, [key]: e.target.value }
        setValues(next)
        if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
      },
      onBlur() {
        setTouched((t) => ({ ...t, [key]: true }))
        setErrors((prev) => ({ ...prev, [key]: validate(values)[key] }))
      },
      className: `${base} ${touched[key] && errors[key] ? err : ok}`,
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, phone: true, subject: true, message: true })
    if (Object.keys(errs).length) return

    setStatus('submitting')
    // TODO: replace with POST /api/v1/contact
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center justify-center text-center py-20 px-8 h-full bg-card border border-white/[0.05]"
      >
        <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mb-6">
          <CheckCircle size={22} className="text-gold" />
        </div>
        <h3 className="font-serif text-2xl text-white mb-3">Message Received</h3>
        <p className="text-white/38 text-sm leading-relaxed max-w-xs">
          Thank you for reaching out. We&apos;ll get back to you within 24 hours.
        </p>
        <div className="h-px w-12 bg-gold/30 mt-8" />
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="bg-card border border-white/[0.05]">
      {/* top accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="p-8 space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field id="name" label="Full Name" required error={touched.name ? errors.name : undefined}>
            <input type="text" placeholder="James Whitmore" {...field('name')} />
          </Field>
          <Field id="email" label="Email Address" required error={touched.email ? errors.email : undefined}>
            <input type="email" placeholder="james@example.com" {...field('email')} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field id="phone" label="Phone Number" error={touched.phone ? errors.phone : undefined}>
            <input type="tel" placeholder="+44 7700 000000" {...field('phone')} />
          </Field>
          <Field id="subject" label="Subject" required error={touched.subject ? errors.subject : undefined}>
            <div className="relative">
              <select {...field('subject')} className={`${field('subject').className} appearance-none cursor-pointer pr-10`}>
                <option value="">Select a subject</option>
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-background">{s}</option>
                ))}
              </select>
              <ChevronDown
                size={13}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/28 pointer-events-none"
              />
            </div>
          </Field>
        </div>

        <Field id="message" label="Message" required error={touched.message ? errors.message : undefined}>
          <textarea
            rows={5}
            placeholder="Tell us how we can help…"
            {...field('message')}
            className={`${field('message').className} resize-none`}
          />
        </Field>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-gold text-background text-[11px] font-bold tracking-[0.28em] uppercase hover:bg-gold-light transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? (
            <>
              <span className="w-3.5 h-3.5 border border-background/40 border-t-background rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={12} />
              Send Message
            </>
          )}
        </button>
      </div>
    </form>
  )
}

// ─── hours table ───────────────────────────────────────────────────────────

function HoursTable() {
  const today = new Date().getDay()
  return (
    <div className="space-y-0">
      {HOURS.map((row) => {
        const isToday = row.days.includes(today)
        return (
          <div
            key={row.label}
            className={`flex items-center justify-between py-3 border-b border-white/[0.06] ${isToday ? 'text-gold' : 'text-white/38'}`}
          >
            <div className="flex items-center gap-2.5">
              {isToday && <span className="w-1 h-1 rounded-full bg-gold inline-block" />}
              <span className={`text-[11px] tracking-[0.15em] uppercase ${isToday ? 'text-gold' : 'text-white/38'}`}>
                {row.label}
              </span>
            </div>
            <span className={`text-sm font-medium ${isToday ? 'text-gold' : 'text-white/55'}`}>{row.time}</span>
          </div>
        )
      })}
    </div>
  )
}

// ─── info panel ────────────────────────────────────────────────────────────

function InfoPanel() {
  return (
    <div className="space-y-6">
      {/* address */}
      <div className="bg-card border border-white/[0.05] p-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent -mx-6 -mt-6 mb-6" />
        <div className="space-y-4">
          <InfoRow icon={MapPin} label="Address">
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors duration-200 leading-relaxed"
            >
              {ADDRESS}
            </a>
          </InfoRow>
          <InfoRow icon={Phone} label="Phone">
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className="hover:text-gold transition-colors duration-200 tracking-wide">
              {PHONE}
            </a>
          </InfoRow>
          <InfoRow icon={Mail} label="Email">
            <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors duration-200 break-all">
              {EMAIL}
            </a>
          </InfoRow>
        </div>
      </div>

      {/* WhatsApp */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 bg-card border border-white/[0.05] hover:border-gold/25 p-6 group transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 border border-white/10 flex items-center justify-center group-hover:border-gold/40 group-hover:bg-gold/5 transition-all duration-300">
            <MessageCircle size={18} className="text-gold" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold group-hover:text-gold transition-colors duration-200">
              Chat on WhatsApp
            </p>
            <p className="text-white/28 text-[10px] tracking-wider mt-0.5">Typically replies within an hour</p>
          </div>
        </div>
        <ArrowRight size={14} className="text-white/18 group-hover:text-gold group-hover:translate-x-0.5 transition-all duration-200 shrink-0" />
      </a>

      {/* hours */}
      <div className="bg-card border border-white/[0.05] p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <Clock size={13} className="text-gold" />
          <span className="text-white/45 text-[10px] tracking-[0.3em] uppercase">Opening Hours</span>
        </div>
        <HoursTable />
      </div>
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex gap-3.5">
      <div className="w-8 h-8 border border-gold/15 flex items-center justify-center shrink-0 mt-0.5">
        <Icon size={13} className="text-gold" />
      </div>
      <div>
        <p className="text-white/28 text-[9px] tracking-[0.28em] uppercase mb-1">{label}</p>
        <p className="text-white/60 text-sm">{children}</p>
      </div>
    </div>
  )
}

// ─── map ───────────────────────────────────────────────────────────────────

function MapEmbed() {
  return (
    <div className="relative h-72 md:h-96 w-full overflow-hidden border-t border-white/[0.05]">
      <iframe
        src={MAP_SRC}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        title="Smart Gents Saloon location"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ filter: 'invert(92%) hue-rotate(180deg) saturate(0.65) brightness(0.82)' }}
        aria-label="Map showing our location"
      />
      {/* overlay badge */}
      <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm border border-white/[0.08] px-4 py-2.5 pointer-events-none">
        <p className="text-white/55 text-[10px] tracking-[0.25em] uppercase">{ADDRESS}</p>
      </div>
    </div>
  )
}

// ─── main section ──────────────────────────────────────────────────────────

export default function ContactSection() {
  return (
    <section className="bg-background py-16 md:py-24 lg:py-28 overflow-x-hidden">
      <Container>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold/45" />
            <span className="text-gold text-[10px] tracking-[0.45em] uppercase">Get in Touch</span>
            <div className="h-px w-8 bg-gold/45" />
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-5">
            Contact <span className="text-gold italic">Us.</span>
          </h1>
          <p className="text-white/35 max-w-sm mx-auto text-sm leading-relaxed">
            Questions, bookings, or just a quick enquiry — we&apos;re here and happy
            to help. Expect a reply within 24 hours.
          </p>
        </motion.div>

        {/* content grid */}
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-6 lg:gap-8 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <InfoPanel />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>

        {/* map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <MapEmbed />
        </motion.div>
      </Container>
    </section>
  )
}
