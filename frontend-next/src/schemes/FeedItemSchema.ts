export interface FeedItemSchema {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  type: string;
  url?: string;
  domain?: string;
}
