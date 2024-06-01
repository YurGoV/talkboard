import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async updateToken(email: string, token: string) {
    const updateResult = await this.userRepository.update({ email }, { token });
    if (updateResult.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.userRepository.findOneBy({ email });
    if (!updatedUser) {
      throw new HttpException(
        'User not found after update',
        HttpStatus.NOT_FOUND,
      );
    }

    return updatedUser;
  }

  async deleteToken(email: string) {
    const updateResult = await this.userRepository.update(
      { email },
      { token: '' },
    );

    if (updateResult.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
