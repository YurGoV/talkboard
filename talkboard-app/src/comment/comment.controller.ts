import {
  Controller,
  HttpCode,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Body,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService, CommentWithChildren } from './comment.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  createAdditionalCommentSchema,
  createCommentSchema,
} from './decorators/swagger-schemas/create-comment.schema';
import { CreateMainCommentDto } from './dto/create.main-comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CreateAdditionalCommentDto } from './dto/create.additional-comment.dto';
import { Comment } from 'src/entities/Comment.entity';

@Controller('comments')
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpCode(201)
  @Post('add-main')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: createCommentSchema })
  @UseInterceptors(FileInterceptor('picture'))
  async createMain(
    @Body() dto: CreateMainCommentDto,
    @Req() request: any,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<any> {
    const { id: userId } = request.user;
    const createdComment = await this.commentService.addMainComment({
      userId,
      dto,
      picture,
    });

    return createdComment;
  }

  @Get('mains')
  async findMains(): Promise<Comment[]> {
    return await this.commentService.findMains();
  }

  @Get('all')
  async findAll(): Promise<CommentWithChildren[]> {
    return await this.commentService.getAll();
  }

  @Post('add-additional')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({ schema: createAdditionalCommentSchema })
  @UseInterceptors(FileInterceptor('picture'))
  async createAdditional(
    @Body() dto: CreateAdditionalCommentDto,
    @Req() request: any,
    @UploadedFile() picture: Express.Multer.File,
  ): Promise<any> {
    const { id: userId } = request.user;
    const createdComment = await this.commentService.addAdditionalComment({
      userId,
      dto,
      picture,
    });

    return createdComment;
  }
}
