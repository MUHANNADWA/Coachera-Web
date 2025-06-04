import { Navigate, Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";

const ProtectedRoute = () => {
  const { token } = useAppHook();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};
export default ProtectedRoute;
