import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from './app.module';
import { WinstonLogger } from './common/logger/winston.logger';
import { AuthGard } from './common/guard/auth.guard';
import { UserService } from './modules/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new WinstonLogger(),
  });
  const jwt = app.get<JwtService>(JwtService);
  const userService = app.get<UserService>(UserService);
  const reflector = app.get<Reflector>(Reflector);
  app.useGlobalGuards(new AuthGard(jwt, userService, reflector));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
