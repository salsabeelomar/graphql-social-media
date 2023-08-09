import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from 'src/modules/user/user.service';
import { CheckExisting } from '../utils/checkExisting';
import { WinstonLogger } from '../logger/winston.logger';

@Injectable()
export class AuthGard implements CanActivate {
  private readonly logger = new WinstonLogger();
  constructor(
    private readonly jwt: JwtService,
    @Inject(UserService) private readonly userService: UserService,
    private readonly reflect: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const checkPublic = this.reflect.get('isPublic', context.getHandler());
    if (checkPublic) return true;

    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;

    const token = request.headers.authorization?.split('Bearer ')[1];

    CheckExisting(token, UnauthorizedException, 'You must Login');

    try {
      const decoded = await this.jwt.verify(token);
      const user = await this.userService.findById(decoded.sub);
      this.logger.log(`User Auth id = ${user.id}`);
      request.user = user;
    } catch (error) {
      if (error instanceof TokenExpiredError)
        throw new UnauthorizedException('Token Expired');
      else if (error instanceof JsonWebTokenError)
        throw new UnauthorizedException('Token  Invalid signature');
    }
    return true;
  }
}
