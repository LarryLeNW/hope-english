import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetBooksQueryDto {
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : 1))
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : 10))
    pageSize: number = 10;

    @IsOptional()
    @IsString()
    search: string = '';

    @IsOptional()
    @IsString()
    orderBy: string = 'canonicalOrder';

    @IsOptional()
    @IsEnum(['asc', 'desc'])
    orderDirection: 'asc' | 'desc' = 'asc';
}

export class CreateBookCategoryDto {
    @ApiProperty({ description: 'The name of the book category' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The slug of the book category' })
    @IsString()
    slug: string;

    @ApiProperty({ description: 'The canonical order of the category', default: 1 })
    @IsInt()
    canonicalOrder: number;

    @ApiProperty({ description: 'The image URL for the book category', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}

export class UpdateBookCategoryDto {
    @ApiProperty({ description: 'The name of the book category', required: false })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({ description: 'The slug of the book category', required: false })
    @IsOptional()
    @IsString()
    slug?: string;

    @ApiProperty({ description: 'The canonical order of the category', required: false })
    @IsOptional()
    @IsInt()
    canonicalOrder?: number;

    @ApiProperty({ description: 'The image URL for the book category', required: false })
    @IsOptional()
    @IsString()
    image?: string;
}

export class BookCategoryResDto {
    @ApiProperty({ description: 'The unique identifier for the BookCategory' })
    id: string;

    @ApiProperty({ description: 'The name of the BookCategory' })
    name: string;

    @ApiProperty({ description: 'The slug of the BookCategory' })
    slug: string;

    @ApiProperty({ description: 'The image URL for the BookCategory', required: false })
    image?: string;

    @ApiProperty({ description: 'The canonical order of the BookCategory' })
    canonicalOrder: number;
}