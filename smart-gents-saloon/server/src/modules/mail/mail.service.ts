import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as nodemailer from 'nodemailer'
import type { Transporter } from 'nodemailer'

// ─── Data shape passed in from AppointmentsService ─────────────────────────

export interface AppointmentMailData {
  customerName: string
  customerEmail: string
  customerPhone?: string
  serviceName: string
  barberName: string
  date: Date | string      // raw value from DB — formatted inside this service
  time: string             // "HH:MM"
  price: number
  bookingRef: string       // appointment.id (first 8 chars shown in emails)
  notes?: string | null
}

// ─── Helpers ───────────────────────────────────────────────────────────────

function formatDate(raw: Date | string): string {
  const d = raw instanceof Date ? raw : new Date(raw)
  return d.toLocaleDateString('en-GB', {
    weekday: 'long',
    day:     'numeric',
    month:   'long',
    year:    'numeric',
  })
}

function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number)
  const period = h >= 12 ? 'PM' : 'AM'
  const hour   = h % 12 || 12
  return `${hour}:${m.toString().padStart(2, '0')} ${period}`
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

// ─── Shared HTML layout ────────────────────────────────────────────────────

const GOLD   = '#b8972a'
const BG     = '#0d0d0d'
const CARD   = '#141414'
const BORDER = '#222222'
const MUTED  = 'rgba(255,255,255,0.45)'
const TEXT   = '#f5f5f5'

function emailShell(subject: string, body: string): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:${BG};font-family:Georgia,'Times New Roman',serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="padding-bottom:28px;text-align:center;">
              <div style="display:inline-block;border-bottom:1px solid ${GOLD};padding-bottom:10px;margin-bottom:6px;">
                <span style="font-family:Georgia,serif;font-size:22px;letter-spacing:0.12em;color:${TEXT};text-transform:uppercase;">
                  Smart Gents
                </span>
              </div>
              <br />
              <span style="font-size:10px;letter-spacing:0.35em;color:${GOLD};text-transform:uppercase;">
                Saloon
              </span>
            </td>
          </tr>

          <!-- Gold accent line -->
          <tr>
            <td style="padding-bottom:0;">
              <div style="height:1px;background:linear-gradient(to right,transparent,${GOLD},transparent);"></div>
            </td>
          </tr>

          <!-- Card body -->
          <tr>
            <td style="background:${CARD};border:1px solid ${BORDER};border-top:none;padding:36px 36px 28px;">
              ${body}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding-top:24px;text-align:center;">
              <p style="font-size:11px;color:${MUTED};letter-spacing:0.08em;margin:0 0 6px;">
                Smart Gents Saloon · London, UK
              </p>
              <p style="font-size:10px;color:rgba(255,255,255,0.2);margin:0;">
                You received this email because you booked an appointment with us.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

// ─── Appointment detail rows ───────────────────────────────────────────────

function detailRows(rows: [string, string][]): string {
  return `
<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BORDER};margin:24px 0;">
  ${rows.map(([label, value], i) => `
  <tr>
    <td style="padding:11px 16px;border-bottom:${i < rows.length - 1 ? `1px solid ${BORDER}` : 'none'};
               font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:${MUTED};width:38%;">
      ${label}
    </td>
    <td style="padding:11px 16px;border-bottom:${i < rows.length - 1 ? `1px solid ${BORDER}` : 'none'};
               font-size:13px;color:${TEXT};">
      ${value}
    </td>
  </tr>`).join('')}
</table>`
}

// ─── CTA button ────────────────────────────────────────────────────────────

function ctaButton(href: string, label: string): string {
  return `
<table cellpadding="0" cellspacing="0" style="margin:8px 0 4px;">
  <tr>
    <td style="background:${GOLD};padding:13px 28px;">
      <a href="${href}" style="color:#0d0d0d;font-size:11px;letter-spacing:0.28em;
                               text-transform:uppercase;text-decoration:none;font-weight:bold;">
        ${label}
      </a>
    </td>
  </tr>
</table>`
}

// ─── Email body builders ───────────────────────────────────────────────────

function confirmationBody(d: AppointmentMailData, frontendUrl: string): string {
  const rows: [string, string][] = [
    ['Service',  d.serviceName],
    ['Barber',   d.barberName],
    ['Date',     formatDate(d.date)],
    ['Time',     formatTime(d.time)],
    ['Price',    formatPrice(d.price)],
    ['Ref',      d.bookingRef.slice(0, 8).toUpperCase()],
  ]
  if (d.notes) rows.push(['Notes', d.notes])

  return `
<h1 style="font-family:Georgia,serif;font-size:24px;color:${TEXT};margin:0 0 6px;font-weight:normal;">
  Booking Received
</h1>
<p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};margin:0 0 20px;">
  Pending Approval
</p>
<p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0 0 4px;">
  Thank you, <strong style="color:${TEXT};">${d.customerName}</strong>. We&apos;ve received your
  appointment request and will confirm it shortly.
</p>
${detailRows(rows)}
<p style="font-size:12px;color:${MUTED};line-height:1.7;margin:16px 0 0;">
  We&apos;ll send you another email once your appointment is approved. If you have
  any questions, reply to this email or call us directly.
</p>`
}

function approvalBody(d: AppointmentMailData, frontendUrl: string): string {
  const rows: [string, string][] = [
    ['Service',  d.serviceName],
    ['Barber',   d.barberName],
    ['Date',     formatDate(d.date)],
    ['Time',     formatTime(d.time)],
    ['Price',    formatPrice(d.price)],
    ['Ref',      d.bookingRef.slice(0, 8).toUpperCase()],
  ]

  return `
<h1 style="font-family:Georgia,serif;font-size:24px;color:${TEXT};margin:0 0 6px;font-weight:normal;">
  Appointment Confirmed
</h1>
<p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};margin:0 0 20px;">
  See You Soon
</p>
<p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0 0 4px;">
  Great news, <strong style="color:${TEXT};">${d.customerName}</strong>! Your appointment has been
  confirmed. We look forward to welcoming you to the chair.
</p>
${detailRows(rows)}
<p style="font-size:12px;color:${MUTED};line-height:1.7;margin:16px 0 20px;">
  Please arrive 5 minutes early. If you need to reschedule, contact us as soon as possible.
</p>
${ctaButton(frontendUrl, 'Visit Our Website')}`
}

function cancellationBody(d: AppointmentMailData, reason?: string): string {
  const rows: [string, string][] = [
    ['Service',  d.serviceName],
    ['Barber',   d.barberName],
    ['Date',     formatDate(d.date)],
    ['Time',     formatTime(d.time)],
    ['Ref',      d.bookingRef.slice(0, 8).toUpperCase()],
  ]

  return `
<h1 style="font-family:Georgia,serif;font-size:24px;color:${TEXT};margin:0 0 6px;font-weight:normal;">
  Appointment Cancelled
</h1>
<p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#c0392b;margin:0 0 20px;">
  Booking Removed
</p>
<p style="font-size:14px;color:${MUTED};line-height:1.7;margin:0 0 4px;">
  Hi <strong style="color:${TEXT};">${d.customerName}</strong>, your appointment has been cancelled.
  ${reason ? `<br /><span style="font-size:13px;">Reason: ${reason}</span>` : ''}
</p>
${detailRows(rows)}
<p style="font-size:12px;color:${MUTED};line-height:1.7;margin:16px 0 0;">
  We hope to see you again soon. Book a new appointment anytime on our website.
</p>`
}

function adminNotificationBody(d: AppointmentMailData): string {
  const rows: [string, string][] = [
    ['Customer',  d.customerName],
    ['Email',     d.customerEmail],
    ['Phone',     d.customerPhone ?? '—'],
    ['Service',   d.serviceName],
    ['Barber',    d.barberName],
    ['Date',      formatDate(d.date)],
    ['Time',      formatTime(d.time)],
    ['Price',     formatPrice(d.price)],
    ['Ref',       d.bookingRef.slice(0, 8).toUpperCase()],
  ]
  if (d.notes) rows.push(['Notes', d.notes])

  return `
<h1 style="font-family:Georgia,serif;font-size:22px;color:${TEXT};margin:0 0 6px;font-weight:normal;">
  New Booking Request
</h1>
<p style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:${GOLD};margin:0 0 20px;">
  Requires Approval
</p>
${detailRows(rows)}
<p style="font-size:12px;color:${MUTED};margin:16px 0 0;">
  Log in to the admin panel to approve or cancel this appointment.
</p>`
}

// ─── Service ───────────────────────────────────────────────────────────────

@Injectable()
export class MailService {
  private readonly logger    = new Logger(MailService.name)
  private readonly transporter: Transporter
  private readonly from:        string
  private readonly adminEmail:  string | undefined
  private readonly frontendUrl: string

  constructor(private readonly config: ConfigService) {
    this.from        = this.config.get<string>('smtp.from')        ?? 'noreply@smartgentssaloon.com'
    this.adminEmail  = this.config.get<string>('smtp.adminEmail')
    this.frontendUrl = this.config.get<string>('frontendUrl')      ?? 'http://localhost:3000'

    this.transporter = nodemailer.createTransport({
      host:   this.config.get<string>('smtp.host'),
      port:   this.config.get<number>('smtp.port') ?? 587,
      secure: (this.config.get<number>('smtp.port') ?? 587) === 465,
      auth: {
        user: this.config.get<string>('smtp.user'),
        pass: this.config.get<string>('smtp.pass'),
      },
    })
  }

  // ── Public send methods ────────────────────────────────────────────────────

  /** Sent immediately after a customer submits a booking. */
  async sendBookingConfirmation(data: AppointmentMailData): Promise<void> {
    const subject = `Booking Received – ${data.serviceName} on ${formatDate(data.date)}`
    await this.send(data.customerEmail, subject, emailShell(subject, confirmationBody(data, this.frontendUrl)))

    // Admin notification runs in parallel — failure is silently logged
    if (this.adminEmail) {
      const adminSubject = `New Booking: ${data.customerName} – ${data.serviceName}`
      this.send(this.adminEmail, adminSubject, emailShell(adminSubject, adminNotificationBody(data)))
        .catch((err: unknown) => this.logger.warn(`Admin notification failed: ${String(err)}`))
    }
  }

  /** Sent when an admin sets the appointment status to APPROVED. */
  async sendBookingApproval(data: AppointmentMailData): Promise<void> {
    const subject = `Confirmed – ${data.serviceName} on ${formatDate(data.date)}`
    await this.send(data.customerEmail, subject, emailShell(subject, approvalBody(data, this.frontendUrl)))
  }

  /** Sent when an admin sets the appointment status to CANCELLED. */
  async sendBookingCancellation(data: AppointmentMailData): Promise<void> {
    const subject = `Appointment Cancelled – ${data.serviceName}`
    await this.send(data.customerEmail, subject, emailShell(subject, cancellationBody(data)))
  }

  // ── Private transport ──────────────────────────────────────────────────────

  private async send(to: string, subject: string, html: string): Promise<void> {
    try {
      await this.transporter.sendMail({ from: this.from, to, subject, html })
      this.logger.log(`Email sent → ${to}: "${subject}"`)
    } catch (err: unknown) {
      this.logger.error(`Failed to send email to ${to}: ${String(err)}`)
      throw err
    }
  }
}
