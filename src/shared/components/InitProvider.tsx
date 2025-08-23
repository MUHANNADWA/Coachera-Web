import { useAppHook } from "../hooks/useAppHook";
import { useEffect } from "react";
import { useGetWishlistQuery } from "../../features/courses/apiSlices/wishlistApiSlice";
import { setWishlist } from "../../features/courses/slices/wishlistSlice";
import { useGetEnrolledCoursesQuery } from "../../features/courses/apiSlices/coursesApiSlice";
import { setEnrolledCourses } from "../../features/courses/slices/enrolledCoursesSlice";
import { Course } from "../types/types";

interface WishlistItem {
  createdAt: string;
  updatedAt: string;
  id: number;
  course: Course;
  studentId: number;
}

interface FavsApiResponse {
  status: number;
  message: string;
  data: WishlistItem[];
  timestamp: string;
}

interface EnrolledItem {
  createdAt: string;
  updatedAt: string;
  id: number;
  course: Course;
  studentId: number;
}

interface EnrolledApiResponse {
  status: number;
  message: string;
  data: EnrolledItem[];
  timestamp: string;
}

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

  console.log("wishlist from server = ", wishlist);
  console.log("enrolled from server = ", enrolled);

  useEffect(() => {
    if (wishlistSuccess && wishlist) {
      const favs = wishlist as FavsApiResponse;
      const wishlistCourses = favs.data.map((item) => item.course);

      dispatch(setWishlist(wishlistCourses));
    }
  }, [wishlistSuccess, wishlist, dispatch]);

  useEffect(() => {
    if (enrolledSuccess && enrolled) {
      const enrolledData = enrolled as EnrolledApiResponse;
      const enrolledCourses = enrolledData.data.map((item) => item.course);

      dispatch(setEnrolledCourses(enrolledCourses));
    }
  }, [enrolledSuccess, enrolled, dispatch]);

  return null;
};

export default InitProvider;
