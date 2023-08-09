import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseInterceptors } from '@nestjs/common';
import { Transaction } from 'sequelize';

import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/input/create-post.input';
import { UpdatePostInput } from './dto/input/update-post.input';
import { User } from 'src/common/decorator/user.decorator';
import { UserType } from '../auth/dto';
import { TransactionInter } from 'src/common/interceptor/transaction.interceptor';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { Pagination } from './entities/pagination.entity';

@UseInterceptors(TransactionInter)
@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation(() => Post, { name: 'newPost' })
  createPost(
    @Args('post') post: CreatePostInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.postService.create(post, user, trans);
  }

  @Public()
  @Query(() => [Pagination])
  async pagination(
    @Args('page') page: number,
    @TransactionDeco() trans: Transaction,
  ) {
    const data = await this.postService.pagination(page, trans);
    // console.log([data]);
    return [...data];
  }

  // @Query(() => Post, { name: 'allPost' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.postService.findOne(id);
  // }

  @Mutation(() => String)
  updatePost(
    @Args('updatePost') updatePostInput: UpdatePostInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.postService.update(updatePostInput, user, trans);
  }

  @Mutation(() => String)
  removePost(
    @Args('removePost') removePost: UpdatePostInput,
    @User() user: UserType,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.postService.remove(removePost, user, trans);
  }
}
