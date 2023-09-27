import { Navigate, Outlet } from "react-router";
import { Token } from "../types/tokenResponse";
import { UserProtectedRoutesProps } from "../types/protectedRoutes";
import useLoggedUser from "../hooks/useLoggedUser";

function isAdmin(user: Token) {
  if (user && user.isAdmin) {
    if (user.isAdmin === true) {
      return true;
    }
  }
  return false;
}

function AdminProtectedRoutes({
  redirectTo = "/home",
  children,
}: UserProtectedRoutesProps) {
  const user: Token = useLoggedUser();

  if (!user.token) {
    return <Navigate to={redirectTo} />;
  }
  if (!isAdmin(user)) {
    return <Navigate to="/home" />;
  }

  return children ? children : <Outlet />;
}

export default AdminProtectedRoutes;
