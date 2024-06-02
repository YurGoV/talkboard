import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { JwtAuthService } from './jwt/jwt.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { filterPrivateUserData } from 'src/user/utils/filter.user-data';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtAuthService: JwtAuthService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async createUser({ dto, avatar }) {
    const { email, password: passwordString } = dto;
    try {
      const isUserExist = await this.userRepository.findOneBy({ email });
      if (isUserExist) {
        throw new HttpException('email is already exist', HttpStatus.CONFLICT);
      }

      const uploadImage = async () => {
        if (avatar) {
          const uploadResult = await this.cloudinaryService.uploadFile(avatar);
          const imageData = {
            public_id: uploadResult.public_id,
            secure_url: uploadResult.secure_url,
          };

          return imageData;
        }
        return null;
      };

      const customPhoto = await uploadImage();

      if (customPhoto) {
        dto.avatarUrl = customPhoto.secure_url;
        dto.avatarId = customPhoto.public_id;
      }

      const salt = await genSalt(10);

      const token = await this.jwtAuthService.createJWT(email);

      const payload = {
        ...dto,
        password: await hash(passwordString, salt),
        token,
      };
      const savedUser = await this.userRepository.save(payload);

      return filterPrivateUserData(savedUser);
    } catch (error: any) {
      throw new HttpException(
        `${error.message}`,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async loginUser(email: string, password: string) {
    const dbUser = await this.userRepository.findOneBy({ email });

    if (!dbUser) {
      throw new UnauthorizedException('there no such user');
    }

    await this.checkPassword(password, dbUser.password);

    const token = await this.jwtAuthService.createJWT(email);
    const { id } = dbUser;

    const updateToken = await this.userRepository.update({ id }, { token });
    if (updateToken.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (updateToken.affected && updateToken.affected > 0) {
      const filteredData = filterPrivateUserData(dbUser);
      return { ...filteredData, token };
    }

    throw new HttpException('Login error', HttpStatus.UNAUTHORIZED);
  }

  async logoutUser(id: number) {
    const deleteToken = await this.userRepository.update({ id }, { token: '' });
    if (deleteToken.affected === 0) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  checkPassword = async (requestPassword: string, dbPassword: string) => {
    const checkResult = await compare(requestPassword, dbPassword);
    if (!checkResult) {
      throw new UnauthorizedException('authorization error');
    }
  };
}
