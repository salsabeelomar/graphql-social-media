import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Comment extends UserEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  comment: string;
}
