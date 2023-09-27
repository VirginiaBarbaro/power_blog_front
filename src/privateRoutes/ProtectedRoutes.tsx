import { Navigate, Outlet } from "react-router";
import { User } from "../types/tokenResponse";
import { UserProtectedRoutesProps } from "../types/protectedRoutes";
import useLoggedUser from "../hooks/useLoggedUser";

function ProtectedRoutes({
  redirectTo = "/login",
  children,
}: UserProtectedRoutesProps) {
  const loggedUser: User = useLoggedUser();

  if (!loggedUser.token) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoutes;
