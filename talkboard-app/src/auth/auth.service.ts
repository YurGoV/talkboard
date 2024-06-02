import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtAuthService } from './jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtAuthService: JwtAuthService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { email, password: passwordString } = dto;
    try {
      const isUserExist = await this.userRepository.findOneBy({ email });
      if (isUserExist) {
        throw new HttpException('email is already exist', HttpStatus.CONFLICT);
      }
      const salt = await genSalt(10);
      console.log({ salt });
      // const token = await this.createJWT(email);
      const token = await this.jwtAuthService.createJWT(email);

      const payload = {
        ...dto,
        password: await hash(passwordString, salt),
        token,
      };
      const user = await this.userRepository.save(payload);

      return user;
    } catch (error: any) {
      throw new HttpException(
        `${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  checkPassword = async (requestPassword: string, dbPassword: string) => {
    const checkResult = await compare(requestPassword, dbPassword);
    if (!checkResult) {
      throw new UnauthorizedException('authorization error');
    }
  };
}
