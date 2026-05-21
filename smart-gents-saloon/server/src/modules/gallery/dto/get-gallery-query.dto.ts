import { IsOptional, IsString } from 'class-validator'

export class GetGalleryQueryDto {
  @IsOptional()
  @IsString()
  category?: string
}
