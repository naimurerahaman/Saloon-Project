import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Role } from '@prisma/client'
import { ROLES_KEY } from '../decorators/roles.decorator.js'
import type { JwtPayload } from '../strategies/jwt.strategy.js'
import type { Request } from 'express'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ])

    // No @Roles() decorator — route is accessible to any authenticated user
    if (!requiredRoles || requiredRoles.length === 0) return true

    const req = ctx.switchToHttp().getRequest<Request & { user: JwtPayload }>()
    const user = req.user

    if (!user || !requiredRoles.includes(user.role as Role)) {
      throw new ForbiddenException('Insufficient permissions')
    }

    return true
  }
}
