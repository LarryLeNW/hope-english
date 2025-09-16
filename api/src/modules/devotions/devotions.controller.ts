import {
  Body, Controller, Get, Post, Param, Query, Req,
  UseGuards, Patch
} from '@nestjs/common'
import { PrismaService } from '../../shared/prisma.service'
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger'
import { AddReflectionDto, CreateDevotionDto, ModerateDevotionDto, ModerateReflectionDto } from './dto'
import { BadRequestException } from '@nestjs/common'
import { DevotionStatus } from '@prisma/client'
import { JwtAuthGuard } from 'shared/jwt-auth.guard'

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

@ApiTags('Devotions')
@Controller('devotions')
export class DevotionsController {
  constructor(private prisma: PrismaService) { }

  @ApiOperation({ summary: 'List tags (topics) with published counts' })
  @ApiQuery({ name: 'take', required: false, schema: { default: 50, type: 'number' } })
  @ApiQuery({ name: 'q', required: false, description: 'Search by name/slug' })
  @Get('tags')
  async listTags(
    @Query('take') take = '50',
    @Query('q') q?: string,
  ) {
    const size = Math.min(100, Math.max(1, Number(take) || 50))

    const links = await this.prisma.devotionTagOnDevotion.findMany({
      where: { devotion: { status: DevotionStatus.PUBLISHED } },
      select: { tagId: true },
    })

    if (links.length === 0) return []

    const counts = new Map<string, number>()
    for (const l of links) counts.set(l.tagId, (counts.get(l.tagId) || 0) + 1)

    const tags = await this.prisma.devotionTag.findMany({
      where: q
        ? {
          OR: [
            { name: { contains: q, mode: 'insensitive' } },
            { slug: { contains: q, mode: 'insensitive' } },
          ],
        }
        : undefined,
      select: { id: true, name: true, slug: true },
    })

    return tags
      .map(t => ({ slug: t.slug, name: t.name, countPublished: counts.get(t.id) || 0 }))
      .filter(x => x.countPublished > 0)
      .sort((a, b) => b.countPublished - a.countPublished)
      .slice(0, size)
  }

  @ApiOperation({ summary: 'List devotions' })
  @ApiQuery({ name: 'status', required: false, enum: ['PUBLISHED', 'PENDING_REVIEW', 'DRAFT'] })
  @ApiQuery({ name: 'tag', required: false })
  @ApiQuery({ name: 'take', required: false, schema: { default: 20, type: 'number' } })
  @Get()
  async list(
    @Query('status') status?: 'PUBLISHED' | 'PENDING_REVIEW' | 'DRAFT',
    @Query('tag') tag?: string,
    @Query('take') take = '20',
  ) {
    return this.prisma.devotion.findMany({
      where: {
        status: status ?? 'PUBLISHED',
        ...(tag ? { tags: { some: { tag: { slug: tag } } } } : {}),
      },
      include: {
        tags: { include: { tag: true } },
        author: { select: { id: true, name: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: parseInt(take),
    })
  }

  @ApiOperation({ summary: 'Get devotion detail (auto +1 view)' })
  @Get(':id')
  async detail(@Param('id') id: string) {
    return this.prisma.devotion.update({
      where: { id },
      data: { views: { increment: 1 } },
      include: {
        tags: { include: { tag: true } },
        author: { select: { id: true, name: true } },
        reflections: {
          where: { status: 'APPROVED' },
          include: { author: { select: { id: true, name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    })
  }

  @ApiOperation({ summary: 'Create devotion (PENDING_REVIEW)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Req() req, @Body() dto: CreateDevotionDto) {
    const authorId = String(req.user?.sub);
    if (!authorId) throw new BadRequestException('Missing author');

    const base = slugify(dto.title || 'suy-niem');
    const slug = `${base}-${Date.now()}`;

    const devotion = await this.prisma.devotion.create({
      data: {
        slug,
        title: dto.title,
        contentMd: dto.contentMd,
        excerpt: dto.excerpt,
        status: 'PENDING_REVIEW',
        author: { connect: { id: authorId } },
      },
    });

    if (dto.tags?.length) {
      await this.prisma.$transaction(async (tx) => {
        for (const tagSlug of dto.tags) {
          const tag = await tx.devotionTag.upsert({
            where: { slug: tagSlug },
            update: {},
            create: { slug: tagSlug, name: tagSlug },
          });
          await tx.devotionTagOnDevotion.create({
            data: { devotionId: devotion.id, tagId: tag.id },
          });
        }
      });
    }

    return devotion;
  }


  @ApiOperation({ summary: 'Toggle favorite' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/favorite')
  async toggleFavorite(@Param('id') id: string, @Req() req) {
    const userId = req.user.sub
    const existing = await this.prisma.favorite.findUnique({
      where: { userId_devotionId: { userId, devotionId: id } },
    })
    if (existing) {
      await this.prisma.favorite.delete({
        where: { userId_devotionId: { userId, devotionId: id } },
      })
      return { favorited: false }
    }
    await this.prisma.favorite.create({ data: { userId, devotionId: id } })
    return { favorited: true }
  }

  @ApiOperation({ summary: 'Add reflection (pending moderation)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id/reflections')
  async addReflection(@Param('id') id: string, @Req() req, @Body() dto: AddReflectionDto) {
    const userId = req.user.sub
    return this.prisma.reflectionComment.create({
      data: { devotionId: id, authorId: userId, content: dto.content, status: 'PENDING' },
    })
  }

  @ApiOperation({ summary: 'Moderate reflection (MOD/ADMIN)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('reflections/:rid/moderate')
  async moderateReflection(@Param('rid') rid: string, @Req() req, @Body() dto: ModerateReflectionDto) {
    console.log("🚀 ~ DevotionsController ~ moderateReflection ~ req.user.role:", req.user.role)
    if (req.user.role === 'USER') {
      throw new Error('Permission denied')
    }
    return this.prisma.reflectionComment.update({
      where: { id: rid },
      data: { status: dto.status },
    })
  }

  @ApiOperation({ summary: 'Moderate devotions (MOD/ADMIN)' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch('/:id/moderate')
  async moderateDevotion(@Param('id') id: string, @Req() req, @Body() dto: ModerateDevotionDto) {
    if (req.user.role === 'USER') {
      throw new Error('Permission denied')
    }
    return this.prisma.devotion.update({
      where: { id },
      data: { status: dto.status as DevotionStatus },
    })
  }
}



