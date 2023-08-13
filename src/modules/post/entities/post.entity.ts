import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Comment } from 'src/modules/comment/entities/comment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => [Comment])
  comments?: [Comment];

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
