import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/scrollToTop";
import { useEffect } from "react";
import { requestPermission } from "../features/fcm/requestPermission";
import { listenToForegroundMessages } from "../features/fcm/onForegroundMessage";
import Loader from "../shared/components/Loader";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useGetWishlistQuery } from "../features/courses/apiSlices/wishlistApiSlice";
import { useAppHook } from "../shared/hooks/useAppHook";
import { setWishlist } from "../features/courses/slices/wishlistSlice";
import {
  useEnrollCourseMutation,
  useGetEnrolledCoursesQuery,
} from "../features/courses/apiSlices/coursesApiSlice";
import { setEnrolledCourses } from "../features/courses/slices/enrolledCoursesSlice";

function AppContent() {
  return (
    <>
      <AutoReturnTop />
      <div className="flex min-h-screen flex-col relative">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <ScrollToTop />
        <Toaster
          toastOptions={{
            success: {
              icon: <CheckCircleIcon className="text-success h-12 w-12" />,
              className: "border-2 border-success",
            },
            error: {
              icon: <XCircleIcon className="text-danger h-12 w-12" />,
              className: "border-2 border-danger",
            },
            loading: {
              icon: <Loader className="text-primary" />,
              className: "border-2 border-primary",
            },
            style: {
              borderRadius: "15px",
              padding: "10px",
              fontSize: "16px",
              boxShadow: "none",
            },
          }}
          containerClassName="mt-20"
        />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const { dispatch } = useAppHook();

  const { data: wishlist, isSuccess: wishlistSuccess } = useGetWishlistQuery(
    {}
  );

  const { data: enrolled, isSuccess: enrolledSuccess } =
    useGetEnrolledCoursesQuery({});

  useEffect(() => {
    requestPermission().then((token) => {
      if (token) {
        // 🔁 Send this token to backend
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

  return <AppContent />;
}
