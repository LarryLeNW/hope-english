import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { SmtpProvider } from './providers/smtp.provider';
import { EmailSendsRepo } from './repositories/email-sends.repo';
import { TemplateName } from 'modules/email/templates/template-registry';
import { TemplateRenderer } from 'modules/email/templates/template-renderer';

type SendOneJobData = {
    campaignId: string;
    userId: string;
    to: string;
    vars?: Record<string, any>;
    template?: TemplateName;
    subject?: string;
    html?: string;
    text?: string;
};

@Processor('email', { concurrency: 5 })
export class EmailProcessor extends WorkerHost {
    constructor(
        private readonly provider: SmtpProvider,
        private readonly repo: EmailSendsRepo,
        private readonly templateRenderer: TemplateRenderer,
    ) {
        super();
    }

    async process(job: Job<any, any, string>) {
        switch (job.name) {
            case 'sendOne':
                return this.handleSendOne(job as Job<SendOneJobData>);
            default:
                throw new Error(`Unknown job: ${job.name}`);
        }
    }

    private async handleSendOne(job: Job<SendOneJobData>) {
        const { campaignId, userId, to, template, vars = {} } = job.data;

        if (await this.repo.alreadySent(campaignId, userId)) return;
        console.log("bắt đầu send : " + userId);
        try {
            let subject = job.data.subject;
            let html = job.data.html;
            let text = job.data.text;

            if (template) {
                const out = await this.templateRenderer.render(template, vars);
                subject ??= out.subject;
                html ??= out.html;
                text ??= out.text;
            }

            subject ??= `Thông báo cho ${vars?.name ?? 'bạn'}`;
            html ??= `<p>Chào ${vars?.name ?? 'bạn'}</p>`;
            text ??= `Chao ${vars?.name ?? 'ban'}`;

            const { messageId } = await this.provider.send({ to, subject, html, text });
            await this.repo.markSent({ campaignId, userId, to, messageId });
        } catch (e: any) {
            await this.repo.markFailed({
                campaignId,
                userId,
                to,
                error: e?.message ?? String(e),
            });
            console.log(`lỗi send : ${userId}` + (e?.message ?? String(e)));
            throw e;
        }
    }
}
