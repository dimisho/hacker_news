import { FeedItemSchema } from 'schemes/FeedItemSchema';
import Instance from './Instance';

export default async function GetListNews(page) {
  return await Instance.get<FeedItemSchema[]>(`/newest/${page - 1}`);
}
