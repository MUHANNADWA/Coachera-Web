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
import CoursePage from "./features/courses/pages/CoursePage";
import ProtectedRoute from "./shared/routes/ProtectedRoute";
import AdminRoute from "./shared/routes/AdminRoute";
import NotFoundPage from "./shared/pages/NotFoundPage";
import Profile from "./features/profile/pages/ProfilePage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import ForgotPasswordPage from "./features/auth/pages/FogotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import OtpVerificationPage from "./features/auth/pages/OtpVerificationPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/otp-verification" element={<OtpVerificationPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailsPage />} />
      <Route path="/public-profile/:id" element={<Profile />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/learn/:courseId/:moduleId" element={<CoursePage />} />
        <Route path="/profile" element={<Profile />} />
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
