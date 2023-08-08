import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { authProvider } from './auth.providers';
import { DatabaseModule } from 'src/modules/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get('JwtSecret'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  providers: [AuthResolver, AuthService, ...authProvider, UserService],
})
export class AuthModule {}
