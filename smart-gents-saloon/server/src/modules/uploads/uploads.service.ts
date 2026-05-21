import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { v2 as cloudinary } from 'cloudinary'
import type { UploadApiResponse } from 'cloudinary'
import type { Express } from 'express'

export interface UploadResult {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  bytes: number
}

const ALLOWED_MIME = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
])

@Injectable()
export class UploadsService {
  constructor(private readonly config: ConfigService) {
    cloudinary.config({
      cloud_name: this.config.get<string>('cloudinary.cloudName'),
      api_key:    this.config.get<string>('cloudinary.apiKey'),
      api_secret: this.config.get<string>('cloudinary.apiSecret'),
      secure:     true,
    })
  }

  async upload(file: Express.Multer.File, folder = 'gallery'): Promise<UploadResult> {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      throw new BadRequestException(
        'Only image files are accepted (jpeg, png, webp, gif, avif)',
      )
    }

    const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`

    const result: UploadApiResponse = await cloudinary.uploader.upload(dataUri, {
      folder: `smart-gents-saloon/${folder}`,
      // Eager transforms bake optimisation into the stored URL
      eager: [
        { quality: 'auto', fetch_format: 'auto', width: 1920, crop: 'limit' },
      ],
      // Apply same transforms to the returned secure_url
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { width: 1920, crop: 'limit' },
      ],
    })

    return {
      url:      result.secure_url,
      publicId: result.public_id,
      width:    result.width,
      height:   result.height,
      format:   result.format,
      bytes:    result.bytes,
    }
  }

  /** Builds a CDN URL for an existing publicId with optimisation params. */
  buildUrl(publicId: string, transforms: Record<string, unknown> = {}): string {
    return cloudinary.url(publicId, {
      secure: true,
      quality: 'auto',
      fetch_format: 'auto',
      ...transforms,
    })
  }

  async destroy(publicId: string): Promise<{ result: string }> {
    const res = await cloudinary.uploader.destroy(publicId)
    return { result: res.result as string }
  }
}
