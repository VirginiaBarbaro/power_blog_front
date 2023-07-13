import { UserProps } from "./user";

export interface CommentProps {
  id: number;
  content: string;
  userId: number;
  articleId: number;
  user: UserProps;
  createdAt: string;
}
