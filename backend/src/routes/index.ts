import router from 'koa-router';
const NewsController = require('@/controllers/newsController');

const rout = router();

rout.get('/newest/:page', NewsController.getAll);
rout.get('/item/:id', NewsController.getOne);

export default rout;
