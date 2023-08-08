import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Post } from 'src/modules/post/model/post.model';
import { User } from 'src/modules/user/model/user.model';

@Table({
  tableName: 'comments',
})
export class Comment extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;

  @Column({
    type: DataType.DATE,
  })
  deletedAt: Date;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  deleteBy: number;
}
