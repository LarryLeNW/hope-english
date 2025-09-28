import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('dev-email')
export class DevEmailController {
    constructor(private readonly email: EmailService) { }

    @Post('send-sample')
    async send(@Body() body: { emails: string[] }) {
        const users: Array<{ id: string; email: string; name: string }> = [];
        for (let i = 1; i <= 1000; i++) {
            const email = `user${i}@example.com`;
            users.push({ id: String(i), email, name: `user${i}` });
        }
        const res = await this.email.enqueueCampaign('dev-campaign-1', users);
        return { ok: true, ...res };
    }
}
