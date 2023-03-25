import { ItemSchema } from 'schemes/ItemSchema';
import Instance from './Instance';

export default async function GetItemNews(id) {
  return await Instance.get<ItemSchema>(`/item/${id}`);
}
