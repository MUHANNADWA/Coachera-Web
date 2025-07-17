import { Link } from "react-router-dom";
import {
  CATEGORIES_URL,
  COURSES_URL,
  PROFILE_URL,
} from "../../../constants/constants";
import { Button } from "../Button";
import { HeaderUserDropdown } from "./HeaderUserDropdown";
import { useAppHook } from "../../hooks/useAppHook";

type NavLink = {
  title: string;
  path: string;
};

const baseNavLinks: NavLink[] = [
  { title: "Home", path: "/" },
  { title: "Courses", path: COURSES_URL },
  { title: "Categories", path: CATEGORIES_URL },
];

type HeaderMobileMenuProps = {
  open: boolean;
  onClose: () => void;
  currentPath: string;
};

export default function HeaderMobileMenu({
  open,
  onClose,
  currentPath,
}: HeaderMobileMenuProps) {
  const { token } = useAppHook();

  const navLinks: NavLink[] = [
    ...baseNavLinks,
    ...(token
      ? [{ title: "Profile", path: PROFILE_URL }]
      : [
          { title: "Login", path: "/login" },
          { title: "Signup", path: "/signup" },
        ]),
  ];

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-40"
        aria-hidden="true"
        onClick={onClose}></div>

      <aside
        id="mobile-menu"
        className="fixed top-0 right-0 w-72 h-full bg-white/80 z-50 shadow-2xl p-6 flex flex-col gap-6 animate-slide-in backdrop-blur-lg border-l border-gray-200"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu">
        {/* Close Button */}
        <div className="flex justify-end mb-2">
          <Button
            onClick={onClose}
            className="text-gray-700"
            aria-label="Close menu">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>

        {/* User Dropdown (if logged in) */}
        {token && <HeaderUserDropdown />}

        {/* Navigation Links */}
        <nav
          className="flex flex-col items-start space-y-4 text-lg font-medium"
          aria-label="Mobile navigation">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? currentPath === "/"
                : currentPath.startsWith(link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={`w-full px-2 py-2 rounded-2xl transition font-semibold hover:bg-primary/10 hover:text-primary ${
                  isActive ? "bg-primary/10 text-primary" : "text-gray-700"
                }`}
                aria-current={isActive ? "page" : undefined}>
                {link.title}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
