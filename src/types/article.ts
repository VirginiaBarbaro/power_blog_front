import { UserProps } from "./user";
export interface ArticleProps {
  id: number;
  title: string;
  content: string;
  headline: string;
  image: string;
  userId: number | null;
  categoryId: number;
  createdAt: string;
  user: UserProps;
}

export interface NestedArticle {
  id: number;
  title: string;
  headline: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  articleId: number;
}

export interface Article {
  id: number;
  title: string;
  headline: string;
  content: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  articleId: number;
  article: NestedArticle;
}

export interface UpdateArticleProps {
  id: number;
  title?: string;
  content?: string;
  headline?: string;
  image?: string;
}

export interface FavouriteArticle {
  id: number;
  userId: number;
  articleId: number;
}
