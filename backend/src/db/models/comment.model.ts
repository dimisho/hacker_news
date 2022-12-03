import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import NewsModel from './news.model';

interface CommentAttributes {
  id: number;
  newsId?: number;
  commentId?: number;
  title: string;
  points?: number;
  user?: string;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain: string;
  level: number;
  comments_count: number;
}

interface CommentCreationAttributes extends Optional<CommentAttributes, 'id'> {}

@Table({ underscored: true, tableName: 'comments' })
export default class CommentModel extends Model<CommentAttributes, CommentCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

  @ForeignKey(() => NewsModel)
  @Column
  declare newsId?: number;

  @ForeignKey(() => CommentModel)
  @Column
  declare commentId?: number;

  @Column
  declare title: string;

  @Column
  declare points?: number;

  @Column
  declare user?: string;

  @Column
  declare time: number;

  @Column
  declare time_ago: string;

  @Column
  declare content: string;

  @Column
  declare deleted?: boolean;

  @Column
  declare dead?: boolean;

  @Column
  declare type: string;

  @Column
  declare url?: string;

  @Column
  declare domain: string;

  @Column
  declare level: number;

  @Column
  declare comments_count: number;

  @HasMany(() => CommentModel)
  declare comments: CommentModel[];

  @BelongsTo(() => NewsModel)
  declare parentNews: NewsModel;
}
