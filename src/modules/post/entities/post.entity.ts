import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@ObjectType()
export class Post extends UserEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
