import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SmtpProvider } from './providers/smtp.provider';
import { EmailSend } from 'modules/email/entities/email-send.entity';
import { EmailService } from 'modules/email/email.service';
import { EmailProcessor } from 'modules/email/email.processor';
import { EmailSendsRepo } from 'modules/email/repositories/email-sends.repo';
import { DevEmailController } from 'modules/email/email.test.controller';
import { PrismaService } from 'shared/prisma.service';
import { TemplateRenderer } from 'modules/email/templates/template-renderer';

@Module({
    imports: [
        BullModule.registerQueue({
            name: 'email',
            defaultJobOptions: {
                removeOnComplete: true,
                removeOnFail: 1000,
                attempts: 5,
                backoff: { type: 'exponential', delay: 60_000 },
            },
        }),
        TypeOrmModule.forFeature([EmailSend]),
    ],
    providers: [
        EmailService,
        EmailProcessor,
        SmtpProvider,
        EmailSendsRepo,
        PrismaService,
        TemplateRenderer
    ],
    controllers: [DevEmailController],
    exports: [
        EmailService,
    ],
})
export class EmailModule { }
