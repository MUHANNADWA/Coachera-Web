import { Navigate, Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import { UserRole } from "../../features/auth/types";
import AccessDeniedPage from "../pages/AccessDeniedPage";

const StudentRoute = () => {
  const { user, location } = useAppHook();
  return user?.role === UserRole.STUDENT ? (
    <Outlet />
  ) : user ? (
    <AccessDeniedPage />
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};
export default StudentRoute;
