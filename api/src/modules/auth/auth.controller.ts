import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBadRequestResponse, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginDto, RegisterDto, RegisterResponseDto, AuthTokenResponseDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User created', type: RegisterResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload or email exists' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  register(@Body() dto: RegisterDto): Promise<RegisterResponseDto> | any {
    return this.auth.register(dto.email, dto.password, dto.name);
  }

  @ApiOperation({ summary: 'Login and get JWT access token' })
  @ApiOkResponse({ description: 'Login success', type: AuthTokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  login(@Body() dto: LoginDto): Promise<AuthTokenResponseDto> | any {
    return this.auth.login(dto.email, dto.password);
  }
}
