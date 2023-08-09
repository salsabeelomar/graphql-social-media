import { Injectable, Inject } from '@nestjs/common';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { WinstonLogger } from 'src/common/logger/winston.logger';
import { Providers } from 'src/common/constant';
import { Comment } from './model/comment.model';

import { Transaction } from 'sequelize';
import { UserType } from '../auth/dto';

@Injectable()
export class CommentService {
  private readonly logger = new WinstonLogger();
  constructor(
    @Inject(Providers.COMMENT_PROVIDER)
    private readonly commentRepo: typeof Comment,
  ) {}

  async create(
    comment: CreateCommentInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const newComment = await this.commentRepo.create({
      userId: user.id,
      ...comment,
      transaction,
    });

    return {
      comment: newComment.comment,
      id: newComment.id,
      userId:user.id,
      username:user.username
    };
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
