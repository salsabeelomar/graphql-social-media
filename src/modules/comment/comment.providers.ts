import { Providers } from 'src/common/constant';
import { Comment } from './model/comment.model';

export const commentProvider = [
  {
    provide: Providers.COMMENT_PROVIDER,
    useValue: Comment,
  },
];
