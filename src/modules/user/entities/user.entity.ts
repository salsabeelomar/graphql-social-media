import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class UserEntity {
  @Field(() => ID)
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
