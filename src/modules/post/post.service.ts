import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';

import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';

import { UserType } from '../auth/dto';
import { Post } from './model/post.model';
import { Providers, LIMIT } from 'src/common/constant';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { User } from '../user/model/user.model';
import { Comment } from '../comment/model/comment.model';
import { CheckExisting } from 'src/common/utils/checkExisting';

@Injectable()
export class PostService {
  private readonly logger = new WinstonLogger();

  constructor(
    @Inject(Providers.POST_PROVIDER) private readonly postRepo: typeof Post,
  ) {}
  async create(
    post: CreatePostInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const newPost = await this.postRepo.create(
      { ...post, userId: user.id, createdBy: user.id },
      { transaction },
    );
    this.logger.log(`Create New Post id =${newPost.id}`);

    return {
      content: newPost.content,
      createdAt: newPost.createdAt,
      ...user,
    };
  }

  async pagination(page: number, transaction: Transaction) {
    const offset = LIMIT * (page - 1);
    const posts = await this.postRepo.findAll({
      attributes: ['createdAt', 'content'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'email'],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'comment'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'username', 'email'],
            },
          ],
        },
      ],
      offset,
      limit: LIMIT,
      order: [['createdAt', 'DESC']],
      transaction,
    });
    this.logger.log(`Get Post All post In Page ${page}`);

    return [...posts];
  }

  async findPostById(id: number, transaction: Transaction) {
    const post = await this.postRepo.findByPk(id, {
      transaction,
    });
    this.logger.log(`Get Post By Id ${id}`);
    return post;
  }

  async update(
    updatePost: UpdatePostInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const checkPost = await this.checkPostOwner(updatePost.id, user.id);
    CheckExisting(checkPost, NotFoundException, 'Not The Owner of Post');

    const updatedUser = await this.postRepo.update(
      {
        content: updatePost.content,
        updatedBy: user.id,
        updatedAt: new Date(),
      },
      {
        where: {
          userId: user.id,
          id: updatePost.id,
        },
        transaction,
      },
    );
    CheckExisting(updatedUser[0], BadRequestException, 'Post not Updated');

    this.logger.log(`Post With id =${updatePost.id} updated Successfully`);

    return 'Post Updated Successfully';
  }

  async remove(
    post: UpdatePostInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const checkPost = await this.findPostById(post.id, transaction);

    CheckExisting(checkPost, UnauthorizedException, 'Post was Deleted already');
    const deletedPost = await this.postRepo.update(
      {
        deletedAt: new Date(),
        deletedBy: user.id,
      },
      {
        where: {
          id: post.id,
          userId: user.id,
        },
        transaction,
      },
    );
    CheckExisting(deletedPost[0], BadRequestException, 'Post not Deleted');

    this.logger.warn(`Delete Post with id =${post.id} `);

    return `Post Deleted Successfully `;
  }
  async checkPostOwner(postId: number, userId: number) {
    const post = await this.postRepo.findOne({
      attributes: ['content', 'userId'],
      where: {
        id: postId,
        userId: userId,
      },
    });
    this.logger.log(`Check the Post Owner`);
    return post;
  }
}
