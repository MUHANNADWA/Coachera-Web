import { Navigate } from "react-router-dom";
import { useAppHook } from "../hooks/useAppHook";
import { UserRole } from "../../features/auth/types";

export default function RoleRedirect() {
  const { location, user } = useAppHook();

  if (!user) {
    return <Navigate to="/home" replace state={{ from: location }} />;
  }

  // Role-based landing
  switch (user.role) {
    case UserRole.INSTRUCTOR:
      return <Navigate to="/inst-dashboard" replace />;
    case UserRole.ORGANIZATION:
      return <Navigate to="/org-dashboard" replace />;
    case UserRole.STUDENT:
      return <Navigate to="/student-home" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}
