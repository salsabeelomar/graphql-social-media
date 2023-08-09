import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Transaction } from 'sequelize';
import { UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { CreateUserInput, LoginUserInput } from './dto';
import { Public } from 'src/common/decorator/public.decorator';
import { TransactionDeco } from 'src/common/decorator/transaction.decorator';
import { TransactionInter } from 'src/common/interceptor/transaction.interceptor';

@Resolver(() => UserEntity)
@UseInterceptors(TransactionInter)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserEntity, { name: 'signUp' })
  @Public()
  signUp(
    @Args('user') createUserInput: CreateUserInput,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.authService.signUp(createUserInput, trans);
  }
  @Public()
  @Mutation(() => UserEntity, { name: 'signIn' })
  signIn(
    @Args('user') createUserInput: LoginUserInput,
    @TransactionDeco() trans: Transaction,
  ) {
    return this.authService.signIn(createUserInput, trans);
  }
}
