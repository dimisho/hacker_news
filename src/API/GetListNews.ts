import axios from 'axios';
import { FeedItemSchema } from 'schemes/FeedItemSchema';

const instance = axios.create({
  baseURL: 'https://api.hnpwa.com/v0/newest',
});

export default async function GetListNews() {
  const arr = new Array(4).fill(null);
  return await Promise.all(
    arr.map((i, page) => {
      return instance.get<FeedItemSchema[]>(`/${page + 1}.json`);
    }),
  );
}
