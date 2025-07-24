import { Outlet } from "react-router-dom";
import Header from "../shared/components/header/Header";
import Footer from "../shared/components/Footer";
import { Toaster } from "react-hot-toast";
import AutoReturnTop from "../shared/components/AutoReturnTop";
import ScrollToTop from "../shared/components/ScrollToTop";
import { useEffect } from "react";
import { requestPermission } from "../features/fcm/requestPermission";
import { listenToForegroundMessages } from "../features/fcm/onForegroundMessage";
import { useGetWishlistQuery } from "../features/courses/apiSlices/wishlistApiSlice";
import { useAppHook } from "../shared/hooks/useAppHook";
import { setWishlist } from "../features/courses/slices/wishlistSlice";
import { useGetEnrolledCoursesQuery } from "../features/courses/apiSlices/coursesApiSlice";
import { setEnrolledCourses } from "../features/courses/slices/enrolledCoursesSlice";
import HeaderThemeToggle from "../shared/components/header/HeaderThemeToggle";
import ThemeProvider from "../shared/components/ThemeProvider";
import { useUtils } from "../features/courses/utils/useUtils";

function AppContent() {
  const { toastOptions } = useUtils();

  return (
    <>
      <ThemeProvider />
      <AutoReturnTop />
      <div className="flex min-h-screen flex-col relative">
        <Header />

        <main className="flex-grow">
          <Outlet />
        </main>

        <HeaderThemeToggle />
        <ScrollToTop />
        <Toaster toastOptions={toastOptions} containerClassName="mt-20" />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  const { user, dispatch } = useAppHook();

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

  return <AppContent />;
}
