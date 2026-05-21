import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import type { Request } from 'express'

export interface RefreshPayload {
  id: string
  refreshToken: string
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('jwt.refreshSecret')!,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: { sub: string }): RefreshPayload {
    const refreshToken = (req.body as Record<string, unknown>)?.['refreshToken'] as string | undefined
    if (!refreshToken) throw new UnauthorizedException('Refresh token missing')
    return { id: payload.sub, refreshToken }
  }
}
