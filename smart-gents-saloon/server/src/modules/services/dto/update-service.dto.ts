import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { ServiceCategory } from '@prisma/client'

export class UpdateServiceDto {
  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  title?: string

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number

  @IsOptional()
  @IsInt()
  @Min(1)
  duration?: number

  @IsOptional()
  @IsUrl()
  image?: string

  @IsOptional()
  @IsString()
  @MaxLength(200)
  publicId?: string

  @IsOptional()
  @IsEnum(ServiceCategory)
  category?: ServiceCategory

  /** Set to true to reactivate a soft-deleted service */
  @IsOptional()
  @IsBoolean()
  isActive?: boolean

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number
}
