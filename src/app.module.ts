import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'config';

import { PostModule } from './modules/post/post.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CommentModule } from './modules/comment/comment.module';
import { DatabaseModule } from './modules/database/database.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [
    GraphqlModule,
    ConfigModule.forRoot({
      load: [config[0]],
      isGlobal: true,
    }),
    PostModule,
    UserModule,
    AuthModule,
    CommentModule,
    DatabaseModule,
    GraphqlModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
