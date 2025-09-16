import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import { JwtAuthGuard } from 'shared/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private prisma: PrismaService) { }

  @Get()
  list() {
    return this.prisma.event.findMany({ orderBy: { startsAt: 'asc' }, take: 50 })
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: { title: string; startsAt: string; endsAt: string; location?: string; desc?: string }) {
    return this.prisma.event.create({ data: { title: dto.title, startsAt: new Date(dto.startsAt), endsAt: new Date(dto.endsAt), location: dto.location, desc: dto.desc } })
  }
}
