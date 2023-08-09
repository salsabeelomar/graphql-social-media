import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  comment: string;

  @Field(() => Int)
  postId: number;

  @Field(() => UserEntity)
  user: UserEntity;
}
