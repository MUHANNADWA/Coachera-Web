import {
  AcademicCapIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  BellIcon,
  HeartIcon,
  MoonIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { PROFILE_URL } from "../../../constants/constants";
import { useAppHook } from "../../hooks/useAppHook";
import { Button } from "../form/Button";
import Modal from "../Modal";
import { useLogoutMutation } from "../../../features/auth/api/authApiSlice";
import toastPromise from "../../utils/toast";
import { logout } from "../../../features/auth/authSlice";
import { useModal } from "../../hooks/useModal";

type HeaderMobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function HeaderMobileMenu({
  open,
  onClose,
}: HeaderMobileMenuProps) {
  // ✅ Always call hooks at the top level
  const { token, user, navigate, dispatch } = useAppHook();
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

  // ✅ Build links AFTER hooks so openModal exists; keep exact styling/structure
  const navLinks = user
    ? [
        {
          label: "My Profile",
          icon: UserCircleIcon,
          action: () => navigate(PROFILE_URL),
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
          label: "Notifications",
          icon: BellIcon,
          action: () => navigate("/notifications"),
        },
        {
          label: "Favorites",
          icon: HeartIcon,
          action: () => navigate("/profile#favorites"),
        },
        { label: "Toggle Theme", icon: MoonIcon, action: () => navigate("#") },
        {
          label: "Logout",
          icon: ArrowRightStartOnRectangleIcon,
          action: () => openModal(),
        }, // <-- call it
      ]
    : [
        {
          label: "Login",
          icon: ArrowLeftEndOnRectangleIcon,
          action: () => navigate("/login"),
        },
        {
          label: "Signup",
          icon: ArrowLeftEndOnRectangleIcon,
          action: () => navigate("/signup"),
        },
      ];

  // ✅ Safe to conditionally return after hooks are called
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        aria-hidden="true"
        onClick={onClose}
      ></div>

      <aside
        id="mobile-menu"
        className="fixed top-0 right-0 w-72 h-full p-6 flex flex-col gap-6"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        {/* Navigation Links */}
        <nav
          className="consect flex flex-col rounded-2xl items-start space-y-4 text-lg mt-9"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => {
            return (
              <Button
                key={link.label}
                onClick={() => {
                  onClose();
                  link.action();
                }}
                className={
                  "group flex w-full items-center justify-start gap-1 px-3! py-2! m-1! text-gray-700 dark:text-gray-300"
                }
              >
                <link.icon className="h-4 w-4 text-gray-700 dark:text-gray-300 mr-2" />
                {link.label}
              </Button>
            );
          })}
        </nav>
      </aside>

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
