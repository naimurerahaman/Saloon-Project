import { IsInt, IsOptional, IsString, IsUrl, Min } from 'class-validator'

export class CreateGalleryDto {
  @IsUrl({}, { message: 'url must be a valid URL' })
  url!: string

  @IsString()
  publicId!: string

  @IsOptional()
  @IsString()
  caption?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsInt()
  @Min(0)
  sortOrder?: number
}
