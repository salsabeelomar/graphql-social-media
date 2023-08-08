import { Providers } from 'src/common/constant';
import { User } from 'src/modules/user/model/user.model';

export const authProvider = [
  { provide: Providers.AUTH_PROVIDER, useValue: User },
];
