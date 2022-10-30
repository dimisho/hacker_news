import dotenv from 'dotenv';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import cors from '@koa/cors';
import { faker } from '@faker-js/faker';
import NewsModel from '@/db/models/news.model';
import CommentModel from '@/db/models/comment.model';
import rout from '@/routes/index';

dotenv.config({ path: require('find-config')('.env') });

async function main() {
  const { initModels } = await import('@/db/db');
  const { initDB } = await import('@/db/db');
  const app = new Koa();
  const PORT = process.env.PORT;

  await initModels();
  await initDB();

  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(cors());

  app.use(rout.routes());

  app.listen(PORT);
  console.info(`Server started: http://localhost:${PORT}`);

  await new Promise((resolve) => process.on('SIGINT', resolve));
  return 0;
}

main()
  .then((code) => {
    process.exit(code);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });