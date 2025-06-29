import { PROFILE_IMAGE } from "../../../constants/constants";
import { useLogoutMutation } from "../../../features/auth/authApiSlice";
import { logout } from "../../../features/auth/authSlice";
import toastPromise from "../../../utils/toast";
import { useAppHook } from "../../hooks/useAppHook";
import { Button } from "../Button";
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

export function HeaderUserDropdown() {
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
