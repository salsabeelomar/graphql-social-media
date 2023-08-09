import { Comment } from 'src/modules/comment/entities/comment.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Post } from './post.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Pagination extends Post {
  @Field((type) => [Comment])
  comments?: [Comment];

  @Field(() => UserEntity)
  user: UserEntity;
}
