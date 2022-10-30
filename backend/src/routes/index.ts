import router from 'koa-router';
const NewsController = require('@/controllers/NewsController');

const rout = router();

rout.get('/newest/:page', NewsController.getAll);
rout.get('/item/:id', NewsController.getOne);

export default rout;
