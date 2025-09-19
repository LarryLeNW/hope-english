import { IsString, IsOptional, IsDateString, IsInt, IsIn, IsEnum, IsArray, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { DayOfWeek } from '@prisma/client';

export class CreateEventDto {
    @ApiProperty({ description: 'Tiêu đề của sự kiện', example: 'Giáng sinh 2023' })
    @IsString()
    title: string;

    @ApiProperty({ description: 'Ngày bắt đầu sự kiện', example: '2023-12-25T00:00:00Z' })
    @IsDateString()
    startsAt: string;

    @ApiProperty({ description: 'Ngày kết thúc sự kiện', example: '2023-12-25T23:59:59Z' })
    @IsDateString()
    endsAt: string;

    @ApiProperty({ description: 'Địa điểm sự kiện', example: 'Nhà thờ chính tòa', required: false })
    @IsOptional()
    @IsString()
    location?: string;


    @ApiProperty({ description: 'Thời gian diễn ra', example: '2h', required: false })
    @IsOptional()
    @IsString()
    time?: string;

    @ApiProperty({ description: 'Mô tả về sự kiện', example: 'Lễ Giáng Sinh hoành tráng', required: false })
    @IsOptional()
    @IsString()
    desc?: string;

    @ApiProperty({ description: 'Danh sách URL hình ảnh của sự kiện', example: ['https://example.com/image.jpg'], required: false })
    @IsOptional()
    @IsString({ each: true })
    images?: string[];


    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: ["MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
            "ALL"],
        examples: [['MONDAY', 'WEDNESDAY'], ['FRIDAY'], ['ALL']],
        required: false,
        isArray: true,
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(DayOfWeek, { each: true })
    @Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value.map(day => DayOfWeek[day.toUpperCase() as keyof typeof DayOfWeek] || DayOfWeek.ALL);
        }
        return DayOfWeek[value.toUpperCase() as keyof typeof DayOfWeek] || DayOfWeek.ALL;
    })
    dayOfWeek?: DayOfWeek[];
}


export class UpdateEventDto {
    @ApiProperty({ description: 'Tiêu đề của sự kiện', example: 'Giáng sinh 2023', required: false })
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty({ description: 'Ngày bắt đầu sự kiện', example: '2023-12-25T00:00:00Z', required: false })
    @IsOptional()
    @IsDateString()
    startsAt?: string;

    @ApiProperty({ description: 'Ngày kết thúc sự kiện', example: '2023-12-25T23:59:59Z', required: false })
    @IsOptional()
    @IsDateString()
    endsAt?: string;

    @ApiProperty({ description: 'Địa điểm sự kiện', example: 'Nhà thờ chính tòa', required: false })
    @IsOptional()
    @IsString()
    location?: string;

    @ApiProperty({ description: 'Mô tả về sự kiện', example: 'Lễ Giáng Sinh hoành tráng', required: false })
    @IsOptional()
    @IsString()
    desc?: string;


    @ApiProperty({ description: 'Thời gian diễn ra', example: '2h', required: false })
    @IsOptional()
    @IsString()
    time?: string;

    @ApiProperty({ description: 'Danh sách URL hình ảnh của sự kiện', example: ['https://example.com/image.jpg'], required: false })
    @IsOptional()
    @IsString({ each: true })
    images?: string[];

    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: ["MONDAY",
            "TUESDAY",
            "WEDNESDAY",
            "THURSDAY",
            "FRIDAY",
            "SATURDAY",
            "SUNDAY",
            "ALL"],
        examples: [['MONDAY', 'WEDNESDAY'], ['FRIDAY'], ['ALL']],
        required: false,
        isArray: true,
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(DayOfWeek, { each: true })
    @Transform(({ value }) => {
        if (Array.isArray(value)) {
            return value.map(day => DayOfWeek[day.toUpperCase() as keyof typeof DayOfWeek] || DayOfWeek.ALL);
        }
        return DayOfWeek[value.toUpperCase() as keyof typeof DayOfWeek] || DayOfWeek.ALL;
    })
    dayOfWeek?: DayOfWeek[];
}

export class ListEventsQueryDto {
    @ApiProperty({
        description: 'Số lượng sự kiện trả về',
        required: false,
        default: 10,
    })
    @IsOptional()
    @IsInt()
    @Transform(({ value }) => (value ? Number(value) : 10))
    take: number = 10;

    @ApiProperty({
        description: 'Ngày bắt đầu sự kiện',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string;

    @ApiProperty({
        description: 'Ngày kết thúc sự kiện',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string;


    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: DayOfWeek,
        required: false,
        isArray: true,
    })

    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: DayOfWeek,
        required: false,
        isArray: true,
    })

    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: DayOfWeek,
        required: false,
        isArray: true,
    })

    @ApiProperty({
        description: 'Ngày trong tuần để lọc sự kiện. Có thể chọn nhiều ngày.',
        enum: DayOfWeek,
        required: false,
        isArray: true,
    })
    @IsOptional()
    @IsArray()
    @ArrayNotEmpty()
    @IsEnum(DayOfWeek, { each: true })
    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return [value];
        }
        if (Array.isArray(value)) {
            return value.map(day => DayOfWeek[day.toUpperCase() as keyof typeof DayOfWeek] || DayOfWeek.ALL);
        }
        return value;
    })
    dayOfWeek?: DayOfWeek[];

    @ApiProperty({ description: 'Thời gian diễn ra', example: '2h', required: false })
    @IsOptional()
    @IsString()
    time?: string;
}
