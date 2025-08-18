import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { Course } from "../types/types";

export function useAppHook() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useAppSelector((state) => state.auth.user?.user);
  const token = useAppSelector((state) => state.auth.user?.accessToken);
  const theme = useAppSelector((state) => state.theme.mode);

  const courseSidebarCollapsed = useAppSelector(
    (state) => state.courseSidebar.collapsed
  );
  const wishlistCourses: Course[] = useAppSelector(
    (state) => state.wishlist.wishlistCourses
  );
  const enrolledCourses: Course[] = useAppSelector(
    (state) => state.enrolledCourses.enrolledCourses
  );

  return {
    dispatch,
    navigate,
    location,
    user,
    token,
    theme,
    courseSidebarCollapsed,
    wishlistCourses,
    enrolledCourses,
  };
}
