import NewsModel from '@/db/models/news.model';

class NewsController {
  async getAll(ctx) {
    const { page } = ctx.params;

    const news = await NewsModel.findAll({
      raw: true,
      offset: page * 10,
      limit: 10,
    });

    ctx.body = news;
  }

  async getOne(ctx) {
    const { id } = ctx.params;

    const oneOfNews = await NewsModel.findOne({
      where: { id: id },
      include: { all: true, nested: true },
    });

    ctx.body = oneOfNews;
  }
}

module.exports = new NewsController();
