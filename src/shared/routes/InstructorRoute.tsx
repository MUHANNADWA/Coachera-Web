import { Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import AccessDeniedPage from "../pages/AccessDeniedPage";

const InstructorRoute = () => {
  const { user } = useAppHook();

  return user?.role === "INSTRUCTOR" ? <Outlet /> : <AccessDeniedPage />;
};

export default InstructorRoute;
