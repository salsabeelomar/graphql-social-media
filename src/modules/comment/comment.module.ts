import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { DatabaseModule } from '../database/database.module';
import { commentProvider } from './comment.providers';
import { PostService } from '../post/post.service';
import { postProvider } from '../post/post.providers';

@Module({
  imports: [DatabaseModule],
  providers: [
    CommentResolver,
    CommentService,
    PostService,
    ...commentProvider,
    ...postProvider,
  ],
})
export class CommentModule {}
