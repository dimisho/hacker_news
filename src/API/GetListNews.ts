import { FeedItemSchema } from 'schemes/FeedItemSchema';
import Instance from './Instance';

export default async function GetListNews() {
  const arr = new Array(4).fill(null);
  return await Promise.all(
    arr.map((i, page) => {
      return Instance.get<FeedItemSchema[]>(`/newest/${page + 1}.json`);
    }),
  );
}
