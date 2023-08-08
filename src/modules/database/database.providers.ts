import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { DATABASE_CONSTANT } from 'src/common/constant';

import { Comment } from 'src/modules/comment/model/comment.model';
import { Post } from 'src/modules/post/model/post.model';
import { User } from 'src/modules/user/model/user.model';

export const databaseProvider = [
  {
    provide: DATABASE_CONSTANT.DATABASE_PROVIDE,
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get('database'),
        define: {
          underscored: true,
          paranoid: true,
        },
      });
      sequelize.addModels([User, Post, Comment]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
