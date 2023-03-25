import { faker } from '@faker-js/faker';
import moment from 'moment';

const fakeNews = () => {
  return {
    title: faker.vehicle.vehicle(),
    points: Number(faker.random.numeric(2)),
    user: faker.internet.userName(),
    time: moment(new Date()).subtract(faker.random.numeric(1), 'days').toDate(),
    content: faker.hacker.phrase(),
    type: 'newsType',
    url: faker.internet.url(),
    domain: faker.internet.domainName(),
    created_at: new Date(),
    updated_at: new Date(),
  };
};

const fakeComment = (id: number, parentType: string) => {
  if (parentType === 'news')
    return {
      title: faker.vehicle.vehicle(),
      points: Number(faker.random.numeric(2)),
      user: faker.internet.userName(),
      time: moment(new Date()).subtract(faker.random.numeric(2), 'hours').toDate(),
      content: faker.hacker.phrase(),
      type: 'commentType',
      url: faker.internet.url(),
      domain: faker.internet.domainName(),
      news_id: id,
      created_at: new Date(),
      updated_at: new Date(),
    };
  return {
    title: faker.vehicle.vehicle(),
    points: Number(faker.random.numeric(2)),
    user: faker.internet.userName(),
    time: moment(new Date()).subtract(faker.random.numeric(1), 'hours').toDate(),
    content: faker.hacker.phrase(),
    type: 'commentType',
    url: faker.internet.url(),
    domain: faker.internet.domainName(),
    comment_id: id,
    created_at: new Date(),
    updated_at: new Date(),
  };
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const numberOfNews = Number(faker.random.numeric(2));
    for (let i = 0; i < numberOfNews; i++) {
      const commentsCount = Math.floor(Math.random() * 5 + 1);
      const news = await queryInterface.bulkInsert('news', [fakeNews()], { returning: true });
      for (let i = 0; i < commentsCount; i++) {
        const numberOfNestedComments = Math.floor(Math.random() * 2 + 1);
        const comment = await queryInterface.bulkInsert('comments', [fakeComment(news[0].id, 'news')], {
          returning: true,
        });
        for (let i = 0; i < numberOfNestedComments; i++) {
          await queryInterface.bulkInsert('comments', [fakeComment(comment[0].id, 'comment')]);
        }
      }
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('news');
    await queryInterface.bulkDelete('roles');
  },
};
