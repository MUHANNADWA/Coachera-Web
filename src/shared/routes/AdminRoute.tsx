import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from '../hooks/hooks';

const AdminRoute = () => {
  const { user } = useAppSelector((state) => state.auth);
  return user && user.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;
