import { PROFILE_URL } from "../../../constants/constants";
import { useAppHook } from "../../hooks/useAppHook";
import { Button } from "../form/Button";

type NavLink = {
  title: string;
  path: string;
};

type HeaderMobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function HeaderMobileMenu({
  open,
  onClose,
}: HeaderMobileMenuProps) {
  const { user, navigate } = useAppHook();

  const navLinks: NavLink[] = [
    ...(user
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
                key={link.path}
                onClick={() => {
                  onClose();
                  navigate(link.path);
                }}
                className={
                  "m-0! w-full px-2 py-2 rounded-2xl transition font-semibold hover:bg-primary/10 hover:text-primary"
                }
              >
                {link.title}
              </Button>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
