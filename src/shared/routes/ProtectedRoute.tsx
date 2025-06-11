import { Navigate, Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";

const ProtectedRoute = () => {
  const { token, location } = useAppHook();
  return token ? (
    <Outlet />
  ) : (
    <Navigate
      to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};
export default ProtectedRoute;
