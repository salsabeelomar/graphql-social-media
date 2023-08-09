import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  username: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  token: string;

  @Field(() => Date)
  birthday: Date;
}
