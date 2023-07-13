import { UserProps } from "./user";
export interface ArticleProps {
  id: number;
  title: string;
  content: string;
  headline: string;
  image: string;
  adminId: number | null;
  userId: number | null;
  createdAt: string;
  user: UserProps;
}
