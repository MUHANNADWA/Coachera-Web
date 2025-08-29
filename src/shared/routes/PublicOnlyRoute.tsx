// src/shared/routes/PublicOnlyRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import { UserRole } from "../../features/auth/types";

export default function PublicOnlyRoute() {
  const { location, user } = useAppHook();

  if (user?.role === UserRole.INSTRUCTOR) {
    return <Navigate to="/inst-dashboard" replace state={{ from: location }} />;
  }

  if (user?.role === UserRole.ORGANIZATION) {
    return <Navigate to="/org-dashboard" replace state={{ from: location }} />;
  }

  // Public content for guests, students, admins (if you want to allow them)
  return <Outlet />;
}
