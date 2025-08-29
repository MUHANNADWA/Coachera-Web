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
import { store } from "./app/store";

// Guards
import StudentRoute from "./shared/routes/StudentRoute";
import InstructorRoute from "./shared/routes/InstructorRoute";
import OrganizationRoute from "./shared/routes/OrganizationRoute";
import RoleRedirect from "./shared/routes/RoleRedirect";
import PublicOnlyRoute from "./shared/routes/PublicOnlyRoute";

// Public pages
import HomePage from "./shared/pages/HomePage";
import NotFoundPage from "./shared/pages/NotFoundPage";
import SearchPage from "./features/search/pages/SearchPage";
import CategoriesPage from "./features/courses/pages/CategoriesPage";

// Auth
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import ForgotPasswordPage from "./features/auth/pages/FogotPasswordPage";
import ResetPasswordPage from "./features/auth/pages/ResetPasswordPage";
import OtpVerificationPage from "./features/auth/pages/OtpVerificationPage";

// Courses
import CoursesPage from "./features/courses/pages/CoursesPage";
import CourseDetailsPage from "./features/courses/pages/CourseDetailsPage";
import LearnPage from "./features/courses/pages/LearnPage";
import NotificationsPage from "./features/courses/pages/NotificationsPage";

// Students (you put profile under students)
import ProfilePage from "./features/students/pages/ProfilePage";
import EditProfilePage from "./features/students/pages/EditProfilePage";

// Dashboard areas
import ManageLessonPage from "./features/dashboard/pages/ManageLessonPage";
import OrgDashboardPage from "./features/dashboard/pages/org/OrgDashboardPage";
import InstructorDashboardPage from "./features/dashboard/pages/InstructorDashboardPage";
import AddCoursePage from "./features/courses/builder/pages/AddCoursePage";
import EditCoursePage from "./features/courses/builder/pages/EditCoursePage";

// Others
import CheckoutButton from "./shared/components/Stripe";
import StudentHomePage from "./features/students/pages/StudentHomePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Landing route decides by role */}
      <Route index element={<RoleRedirect />} />

      {/* Public-only: instructors/orgs get redirected away */}
      <Route element={<PublicOnlyRoute />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/otp-verification" element={<OtpVerificationPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
      </Route>

      {/* Student area */}
      <Route element={<StudentRoute />}>
        <Route path="/student-home" element={<StudentHomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfilePage />} />
        <Route path="/learn/:courseId/:moduleId" element={<LearnPage />} />
        <Route path="/stripe" element={<CheckoutButton />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search/:query" element={<SearchPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
      </Route>

      {/* Instructor area - main/homepage */}
      <Route element={<InstructorRoute />}>
        <Route path="/inst-dashboard" element={<InstructorDashboardPage />} />
        <Route path="/manage-lesson/:id" element={<ManageLessonPage />} />
        <Route path="/edit-course" element={<EditCoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
      </Route>

      {/* Organization area - main/homepage */}
      <Route element={<OrganizationRoute />}>
        <Route path="/org-dashboard" element={<OrgDashboardPage />} />
        <Route path="/add-course" element={<AddCoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
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
