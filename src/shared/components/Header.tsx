import {
  ChevronDownIcon,
  Cog8ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { useLogoutMutation } from "../../features/auth/authApiSlice";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { COURSES_URL } from "../../constants/constants";
import SearchBar from "./SearchBar";
import toastPromise from "../../utils/toast";
import { useAppHook } from "../hooks/useAppHook";

export default function Header() {
  const { navigate, dispatch, user, token } = useAppHook();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    await toastPromise(logoutApiCall(token), {
      loadingMessage: "Logging out...",
      successMessage: "Logged out successfully!",
      errorMessage: "Logging out failed",
      onSuccess: (_res) => {
        dispatch(logout());
        navigate("/login");
      },
    });
  };

  return (
    <header className="sticky top-0 bg-white z-50 border-b border-gray-300">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <Link to="/" className="flex justify-between items-center">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-xl px-4 font-bold text-primary">coachera</h1>
          </Link>
          <section className="flex items-center justify-center space-x-8 font-semibold *:">
            <Link to="/learn/1/1" className="header-element">
              What we offer
            </Link>
            <Link to={`${COURSES_URL}`} className="header-element">
              Courses
            </Link>
            <Link to={`${COURSES_URL}`} className="header-element">
              Categories
            </Link>
            <Link to="/prices" className="header-element">
              Prices
            </Link>
            <SearchBar />
          </section>
          <UserDropdown
            logoutHandler={logoutHandler}
            user={user!}
            token={token!}
          />
        </div>
      </div>
    </header>
  );
}

import { useState, useRef, useEffect } from "react";

interface UserMenuProps {
  user: { username?: string; profileImage?: string } | null;
  token: string | null;
  logoutHandler: () => void;
}

export function UserDropdown({ user, token, logoutHandler }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const { navigate } = useAppHook();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
        Hi {user?.username ?? "Guest"}!
        <img
          src={
            user?.profileImage ??
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt="profile"
          className="h-6 w-6 rounded-full ring-2 ring-white"
        />
        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-1">
          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Cog8ToothIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
            Account Settings
          </button>

          {token ? (
            <button
              onClick={() => {
                logoutHandler();
                setOpen(false);
              }}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <ArrowRightStartOnRectangleIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="group flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <ArrowLeftEndOnRectangleIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-700" />
              Login
            </button>
          )}
        </div>
      )}
    </div>
  );
}
