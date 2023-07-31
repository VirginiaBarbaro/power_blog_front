export interface UserProps {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  bio: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthorInfo {
  authorInfo: UserProps;
}
