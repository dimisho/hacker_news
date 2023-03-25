import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import NewsModel from './news.model';

interface CommentAttributes {
  id: number;
  news_id?: number;
  comment_id?: number;
  title: string;
  points?: number;
  user?: string;
  time: Date;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain: string;
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
  declare news_id?: number;

  @ForeignKey(() => CommentModel)
  @Column
  declare comment_id?: number;

  @Column
  declare title: string;

  @Column
  declare points?: number;

  @Column
  declare user?: string;

  @Column
  declare time: Date;

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

  @HasMany(() => CommentModel)
  declare comments: CommentModel[];

  @BelongsTo(() => NewsModel)
  declare news: NewsModel;
}
