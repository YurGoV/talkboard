import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { JwtAuthService } from './jwt/jwt.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtAuthModule } from './jwt/jwt.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtAuthService, JwtStrategy, CloudinaryService],
  imports: [JwtAuthModule, TypeOrmModule.forFeature([User])],
  exports: [AuthService, JwtAuthService],
})
export class AuthModule {}
