import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { EmailSendsRepo } from './repositories/email-sends.repo';
import { createHash } from 'crypto';
import type { TemplateName } from 'modules/email/templates/template-registry';

type UserItem = {
    id: string;
    email: string;
    name?: string;
    vars?: Record<string, any>;
    subject?: string;
    html?: string;
    text?: string;
};

type EmailContent =
    | { template: TemplateName; vars?: Record<string, any> }
    | { subject: string; html: string; text?: string };

@Injectable()
export class EmailService {
    constructor(
        @InjectQueue('email') private readonly emailQueue: Queue,
        private readonly repo: EmailSendsRepo,
    ) { }

    private safeJobId(campaignId: string, userId: string) {
        const raw = `${campaignId}|${userId}`;
        return createHash('sha1').update(raw).digest('hex');
    }

    /**
     * enqueueCampaign
     * @param campaignId  
     * @param users       
     * @param content     
     */
    async enqueueCampaign(
        campaignId: string,
        users: UserItem[],
        content?: EmailContent,
    ) {
        if (!campaignId || !campaignId.trim()) {
            throw new Error('campaignId is required');
        }

        const jobs = users.map((u) => {
            const mergedVars = {
                name: u.name ?? 'bạn',
                ...(('template' in (content ?? {})) ? (content as any).vars : {}),
                ...(u.vars ?? {}),
            };

            return {
                name: 'sendOne',
                data: {
                    campaignId,
                    userId: u.id,
                    to: u.email,
                    vars: mergedVars,

                    template: ('template' in (content ?? {})) ? (content as any).template : undefined,

                    subject: u.subject ?? (('subject' in (content ?? {})) ? (content as any).subject : undefined),
                    html: u.html ?? (('html' in (content ?? {})) ? (content as any).html : undefined),
                    text: u.text ?? (('text' in (content ?? {})) ? (content as any).text : undefined),
                },
                opts: {
                    jobId: this.safeJobId(campaignId, u.id),
                },
            };
        });

        await Promise.all(
            users.map((u) => this.repo.markQueued({ campaignId, userId: u.id, to: u.email })),
        );

        await this.emailQueue.addBulk(jobs);
        return { queued: jobs.length };
    }
}
