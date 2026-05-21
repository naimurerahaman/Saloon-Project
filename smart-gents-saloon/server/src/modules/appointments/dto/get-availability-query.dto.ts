import { IsNotEmpty, IsString, Matches } from 'class-validator'

export class GetAvailabilityQueryDto {
  @IsString()
  @IsNotEmpty()
  barberId!: string

  @IsString()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: 'date must be in YYYY-MM-DD format' })
  date!: string

  @IsString()
  @IsNotEmpty()
  serviceId!: string
}
