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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getDatabaseConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Comment]),
    UserModule,
    AuthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
