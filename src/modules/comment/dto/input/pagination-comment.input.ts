import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentPagination {

  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  page: number;
}
