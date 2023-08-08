import { InputType, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
} from 'class-validator';

@InputType()
export class LoginUserInput {
  @Field(() => String, { nullable: false })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
