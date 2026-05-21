import {
  IsEnum,
  IsInt,
  IsNotEmpty,
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

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(100)
  title!: string

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  description!: string

  /** Price in the salon's billing currency (e.g. GBP) */
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price!: number

  /** Duration in minutes */
  @IsInt()
  @Min(1)
  duration!: number

  @IsOptional()
  @IsUrl()
  image?: string

  /** Cloudinary public ID — required when image is set via upload */
  @IsOptional()
  @IsString()
  @MaxLength(200)
  publicId?: string

  @IsEnum(ServiceCategory)
  category!: ServiceCategory

  /** Controls the display order on the frontend (lower = first) */
  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number
}
