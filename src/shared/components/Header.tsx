import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import {
  CATEGORIES_URL,
  COURSES_URL,
  PROFILE_IMAGE,
} from "../../constants/constants";
import SearchBar from "./SearchBar";
import toastPromise from "../../utils/toast";
import { useAppHook } from "../hooks/useAppHook";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { navigate, token } = useAppHook();

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-300">
      <div className="container mx-auto p-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center mr-4">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-xl px-2 font-bold text-primary">coachera</h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 font-semibold m-4">
            <Link to="/learn/1/1" className="header-element">
              Learn
            </Link>
            <Link to={COURSES_URL} className="header-element">
              Courses
            </Link>
            <Link to={CATEGORIES_URL} className="header-element">
              Categories
            </Link>
            <Link to="/prices" className="header-element">
              Prices
            </Link>
          </nav>

          {/* Search */}
          <div className="hidden md:block ml-4 mr-2">
            <SearchBar />
          </div>

          {/* Burger Icon */}
          <Button
            className="lg:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </Button>

          {/* Desktop User */}
          <div className="hidden lg:flex lg:items-center">
            {token ? (
              <>
                <Button className="p-2">
                  <p>Teach on coachera</p>
                </Button>

                <Button>
                  <IconHeart className="px-2 w-8 h-8" />
                </Button>

                <Notifications />

                <UserDropdown />
              </>
            ) : (
              <div className="flex gap-2">
                <Button onClick={() => navigate("/login")} variant="secondary">
                  Login
                </Button>
                <Button onClick={() => navigate("/signup")} variant="primary">
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 space-y-4 font-medium">
            <UserDropdown />
            <nav className="flex flex-col items-start space-y-2">
              <Link to="/learn/1/1" onClick={() => setMenuOpen(false)}>
                Learn
              </Link>
              <Link to={COURSES_URL} onClick={() => setMenuOpen(false)}>
                Courses
              </Link>
              <Link to={COURSES_URL} onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
              <Link to="/prices" onClick={() => setMenuOpen(false)}>
                Prices
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

import { IconBell, IconHeart } from "@tabler/icons-react";
import { Button } from "./Button";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  UserGroupIcon,
  UserCircleIcon,
  HeartIcon,
  AcademicCapIcon,
  RectangleStackIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";

export function UserDropdown() {
  const { navigate, dispatch, user, token } = useAppHook();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    await toastPromise(logoutApiCall(token), {
      loadingMessage: "Logging out...",
      successMessage: "Logged out successfully!",
      errorMessage: "Logging out failed",
      onSuccess: () => {
        dispatch(logout());
        navigate("/login");
      },
    });
  };

  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button className="group inline-flex items-center justify-center gap-2 px-3 py-2">
        Hi {user?.username || "there"}!
        <img
          src={user?.profileImage || PROFILE_IMAGE}
          alt="profile"
          className="h-6 w-6 rounded-full"
        />
      </Button>

      {/* Dropdown */}
      <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute right-0 z-50 mt-2 w-64 rounded-xl bg-white shadow-lg p-1">
        {[
          {
            label: "Public Profile",
            icon: UserGroupIcon,
            action: () => navigate(`/public-profile/${user?.id}`),
          },
          {
            label: "Edit Profile",
            icon: UserCircleIcon,
            action: () => navigate("/profile"),
          },
          {
            label: "Accomplishments",
            icon: AcademicCapIcon,
            action: () => navigate("/accomplishments"),
          },
          {
            label: "My Learning",
            icon: RectangleStackIcon,
            action: () => navigate("/learning"),
          },
          {
            label: "Wishlist",
            icon: HeartIcon,
            action: () => navigate("/wishlist"),
          },
          {
            label: "Notifications",
            icon: BellIcon,
            action: () => navigate("/notifications"),
          },
          {
            label: "Teach on Coachera",
            icon: PresentationChartLineIcon,
            action: () => navigate("/teach"),
          },
        ].map(({ label, icon: Icon, action }) => (
          <Button
            key={label}
            onClick={action}
            className="group flex w-full items-center justify-start gap-2 px-3 py-2 text-gray-700">
            <Icon className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
            {label}
          </Button>
        ))}

        <hr className="my-1" />

        <Button
          onClick={logoutHandler}
          className="group flex w-full items-center justify-start gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg">
          <ArrowRightStartOnRectangleIcon className="h-4 w-4 text-red-400 group-hover:text-red-600" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export function Notifications() {
  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button>
        <IconBell className="px-2 w-8 h-8" />
      </Button>

      {/* Dropdown */}
      <div className="dropdown">
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 1
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 2
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 3
        </Button>
      </div>
    </div>
  );
}

export function Favorites() {
  return (
    <div className="relative max-md:hidden group inline-block text-left">
      {/* Trigger */}
      <Button>
        <IconBell className="px-2 w-8 h-8" />
      </Button>

      {/* Dropdown */}
      <div className="dropdown">
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 1
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 2
        </Button>
        <Button
          onClick={() => {}}
          className="group flex w-full justify-start px-3 py-2 text-gray-700">
          Notification 3
        </Button>
      </div>
    </div>
  );
}
