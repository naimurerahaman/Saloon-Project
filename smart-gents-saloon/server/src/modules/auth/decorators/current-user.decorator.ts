import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import type { Request } from 'express'
import type { JwtPayload } from '../strategies/jwt.strategy.js'

/** Injects the authenticated user from the JWT payload into a route handler parameter. */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): JwtPayload => {
    const req = ctx.switchToHttp().getRequest<Request & { user: JwtPayload }>()
    return req.user
  },
)
