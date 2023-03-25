import NewsModel from '@/db/models/news.model';
import { Context } from 'koa';

class NewsController {
  async getAll(ctx: Context) {
    const { page } = ctx.params;

    const news = await NewsModel.findAll({
      raw: true,
      offset: page * 10,
      limit: 10,
    });

    ctx.body = news;
  }

  async getOne(ctx: Context) {
    const { id } = ctx.params;

    const oneOfNews = await NewsModel.findOne({
      where: { id: id },
      include: { all: true, nested: true },
    });

    ctx.body = oneOfNews;
  }
}

export default new NewsController();
