import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Comment } from 'src/entities/Comment.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

export interface CommentWithChildren {
  parent: Comment;
  children: Comment[];
}

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async addMainComment({ userId, dto, picture }) {
    // TODO: DRY
    const uploadImage = async () => {
      if (picture) {
        const uploadResult = await this.cloudinaryService.uploadFile(picture);
        const imageData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };

        return imageData;
      }
      return null;
    };

    const photo = await uploadImage();

    if (photo) {
      dto.imageUrl = photo.secure_url;
      dto.imageId = photo.public_id;
    }
    dto.user_id = userId;

    let comment: Comment;
    try {
      comment = await this.commentRepository.save(dto);
    } catch (error) {
      if (error.message.includes('violates foreign key constraint')) {
        throw new HttpException(
          'foreign key not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to save comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return comment;
  }

  async addAdditionalComment({ userId, dto, picture }) {
    const uploadImage = async () => {
      if (picture) {
        const uploadResult = await this.cloudinaryService.uploadFile(picture);
        const imageData = {
          public_id: uploadResult.public_id,
          secure_url: uploadResult.secure_url,
        };

        return imageData;
      }
      return null;
    };

    const photo = await uploadImage();

    if (photo) {
      dto.imageUrl = photo.secure_url;
      dto.imageId = photo.public_id;
    }

    dto.user_id = userId;

    let comment: Comment;
    try {
      comment = await this.commentRepository.save(dto);
    } catch (error) {
      if (error.message.includes('violates foreign key constraint')) {
        throw new HttpException(
          'foreign key not exist',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Failed to save comment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return comment;
  }

  async findMains(): Promise<Comment[]> {
    return await this.commentRepository.find({
      where: { parrentComment: null },
      order: { createdAt: 'DESC' },
    });
  }

  async getAll(): Promise<CommentWithChildren[]> {
    const mainComments = await this.commentRepository.find({
      where: { parrent_comment_id: null },
      relations: ['user'],
      select: [
        'id',
        'content',
        'imageUrl',
        'imageId',
        'createdAt',
        'user_id',
        'parrent_comment_id',
        'user',
      ],
      order: { createdAt: 'DESC' },
    });
    mainComments.forEach((comment) => {
      delete comment.user.token;
      delete comment.user.password;
      delete comment.user.avatarId;
    });

    const getChildren = async (comment: Comment): Promise<Comment[]> => {
      const children = await this.commentRepository.find({
        where: { parrent_comment_id: comment.id },
        relations: ['user'],
        select: [
          'id',
          'content',
          'imageUrl',
          'imageId',
          'createdAt',
          'user_id',
          'parrent_comment_id',
          'user',
        ],

        order: { createdAt: 'DESC' },
      });

      children.forEach((comment) => {
        delete comment.user.token;
        delete comment.user.password;
        delete comment.user.avatarId;
      });

      return children;
    };

    const getCommentsWithChildren = async (): Promise<
      CommentWithChildren[]
    > => {
      const commentsWithChildren = await Promise.all(
        mainComments.map(async (mainComment) => {
          const children = await getChildren(mainComment);
          return { parent: mainComment, children };
        }),
      );
      return commentsWithChildren;
    };

    const commentsWithChildren = await getCommentsWithChildren();

    return commentsWithChildren;
  }
}
