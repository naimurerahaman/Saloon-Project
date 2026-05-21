import { IsEnum, IsOptional, IsString, Matches } from 'class-validator'
import { AppointmentStatus } from '@prisma/client'

export class GetAppointmentsQueryDto {
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date?: string

  @IsOptional()
  @IsString()
  barberId?: string
}
