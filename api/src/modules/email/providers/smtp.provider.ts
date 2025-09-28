import { Injectable } from '@nestjs/common';
import { EmailProvider, SendEmailParams } from './email.provider';
import * as nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

@Injectable()
export class SmtpProvider implements EmailProvider {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST!,
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: { user: process.env.SMTP_USER!, pass: process.env.SMTP_PASS! },
            pool: true,
            maxConnections: 1,
            maxMessages: 50,
            rateDelta: 60_000,
            rateLimit: 10,
        });
    }

    async send({ to, subject, html, text, headers }: SendEmailParams) {
        const info = await this.transporter.sendMail({
            from: `"${process.env.MAIL_SENDER_NAME ?? 'You'}" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
            text,
            headers: {
                'List-Unsubscribe': `<${process.env.UNSUBSCRIBE_MAILTO ?? 'mailto:unsubscribe@yourdomain.com'}>, <${process.env.UNSUBSCRIBE_URL ?? 'https://yourdomain.com/unsubscribe'}>`,
                'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
                ...(headers ?? {}),
            },
        });
        return { messageId: info.messageId };
    }
}
