export interface UserProps {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

export interface UserLogin {
  email: string;
  password: string;
}
