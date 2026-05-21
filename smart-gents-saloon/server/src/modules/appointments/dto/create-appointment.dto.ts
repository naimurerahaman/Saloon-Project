import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateAppointmentDto {
  @IsString()
  @IsNotEmpty()
  serviceId!: string

  @IsString()
  @IsNotEmpty()
  barberId!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  customerName!: string

  @IsEmail()
  customerEmail!: string

  @IsString()
  @Matches(/^[+\d\s\-().]{7,20}$/, {
    message: 'customerPhone must be a valid phone number',
  })
  customerPhone!: string

  /** Date of the appointment in YYYY-MM-DD format. Future-date check is done in the service. */
  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date!: string

  /** Start time in HH:MM format (24-hour clock). */
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'time must be in HH:MM format' })
  time!: string

  @IsOptional()
  @IsString()
  @MaxLength(500)
  notes?: string
}
