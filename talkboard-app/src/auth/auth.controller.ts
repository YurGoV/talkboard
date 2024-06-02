import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { ApiRegisterUserDocs } from './decorators/register-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { LoginDto } from './dto/login.dto';
import { createUserSchema } from './decorators/swagger-schemas/create-user.schema';
import { ApiLoginDocs } from './decorators/login.decorator';
import { ApiLogoutDocs } from './decorators/logout.decorator';
import { ApiCurrentDocs } from './decorators/current.decorator';
import { filterPrivateUserData } from 'src/user/utils/filter.user-data';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: createUserSchema })
  @UseInterceptors(FileInterceptor('avatar'))
  @ApiRegisterUserDocs()
  async create(
    @Body() dto: CreateUserDto,
    @UploadedFile() avatar: Express.Multer.File,
  ) {
    const createdUser = await this.authService.createUser({ dto, avatar });

    return createdUser;
  }

  @HttpCode(200)
  @Get('current')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiCurrentDocs()
  async current(@Req() request: any) {
    const { user } = request;

    return filterPrivateUserData(user);
  }

  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiLoginDocs()
  async login(@Body() { email, password }: LoginDto) {
    const user = await this.authService.loginUser(email, password);

    return user;
  }

  @HttpCode(204)
  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiLogoutDocs()
  async logout(@Req() request: any) {
    const { id } = request.user;
    await this.authService.logoutUser(id);
  }
}
