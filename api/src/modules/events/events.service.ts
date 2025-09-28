import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { CreateEventDto, ListEventsQueryDto, UpdateEventDto } from 'modules/events/dto';
import { EmailService } from 'modules/email/email.service';
import { UserService } from 'modules/user/user.service';
import { Event } from '@prisma/client';

@Injectable()
export class EventsService {
    constructor(private prisma: PrismaService,
        private readonly emailService: EmailService,
        private readonly userService: UserService
    ) { }

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

    async createEvent(userId: string, dto: CreateEventDto) {
        return this.prisma.$transaction(async (tx) => {
            const event = await tx.event.create({
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
                    color: dto.color,
                },
            });

            if (dto.sendEmails?.length) {
                const campaignId = `event:${event.id}:invite:v1`;
                await this.emailService.enqueueCampaign(campaignId, dto.sendEmails, {
                    template: 'event-invite',
                    vars: {
                        locale: 'vi',
                        event: {
                            title: event.title,
                            startsAt: event.startsAt,
                            location: event.location,
                            desc: event.desc,
                        },
                    },
                });
            }

            if (dto.sendMember) {
                const campaignId = `event:${event.id}:notify-all:v1`;
                await this.notifyAllMembers(campaignId, event);
            }

            return event;
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
                time: dto.time ?? event.time,
                color: dto.color ?? event.color,
                dayOfWeek: dto.dayOfWeek ?? event.dayOfWeek,
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

    async notifyAllMembers(campaignId: string, event: Event) {
        let total = 0;
        for await (const batch of this.userService.listRecipientsInBatches()) {
            const jobsUsers = batch.map(u => ({
                id: u.id,
                email: u.email,
                name: u.name ?? 'bạn',
                vars: { locale: u.locale ?? 'vi' },
            }));

            await this.emailService.enqueueCampaign(
                campaignId,
                jobsUsers,
                {
                    template: 'event-invite', vars: {
                        event,
                    }
                },
            );
            console.log(batch.length);
            total += batch.length;
        }
        return { totalQueued: total };
    }

}
