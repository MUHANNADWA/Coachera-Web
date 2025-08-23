import { Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import AccessDeniedPage from "../pages/AccessDeniedPage";

const OrganizationRoute = () => {
  const { user } = useAppHook();

  return user?.role === "ORGANIZATION" ? <Outlet /> : <AccessDeniedPage />;
};

export default OrganizationRoute;
