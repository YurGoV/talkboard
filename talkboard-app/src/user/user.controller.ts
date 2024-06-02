import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/all')
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
