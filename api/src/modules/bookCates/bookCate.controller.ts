import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookCategory } from '@prisma/client';
import { BookCateService } from 'modules/bookCates/bookCate.service';
import { CreateBookCategoryDto, GetBooksQueryDto, UpdateBookCategoryDto } from 'modules/bookCates/dto';
import { PagedResult } from 'types';


@ApiTags('Book Categories')
@Controller('book-categories')
export class BookCateController {
    constructor(private readonly bookCateService: BookCateService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new BookCategory' })
    @ApiResponse({ status: 201, description: 'BookCategory created successfully.', type: CreateBookCategoryDto })
    @ApiBody({
        description: 'The data to create a new BookCategory',
        type: CreateBookCategoryDto,
    })
    async create(@Body() createCategoryDto: CreateBookCategoryDto): Promise<BookCategory> {
        return this.bookCateService.createCategory(createCategoryDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all BookCategories' })
    @ApiResponse({ status: 200, description: 'List of BookCategories.' })
    @ApiQuery({ name: 'page', required: false, description: 'Page number for pagination', type: Number, example: 1 })
    @ApiQuery({ name: 'pageSize', required: false, description: 'Number of items per page', type: Number, example: 10 })
    @ApiQuery({ name: 'search', required: false, description: 'Search term for book categories', type: String, example: 'old' })
    @ApiQuery({ name: 'orderBy', required: false, description: 'Field to order by', type: String, example: 'canonicalOrder' })
    @ApiQuery({ name: 'orderDirection', required: false, description: 'Order direction', type: String, enum: ['asc', 'desc'], example: 'asc' })
    async getAll(@Query() query: GetBooksQueryDto): Promise<PagedResult<BookCategory>> {
        return this.bookCateService.getCategories(
            query.page,
            query.pageSize,
            query.search,
            query.orderBy,
            query.orderDirection,
        );
    }

    @Get(':id')
    async getById(@Param('id') id: string): Promise<BookCategory> {
        return this.bookCateService.getCategoryById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update BookCategory by ID' })
    @ApiResponse({ status: 200, description: 'The updated BookCategory', type: UpdateBookCategoryDto })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiParam({ name: 'id', description: 'The ID of the BookCategory to update' })
    @ApiBody({
        description: 'The data to update the BookCategory',
        type: UpdateBookCategoryDto,
    })
    async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateBookCategoryDto): Promise<BookCategory> {
        return this.bookCateService.updateCategory(id, updateCategoryDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete BookCategory by ID' })
    @ApiResponse({ status: 200, description: 'Category deleted successfully', type: String })
    @ApiResponse({ status: 404, description: 'Category not found' })
    @ApiParam({ name: 'id', description: 'The ID of the BookCategory to delete' })
    async delete(@Param('id') id: string): Promise<String> {
        return this.bookCateService.deleteCategory(id);
    }

}
