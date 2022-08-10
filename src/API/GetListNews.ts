import axios from 'axios';
import { FeedItemSchema } from '../Schemes/FeedItemSchema';

export default async function GetListNews() {
  const arr = new Array(4).fill(null);
  return await Promise.all(
    arr.map((i, page) => {
      return axios.get<FeedItemSchema[]>(`https://api.hnpwa.com/v0/newest/${page + 1}.json`);
    }),
  );
}
