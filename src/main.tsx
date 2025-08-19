import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./app/App";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { store } from "./app/Store";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import HomePage from "./shared/pages/HomePage";
import CoursesPage from "./features/courses/pages/CoursesPage";
import CourseDetailsPage from "./features/courses/pages/CourseDetailsPage";
import LearnPage from "./features/courses/pages/LearnPage";
import ProtectedRoute from "./shared/routes/ProtectedRoute";
import AdminRoute from "./shared/routes/AdminRoute";
import NotFoundPage from "./shared/pages/NotFoundPage";
import ProfilePage from "./features/profile/pages/ProfilePage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ForgotPasswordPage from "./features/auth/pages/FogotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import OtpVerificationPage from "./features/auth/pages/OtpVerificationPage";
import SearchPage from "./shared/pages/SearchPage";
import CategoriesPage from "./features/courses/pages/CategoriesPage";
import EditProfilePage from "./features/profile/pages/EditProfilePage";
import TeachPage from "./features/dashboard/pages/TeachPage";
import AddCoursePage from "./features/dashboard/pages/AddCoursePage";
import ManageLessonPage from "./features/dashboard/pages/ManageLessonPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/search/:query" element={<SearchPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/teach" element={<TeachPage />} />
      <Route path="/add-course" element={<AddCoursePage />} />
      <Route path="/manage-lesson/:id" element={<ManageLessonPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/learn/:courseId/:moduleId" element={<LearnPage />} />
        <Route path="/edit-profile" element={<EditProfilePage />}>
          {/* <Route path="/close-account" element={<LearnPage />} /> */}
        </Route>
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);
