import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { JwtPayload } from 'modules/auth/dto'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  private async signTokens(userId: string, role: string) {
    const payload: JwtPayload = { sub: userId, role }
    const access_token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    })
    const refresh_token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d',
    })
    return { access_token, refresh_token }
  }

  private async saveRefreshToken(userId: string, rt: string) {
    const hash = await bcrypt.hash(rt, 10)
    const decoded: any = await this.jwt.verifyAsync(rt, {
      secret: process.env.JWT_SECRET,
    })
    const exp = new Date((decoded.exp as number) * 1000)
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: hash, refreshTokenExp: exp },
    })
  }

  async register(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({ data: { email, password: hashed, name } })
    const tokens = await this.signTokens(user.id, user.role)
    await this.saveRefreshToken(user.id, tokens.refresh_token)
    return { user: { id: user.id, email: user.email }, access_token: tokens.access_token, refresh_token: tokens.refresh_token }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) throw new UnauthorizedException('Invalid credentials')
    const tokens = await this.signTokens(user.id, user.role)
    await this.saveRefreshToken(user.id, tokens.refresh_token)
    return { access_token: tokens.access_token, refresh_token: tokens.refresh_token }
  }

  async refreshByToken(refresh_token: string) {
    let payload: JwtPayload
    try {
      payload = await this.jwt.verifyAsync<JwtPayload>(refresh_token, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
    const user = await this.prisma.user.findUnique({ where: { id: payload.sub } })
    if (!user || !user.refreshTokenHash) throw new UnauthorizedException('No session')

    const match = await bcrypt.compare(refresh_token, user.refreshTokenHash)
    if (!match) throw new ForbiddenException('Refresh token mismatch')

    const tokens = await this.signTokens(user.id, user.role)
    await this.saveRefreshToken(user.id, tokens.refresh_token)
    return { access_token: tokens.access_token, refresh_token: tokens.refresh_token, userId: user.id }
  }

  async revoke(userId: string) {
    await this.prisma.user.update({
      where: { id: userId },
      data: { refreshTokenHash: null, refreshTokenExp: null },
    })
  }

  async decodeRefreshSub(rt: string): Promise<string | null> {
    try {
      const payload = await this.jwt.verifyAsync<JwtPayload>(rt, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      return payload.sub
    } catch {
      return null
    }
  }
}
