export interface ArticleProps {
  id: number;
  title: string;
  content: string;
  image: string;
  adminId: number | null;
  userId: number | null;
  user?: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  };
  admin?: {
    id: number;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
  };
}
