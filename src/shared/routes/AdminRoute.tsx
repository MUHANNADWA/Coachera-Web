import { Navigate, Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";

const AdminRoute = () => {
  const { user } = useAppHook();
  return user?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
