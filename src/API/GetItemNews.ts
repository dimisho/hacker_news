import axios from 'axios';
import { ItemSchema } from '../Schemes/ItemSchema';

const instance = axios.create({
  baseURL: 'https://api.hnpwa.com/v0/item',
});

export default async function GetListNews(id) {
  return await instance.get<ItemSchema>(`/${id}.json`);
}
