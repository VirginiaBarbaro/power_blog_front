import { NestedArticle } from "./article";

export interface Category {
  id: number;
  name: string;
  articles?: NestedArticle[];
}

export interface CategoryProps {
  id: number;
  name: string;
}
