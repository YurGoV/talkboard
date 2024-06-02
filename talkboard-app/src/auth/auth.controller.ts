import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { ApiRegisterUserDocs } from './decorators/register-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { createUserSchema } from './decorators/swagger-objects/create-user.schema';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: createUserSchema })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiRegisterUserDocs()
  async create(@Body() dto: CreateUserDto) {
    const createdUser = await this.authService.createUser(dto);

    return createdUser;
  }

  @HttpCode(200)
  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async current(@Req() request: any) {
    const { user } = request;

    return user;
  }
}
