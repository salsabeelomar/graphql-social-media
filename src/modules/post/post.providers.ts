import { Providers } from 'src/common/constant';
import { Post } from './model/post.model';

export const postProvider = [
  { provide: Providers.POST_PROVIDER, useValue: Post },
];
