import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import { HelmetProvider } from "react-helmet-async";
import { Provider } from 'react-redux'
import { store } from './app/Store'
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Home from './shared/pages/Home';
import Courses from './features/courses/pages/Courses';
import CourseDetail from './features/courses/pages/CourseDetail';
import CoursePlayer from './features/courses/pages/CoursePlayer';
import ProtectedRoute from './shared/routes/ProtectedRoute';
import AdminRoute from './shared/routes/AdminRoute';
import NotFound from './shared/pages/NotFound';
import Profile from './features/profile/pages/Profile';
import Dashboard from './features/dashboard/pages/Dashboard';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route index path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/learn/:id" element={<CoursePlayer />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ));



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </HelmetProvider>
  </React.StrictMode>,
)