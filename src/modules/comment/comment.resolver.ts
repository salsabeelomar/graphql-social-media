import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { CommentService } from './comment.service';
import { Comment } from './entities/comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { TransactionInter } from 'src/common/interceptor/transaction.interceptor';
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

  @Query(() => [Comment], { name: 'comment' })
  findAll() {
    return this.commentService.findAll();
  }

  @Mutation(() => Comment)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentService.remove(id);
  }
}
