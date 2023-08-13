import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { Transaction } from 'sequelize';
import {
  CreateCommentInput,
  UpdateCommentInput,
  CommentPagination,
} from './dto/input/index.input';
import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';

import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { TransactionInter } from 'src/common/interceptor/Transaction.interceptor';
import { UserType } from '../auth/dto';
import { User } from 'src/common/decorator/user.decorator';

@UseInterceptors(TransactionInter)
@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  createComment(
    @Args('commentInfo') createCommentInput: CreateCommentInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.commentService.create(createCommentInput, user, trans);
  }

  @Query(() => [Comment])
  findComments(
    @Args('pagination') pageInfo: CommentPagination,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.commentService.pagination(pageInfo, trans);
  }

  @Mutation(() => String)
  updateComment(
    @Args('updateComment') updateCommentInput: UpdateCommentInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.commentService.update(updateCommentInput, user, trans);
  }

  @Mutation(() => String)
  removeComment(
    @Args('comment') commentId: UpdateCommentInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.commentService.remove(commentId.id, user, trans);
  }
}
