// src/book/book.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookCategory } from '@prisma/client';
import { PrismaService } from 'shared/prisma.service';
import { PagedResult } from 'types';

@Injectable()
export class BookCateService {
    constructor(private readonly prisma: PrismaService) { }

    async createCategory(data: { name: string; slug: string; canonicalOrder: number; image?: string }): Promise<BookCategory> {
        return this.prisma.bookCategory.create({
            data,
        });
    }

    async getCategories(
        page: number = 1,
        pageSize: number = 10,
        search: string = '',
        orderBy: string = 'canonicalOrder',
        orderDirection: 'asc' | 'desc' = 'asc',
    ): Promise<PagedResult<BookCategory>> {
        const skip = (page - 1) * pageSize;

        const result = await this.prisma.bookCategory.aggregate({
            _count: {
                id: true,
            },
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { slug: { contains: search, mode: 'insensitive' } },
                        ],
                    },
                ],
            },
        });

        const categories = await this.prisma.bookCategory.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { name: { contains: search, mode: 'insensitive' } },
                            { slug: { contains: search, mode: 'insensitive' } },
                        ],
                    },
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
            items: categories,
            page,
            pageSize,
            totalItems,
            totalPages,
            hasNext,
            hasPrevious,
        };
    }

    async getCategoryById(id: string): Promise<BookCategory> {
        const category = await this.prisma.bookCategory.findUnique({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return category;
    }

    async updateCategory(id: string, data: Partial<BookCategory>): Promise<BookCategory> {
        const category = await this.prisma.bookCategory.update({
            where: { id },
            data,
        });

        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return category;
    }

    async deleteCategory(id: string): Promise<String> {
        const category = await this.prisma.bookCategory.delete({
            where: { id },
        });

        if (!category) {
            throw new NotFoundException(`Category with id ${id} not found`);
        }

        return "Deleted Successfully";
    }
}
