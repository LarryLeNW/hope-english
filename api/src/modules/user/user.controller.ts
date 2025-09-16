import { BadRequestException, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UserService } from 'modules/user/user.service';
import { JwtAuthGuard } from 'shared/jwt-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @ApiOperation({ summary: 'Get current user information' })
    @ApiOkResponse({ description: 'User information retrieved successfully' })
    @ApiUnauthorizedResponse({ description: 'Unauthorized' })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    async getMe(@Req() req) {
        const authorId = String(req.user?.sub);
        if (!authorId) throw new BadRequestException('Missing author');
        return this.userService.getUserInfo(authorId);
    }
}
