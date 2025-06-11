import { Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import AccessDeniedPage from "../pages/AccessDeniedPage";

const AdminRoute = () => {
  const { user } = useAppHook();

  return user?.isAdmin ? <Outlet /> : <AccessDeniedPage />;
};

export default AdminRoute;
