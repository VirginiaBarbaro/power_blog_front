export interface Token {
  user: null | string;
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

export interface User {
  token: string | null;
}
