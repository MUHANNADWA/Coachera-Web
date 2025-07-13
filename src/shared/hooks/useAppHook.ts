import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setWishlist } from "../../features/courses/wishlistSlice";

export function useAppHook() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user?.user);
  const accessToken = useAppSelector((state) => state.auth.user?.accessToken);
  const token = accessToken ? `Bearer ${accessToken}` : null;
  const courseSidebarCollapsed = useAppSelector(
    (state) => state.courseSidebar.collapsed
  );
  const wishlistIds = useAppSelector((state) => state.wishlist.wishlist);
  const setWishlistIds = (ids: number[]) => dispatch(setWishlist(ids));

  return {
    dispatch,
    navigate,
    location,
    user,
    token,
    courseSidebarCollapsed,
    wishlistIds,
    setWishlistIds,
  };
}
