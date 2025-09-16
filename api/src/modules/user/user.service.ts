import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getUserInfo(userId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } })
        if (!user) throw new UnauthorizedException('Invalid credentials')
        return user
    }

}
