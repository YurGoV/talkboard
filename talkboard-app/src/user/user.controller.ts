import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
// import { User } from 'src/entities/User.entity';
import { User } from '../entities/User.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
