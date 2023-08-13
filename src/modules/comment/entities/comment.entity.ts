import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  comment: string;

  @Field(() => ID)
  postId: number;

  @Field(() => UserEntity)
  user: UserEntity;
}
