import { IsEnum } from 'class-validator'
import { AppointmentStatus } from '@prisma/client'

export class UpdateAppointmentStatusDto {
  @IsEnum(AppointmentStatus, {
    message: `status must be one of: ${Object.values(AppointmentStatus).join(', ')}`,
  })
  status!: AppointmentStatus
}
