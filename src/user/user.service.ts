import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { USER_SELECT_PUBLIC_FIELDS } from './constants/public.user.constant';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: USER_SELECT_PUBLIC_FIELDS,
    });
  }
  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async checkIfUserExists(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new HttpException('User is not exists', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
