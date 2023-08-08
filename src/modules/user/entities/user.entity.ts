import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { nullable: false })
  id: number;

  @Field(() => String, { nullable: false })
  username: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => Date, { nullable: false })
  birthday: Date;
}
