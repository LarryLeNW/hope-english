import { Body, Controller, Post, Res, Req, UnauthorizedException } from '@nestjs/common'
import { Response, Request } from 'express'
import { AuthService } from './auth.service'
import {
  ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LoginDto, RegisterDto, RegisterResponseDto, AuthTokenResponseDto } from './dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) { }

  private cookieName = process.env.REFRESH_COOKIE_NAME || 'rt'

  private buildRtCookieOptions() {
    const isProd = process.env.NODE_ENV === 'production'
    return {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' as const : 'lax' as const,
      maxAge: this.parseMaxAgeMs(process.env.JWT_REFRESH_EXPIRES || '7d'),
    }
  }

  private parseMaxAgeMs(expires: string) {
    const m = expires.match(/^(\d+)([smhd])$/i)
    if (!m) return 7 * 24 * 3600 * 1000
    const n = parseInt(m[1], 10)
    const u = m[2].toLowerCase()
    const mult = u === 's' ? 1000 : u === 'm' ? 60_000 : u === 'h' ? 3_600_000 : 86_400_000
    return n * mult
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiCreatedResponse({ description: 'User created', type: RegisterResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payload or email exists' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
    const { user, access_token, refresh_token } = await this.auth.register(dto.email, dto.password, dto.name)
    res.cookie(this.cookieName, refresh_token, this.buildRtCookieOptions())
    return { id: user.id, email: user.email, access_token }
  }

  @ApiOperation({ summary: 'Login and set refresh token cookie' })
  @ApiOkResponse({ description: 'Login success', type: AuthTokenResponseDto })
  @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
  @ApiBadRequestResponse({ description: 'Invalid payload' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { access_token, refresh_token } = await this.auth.login(dto.email, dto.password)
    res.cookie(this.cookieName, refresh_token, this.buildRtCookieOptions())
    return { access_token }
  }

  @ApiOperation({ summary: 'Refresh tokens via HttpOnly cookie' })
  @ApiOkResponse({ schema: { example: { access_token: '...' } } })
  @ApiUnauthorizedResponse({ description: 'Missing/invalid refresh token' })
  @Post('refresh')
  async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rt = req.cookies?.[this.cookieName]
    if (!rt) throw new UnauthorizedException('Refresh token missing')
    const { access_token, refresh_token } = await this.auth.refreshByToken(rt)
    res.cookie(this.cookieName, refresh_token, this.buildRtCookieOptions())
    return { access_token }
  }

  @ApiOperation({ summary: 'Logout (clear RT cookie & revoke session)' })
  @ApiOkResponse({ schema: { example: { success: true } } })
  @Post('logout')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const rt = req.cookies?.[this.cookieName]
    if (rt) {
      const sub = await this.auth.decodeRefreshSub(rt)
      if (sub) await this.auth.revoke(sub)
    }
    res.clearCookie(this.cookieName, { ...this.buildRtCookieOptions(), maxAge: 0 })
    return { success: true }
  }
}
