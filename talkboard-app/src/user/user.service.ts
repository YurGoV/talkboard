import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
//
//
// import { Injectable } from '@nestjs/common';
//
// @Injectable()
// export class UserService {}
