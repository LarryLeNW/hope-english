import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookCategory } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';

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
    ): Promise<Book[]> {
        const skip = (page - 1) * pageSize;

        return this.prisma.book.findMany({
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
