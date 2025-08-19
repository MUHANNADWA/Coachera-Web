import { PROFILE_IMAGE } from "../../../constants/constants";
import { useLogoutMutation } from "../../../features/auth/authApiSlice";
import { logout } from "../../../features/auth/authSlice";
import toastPromise from "../../../utils/toast";
import { useAppHook } from "../../hooks/useAppHook";
import { useModal } from "../../hooks/useModal";
import { Button } from "../form/Button";
import {
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  UserCircleIcon,
  HeartIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Modal from "../Modal";

export function HeaderUserDropdown() {
  const { navigate, dispatch, user, token } = useAppHook();

  const userDropdown = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      action: () => navigate("/profile"),
    },
    {
      label: "Edit Profile",
      icon: PencilSquareIcon,
      action: () => navigate("/edit-profile"),
    },
    {
      label: "Accomplishments",
      icon: AcademicCapIcon,
      action: () => navigate("/accomplishments"),
    },
    {
      label: "Wishlist",
      icon: HeartIcon,
      action: () => navigate("/profile#wishlist"),
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
  ];

  const [logoutApiCall] = useLogoutMutation();
  const { openModal, closeModal, isModalOpen } = useModal();

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
    <>
      <div className="relative max-md:hidden group inline-block text-left">
        {/* Trigger */}
        <Button className="group inline-flex items-center justify-center gap-2 px-3 py-2">
          Hi {user?.username}!
          <img
            src={user?.profileImage || PROFILE_IMAGE}
            alt="profile"
            className="h-6 w-6 rounded-2xl"
          />
        </Button>

        {/* Dropdown */}
        <div className="dropdown">
          {userDropdown.map(({ label, icon: Icon, action }) => (
            <Button
              key={label}
              onClick={action}
              className="group flex w-full items-center justify-start gap-2 px-3 py-2 text-gray-700 dark:text-gray-300"
            >
              <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              {label}
            </Button>
          ))}

          <Button
            onClick={openModal}
            className="group flex w-full items-center justify-start gap-2 px-3 py-2 text-sm text-danger dark:text-red-400 hover:bg-red-50 rounded-2xl"
          >
            <ArrowRightStartOnRectangleIcon className="h-4 w-4 dark:text-red-400 text-danger" />
            Logout
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Logout"
        message="Are you sure you want to logout?"
        variant="confirm"
        onConfirm={logoutHandler}
      />
    </>
  );
}
