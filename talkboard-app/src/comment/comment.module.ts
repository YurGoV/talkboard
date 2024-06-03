import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/entities/Comment.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/entities/User.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    JwtModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, UserService, CloudinaryService, JwtAuthGuard],
})
export class CommentModule {}
