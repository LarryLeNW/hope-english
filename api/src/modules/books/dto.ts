import { ApiProperty } from "@nestjs/swagger";
import { BookCategory } from "@prisma/client";
import { BookCategoryResDto } from "modules/bookCates/dto";

export class CreateBookDto {
    @ApiProperty({ description: 'The title of the Book', example: 'The Great Book' })
    title: string;

    @ApiProperty({ description: 'The abbreviation of the Book', required: false, example: 'TGB' })
    abbrev?: string;

    @ApiProperty({ description: 'The category ID to which the Book belongs', required: false, example: 'f5e876dd-4a79-4322-a923-3e4be9b540c7' })
    categoryId?: string;

    @ApiProperty({ description: 'The canonical order of the Book', example: 1 })
    canonicalOrder: number;

    @ApiProperty({ description: 'The number of chapters in the Book', required: false, example: 10 })
    chapters?: number;
}

export class UpdateBookDto {
    @ApiProperty({ description: 'The title of the Book', required: false, example: 'The Great Book Revised' })
    title?: string;

    @ApiProperty({ description: 'The abbreviation of the Book', required: false, example: 'TGBR' })
    abbrev?: string;

    @ApiProperty({ description: 'The category ID to which the Book belongs', required: false, example: 'f5e876dd-4a79-4322-a923-3e4be9b540c7' })
    categoryId?: string;

    @ApiProperty({ description: 'The canonical order of the Book', required: false, example: 2 })
    canonicalOrder?: number;

    @ApiProperty({ description: 'The number of chapters in the Book', required: false, example: 15 })
    chapters?: number;
}

export class BookResDto {
    @ApiProperty({ description: 'The unique identifier for the Book' })
    id: string;

    @ApiProperty({ description: 'The title of the Book' })
    title: string;

    @ApiProperty({ description: 'The abbreviation of the Book', required: false })
    abbrev?: string;

    @ApiProperty({ description: 'The canonical order of the Book' })
    canonicalOrder: number;

    @ApiProperty({ description: 'The number of chapters in the Book', required: false })
    chapters?: number;

    @ApiProperty({ description: 'The category information of the Book', type: BookCategoryResDto, required: false })
    category?: BookCategoryResDto;

    @ApiProperty({ description: 'List of Bible verses for this Book', type: [String], required: false })
    verses?: string[];
}