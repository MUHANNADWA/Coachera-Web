import { useAppHook } from "../hooks/useAppHook";
import { useEffect } from "react";
import { useGetWishlistQuery } from "../../features/courses/api/wishlistApiSlice";
import { setWishlist } from "../../features/courses/slices/wishlistSlice";
import { useGetEnrolledCoursesQuery } from "../../features/courses/api/coursesApiSlice";
import { setEnrolledCourses } from "../../features/courses/slices/enrolledCoursesSlice";
import { Course } from "../types/types";
import { UserRole } from "../../features/auth/types";

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

  const isStudent = user?.role === UserRole.STUDENT;

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const { data: enrolled, isSuccess: enrolledSuccess } =
    useGetEnrolledCoursesQuery({}, { skip: !isStudent });

  const { data: wishlist, isSuccess: wishlistSuccess } = useGetWishlistQuery(
    {},
    { skip: !isStudent }
  );
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

  console.log("enrolled = ", enrolled);

  return null;
};

export default InitProvider;
