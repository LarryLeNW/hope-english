import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmailSend } from '../entities/email-send.entity';
import { PrismaService } from 'shared/prisma.service';

@Injectable()
export class EmailSendsRepo {
    constructor(
        @InjectRepository(EmailSend)
        private readonly repo: Repository<EmailSend>,
        private prisma: PrismaService,
    ) { }

    async alreadySent(campaignId: string, userId: string) {
        const found = await this.prisma.emailSend.findUnique({
            where: { campaignId_userId: { campaignId, userId } },
            select: { status: true },
        });
        return found?.status === 'sent';
    }

    async markQueued(p: { campaignId: string; userId: string; to: string }) {
        await this.prisma.emailSend.upsert({
            where: { campaignId_userId: { campaignId: p.campaignId, userId: p.userId } },
            update: { status: 'queued' },
            create: { campaignId: p.campaignId, userId: p.userId, to: p.to, status: 'queued' },
        });
    }

    async markSent(p: { campaignId: string; userId: string; to: string; messageId?: string }) {
        console.log("đã send : " + p.userId);
        await this.prisma.emailSend.upsert({
            where: { campaignId_userId: { campaignId: p.campaignId, userId: p.userId } },
            update: { status: 'sent', messageId: p.messageId, sentAt: new Date() },
            create: { campaignId: p.campaignId, userId: p.userId, to: p.to, status: 'sent', messageId: p.messageId, sentAt: new Date() },
        });
    }

    async markFailed(p: { campaignId: string; userId: string; to: string; error: string }) {
        await this.prisma.emailSend.upsert({
            where: { campaignId_userId: { campaignId: p.campaignId, userId: p.userId } },
            update: { status: 'failed', lastError: p.error },
            create: { campaignId: p.campaignId, userId: p.userId, to: p.to, status: 'failed', lastError: p.error },
        });
    }


}
