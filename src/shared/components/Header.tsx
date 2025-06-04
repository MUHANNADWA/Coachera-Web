import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { useLogoutMutation } from "../../features/auth/usersApiSlice";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { COURSES_URL, PROFILE_URL } from "../../constants/constants";
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
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                Hi {user?.username ?? "Guest"}!
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src={
                    user?.profileImage ??
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                />
                <ChevronDownIcon className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>
            <MenuItems
              transition
              anchor="bottom end"
              className="z-50 w-52 origin-top-right rounded-xl border bg-white shadow-lg p-1 text-sm/6 text-white transition duration-100 focus:outline-none"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={() => navigate(`${PROFILE_URL}`)}
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    <Cog8ToothIcon className="size-4 fill-black/30" />
                    Account Settings
                    <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-focus:inline">
                      ⌘D
                    </kbd>
                  </button>
                </MenuItem>
                {token ? (
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      onClick={logoutHandler}
                    >
                      <ArrowRightStartOnRectangleIcon className="size-4 fill-black/30" />
                      Logout
                    </button>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      onClick={() => navigate("/login")}
                    >
                      <ArrowLeftEndOnRectangleIcon className="size-4 fill-black/30" />
                      Login
                    </button>
                  </MenuItem>
                )}
              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
}
