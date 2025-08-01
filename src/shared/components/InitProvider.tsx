import { useAppHook } from "../hooks/useAppHook";
import { useEffect } from "react";
import { requestPermission } from "../../features/fcm/requestPermission";
import { listenToForegroundMessages } from "../../features/fcm/onForegroundMessage";
import { useGetWishlistQuery } from "../../features/courses/apiSlices/wishlistApiSlice";
import { setWishlist } from "../../features/courses/slices/wishlistSlice";
import { useGetEnrolledCoursesQuery } from "../../features/courses/apiSlices/coursesApiSlice";
import { setEnrolledCourses } from "../../features/courses/slices/enrolledCoursesSlice";

const InitProvider = () => {
  const { theme, user, dispatch } = useAppHook();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const { data: wishlist, isSuccess: wishlistSuccess } = useGetWishlistQuery(
    {},
    { skip: !user }
  );
  const { data: enrolled, isSuccess: enrolledSuccess } =
    useGetEnrolledCoursesQuery({}, { skip: !user });

  useEffect(() => {
    requestPermission().then((token) => {
      if (token) {
      }
    });
    listenToForegroundMessages();
  }, []);

  useEffect(() => {
    if (wishlistSuccess && wishlist) {
      const wishlistIds = wishlist.data.map((item: any) => item.courseId);
      dispatch(setWishlist(wishlistIds));
    }
  }, [wishlistSuccess, wishlist, dispatch]);

  useEffect(() => {
    if (enrolledSuccess && enrolled) {
      const enrolledCoursesIds = enrolled.data.map(
        (item: any) => item.courseId
      );
      dispatch(setEnrolledCourses(enrolledCoursesIds));
    }
  }, [enrolledSuccess, enrolled, dispatch]);

  return null;
};

export default InitProvider;
