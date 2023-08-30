import { redirect } from "react-router-dom";

export interface UserProtectedRoutesProps {
  redirectTo?: string;
  children?: React.ReactNode;
}
