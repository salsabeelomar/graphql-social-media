import { Field, ID, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommentPagination {

  @Field(() => ID)
  postId: number;

  @Field(() => Int)
  page: number;
}
