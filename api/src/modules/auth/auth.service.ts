import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async register(email: string, password: string, name?: string) {
    const hashed = await bcrypt.hash(password, 10)
    const user = await this.prisma.user.create({ data: { email, password: hashed, name } })
    return { id: user.id, email: user.email }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) throw new UnauthorizedException('Invalid credentials')
    const token = await this.jwt.signAsync({ sub: user.id, role: user.role })
    return { access_token: token }
  }
}
