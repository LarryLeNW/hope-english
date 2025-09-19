import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { CreateEventDto, ListEventsQueryDto, UpdateEventDto } from 'modules/events/dto';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService) { }

    async listEvents(query: ListEventsQueryDto) {
        const filters: any = {};

        if (query.startDate) {
            const startDate = new Date(query.startDate);
            if (!isNaN(startDate.getTime())) {
                filters.startsAt = {
                    gte: startDate,
                };
            } else {
                throw new Error('Invalid startDate format');
            }
        }

        if (query.endDate) {
            const endDate = new Date(query.endDate);
            if (!isNaN(endDate.getTime())) {
                filters.endsAt = {
                    lte: endDate,
                };
            } else {
                throw new Error('Invalid endDate format');
            }
        }


        if (query.time) {
            filters.time = query.time
        }

        if (query.dayOfWeek && query.dayOfWeek.length > 0 && !query.dayOfWeek.includes('ALL')) {
            filters.dayOfWeek = {
                hasSome: query.dayOfWeek,
            };
        }

        return this.prisma.event.findMany({
            where: filters,
            orderBy: { startsAt: 'asc' },
            take: query.take,
        });
    }

    async createEvent(userId, dto: CreateEventDto) {
        return this.prisma.event.create({
            data: {
                title: dto.title,
                startsAt: new Date(dto.startsAt),
                endsAt: new Date(dto.endsAt),
                location: dto.location,
                desc: dto.desc,
                authorId: userId,
                images: dto.images,
                dayOfWeek: dto.dayOfWeek,
                time: dto.time,
            },
        });
    }

    async updateEvent(id: string, dto: UpdateEventDto) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return this.prisma.event.update({
            where: { id },
            data: {
                title: dto.title ?? event.title,
                startsAt: dto.startsAt ? new Date(dto.startsAt) : event.startsAt,
                endsAt: dto.endsAt ? new Date(dto.endsAt) : event.endsAt,
                location: dto.location ?? event.location,
                desc: dto.desc ?? event.desc,
                images: dto.images,
            },
        });
    }

    async deleteEvent(id: string) {
        const event = await this.prisma.event.findUnique({ where: { id } });
        if (!event) {
            throw new NotFoundException('Event not found');
        }
        return this.prisma.event.delete({ where: { id } });
    }
}
