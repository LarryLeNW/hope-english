import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const req = ctx.switchToHttp().getRequest()
    const auth = req.headers['authorization'] || ''
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : null
    if (!token) throw new UnauthorizedException('Missing token')
    try {
      req.user = await this.jwt.verifyAsync(token)
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
