import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { Comment } from './entities/Comment.entity';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from './configs/database.config';
import { AuthModule } from './auth/auth.module';
import { JwtAuthModule } from './auth/jwt/jwt.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CommentModule } from './comment/comment.module';
import { CommentService } from './comment/comment.service';
import { CommentController } from './comment/comment.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),

    TypeOrmModule.forFeature([User, Comment]),
    UserModule,
    AuthModule,
    JwtAuthModule,
    CloudinaryModule,
    CommentModule,
  ],
  controllers: [UserController, CommentController],
  providers: [UserService, CommentService, JwtService],
})
export class AppModule {}
