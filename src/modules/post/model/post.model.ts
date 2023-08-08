import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
  } from 'sequelize-typescript';
import { Comment } from 'src/modules/comment/model/comment.model';
import { User } from 'src/modules/user/model/user.model';
 
  
  @Table({
    tableName: 'posts',
  })
  export class Post extends Model {
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
  
    @Column({
      type: DataType.STRING(250),
      allowNull: false,
    })
    content: string;
  
    @HasMany(() => Comment)
    comments: Comment[];
  
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
  