export interface ItemSchema {
  id: number;
  comment_id: number;
  news_id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: ItemSchema[];
}
