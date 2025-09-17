import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookCategory } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { PagedResult } from 'types';

@Injectable()
export class BookService {
    constructor(private readonly prisma: PrismaService) { }

    async createBook(data: { title: string; abbrev?: string; categoryId?: string; canonicalOrder: number; chapters?: number }): Promise<Book> {
        return this.prisma.book.create({
            data,
        });
    }

    async getAllBooks(
        page: number = 1,
        pageSize: number = 10,
        search: string = '',
        orderBy: string = 'canonicalOrder',
        orderDirection: 'asc' | 'desc' = 'asc',
        categoryId: string | null = null
    ): Promise<PagedResult<Book>> {
        const skip = (page - 1) * pageSize;

        const result = await this.prisma.book.aggregate({
            _count: {
                id: true,
            },
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: search, mode: 'insensitive' } },
                            { abbrev: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                    categoryId ? { categoryId: categoryId } : {},
                ],
            },
        });

        const books = await this.prisma.book.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { title: { contains: search, mode: 'insensitive' } },
                            { abbrev: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                    categoryId ? { categoryId: categoryId } : {},
                ],
            },
            skip,
            take: pageSize,
            orderBy: {
                [orderBy]: orderDirection,
            },
        });

        const totalItems = result._count.id;
        const totalPages = Math.ceil(totalItems / pageSize);
        const hasNext = page < totalPages;
        const hasPrevious = page > 1;

        return {
            items: books,
            page,
            pageSize,
            totalItems,
            totalPages,
            hasNext,
            hasPrevious,
        };
    }

    async getBookById(id: string): Promise<Book> {
        const book = await this.prisma.book.findUnique({
            where: { id },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }

        return book;
    }

    async updateBook(id: string, data: Partial<Book>): Promise<Book> {
        const book = await this.prisma.book.update({
            where: { id },
            data,
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }

        return book;
    }

    async deleteBook(id: string): Promise<Book> {
        const book = await this.prisma.book.delete({
            where: { id },
        });

        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }

        return book;
    }
}
