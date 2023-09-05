import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../types/tokenResponse";
import { UserProtectedRoutesProps } from "../types/protectedRoutes";

function ProtectedRoutes({
  redirectTo = "/login",
  children,
}: UserProtectedRoutesProps) {
  const loggedUser: User = useSelector((state: RootState) => state.token);

  if (!loggedUser.token) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoutes;
