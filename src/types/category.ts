import { NestedArticle } from "./article";

export interface Category {
  id: number;
  name: string;
  articles?: NestedArticle[];
}
