import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { DevotionStatus } from '@prisma/client'
import { IsArray, IsOptional, IsString, MinLength, ArrayNotEmpty, IsNotEmpty } from 'class-validator'

export class CreateDevotionDto {
    @ApiProperty({ example: 'Suy niệm Thứ Hai' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @ApiProperty({ example: 'Nội dung Markdown...' })
    @IsString()
    @IsNotEmpty()
    contentMd: string

    @ApiPropertyOptional({ example: 'Tóm tắt ngắn' })
    @IsOptional()
    @IsString()
    excerpt?: string

    @ApiPropertyOptional({ type: [String], example: ['tinh-yeu', 'gia-dinh'] })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    tags?: string[]
}

export class AddReflectionDto {
    @ApiProperty({ example: 'Bài viết chạm đến con...' })
    @IsString()
    @IsNotEmpty()
    content: string
}

export class ModerateReflectionDto {
    @ApiProperty({ enum: ['APPROVED', 'REJECTED'] })
    @IsString()
    @IsNotEmpty()
    status: 'APPROVED' | 'REJECTED'
}

export class ModerateDevotionDto {
    @ApiProperty({ enum: DevotionStatus })
    @IsString()
    @IsNotEmpty()
    status: DevotionStatus
}
