import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { Token } from "../types/tokenResponse";
import { UserProtectedRoutesProps } from "../types/protectedRoutes";
import { RootState } from "../redux/store";

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
  const user: Token = useSelector((state: RootState) => state.token);

  if (!user.token) {
    return <Navigate to={redirectTo} />;
  }
  if (!isAdmin(user)) {
    return <Navigate to="/home" />;
  }

  return children ? children : <Outlet />;
}

export default AdminProtectedRoutes;
