import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';

import {
  CreateCommentInput,
  UpdateCommentInput,
  CommentPagination,
} from './dto/input/index.input';

import { WinstonLogger } from 'src/common/logger/winston.logger';
import { LIMIT, Providers } from 'src/common/constant';
import { Comment } from './model/comment.model';

import { Transaction } from 'sequelize';
import { UserType } from '../auth/dto';
import { CheckExisting } from 'src/common/utils/checkExisting';
import { PostService } from '../post/post.service';
import { User } from '../user/model/user.model';

@Injectable()
export class CommentService {
  private readonly logger = new WinstonLogger();
  constructor(
    @Inject(Providers.COMMENT_PROVIDER)
    private readonly commentRepo: typeof Comment,
    private readonly postService: PostService,
  ) {}

  async create(
    comment: CreateCommentInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const checkPost = await this.postService.findPostById(
      comment.postId,
      transaction,
    );
    CheckExisting(
      checkPost,
      NotFoundException,
      'Cant add Comment for Not Found Post',
    );
    const newComment = await this.commentRepo.create({
      userId: user.id,
      ...comment,
      transaction,
    });
    this.logger.log(`Create Comment for Post${comment.postId}`);
    return {
      comment: newComment.comment,
      id: newComment.id,
      userId: user.id,
      username: user.username,
    };
  }

  async pagination(pageInfo: CommentPagination, transaction: Transaction) {
    const offset = (pageInfo.page - 1) * LIMIT;
    const getComments = await this.commentRepo.findAll({
      attributes: ['comment', 'createdAt', 'updatedAt', 'id'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'id'],
        },
      ],
      offset,
      limit: LIMIT,
      transaction,
      where: {
        postId: pageInfo.postId,
      },
    });
    console.log(getComments);
    return getComments;
  }

  async update(
    commentInfo: UpdateCommentInput,
    user: UserType,
    transaction: Transaction,
  ) {
    const checkComment = await this.checkCommentOwner(
      commentInfo.id,
      user.id,
      transaction,
    );
    CheckExisting(
      checkComment,
      UnauthorizedException,
      'Not The Owner of Comment',
    );
    const updatedComment = await this.commentRepo.update(
      {
        updateBy: user.id,
        comment: commentInfo.comment,
      },
      {
        where: {
          userId: user.id,
          id: commentInfo.id,
        },
        transaction,
      },
    );

    CheckExisting(
      updatedComment[0],
      BadRequestException,
      'Comment Failed to Updated',
    );
    this.logger.log(`Comment with id ${commentInfo.id} Update Successfully`);
    return `Comment Updated Successfully`;
  }

  async remove(commentId: number, user: UserType, transaction: Transaction) {
    const checkComment = await this.findCommentById(commentId, transaction);
    CheckExisting(checkComment, NotFoundException, 'Comment not Found');
    const deletedComment = await this.commentRepo.update(
      {
        deletedAt: new Date(),
        deletedBy: user.id,
      },
      {
        where: {
          id: commentId,
        },
        transaction,
      },
    );
    CheckExisting(
      deletedComment[0],
      BadRequestException,
      'Comment Not deleted ',
    );
    return `Comment is Deleted SuccessFully`;
  }

  async findCommentById(commentId: number, transaction: Transaction) {
    const comment = await this.commentRepo.findByPk(commentId, {
      transaction,
    });
    this.logger.log(`Get Comment By Id ${commentId}`);
    return comment;
  }

  async checkCommentOwner(
    commentId: number,
    userId: number,
    transaction: Transaction,
  ) {
    const comment = await this.commentRepo.findOne({
      where: {
        userId,
        id: commentId,
      },
      transaction,
    });
    this.logger.log(`Get Comment By Id ${commentId}`);
    return comment;
  }
}
