import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";

export function useAppHook() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user?.user);
  const token = useAppSelector((state) => state.auth.user?.accessToken);
  const courseSidebarCollapsed = useAppSelector(
    (state) => state.courseSidebar.collapsed
  );

  return {
    dispatch,
    navigate,
    location,
    user,
    token,
    courseSidebarCollapsed,
  };
}
