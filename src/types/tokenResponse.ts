export interface Token {
  token: string | null;
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  isAdmin: boolean;
  avatar: string;
  bio: string;
}
