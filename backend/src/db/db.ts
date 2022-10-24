import configs from './db.config';
import { Sequelize } from 'sequelize-typescript';
import NewsModel from './models/news.model';
import CommentModel from './models/comment.model';
import { faker } from '@faker-js/faker';

const ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG = configs[ENV];

const sequelize = new Sequelize({ ...DB_CONFIG, logging: false });

export async function initModels() {
  await sequelize.authenticate();
  sequelize.addModels([`${__dirname}/**/*.model.*`]);
  await sequelize.sync({ force: true });
}

export async function initDB() {
  const numberOfNews = parseInt(faker.random.numeric(2));
  const commentsCount = Math.floor(Math.random() * 5 + 1);

  for (let i = 0; i < numberOfNews; i++) {
    const { id } = await NewsModel.create({
      title: faker.vehicle.vehicle(),
      points: faker.random.numeric(2),
      user: faker.internet.userName(),
      time: faker.random.numeric(9),
      time_ago: '3 min',
      content: faker.hacker.phrase(),
      type: 'newsType',
      url: faker.internet.url(),
      domain: faker.internet.domainName(),
      level: faker.random.numeric(1),
      comments_count: commentsCount,
    });

    for (let i = 0; i < commentsCount; i++) {
      const numberOfNestedComments = Math.floor(Math.random() * 2 + 1);

      const comment = await CommentModel.create({
        title: faker.vehicle.vehicle(),
        points: faker.random.numeric(2),
        user: faker.internet.userName(),
        time: faker.random.numeric(9),
        time_ago: '1 min',
        content: faker.hacker.phrase(),
        type: 'commentType',
        url: faker.internet.url(),
        domain: faker.internet.domainName(),
        level: faker.random.numeric(1),
        comments_count: numberOfNestedComments,
        newsId: id,
      });

      for (let i = 0; i < numberOfNestedComments; i++) {
        await CommentModel.create({
          title: faker.vehicle.vehicle(),
          points: faker.random.numeric(2),
          user: faker.internet.userName(),
          time: faker.random.numeric(9),
          time_ago: '1 min',
          content: faker.hacker.phrase(),
          type: 'commentType',
          url: faker.internet.url(),
          domain: faker.internet.domainName(),
          level: faker.random.numeric(1),
          comments_count: 0,
          commentId: comment.id,
        });
      }
    }
  }
  await CommentModel.create({
    title: faker.vehicle.vehicle(),
    points: faker.random.numeric(2),
    user: faker.internet.userName(),
    time: faker.random.numeric(9),
    time_ago: '1 min',
    content: faker.hacker.phrase(),
    type: 'commentType',
    url: faker.internet.url(),
    domain: faker.internet.domainName(),
    level: faker.random.numeric(1),
    comments_count: 0,
    newsId: 1,
  });
}

export default sequelize;
