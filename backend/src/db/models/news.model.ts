import { Table, Column, Model, HasMany, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import CommentModel from './comment.model';

interface NewsAttributes {
  id: number;
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

interface NewsCreationAttributes extends Optional<NewsAttributes, 'id'> {}

@Table({ underscored: true, tableName: 'news' })
export default class NewsModel extends Model<NewsAttributes, NewsCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column
  declare id: number;

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
}
