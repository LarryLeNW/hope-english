export interface SendEmailParams {
    to: string;
    subject: string;
    html?: string;
    text?: string;
    headers?: Record<string, string>;
}

export interface EmailProvider {
    send(p: SendEmailParams): Promise<{ messageId?: string }>;
}
