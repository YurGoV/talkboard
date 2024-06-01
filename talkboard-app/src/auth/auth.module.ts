import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from './jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule, TypeOrmModule.forFeature([User])],
})
export class AuthModule {}
