import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { authProvider } from 'src/Modules/auth/auth.providers';

@Module({
  providers: [UserResolver, UserService, ...authProvider],
})
export class UserModule {}
