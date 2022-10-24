import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement, BelongsTo, ForeignKey } from 'sequelize-typescript';
import NewsModel from './news.model';

@Table({ underscored: true, paranoid: true, tableName: 'comments' })
export default class CommentModel extends Model {
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
  declare comments: CommentModel;

  @BelongsTo(() => NewsModel)
  declare parentNews: NewsModel;
}
