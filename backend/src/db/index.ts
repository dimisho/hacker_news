import configs from './db.config';
import { Sequelize } from 'sequelize-typescript';
import NewsModel from './models/news.model';
import CommentModel from './models/comment.model';
import { faker } from '@faker-js/faker';
import moment from 'moment';

const ENV = process.env.NODE_ENV || 'development';
const DB_CONFIG = configs[ENV];

const sequelize = new Sequelize({ ...DB_CONFIG, logging: false });

export async function initModels() {
  await sequelize.authenticate();
  sequelize.addModels([`${__dirname}/**/*.model.*`]);
  await sequelize.sync({ force: true });
}

export async function initDB() {
  const numberOfNews = Number(faker.random.numeric(2));

  for (let i = 0; i < numberOfNews; i++) {
    const commentsCount = Math.floor(Math.random() * 5 + 1);

    const { id } = await NewsModel.create({
      title: faker.vehicle.vehicle(),
      points: Number(faker.random.numeric(2)),
      user: faker.internet.userName(),
      time: moment(new Date()).subtract(faker.random.numeric(1), 'days').toDate(),
      content: faker.hacker.phrase(),
      type: 'newsType',
      url: faker.internet.url(),
      domain: faker.internet.domainName(),
    });

    for (let i = 0; i < commentsCount; i++) {
      const numberOfNestedComments = Math.floor(Math.random() * 2 + 1);

      const comment = await CommentModel.create({
        title: faker.vehicle.vehicle(),
        points: Number(faker.random.numeric(2)),
        user: faker.internet.userName(),
        time: moment(new Date()).subtract(faker.random.numeric(2), 'hours').toDate(),
        content: faker.hacker.phrase(),
        type: 'commentType',
        url: faker.internet.url(),
        domain: faker.internet.domainName(),
        news_id: id,
      });

      for (let i = 0; i < numberOfNestedComments; i++) {
        await CommentModel.create({
          title: faker.vehicle.vehicle(),
          points: Number(faker.random.numeric(2)),
          user: faker.internet.userName(),
          time: moment(new Date()).subtract(faker.random.numeric(1), 'hours').toDate(),
          content: faker.hacker.phrase(),
          type: 'commentType',
          url: faker.internet.url(),
          domain: faker.internet.domainName(),
          comment_id: comment.id,
        });
      }
    }
  }
}

export default sequelize;
