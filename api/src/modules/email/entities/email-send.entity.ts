import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, Unique } from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class SendEmailUserDto {
    @ApiProperty({ description: 'ID user nội bộ (string)', example: '123' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'Email người nhận', example: 'alice@example.com' })
    @IsEmail()
    email: string;

    @ApiPropertyOptional({ description: 'Tên hiển thị (tuỳ chọn)', example: 'Alice' })
    @IsOptional()
    @IsString()
    name?: string;
}

@Entity({ name: 'EmailSend' })
@Unique(['campaignId', 'userId'])
@Index(['campaignId', 'status'])
export class EmailSend {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ length: 100 })
    campaignId!: string;

    @Column({ length: 100 })
    userId!: string;

    @Column({ length: 320 })
    to!: string;

    @Column({ length: 255, nullable: true })
    messageId?: string;

    @Column({ length: 20, default: 'queued' })
    status!: 'queued' | 'sent' | 'failed' | 'bounced';

    @Column({ type: 'int', default: 0 })
    attempts!: number;

    @Column({ type: 'text', nullable: true })
    lastError?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    sentAt?: Date;
}
