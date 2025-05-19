import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  Cog8ToothIcon,
  UserMinusIcon,
} from '@heroicons/react/16/solid'
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../features/auth/usersApiSlice";
import { logout } from "../../features/auth/authSlice";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

export default function Header() {

  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();


  const logoutHandler = async () => {
    try {
      await logoutApiCall(user?.accessToken);
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <header className="sticky top-0 bg-white z-50">
      <div className="container mx-auto p-4">
        <div className="flex justify-between">
          <div className="flex justify-between items-center">
            <img src={logo} alt="logo" className="w-10" />
            <h1 className="text-xl px-4 font-bold text-primary">coachera</h1>
          </div>
          <div className="flex items-center space-x-8 font-semibold">
            <Link to='/login'>
              What we offer
            </Link >
            <Link to='/courses'>
              Courses
            </Link >
            <Link to='/courses'>
              Categories
            </Link >
            <Link to='/login'>
              Prices
            </Link >
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50">
                Hi {user?.userDTO?.username ?? "Guest"}!
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
              </MenuButton>
            </div>
            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border bg-white shadow-lg p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
            >
              <div className="py-1">

                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden">
                    <Cog8ToothIcon className="size-4 fill-black/30" />
                    Account Settings
                    <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-focus:inline">⌘D</kbd>
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                    onClick={logoutHandler}>
                    <UserMinusIcon className="size-4 fill-black/30" />
                    Log out
                    <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-focus:inline">ctrl+k</kbd>
                  </button>
                </MenuItem>

              </div>
            </MenuItems>
          </Menu>
        </div>
      </div>
    </header>
  );
}