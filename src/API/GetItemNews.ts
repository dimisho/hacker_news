import axios from 'axios';
import { ItemSchema } from 'schemes/ItemSchema';

const instance = axios.create({
  baseURL: 'https://api.hnpwa.com/v0/item',
});

export default async function GetItemNews(id) {
  return await instance.get<ItemSchema>(`/${id}.json`);
}
