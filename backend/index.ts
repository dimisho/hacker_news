import 'dotenv/config';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import json from 'koa-json';
import logger from 'koa-logger';
import routes from '@/routes/index';
import cors from '@koa/cors';

async function main() {
  const { initModels } = await import('@/db');
  const app = new Koa();
  const PORT = process.env.PORT;

  await initModels();

  app.use(json());
  app.use(logger());
  app.use(bodyParser());
  app.use(
    cors({
      origin: process.env.REACT_APP_URL,
    }),
  );

  app.use(routes.routes());

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
