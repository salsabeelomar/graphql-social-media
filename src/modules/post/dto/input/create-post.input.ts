import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field(() => String)
  @IsString()
  @MaxLength(255, {
    message: 'content is too long',
  })
  @IsNotEmpty({
    message: 'content is null ',
  })
  content: string;
}
