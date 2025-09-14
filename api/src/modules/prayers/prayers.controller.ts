import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import { JwtAuthGuard } from '../../shared/jwt-auth.guard'

@Controller('prayers')
export class PrayersController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async approved() {
    return this.prisma.prayer.findMany({ where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' }, take: 50 })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async submit(@Req() req: any, @Body() dto: { title: string; content: string; isAnonymous?: boolean }) {
    const userId = req.user?.sub as string | undefined
    return this.prisma.prayer.create({ data: { title: dto.title, content: dto.content, isAnonymous: dto.isAnonymous ?? true, authorId: userId } })
  }
}
