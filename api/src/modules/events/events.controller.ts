import { Body, Controller, Get, Post, Put, Delete, Param, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'shared/jwt-auth.guard';
import { EventsService } from './events.service';  // import service
import { CreateEventDto, ListEventsQueryDto, UpdateEventDto } from 'modules/events/dto';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) { }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sự kiện' })
  @ApiResponse({ status: 200, description: 'Danh sách sự kiện được trả về thành công' })
  list(
    @Query() query: ListEventsQueryDto
  ) {
    return this.eventsService.listEvents(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo sự kiện mới' })
  @ApiResponse({ status: 201, description: 'Sự kiện đã được tạo thành công' })
  @ApiBody({ type: CreateEventDto, description: 'Dữ liệu sự kiện mới' })
  create(@Req() req: any, @Body() dto: CreateEventDto) {
    const userId = req.user?.sub as string | undefined;
    return this.eventsService.createEvent(userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin sự kiện' })
  @ApiResponse({ status: 200, description: 'Sự kiện đã được cập nhật thành công' })
  @ApiResponse({ status: 404, description: 'Sự kiện không tồn tại' })
  @ApiParam({ name: 'id', type: String, description: 'ID của sự kiện cần cập nhật' })
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.eventsService.updateEvent(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Xóa sự kiện theo ID' })
  @ApiResponse({ status: 200, description: 'Sự kiện đã được xóa thành công' })
  @ApiResponse({ status: 404, description: 'Sự kiện không tồn tại' })
  @ApiParam({ name: 'id', type: String, description: 'ID của sự kiện cần xóa' })
  delete(@Param('id') id: string) {
    return this.eventsService.deleteEvent(id);
  }
}
