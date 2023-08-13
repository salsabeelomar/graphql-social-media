import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field(() => ID)
  postId: number;

  @Field(() => String)
  comment: string;
}
