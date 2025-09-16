import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ minLength: 6, example: 'secret123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiPropertyOptional({ example: 'Maria Nguyen' })
    @IsOptional()
    @IsString()
    name?: string;
}

export class LoginDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'secret123' })
    @IsString()
    @MinLength(6)
    password: string;
}

export class RegisterResponseDto {
    @ApiProperty({ example: 'cku9rjq1j0000s0x9l4n8c9qv' })
    id: string;

    @ApiProperty({ example: 'user@example.com' })
    email: string;

    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;
}

export class AuthTokenResponseDto {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' })
    access_token: string;
}

export type JwtPayload = { sub: string; role: string }
