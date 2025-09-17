import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam, ApiBody } from '@nestjs/swagger';
import { BookService } from './book.service';
import { Book } from '@prisma/client';
import { BookResDto, CreateBookDto } from 'modules/books/dto';
import { PagedResult } from 'types';

@ApiTags('Books')
@Controller('books')
export class BookController {
    constructor(private readonly bookService: BookService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new Book' })
    @ApiResponse({ status: 201, description: 'Book created successfully.', type: BookResDto })
    @ApiBody({
        description: 'Data for creating a new Book',
        type: CreateBookDto,
    })
    async create(@Body() createBookDto: { title: string; abbrev?: string; categoryId?: string; canonicalOrder: number; chapters?: number }): Promise<Book> {
        return this.bookService.createBook(createBookDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all Books with pagination, search, order, and category filter' })
    @ApiResponse({ status: 200, description: 'List of Books.' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, description: 'Search term for books', type: String, example: 'fiction' })
    @ApiQuery({ name: 'orderBy', required: false, description: 'Field to order by', type: String, example: 'canonicalOrder' })
    @ApiQuery({ name: 'orderDirection', required: false, description: 'Order direction', type: String, enum: ['asc', 'desc'], example: 'asc' })
    @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category ID', type: String, example: '12345' })
    async getAll(
        @Query('page') page: number = 1,
        @Query('pageSize') pageSize: number = 10,
        @Query('search') search: string = '',
        @Query('orderBy') orderBy: string = 'canonicalOrder',
        @Query('orderDirection') orderDirection: 'asc' | 'desc' = 'asc',
        @Query('categoryId') categoryId: string | null = null
    ): Promise<PagedResult<Book>> {
        return this.bookService.getAllBooks(page, pageSize, search, orderBy, orderDirection, categoryId);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a Book by ID' })
    @ApiResponse({ status: 200, description: 'The found Book', type: BookResDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiParam({ name: 'id', description: 'The ID of the Book to retrieve' })
    async getById(@Param('id') id: string): Promise<BookResDto> {
        return this.bookService.getBookById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update Book by ID' })
    @ApiResponse({ status: 200, description: 'The updated Book', type: BookResDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiParam({ name: 'id', description: 'The ID of the Book to update' })
    @ApiBody({
        description: 'The data to update the Book',
        type: BookResDto,
    })
    async update(@Param('id') id: string, @Body() updateBookDto: Partial<BookResDto>): Promise<BookResDto> {
        return this.bookService.updateBook(id, updateBookDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete Book by ID' })
    @ApiResponse({ status: 200, description: 'Book deleted successfully', type: BookResDto })
    @ApiResponse({ status: 404, description: 'Book not found' })
    @ApiParam({ name: 'id', description: 'The ID of the Book to delete' })
    async delete(@Param('id') id: string): Promise<BookResDto> {
        return this.bookService.deleteBook(id);
    }
}
