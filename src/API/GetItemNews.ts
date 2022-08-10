import axios from 'axios';
import { ItemSchema } from '../Schemes/ItemSchema';

export default async function GetListNews(id) {
  return await axios.get<ItemSchema>(`https://api.hnpwa.com/v0/item/${id}.json`);
}
