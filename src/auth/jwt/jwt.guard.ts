import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new HttpException('no token', HttpStatus.BAD_REQUEST);
    }

    let decodedToken: any | null = null;
    try {
      decodedToken = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });
    } catch (error: any) {
      if (error?.message === 'jwt expired') {
        throw new HttpException('jwt expired', HttpStatus.NOT_ACCEPTABLE);
      }
      return false; // Invalid token or error in token verification
    }

    if (!decodedToken) {
      throw new HttpException('verification failed', HttpStatus.BAD_REQUEST);
    }

    const user = decodedToken;
    const { email } = user;
    if (!email) {
      throw new HttpException(
        'there no valid payload in jwt',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userFromDb = await this.userRepository.findOneBy({ email });

    if (!userFromDb) {
      throw new HttpException('there no such user', HttpStatus.NOT_FOUND);
    }
    if (!userFromDb?.token) {
      throw new HttpException('please log in', HttpStatus.UNAUTHORIZED);
    }

    request.user = userFromDb;

    return true; // Token is valid and not expired
  }
}
