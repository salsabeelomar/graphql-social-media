import { InputType, Field, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsEmail,
  MinLength,
  IsDate,
  IsNumber,
} from 'class-validator';
import { DateScalar } from 'src/modules/graphql/scalar/date.scalar';

@InputType()
export class CreateUserInput {
  @Field(() => String, { nullable: false })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  username: string;

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

  @Field(() => Int, { nullable: false, description: 'Phone Number' })
  @IsNumber()
  @IsNotEmpty()
  phoneNumber: number;

  @Field(() => String, { nullable: false })
  @IsDate()
  @IsNotEmpty()
  @Transform((value) => new Date(value.value as string))
  birthday: DateScalar;
}
