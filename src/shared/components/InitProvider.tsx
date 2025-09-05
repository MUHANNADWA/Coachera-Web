// src/app/initProvider.tsx
import { useAppHook } from "../hooks/useAppHook";
import { useEffect } from "react";
import { useGetWishlistQuery } from "../../features/courses/api/wishlistApiSlice";
import { setWishlist } from "../../features/courses/slices/wishlistSlice";
import { useGetEnrolledCoursesQuery } from "../../features/courses/api/coursesApiSlice";
import { setEnrolledCourses } from "../../features/courses/slices/enrolledCoursesSlice";
import { Course } from "../types/types";
import { UserRole } from "../../features/auth/types";

import {
  requestFcmToken,
  subscribeForegroundMessages,
} from "../../features/notifications/firebase";
import { useRegisterDeviceMutation } from "../../features/courses/api/notificationsApiSlice";

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

  // Register SW once, then get token and register device
  const [registerDevice] = useRegisterDeviceMutation();

  useEffect(() => {
    // Toggle theme class
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      // Register service worker as early as possible
      if ("serviceWorker" in navigator) {
        try {
          await navigator.serviceWorker.register("/firebase-messaging-sw.js");
          console.log("[SW] Registered firebase-messaging-sw.js");
        } catch (err) {
          console.error("[SW] Registration failed:", err);
        }
      }

      // Now request FCM token
      const token = await requestFcmToken();
      if (token) {
        try {
          await registerDevice({
            deviceToken: token,
            platform: "web",
          }).unwrap?.();
          console.log("[FCM] Device registered");
        } catch (e) {
          console.error("[FCM] Failed to register device:", e);
        }
      }

      // Foreground messages
      unsubscribe = await subscribeForegroundMessages((payload) => {
        console.log("[FCM] Foreground message:", payload);
        // TODO: Show in-app toast/snackbar here
      });
    })();

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, [registerDevice]);

  // Fetch lists for students
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

  return null;
};

export default InitProvider;
