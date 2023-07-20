import { UserProps } from "./user";
export interface ArticleProps {
  id: number;
  title: string;
  content: string;
  headline: string;
  image: string;
  userId: number | null;
  createdAt: string;
  user: UserProps;
}

export interface UpdateArticleProps {
  id: number;
  title?: string;
  content?: string;
  headline?: string;
  image?: string;
}
