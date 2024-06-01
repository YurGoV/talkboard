import { Controller, Get, HttpCode, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  @HttpCode(200)
  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async current(@Req() request: any) {
    const { user } = request;

    return user;
  }
}
