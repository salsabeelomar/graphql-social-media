import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { DatabaseModule } from '../database/database.module';
import { commentProvider } from './comment.providers';

@Module({
  imports: [DatabaseModule],
  providers: [CommentResolver, ...commentProvider, CommentService],
})
export class CommentModule {}
