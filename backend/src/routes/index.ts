import router from 'koa-router';
import NewsController from '@/controllers/NewsController';

const routes = router();

routes.get('/newest/:page', NewsController.getAll);
routes.get('/item/:id', NewsController.getOne);

export default routes;
